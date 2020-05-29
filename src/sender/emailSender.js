const mailData = readPageValues();
const mailgunJs = require('mailgun-js');
const fileUtil = require('../util/fileUtil');

exports.sendPaymentData = (paymentData) => {

    const mailgun = mailgunJs({apiKey: mailData.mailgunApiKey, domain: mailData.mailgunDomainName});

    const attachment = fileUtil.getFilePath(paymentData.fileName);

    console.log(attachment);

    const data = {
        from: `Payment Checker Bot <mailgun@${mailData.mailgunDomainName}>`,
        to: mailData.to,
        subject: 'Verificação realizada em DATA',
        text: `Tem ${paymentData.rows} linhas!`,
        attachment: attachment
    };

    return new Promise(function (resolve, reject) {

        mailgun.messages().send(data, async function (error, body) {

            if (error) {
                reject(error);
            }

            resolve(body);

        });

    });

}

exports.sendError = (error) => {

}

function readPageValues() {

    return {
        to: process.env.EMAIL,
        mailgunApiKey: process.env.MAILGUN_API_KEY,
        mailgunDomainName: process.env.MAILGUN_DOMAIN_NAME
    }

}
