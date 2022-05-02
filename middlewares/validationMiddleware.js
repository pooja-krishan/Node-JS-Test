const Joi = require("joi");

const product_schema = (data) => {
    let validation = Joi.object(
        { title: Joi.string() .min(3) .required(),
        price: Joi.number() .min(2) .required(),
        description: Joi.string() .min(6),
        published: Joi.boolean()  });
    return validation.validate(data);
}

const user_schema = (data) => {
    let validation = Joi.object(
        { first_name: Joi.string() .min(3) .required(),
        last_name: Joi.string() .min(3) .required(),
        email: Joi.string() .email()    });
    return validation.validate(data);
}

const user_schema_email = (data) => {
    let validation = Joi.object(
        { email: Joi.string() .email() });
    return validation.validate(data);
}

module.exports = {
    product_schema,
    user_schema,
    user_schema_email
};