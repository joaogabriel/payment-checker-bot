const mailData = readPageValues();

exports.sendPaymentData = (paymentData) => {
    
}

exports.sendError = (error) => {

}

function readPageValues() {

    return {
        to: process.env.EMAIL
        // token do sendgrid
    }

}
