/*
 * @Author: wangyongqi.wyq 
 * @Date: 2021-11-01 00:00:21 
 * @Last Modified by:   wangyongqi.wyq 
 * @Last Modified time: 2021-11-01 00:00:21 
 */

const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || "8000";

const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/myapp',
    ssl: {}
});

app.use(peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

server.listen(port);
console.log('Listening on: ' + port);
