/* eslint-disable no-console */
const chalk = require('chalk');

const styles = {
  log: chalk.bold,
  info: chalk.bold.blue,
  error: chalk.bold.red,
  warn: chalk.bold.yellow,
  success: chalk.bold.green,
};

module.exports = {
  log(message, ...args) {
    console.log(styles.log(` đĄ  ${message}`, ...args));
  },

  info(message, ...args) {
    console.log(styles.info(` âšī¸  ${message}`, ...args));
  },

  error(err, stack = false, ...args) {
    console.log(styles.error(` â  ${err}`, ...args));
    if (stack && err.stack)
      console.log(styles.error(` â ${err.stack}`, ...args));
  },

  warn(message, ...args) {
    console.log(styles.warn(` â ī¸  ${message}`, ...args));
  },

  success(message, ...args) {
    console.log(styles.success(` â  ${message}`, ...args));
  },
};
