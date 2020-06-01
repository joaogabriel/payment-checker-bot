const express = require('express');
const app = express();
const paymentChecker = require('./src/paymentChecker');
const port = process.env.PORT || 2020;

app.get('/home', function (req, res) {

    paymentChecker.check();

    res.sendStatus(200);

});

app.get('/health', function (req, res) {

    const response = 'here!';

    console.log(response);

    res.send(response);

});

app.listen(port, function () {
    console.log(`server started on ${port}`);
});
