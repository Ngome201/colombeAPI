import { Response,Request,NextFunction } from "express"
import { AppDataSource } from '../app'
import { User } from '../models'
import * as bcrypt from "bcryptjs";

const userRepo = AppDataSource.getRepository(User)
const jwt = require('jsonwebtoken')
const session = require('express-session')

export const saveUser = async (req:Request,res : Response) => {
    res.header('Access-Control-Allow-Origin','*');
    const {username, lastname, tel,  matricule, role,address,cni} = req.body
    const user: Partial <User>= new User(username,lastname,tel,address,matricule,role,cni)
    // const user: Partial <User>= new User(username,lastname,tel,password,address,matricule,role)
    // user.hashPassword();
    await userRepo.save(user)
    res.status(201).json({message : 'user registered'})
}

export const signIn = async (req:Request,res : Response, next : NextFunction) => {
    res.header('Access-Control-Allow-Origin','*');
    const {matricule, cni} = req.body
    // const {matricule, password} = req.body
    try {
        
        const user= await userRepo.findOneOrFail({where :{matricule,cni}});
        
        // const isEqual =  user.checkIfUnencryptedPasswordIsValid(password)
        // if(!isEqual){
        //     const error  = new Error('wrong password')
        //     throw error;

            
        // }
        const token = jwt.sign(
            {
                matricule : user.matricule,
                userId : user.id
            },
            'secretfortoken',
            {expiresIn : '1h'}
        )
        res.status(200).json({
            token : token,
            role : user.role, 
            matricule : user.matricule,
            cni : user.cni,
            username : user.username
        })
    } catch (error) {
        if(!error.satusCode){
            error.satusCode = 500;
        }
        next(error)
    }
}

export const getUsers = async (req:Request,res : Response) => {
    const users = await userRepo.find()
    res.send(users)
}

export const getCamrails = async (req:Request,res : Response) => {
    const users = await userRepo.find({where : {role : "camrail"}})
    res.send(users)
}

export const deleteUser =  async (req:Request,res : Response) => {
    const{id} = req.params
    try {
        await userRepo.findOneOrFail({where:{id}})
        await userRepo.delete(id).then(res.status(200).send('user deleted'))
    
    } catch (error) {
        res.status(400).send("invalid id, user not found")
    }
}

export const updateUser = async (req:Request,res : Response) => {
    const { id,username, lastname, tel, matricule,password,address,role} = req.body
    try {
        const user = await userRepo.findOneOrFail({where:{id}})
        user.username = username
        user.lastname = lastname
        user.tel = tel
        user.address = address
        user.matricule = matricule
        user.role = role
        userRepo.save(user)
        res.status(200).json({message : 'user updated'})

    } catch (error) {
        res.status(404).send("invalid id, user not found")
    }
}
export const editUser =  async (req:Request,res : Response) => {
    const{id} = req.params
    try {
        const user = await userRepo.findOneOrFail({where:{id}})
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send("invalid id, user not found")
    }
}