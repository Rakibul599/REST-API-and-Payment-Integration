const { check, validationResult } = require("express-validator");
const User = require("../model/User");

const productValidators = [
  check("name").isLength({ min: 1 }).withMessage("Name is required").trim(),
  check("description")
    .isLength({ min: 1 })
    .withMessage("Product description is required")
    .trim(),
  check("price").isNumeric().withMessage("Price must be an Numeric").trim(),
  check("currency")
    .isLength({ min: 1 })
    .withMessage("Currency is required")
    .trim(),
    check("stock").isInt().withMessage("Price must be an Integer").trim(),

];

const productValidationHandler = function (req, res, next) {
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

module.exports = { productValidators, productValidationHandler };
