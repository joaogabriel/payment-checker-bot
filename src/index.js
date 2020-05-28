const express = require('express');
const app = express();
const paymentChecker = require('./paymentChecker');
const port = process.env.PORT || 2020;
const siteUrl = process.env.SITE_URL || '';

app.get('/home', function (req, res) {

    paymentChecker.check();

    res.sendStatus(200);

});

app.get('/health', function (req, res) {

    const response = `here! url: ${siteUrl}`;

    console.log(response);

    res.send(response);

});

app.listen(port, function () {
    console.log(`server started on ${port}`);
});