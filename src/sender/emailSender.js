const mailData = readPageValues();
const mailgunJs = require('mailgun-js');
const fileUtil = require('../util/fileUtil');

exports.sendPaymentData = (paymentData) => {

    const mailgun = mailgunJs({apiKey: mailData.mailgunApiKey, domain: mailData.mailgunDomainName});

    const attachment = fileUtil.getFilePath(paymentData.fileName);

    const data = {
        ...createMaingunBasicSenderData(),
        subject: getSubject(paymentData.rows),
        text: 'Powered by Payment Checker Bot',
        attachment: attachment
    };

    return new Promise(function (resolve, reject) {

        mailgun.messages().send(data, function (error, body) {

            if (error) {
                reject(error);
            }

            resolve(body);

        });

    });

}

exports.sendError = (error) => {

    const data = {
        ...createMaingunBasicSenderData(),
        subject: 'Erro na execução',
        text: `Erro: ${error}`
    };

    mailgun.messages().send(data, function (error, body) {

        if (error) {
            console.error('error on send mail by mailgun', error);
        }

        console.log('error mail sended');

    });

}

function readPageValues() {

    return {
        to: process.env.EMAIL,
        mailgunApiKey: process.env.MAILGUN_API_KEY,
        mailgunDomainName: process.env.MAILGUN_DOMAIN_NAME
    }

}

function createMaingunBasicSenderData() {

    return  {
        from: `Payment Checker Bot <mailgun@${mailData.mailgunDomainName}>`,
        to: mailData.to
    }

}

function getSubject(rows) {

    let term = 'boleto';

    if (rows > 1) {
        term += 's';
    }

    return `${rows} ${term} em aberto`;

}