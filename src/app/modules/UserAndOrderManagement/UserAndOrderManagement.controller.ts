import { Request, Response } from "express";
import { UserServices } from "./UserAndOrderManagement.servic";

const createUsersAndOrdes = async(req:Request,res:Response) =>{
    try{

        const user= req.body;

        const result =await UserServices.createUserAndOrderIntoDB(user);
        
        
            //send response
        
            res.status(200).json({
                sucess:true,
                message:'User created sucessfully',
                data:result
            })

    }catch(err){
        console.log(err)
    }


}

export const userControllers ={
    createUsersAndOrdes
}