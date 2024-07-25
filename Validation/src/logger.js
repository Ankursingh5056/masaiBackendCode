const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const logFilePath = path.join(__dirname, 'access.log');

// Define a custom token for timestamp
morgan.token('timestamp', () => new Date().toUTCString());

// Create a custom format for logging
const customFormat = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length') || 0,
    tokens['response-time'](req, res) + ' ms',
    tokens.timestamp(req, res),
    `HTTP/${tokens['http-version'](req, res)}`,
    tokens.url(req, res)
  ].join(' ') + '\n';
};

// Create a write stream for appending logs to access.log
const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Setup the logger middleware
const logger = morgan(customFormat, { stream: accessLogStream });

module.exports = logger;