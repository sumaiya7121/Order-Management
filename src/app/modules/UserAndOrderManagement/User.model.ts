import { Schema, model } from 'mongoose'
import {
  TAddress,
  TFullName,
  TOrders,
  TUserAndOrder,
  UserModel,
} from './User.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
})

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})

const userAndOrderSchema = new Schema<TUserAndOrder, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'user id is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'user name is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, 'age id is required'],
  },
  email: {
    type: String,
    required: [true, 'email id is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [{ type: String, required: [true, 'hobbies is required'] }],
  },
  address: addressSchema,
  orders: [orderSchema],
})

// pre middleware to hashing password
userAndOrderSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_round),
  )
  next()
})

userAndOrderSchema.statics.isUserExists = async function (
  userId: number | string,
) {
  const existingUser = await UserOrderModel.findOne({ userId })
  return existingUser
}

// delete password field when response
userAndOrderSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}
// post save hook
userAndOrderSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

export const UserOrderModel = model<TUserAndOrder, UserModel>(
  'User',
  userAndOrderSchema,
)
