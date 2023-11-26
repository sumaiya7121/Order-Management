import { TUserAndOrder } from './User.interface'
import { UserOrderModel } from './User.model'

//create user
const createUserAndOrderIntoDB = async (userandorder: TUserAndOrder) => {
  const result = await UserOrderModel.create(userandorder)
  return result
}
//get all user
const getAllUserFromDB = async () => {
  const result = await UserOrderModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  })

  return result
}

//get single user
const getSingleUserFromDB = async (userId: number | string) => {
  const existUser = await UserOrderModel.isUserExists(userId)
  if (!existUser) {
    throw new Error('User not found')
  }

  const result = await UserOrderModel.findOne({ userId }).select({
    password: 0,
    _id: 0,
  })
  return result
}
//update user
const updateUserFromDb = async (userId: number | string, userData: object) => {
  const userExists = await UserOrderModel.isUserExists(userId)
  if (!userExists) {
    throw new Error('User not found')
  }
  const result = await UserOrderModel.findOneAndUpdate(
    { userId },
    { $set: userData, new: true, runValidators: true },
  ).select({ password: 0 })

  return result
}

//delete Single User

const deleteUserFromDB = async (userId: number | string) => {
  const userExists = await UserOrderModel.isUserExists(userId)
  if (!userExists) {
    throw new Error('User not found')
  }
  const result = await UserOrderModel.deleteOne({ userId })
  return result
}

//----------Bonus Section--------------

//Add New Product in Order

const addNewProductInOrder = async (
  userId: number | string,
  OrderData: {
    productName: string
    price: number
    quantity: number
  },
) => {
  const userExists = await UserOrderModel.isUserExists(userId)
  if (!userExists) {
    throw new Error('User not found')
  }

  const { productName, price, quantity } = OrderData

  const result = await UserOrderModel.findOneAndUpdate(
    { userId, orders: { $exists: true } },
    { $push: { orders: { productName, price, quantity } } },
    { upsert: true, new: true },
  )

  return result
}
//  get all order from a specif
const getAllOrderSingleUserFromDb = async (userId: number | string) => {
  const userExists = await UserOrderModel.isUserExists(userId)
  if (!userExists) {
    throw new Error('User not found')
  }
  const result = await UserOrderModel.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  })
  return result
}

// Calculate Total Price of Orders for a Specific User
const calculateTotalPriceSpecificUser = async (userId: number | string) => {
  const userExists = await UserOrderModel.isUserExists(userId)
  if (!userExists) {
    throw new Error('User not found')
  }
  const result = await UserOrderModel.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  })

  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price?: number; quantity: number }) => {
      return total + (order.price || 0) * (order.quantity || 0)
    },
    0,
  )
  return totalPrice
}

export const UserServices = {
  createUserAndOrderIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDb,
  deleteUserFromDB,
  addNewProductInOrder,
  calculateTotalPriceSpecificUser,
  getAllOrderSingleUserFromDb,
}
