
exports.generateName = () => {

    const name = Math.random().toString(36).substring(2, 15);

    return name + '.png';

}

exports.remove = (fileName) => {

}
