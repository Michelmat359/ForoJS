Practicas de Laboratorio de la asignatura:
"Servicios y Aplicaciones Distribuidas" del Master Universitario en Ingeniería Informática (MUIINF)

PARA LANZARLO:
3 SERVIDORES para Pruebas:

node dmserver.js 127.0.0.1 10000 11000 127.0.0.1:11001,127.0.0.1:11002
node forum.js 127.0.0.1 10000 11001 12000
node dmserver.js 127.0.0.1 10001 11001 127.0.0.1:11000,127.0.0.1:11002
node forum.js 127.0.0.1 10001 11000 12001
node dmserver.js 127.0.0.1 10002 11002 127.0.0.1:11001,127.0.0.1:11000
node forum.js 127.0.0.1 10002 11002 12002




