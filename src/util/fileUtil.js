const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

exports.generateName = () => {

    const name = Math.random().toString(36).substring(2, 15);

    return name + '.png';

}

exports.getFilePath = (fileName) => {
    console.log('appDir', appDir)
    return appDir + path.sep + fileName;
}

exports.remove = (fileName) => {

    fs.unlink(fileName, (error) => {

        if (error) {
            throw error;
        }

        return true;

    });

}
