
class CustomApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createCostomError = (message, statusCode) =>{

    return new CustomApiError(message,statusCode);
}

module.exports = {createCostomError, CustomApiError};
    