import express from "express";
import { userControllers } from "./UserAndOrderManagement.controller";

const router = express.Router();

router.post('/users', userControllers.createUsersAndOrdes);



export const userRoutes = router