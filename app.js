'use strict';

var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

//static resources directories§
app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function serve(req, res) {
	res.send('Hello NI');
});

app.listen(port, function init(err) {
	if (err) {
		console.log('server failed to start with error: ' + err);
		return;
	}

	console.log('running server on port ' + port);
});