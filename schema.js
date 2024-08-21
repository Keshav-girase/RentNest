const Joi = require("joi");
const review = require("./models/review");


module.exports.listingSchema = Joi.object({
    listing : Joi.object({

        title: Joi.string().required().messages({
            'string.empty': 'Please enter a valid title. It should not be empty.',
        }),
        description: Joi.string().required().messages({
            'string.empty': 'Please provide a description. This field cannot be empty.',
        }),
        image: Joi.object({
            filename: Joi.string().required().messages({
                'string.empty': 'Filename cannot be empty. Please enter a valid filename.',
            }),
            url: Joi.string().uri().allow('', null).optional().messages({
                'string.uri': 'Please enter a valid image URL if you have one.',
            })
        }),
        price: Joi.number().positive().required().min(0).messages({
            'number.positive': 'Please enter a valid price. It should be a positive number.',
            'number.base': 'Please enter a valid price. It should be a number.',
        }),
        country: Joi.string().required().messages({
            'string.empty': 'Please enter a valid country name.',
        }),
        location: Joi.string().required().messages({
            'string.empty': 'Please provide a location. This field cannot be empty.',
        }),

    }).required()
    
});

// module.exports = listingSchema;


// Define Joi validation schema for the review
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().integer().min(1).max(5).required(),
        createdAt: Joi.date().default(Date.now),
    }).required()
});
