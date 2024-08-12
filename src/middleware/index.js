const { validationResult } = require("express-validator")
const validationErrorHandler = async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next()
    } else
        return res.send({ errors: result.array() });
}
const checkEmailOrUsername = (req, res, next) => {
    const errors = validationResult(req);

    // Check if validation results have errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Ensure that either email or username is provided
    if (!req.body.email && !req.body.username) {
        return res.status(400).json({ errors: [{ msg: 'Either email or username must be provided' }] });
    }

    // Proceed if no errors
    next();
};
module.exports = { validationErrorHandler, checkEmailOrUsername }