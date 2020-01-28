const Validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors["name"] = "name长度不规范";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
