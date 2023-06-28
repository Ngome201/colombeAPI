import { Response,Request,NextFunction } from "express"
import { AppDataSource } from '../app'
import { User } from '../models'

const userRepo = AppDataSource.getRepository(User)

export const getAllUsers = async function(){
    return await userRepo.find();
}