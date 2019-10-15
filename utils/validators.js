const Joi = require('@hapi/joi');
const uriValidator = async uri => {
    const uriSchema = Joi.string().uri();
    try {
        const a = await uriSchema.validateAsync(uri);
        return [null, true]
    } catch (error) {   
        throw error;
    }
};

module.exports = {
    uriValidator
}