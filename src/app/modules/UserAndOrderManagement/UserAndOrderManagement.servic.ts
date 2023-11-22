import { UserAndOrder } from "./UserAndOrderManagement.interface";
import { UserOrderModel } from "./UserAndOrderManagement.model";



const createUserAndOrderIntoDB = async(userandorder: UserAndOrder) =>{
const result= await UserOrderModel.create(userandorder);
return result;
}

export const UserServices ={
    createUserAndOrderIntoDB
}