import Joi from "joi";

const user = {
  name: Joi.string().min(1).max(255).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 1 character long.",
    "string.max": "Name must not exceed 255 characters.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(255).required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must not exceed 255 characters.",
    "any.required": "Password is required.",
  }),
};

export const createUserSchema = Joi.object(user);

const nameFieldSchema = Joi.string().min(1).max(255).messages({
  "string.base": "Name must be a string.",
  "string.empty": "Name cannot be empty.",
  "string.min": "Name must be at least 1 character long.",
  "string.max": "Name must not exceed 255 characters.",
  "any.required": "Name is required.",
});
export const createSupplierSchema = Joi.object({
  name: nameFieldSchema.required()
});
export const updateSupplierSchema = Joi.object({
  name: nameFieldSchema.optional()
});