const siteNavigator = require('./site/siteNavigator');
const emailSender = require('./sender/emailSender')

exports.check = function () {

    console.log('checking');

    siteNavigator.run().then(paymentData => {

        console.log(paymentData)

        emailSender.sendPaymentData(paymentData);

    }).catch(error => {
        console.error(error)
    });

};
