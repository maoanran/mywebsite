var express = require('express');
var app = express();

app.use('', express.static(__dirname + '/index'));
app.use('/lottery', express.static(__dirname + '/lottery'));
app.use('/css', express.static(__dirname + '/index/css'));
app.use('/img', express.static(__dirname + '/index/img'));
app.use('/fonts', express.static(__dirname + '/index/fonts'));

app.get('/', function (req, res) {
        res.status(200).sendfile(__dirname + '/index/index.html');
});

app.get('/cmb', function (req, res) {
        res.status(200).sendfile(__dirname + '/cmb.html');
});

app.get('/userscripts', function (req, res) {
        res.status(200).sendfile(__dirname + '/index/userscripts.html');
});

app.listen(43420);
console.log("Server listen: 192.241.228.78:80 127.0.0.1:43420");
