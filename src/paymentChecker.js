const siteNavigator = require('./site/siteNavigator');
const emailSender = require('./sender/emailSender');
const fileUtil = require('./util/fileUtil');

exports.check = function () {

    console.log('checking');

    siteNavigator.run().then(async paymentData => {

        emailSender.sendPaymentData(paymentData).then(body => {
            console.log('mail sended');
        }).catch(error => {

            console.log('krai', error);

            emailSender.sendError(error);

        }).finally(() => {
            fileUtil.remove(paymentData.fileName);
        });

    }).catch(error => {

        console.error(error);

        emailSender.sendError(error);

    });

};
