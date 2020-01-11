var net = require('net');
var HOST = '127.0.0.1';
var PORT = 9000;

var dm = require ('./dm.js');

// Create the server socket, on client connections, bind event handlers
server = net.createServer(function(sock) {
    
    // We have a connection - a socket object is assigned to the connection automatically
    console.log('Conected: ' + sock.remoteAddress + ':' + sock.remotePort);
    
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        
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
            	reply.obj = dm.getPublicMessageList (cmd.sbj);
            	break;
            case 'get private message list': 
            	reply.obj = dm.getPrivateMessageList (cmd.u1, cmd.u2);
            	break;
            // TODO: complete all forum functions
            case 'add user': 
                reply.obj = dm.addUser (cmd.u, cmd.p);
                break;
            case 'add subject': 
                reply.obj = dm.addSubject (cmd.s);
                break;
                case 'get subject list': 
                reply.obj = dm.getSubjectList();
                break;
            case 'get user list': 
                reply.obj = dm.getUserList ();//REVISAR sin argumentos
                break;
            case 'login': 
                reply.obj = dm.login (cmd.u, cmd.p);
                break;
            case 'get subject':
                    reply.obj = dm.login (invo.sbj);
                break;
            case 'add private message': 
                reply.obj = dm.addPrivateMessage (cmd.msg);
                break;
        }
        sock.write (JSON.stringify(reply));
    });


    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('Connection closed');
    });
    
});
    
server.listen(PORT, HOST, function () {
    console.log('Server listening on ' + HOST +':'+ PORT);
});


