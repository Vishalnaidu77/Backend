import { body, validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        error: errors.array()
    })
}

export const registerValidation = [
    body("username").isString().withMessage('Username should be a valid string.'),
    body("email").isEmail().withMessage("Email should be a valid email."),
    body("password").isLength({ min: 8 }).withMessage("Password length should be greater than 8 characters."),
    validate
]