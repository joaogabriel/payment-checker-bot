console.log(1)
const express = require('express');
console.log(express)
const app = express();
console.log(app)
const paymentChecker = require('./src/paymentChecker');
console.log(paymentChecker)
const port = process.env.PORT || 2020;
console.log(port)
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