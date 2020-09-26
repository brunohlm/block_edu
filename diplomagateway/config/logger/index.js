const log4js = require('log4js');
const log4js_extend = require('log4js-extend');
const LOG_LEVEL = require('./log-level');

/**
 * @type {Object} - Logger object
 */
let Logger;

/**
 * Configure the log4js
 * @param {string} level - Log Level
 * @param {string} name - Microservice name
 * @param {string} appRoot - App path
 */
const config = (level='debug', name='service', appRoot=__dirname) => {
    log4js_extend(log4js, {
        path: appRoot,
        format: "at @name (@file:@line:@column)"
    });
    let logger = log4js.getLogger(name);
    logger.level = level;
    Logger = logger;
}

/**
 * Write the log
 * @param {string} logLevel - Log level
 * @param {Array} messages - Array of string messages
 */
const log = (logLevel, ...messages) => {
    const message = messages.map(m => JSON.stringify(m)).join(' ');
    switch(logLevel) {
        case LOG_LEVEL.TRACE:
            Logger.trace(message);
            break;
        case LOG_LEVEL.DEBUG:
            Logger.debug(message);
            break;
        case LOG_LEVEL.INFO:
            Logger.info(message);
            break;
        case LOG_LEVEL.WARN:
            Logger.warn(message);
            break;
        case LOG_LEVEL.FATAL:
            Logger.fatal(message);
            break;
        case LOG_LEVEL.ERROR:
        default:
            Logger.error(message);
    }
}

/**
 * Write log in TRACE level
 * @param {Array} messages - Array of string messages
 */
const trace = (...messages) => {
    log(LOG_LEVEL.TRACE, ...messages);
}

/**
 * Write log in DEBUG level
 * @param {Array} messages - Array of string messages
 */
const debug = (...messages) => {
    log(LOG_LEVEL.DEBUG, ...messages);
}

/**
 * Write log in INFO level
 * @param {Array} messages - Array of string messages
 */
const info = (...messages) => {
    log(LOG_LEVEL.INFO, ...messages);
}

/**
 * Write log in WARN level
 * @param {Array} messages - Array of string messages
 */
const warn = (...messages) => {
    log(LOG_LEVEL.WARN, ...messages);
}

/**
 * Write log in ERROR level
 * @param {Array} messages - Array of string messages
 */
const error = (...messages) => {
    log(LOG_LEVEL.ERROR, ...messages);
}

/**
 * Write log in FATAL level
 * @param {Array} messages - Array of string messages
 */
const fatal = (...messages) => {
    log(LOG_LEVEL.FATAL, ...messages);
}

module.exports = {
    config,
    log,
    trace,
    debug,
    info,
    warn,
    error,
    fatal,
    LOG_LEVEL
}
