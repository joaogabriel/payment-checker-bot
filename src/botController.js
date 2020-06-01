const paymentChecker = require('./paymentChecker');
const environmentUtil = require('./util/environmentUtil');
const environment = environmentUtil.get();

exports.check = (request, response) => {

    const accessToken = request.params.accessToken;

    if (!accessToken || accessToken !== environment.accessToken) {

        response.sendStatus(401);

        return;

    }

    paymentChecker.check();

    response.sendStatus(200);

}

exports.health = (request, response) => {

    const message = 'here!';

    console.log(message);

    response.send(message);

}