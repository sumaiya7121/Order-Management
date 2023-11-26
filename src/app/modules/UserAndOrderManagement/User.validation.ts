import Joi from 'joi'

const fullNameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
})

const addressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  country: Joi.string(),
})

const orderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
})

const userAndOrderValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: fullNameSchema.required(),
  age: Joi.number(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().default(true),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchema,
  orders: Joi.array().items(orderSchema),
})

export default userAndOrderValidationSchema
