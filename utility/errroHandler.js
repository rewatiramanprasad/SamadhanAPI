const response = require('./response.js');

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }

}

const error = (err, req, res, next) => {
    let result = {}
    if (err instanceof ValidationError) {
        result = response.response([], false, "raman" + err.message)
    }
    else if (err instanceof Error) {
        result = response.response([], false, err.message)

    }
    res.status(400).send(result).end()
}





module.exports = { error, ValidationError }