import Joi from "joi";

const user = {
  name: Joi.string().min(1).max(255).messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 1 character long.",
    "string.max": "Name must not exceed 255 characters.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(255).messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password must be at least 6 characters long.",
    "string.max": "Password must not exceed 255 characters.",
    "any.required": "Password is required.",
  }),
};
export const createUserSchema = Joi.object({
  name: user.name.required(),
  email: user.email.required(),
  password: user.password.required()
});

export const updateUserSchema = Joi.object({
  name: user.name.optional(),
  email: user.email.optional(),
  password: user.password.optional()
});

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

export const createAssetGroupSchema = Joi.object({
  name: nameFieldSchema.required()
});
export const updateAssetGroupSchema = Joi.object({
  name: nameFieldSchema.optional()
});

const assetFields = {
  name: Joi.string().min(3).max(100).messages({
    'string.empty': 'Asset name is required',
    'string.min': 'Asset name should be at least 3 characters long',
  }),
  frequency: Joi.number().integer().min(1).messages({
    'number.base': 'Frequency must be a number (days)',
  }),
  lastService: Joi.date().iso(),
  nextService: Joi.date().iso().min(Joi.ref('lastService')).messages({
    'date.min': 'Next service must be after the last service date',
  }),
  isRetired: Joi.boolean().default(false),
  retiredOn: Joi.date().iso().when('isRetired', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional().allow(null),
  }),
  responsibleUserId: Joi.string().messages({ 'any.required': 'A responsible user must be assigned' }),
  supplierId: Joi.string(),
  assetGroupId: Joi.string(),
};

export const createAssetSchema = Joi.object({
  //...assetFields,
  name: assetFields.name.required(),
  frequency: assetFields.frequency.required(),
  lastService: assetFields.lastService.required(),
  nextService: assetFields.nextService.required(),
  responsibleUserId: assetFields.responsibleUserId.required(),
  supplierId: assetFields.supplierId.required(),
  assetGroupId: assetFields.assetGroupId.required(),
});

export const updateAssetSchema = Joi.object(assetFields).min(1);