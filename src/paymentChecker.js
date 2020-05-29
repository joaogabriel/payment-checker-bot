const siteNavigator = require('./site/siteNavigator');
const emailSender = require('./sender/emailSender');
const fileUtil = require('./util/fileUtil');

exports.check = function () {

    console.log('checking');

    siteNavigator.run().then(async paymentData => {

        console.log(paymentData)

        emailSender.sendPaymentData(paymentData).then(body => {
            console.log('oba', body)
        }).catch(error => {
            console.log('krai', error)
        }).finally(() => {
            console.log('vai remover arquivo agora')
            // fileUtil.remove(paymentData.fileName);
        });

    }).catch(error => {
        console.error(error)
    });

};
