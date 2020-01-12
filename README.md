Practicas de Laboratorio de la asignatura:
"Servicios y Aplicaciones Distribuidas" del Master Universitario en Ingeniería Informática (MUIINF)

PARA LANZARLO:
3 SERVIDORES para Pruebas:

node dmserver.js 127.0.0.1 6544 9999 127.0.0.1:7777,127.0.0.1:8888
node forum.js 127.0.0.1 6544 9999 3211
node dmserver.js 127.0.0.1 6545 8888 127.0.0.1:7777,127.0.0.1:9999
node forum.js 127.0.0.1 6545 8888 3212
node dmserver.js 127.0.0.1 6546 7777 127.0.0.1:8888,127.0.0.1:9999
node forum.js 127.0.0.1 6546 7777 3213

