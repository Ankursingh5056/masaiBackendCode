
const fs = require("fs");

const validateRequestBody = (req, res, next) => {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;
    let isValid = true;
    let responseText = '';

    // Check ID
    if (typeof ID === 'number') {
        responseText += 'ID is a number\n';
    } else {
        isValid = false;
        responseText += 'bad request.some data is incorrect.\n';
    }

    // Check Name
    if (typeof Name === 'string' && !/\d/.test(Name)) {
        responseText += 'Name is a string\n';
    } else {
        isValid = false;
        responseText += 'bad request.some data is incorrect.\n';
    }

    // Check Description
    if (typeof Description === 'string') {
        responseText += 'Description is a string\n';
    } else {
        isValid = false;
        responseText += 'bad request.some data is incorrect.\n';
    }

    // Check Rating
    if (typeof Rating === 'number') {
        responseText += 'Rating is a number\n';
    } else {
        isValid = false;
        responseText += 'bad request.some data is incorrect.\n';
    }

    // Check Genre
    if (typeof Genre === 'string') {
        responseText += 'Genre is a string\n';
    } else {
        isValid = false;
        responseText += 'bad request.some data is incorrect.\n';
    }

    // Check Cast
    if (Array.isArray(Cast) && Cast.every(item => typeof item === 'string')) {
        responseText += 'Cast is a array of string\n';
    } else {
        isValid = false;
        responseText += 'bad request.some data is incorrect.\n';
    }

    if (isValid) {
        res.status(200).send('data received\n' + responseText);
    } else {
        res.status(400).send('invalid request body\n' + responseText);
    }
};

module.exports = validateRequestBody