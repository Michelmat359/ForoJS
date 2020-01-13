//var net = require('net');
var zmq = require('zmq');
var dm = require ('./dm.js');
var pub = zmq.socket('pub');
var rep = zmq.socket('rep');
var sub = zmq.socket('sub');
//var HOST = '127.0.0.1';
// Escuche en el puerto que indiquemos como argumento.
//var PORT = 9000;
var HOST = process.argv[2];//'127.0.0.1'
var PORT = process.argv[3];//'9900'
//Añadir un argumento adicional a dmserver.js que será el puerto donde éste publicará sus cambios
var PORTPUB = process.argv[4];
var PORTSSUBS = process.argv[5];
rep.bind('tcp://'+HOST+':'+PORT);
pub.bind('tcp://'+HOST+':'+PORTPUB);
//SPLIT
PORTSSUBS.split(",").forEach(function(port) {
    sub.connect('tcp://'+port);
}, this);

// SubscribirseS
sub.subscribe('checkpoint');
sub.on('message', function(data){
	var str = data.toString();
	var invo = JSON.parse (str.split('checkpoint')[1]);

	switch (invo.what) {
		case 'add private message':
            invo.obj = dm.addPrivateMessage (invo.msg);
            pub.send('webserver' + JSON.stringify(invo));
        break;
		case 'add public message':
            invo.obj = dm.addPublicMessage (invo.msg);
            pub.send('webserver' + JSON.stringify(invo));
        break;
        case 'add user':
            invo.obj = dm.addUser (invo.u, invo.p);
            pub.send('webserver' + JSON.stringify(invo));
        break;
        case 'add subject':
            invo.obj = dm.addSubject (invo.s);
            pub.send('webserver' + JSON.stringify(invo));
        break;
	}
});


// Create the server socket, on client connections, bind event handlers
//server = net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
   // console.log('Conected: ' + sock.remoteAddress + ':' + sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    rep.on('message', function(data) {
        
        console.log('request comes in...' + data);
        var str = data.toString();
        var invo = JSON.parse (str);
        console.log('request is:' + invo.what + ':' + str);

        var reply = {what:invo.what, invoId:invo.invoId};
        switch (invo.what) {
        	case 'get subject list':
            reply.obj = dm.getSubjectList();
            break;
        case 'get public message list': 
            reply.obj = dm.getPublicMessageList (invo.sbj);
            break;
        case 'get private message list': 
            reply.obj = dm.getPrivateMessageList (invo.u1, invo.u2);
            break;
        case 'get user list':
            reply.obj = dm.getUserList ();
            break;
        case 'get subject':
            reply.obj = dm.getSubject (invo.sbj);
            break;
        case 'login':
            reply.obj = dm.login (invo.u, invo.p);
            break;
        case 'add private message':
            reply.obj = dm.addPrivateMessage (invo.msg);
            pub.send('webserver' + JSON.stringify(invo));
            pub.send('checkpoint' + JSON.stringify(invo));
            break;
        case 'add public message':
            reply.obj = dm.addPublicMessage (invo.msg);
            pub.send('webserver' + JSON.stringify(invo));
            pub.send('checkpoint' + JSON.stringify(invo));
            break;
        case 'add user':
            reply.obj = dm.addUser (invo.u, invo.p);
            pub.send('webserver' + JSON.stringify(invo));
            pub.send('checkpoint' + JSON.stringify(invo));
            break;
        case 'add subject':
            reply.obj = dm.addSubject (invo.s);
            pub.send('webserver' + JSON.stringify(invo));
            pub.send('checkpoint' + JSON.stringify(invo));
            break;       
        }
        rep.send (JSON.stringify(reply));
    });


    // Add a 'close' event handler to this instance of socket
   // rep.on('close', function(data) {
    //    console.log('Connection closed');
   // });
    
    
//server.listen(PORT, HOST, function () {
//    console.log('Server listening on ' + HOST +':'+ PORT);
//});


