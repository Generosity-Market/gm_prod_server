/* eslint-disable no-console */
const chalk = require('chalk');
const pkg = require('../package.json');

const color = {
    log: 'dodgerblue',
    debug: 'thistle',
    success: 'lawngreen',
    warning: 'goldenrod',
    error: 'tomato',
};

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const getDetails = (type, message, variable) => ({
    type,
    prefix: `[ ${pkg.name} ${type ? `- ${capitalize(type)}` : ''} ]`,
    message,
    suffix: variable,
});

const logger = ({
    type,
    message,
    prefix,
    suffix,
}) => {
    const timestamp = ` - [ ${new Date().toUTCString()} ]`;
    const header = prefix ? chalk.keyword([color[type]])(`${prefix + timestamp}`) : '';
    const content = message ? chalk.white(`${message}`) : '';
    const ending = suffix ? chalk.keyword([color[type]])(suffix) : '';

    return console.log(header, content, ending);
};

const log = (message, variable) => logger(getDetails('log', message, variable));
const debug = (message, variable) => logger(getDetails('debug', message, variable));
const success = (message, variable) => logger(getDetails('success', message, variable));
const warning = (message, variable) => logger(getDetails('warning', message, variable));
const error = (message, variable) => logger(getDetails('error', message, variable));

module.exports = {
    log,
    debug,
    success,
    warning,
    error,
};
