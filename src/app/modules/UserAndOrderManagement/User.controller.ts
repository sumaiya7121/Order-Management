import { Request, Response } from 'express'
import { UserServices } from './User.servic'
import userAndOrderValidationSchema from './User.validation'

//Create a new user

const createUsersAndOrdes = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const { error } = userAndOrderValidationSchema.validate(user)

    if (error) {
      res.status(500).json({
        sucess: false,
        message: 'something went wrong',
        error: error.details,
      })
    }

    const result = await UserServices.createUserAndOrderIntoDB(user)

    res.status(200).json({
      sucess: true,
      message: 'User created sucessfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

//Retrieve a list of all users

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()

    res.status(200).json({
      success: true,

      message: 'Users fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// Retrieve a specific user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getSingleUserFromDB(userId)

    res.status(200).json({
      sucess: true,
      message: 'User retrieved sucessfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

//Update user information
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const userData = req.body

    const result = await UserServices.updateUserFromDb(userId, userData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

//Delete a user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUserFromDB(userId)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}
//Add New Product in Order
const addOrdersIntoDB = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const order = req.body
    const joiOrdersValidation = userAndOrderValidationSchema.validate(order)
    const validatedOrder = joiOrdersValidation.value
    const result = await UserServices.addNewProductInOrder(
      userId,
      validatedOrder,
    )
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        err: err.error,
      },
    })
  }
}

// get all order from a specific user
const getAllOrderSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.getAllOrderSingleUserFromDb(userId)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// Calculate Total Price of Orders for a Specific User
const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const totalPrice =
      await UserServices.calculateTotalPriceSpecificUser(userId)
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

export const userControllers = {
  createUsersAndOrdes,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addOrdersIntoDB,
  calculateTotalPrice,
  getAllOrderSingleUser,
}
