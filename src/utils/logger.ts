/**
 * Print error message to log
 *
 * @param {string} message Custom message
 * @param {Error} err Error
 */
export const logError = (message: string, err: Error | undefined) => {
    console.error(`${new Date().toLocaleString()} - ERROR: ${message}`);
    if (err) console.error(err);
};

/**
 * Print info message to log
 *
 * @param {string} message Custom message
 */
export const logInfo = (message: string) => {
    console.log(`${new Date().toLocaleString()} - INFO: ${message}`);
};
