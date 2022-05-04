const Joi = require("joi");
const { joiPassword } = require('joi-password');

const product_schema = (data) => {
    let validation = Joi.object(
        { title: Joi.string() .min(3) .required(),
        price: Joi.number() .min(2) .positive() .required(),
        description: Joi.string() .min(6),
        count : Joi.number() .positive() .required(),
        published: Joi.boolean()  });
    return validation.validate(data);
}

const user_schema = (data) => {
    let validation = Joi.object(
        { first_name: Joi.string() .min(3) .required(),
        last_name: Joi.string() .min(3) .required(),
        email: Joi.string() .email(),
        password : joiPassword.string().min(10)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),    });
    return validation.validate(data);
}

const user_schema_login = (data) => {
    let validation = Joi.object(
        { email: Joi.string() .email(),
          password : joiPassword.string().min(10)
          .minOfSpecialCharacters(1)
          .minOfLowercase(1)
          .minOfUppercase(1)
          .minOfNumeric(1)
          .noWhiteSpaces()
          .required(), });
    return validation.validate(data);
}

const cart_schema = (data) => {
    let validation = Joi.object(
        { count : Joi.number() .positive() .required(), });
    return validation.validate(data);
}

module.exports = {
    product_schema,
    user_schema,
    user_schema_login,
    cart_schema
};