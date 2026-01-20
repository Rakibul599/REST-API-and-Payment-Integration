const { check, validationResult } = require("express-validator");
const User = require("../model/User");

const loginValidators = [

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const loginValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    console.log(mappedErrors);
    res.status(200).json({
      errors: mappedErrors,
    });
  }
};

module.exports = { loginValidators, loginValidationHandler };
