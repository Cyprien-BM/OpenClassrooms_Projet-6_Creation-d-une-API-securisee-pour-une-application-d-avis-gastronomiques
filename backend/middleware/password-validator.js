const passwordSchema = require('../models/passwords');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({error : 'Password must have : 8 from 64 charaters, at least 1 uppercase and 1 lowercase, at least 2 digits, at least 1 special character'});
    } else {
        next();
    }
};