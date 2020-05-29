const siteNavigator = require('./site/siteNavigator');
const emailSender = require('./sender/emailSender');
const fileUtil = require('./util/fileUtil');

exports.check = function () {

    console.log('checking');

    siteNavigator.run().then(paymentData => {

        console.log(paymentData)

        emailSender.sendPaymentData(paymentData);

        fileUtil.remove(paymentData.fileName);

    }).catch(error => {
        console.error(error)
    });

};
