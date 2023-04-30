import joi from 'joi';

export const USER_SCHEMA = joi.object({
  email: joi.string().email().min(12).max(28).required(),
  password: joi.string().min(6).max(14).required(),
});

export const POST_SCHEMA = joi.object({
  title: joi.string().max(100).min(10).required(),
  content: joi.string().min(1000).max(100000).required(),
});
