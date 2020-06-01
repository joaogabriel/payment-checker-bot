const environmentUtil = require('../util/environmentUtil');
const environment = environmentUtil.get();
const mailgunJs = require('mailgun-js');
const mailgun = mailgunJs({apiKey: environment.mailgun.apiKey, domain: environment.mailgun.domainName});
const fileUtil = require('../util/fileUtil');
const dateUtil = require('../util/dateUtil');

exports.sendPaymentData = (paymentData) => {

    const attachment = fileUtil.getFilePath(paymentData.fileName);

    const data = {
        ...createMaingunBasicSenderData(),
        subject: getSubject(paymentData.rows),
        html: getContentHTML(paymentData.rows),
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

const createMaingunBasicSenderData = () => {

    return {
        from: `Payment Checker Bot <mailgun@${environment.mailgun.domainName}>`,
        to: environment.recipientMail
    }

}

const getSubject = (rows) => {

    const todayComplete = dateUtil.getTodayComplete();

    let term = 'boleto';

    if (rows === 0) {
        rows = 'Nenhum';
    } else if (rows > 1) {
        term += 's';
    }

    return `${todayComplete} - ${rows} ${term} em aberto`;

}

const getContentHTML = (rows) => {

    const html =
        `
            <p><strong>Mês:</strong> ${dateUtil.getTodayMonthAndYear()}</p>
            <p><strong>Boletos em aberto:</strong> ${rows}</p>
            <p><strong>Powered by Payment Checker Bot</strong></p>
        `;

    return html;

}
