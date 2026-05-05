import { body, validationResult } from "express-validator"

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })
}

export const registerValidation = [
    body("username").isString().withMessage("Username should be a String"),
    body("email").isEmail().withMessage("Email address not valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters minimum"),
    validate
]