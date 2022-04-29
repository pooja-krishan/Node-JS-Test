const Joi = require("joi");

const schema = (data) => {
    let validation = Joi.object(
        { title: Joi.string() .min(6) .required(),
        price: Joi.number() .min(6) .required(),
        description: Joi.string() .min(6),
        published: Joi.boolean()  });
    return validation.validate(data);
} 

module.exports = {schema};