const fs = require('fs');

exports.generateName = () => {

    const name = Math.random().toString(36).substring(2, 15);

    return name + '.png';

}

exports.remove = (fileName) => {

    fs.unlink(fileName, (error) => {

        if (error) {
            throw error;
        }

        return true;

    });

}
