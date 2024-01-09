const joi = require('joi');

const schemaLink = joi.object({
    titulo: joi.string().required().messages({
        'any.required': 'O campo titulo é obrigatório',
        'string.empty': 'O campo titulo é obrigatório',
    }),
    url: joi.string().uri().required().messages({
        'string.uri': 'O campo url precisa ser uma URL válida',
        'any.required': 'O campo url é obrigatório',
        'string.empty': 'O campo url é obrigatório',
    }),
});

module.exports = schemaLink;
