const express = require('express');
const app = express();
const paymentController = require('./src/botController');
const port = process.env.PORT || 2020;

app.get('/check/:accessToken', paymentController.check);

app.get('/health', paymentController.health);

app.listen(port, function () {
    console.log(`server started on ${port}`);
});
