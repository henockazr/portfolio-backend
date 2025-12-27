import {body, validationResult} from "express-validator";

export const validateRegister = [
    body("name").notEmpty().withMessage("Please Enter Your Name"),
    body("email").isEmail().withMessage("Please Enter Valid Email"),
    body("password").isLength({min: 8}).withMessage("Password Length Must be 8 Character or More"),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({message: "Invalid Data", error: error.array()})
        }
        next()
    }
]

export const validateLogin = [
    body("email").isEmail().withMessage("Please Enter Valid Email"),
    body("password").isLength({min: 8}).withMessage("Password Length Must be 8 Character or More"),
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({message: "Invalid Data", error: error.array()})
        }
        next()
    }
]