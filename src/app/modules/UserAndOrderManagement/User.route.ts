import express from 'express'
import { userControllers } from './User.controller'

const router = express.Router()
//create an user
router.post('/users', userControllers.createUsersAndOrdes)
//get all users from database
router.get('/users', userControllers.getAllUsers)
//get single user from database
router.get('/users/:userId', userControllers.getSingleUser)
// update single user
router.put('/users/:userId', userControllers.updateSingleUser)
// delete single user
router.delete('/users/:userId', userControllers.deleteSingleUser)
// get all order from a specific user
router.put('/users/:userId/orders', userControllers.addOrdersIntoDB)
// get all order from a specific user
router.get('/users/:userId/orders', userControllers.getAllOrderSingleUser)
// Calculate Total Price of Orders for a Specific User
router.get(
  '/users/:userId/orders/total-price',
  userControllers.calculateTotalPrice,
)

export const userRoutes = router
