const express = require('express');
const app = express();
const paymentChecker = require('./paymentChecker');

app.get('/home', function (req, res) {

    console.log('teste');

    paymentChecker.check();

    res.sendStatus(200);

});

app.get('/health', function (req, res) {
    console.log('here!');
    res.send('here!');
});

app.listen(3000, function () {
    console.log('server started');
});