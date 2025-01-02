export const logger = {
    log: (message, data = {}) => {
        console.log(`[LOG] ${message}`, data);
    },
    error: (message, error = {}) => {
        console.error(`[ERROR] ${message}`, {
            message: error.message,
            stack: error.stack,
            ...error
        });
    },
    info: (message, data = {}) => {
        console.info(`[INFO] ${message}`, data);
    }
};