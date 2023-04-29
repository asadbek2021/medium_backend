import joi from 'joi';

export const USER_SCHEMA = joi.object({
    email: joi.string()
        .email()
        .min(12).max(28)
        .required(),
    password: joi.string()
            .min(6)
            .max(14)
            .required(),
});

export const POST_SCHEMA = joi.object({
    title: joi.string()
        .length(20).max(34)
        .required(),
    content: joi.string().min(40).max(400).required(),
});