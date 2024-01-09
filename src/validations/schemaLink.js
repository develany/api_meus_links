const joi = require('joi');

const schemaLink = joi.object({
    link: joi.string().uri().required().messages({
        'string.uri': 'O campo link precisa ser uma URL válida',
        'any.required': 'O campo link é obrigatório',
        'string.empty': 'O campo link é obrigatório',
    }),
});

module.exports = schemaLink;
