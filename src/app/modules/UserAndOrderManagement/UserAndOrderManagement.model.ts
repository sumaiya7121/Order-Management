import { Schema, model } from "mongoose";
import { Address, FullName, Orders, UserAndOrder } from "./UserAndOrderManagement.interface";
const fullNameSchema =new Schema<FullName>({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  });

  const addressSchema =new Schema<Address>(
    {
        street: {
          type: String
        },
        city: {
          type: String
        },
        country: {
          type: String
        }
      }
  )

  const orderSchema = new Schema<Orders>({
    productName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  })

const userAndOrderSchema = new Schema<UserAndOrder>({
    userId: {
        type: Number,
        unique: true,
        required: true
      },
      username: {
        type: String,
        unique: true,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      fullName: fullNameSchema,
      age: {
        type: Number
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      isActive: {
        type: Boolean,
        default: true
      },
      hobbies: {
        type: [String]
      },
      address: addressSchema,
      orders: [orderSchema]
    });

    export const UserOrderModel = model<UserAndOrder>('UserOrder', userAndOrderSchema);