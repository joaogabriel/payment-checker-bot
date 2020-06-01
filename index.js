const express = require('express');
const app = express();
const botController = require('./src/botController');
const port = process.env.PORT || 2020;

app.get('/check/:accessToken', botController.check);

app.get('/health', botController.health);

app.listen(port, function () {
    console.log(`server started on ${port}`);
});
