var dm = require ('./dm_remote.js');
var net = require('net');
// AÑADIR LOS ARGUMENTOS EN LINEA DE ORDENES
// var HOST = '127.0.0.1';
// var PORT = 9000;
var HOST = process.argv[2]; 
var PORT = process.argv[3];

dm.Start(HOST, PORT, function () {
	// Write the command to the server 
	// SERA AÑADIR CON OTRO SWITCH LOS COMMANDOS DEL DMSERVER Y DM_REMOTE
	// USO DE REFERENCIA EL QUE TENGO DE EJEMPLO DE dm.getSubjectList

	switch(process.argv[4]){
		case "get subject list":
			dm.getSubjectList (function (ml) {
				console.log ("get subject list:");
				console.log (JSON.stringify(ml));
			});
			break;
		case 'get user list':
			dm.getUserList (function (ml) {
				console.log ("get user list:");
				console.log (JSON.stringify(ml));	
			});
			break;
		case 'get private message list':
			dm.getPrivateMessageList (process.argv[5],process.argv[6],function (ml) {
				console.log ("get private message list")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'add user':
			dm.addUser (process.argv[5],process.argv[6], function (ml) {
				console.log ("add user")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'add subject':
			dm.addSubject (process.argv[5], function (ml) {
				console.log ("add subject")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'get public message list':
			dm.getPublicMessageList (process.argv[5],function (ml) {
				console.log ("get public message list")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'add private message':
			dm.addPrivateMessage (process.argv[5],function (ml) {
				console.log ("add private message")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'add public message':
			dm.addPublicMessage (process.argv[5],function (ml) {
				console.log ("add public message")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'get subject':
			dm.getSubject (process.argv[5],function (ml) {
				console.log ("get subject")
				console.log (JSON.stringify(ml));
			});
			break;
		case 'login':
			dm.login (process.argv[5],process.argv[6],function (ml) {
				console.log ("login")
				console.log (JSON.stringify(ml));
			});
			break;
		}
});
