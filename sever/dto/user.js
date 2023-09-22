import { check } from "express-validator";

export const UserDTO = [
    check("username")
        .notEmpty().withMessage("The username field is required")
        .isString().withMessage("The username must be a string"),

    check("password")
        .notEmpty().withMessage("The password field is required")
        .isString().withMessage("The password must be a string")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage("The password must have at least 8 characters with at least one letter and one number"),

    check("role")
        .notEmpty().withMessage("Please enter at least one role where [1] is admin and [2] is user")
        .isInt().withMessage("The role field must be an integer")
];
