var zmq = require('zmq');
var client = zmq.socket('req');

exports.Start = function (host, port, cb) {
	client.connect('tcp://'+host+':'+port);
	console.log('Connected to: ' + host + ':' + port);
    cb();
}

var callbacks = {} // hash of callbacks. Key is invoId
var invoCounter = 0; // current invocation number is key to access "callbacks".

//
// When data comes from server. It is a reply from our previous request
// extract the reply, find the callback, and call it.
// Its useful to study "exports" functions before studying this one.
//
client.on ('message', function (data) {
	console.log ('data comes in: ' + data);
	var str = data.toString();
	var reply = JSON.parse (str);
	switch (reply.what) {
		// TODO complete list of commands
		case 'get user list':
		case 'get private message list':
		case 'get public message list':
		case 'get subject list':
		case 'get subject':
		case 'login':
			console.log ('We received a reply for: ' + reply.what + ':' + reply.invoId);
			callbacks [reply.invoId] (reply.obj); // call the stored callback, one argument
			delete callbacks [reply.invoId]; // remove from hash
			break;
		case 'add private message':
		case 'add public message':
		case 'add user':
		case 'add subject':
			console.log ('We received a reply for add command');
			callbacks [reply.invoId] (); // call the stored callback, no arguments
			delete callbacks [reply.invoId]; // remove from hash
			break;
		default:
			console.log ("Panic: we got this: " + reply.what);
			
		
	}
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});


//
// on each invocation we store the command to execute (what) and the invocation Id (invoId)
// InvoId is used to execute the proper callback when reply comes back.
//
function Invo (str, cb) {
	this.what = str;
	this.invoId = ++invoCounter;
	callbacks[invoCounter] = cb;
}

//
//
// Exported functions as 'dm'
//
//

exports.getPublicMessageList = function  (sbj, cb) {
	var invo = new Invo ('get public message list', cb);	
	invo.sbj = sbj;
	client.send (JSON.stringify(invo));
}

exports.getPrivateMessageList = function (u1, u2, cb) {
	invo = new Invo ('get private message list', cb);
	invo.u1 = u1;
	invo.u2 = u2;
	client.send (JSON.stringify(invo));
}

exports.getSubjectList = function (cb) {
	client.send (JSON.stringify(new Invo ('get subject list', cb)));
}


// TODO: complete the rest of the forum functions.
exports.getUserList = function (cb) {
	console.log("111");
	client.send(JSON.stringify(new Invo ('get user list', cb)));
}

exports.addPrivateMessage = function (msg, cb){
	invo = new Invo ('add private message', cb);
	invo.msg = msg;
	client.send (JSON.stringify(invo));
	
}

// adds a public message to storage
exports.addPublicMessage = function (msg, cb)
{
	invo = new Invo ('add public message', cb);
	invo.msg = msg;
	client.send (JSON.stringify(invo));
}

exports.getSubject =function (sbj, cb) {
	invo = new Invo ('get subject', cb);
	invo.sbj = sbj;
	client.send (JSON.stringify(invo));
}


// Tests if credentials are valid, returns true on success
exports.login = function (u, p, cb) {
	invo = new Invo ('login', cb);
	invo.u = u;
	invo.p = p;
	client.send (JSON.stringify(invo));
}

// true if already exists
exports.addUser = function (u,p, cb) {
	invo = new Invo ('add user', cb);
	invo.u = u;
	invo.p = p;
	client.send (JSON.stringify(invo));
}

// Adds a new subject to subject list. Returns -1 if already exists, id on success
exports.addSubject = function (s, cb) {
	invo = new Invo ('add subject', cb);
	invo.s = s;
	client.send (JSON.stringify(invo));
}