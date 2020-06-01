
exports.get = () => {

    return {
        contractNumber: process.env.CONTRACT_NUMBER,
        personId: process.env.PERSON_ID,
        questions: JSON.parse(process.env.QUESTIONS),
        recipientMail: process.env.RECIPIENT_EMAIL,
        environment: process.env.NODE_ENV,
        mailgun: {
            apiKey: process.env.MAILGUN_API_KEY,
            domainName: process.env.MAILGUN_DOMAIN_NAME
        }
    }

}

exports.isDev = () => {

    const environment = this.get().environment;

    return environment && environment === 'development';

}

exports.isProduction = () => {

    const environment = this.get().environment;

    return environment && environment === 'production';

}