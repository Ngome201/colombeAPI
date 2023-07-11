import { Response,Request,NextFunction } from "express"
import { AppDataSource } from '../app'
import { User } from '../models'
import * as bcrypt from "bcryptjs";

const userRepo = AppDataSource.getRepository(User)
const jwt = require('jsonwebtoken')

export const saveUser = async (req:Request,res : Response) => {
    const {username, lastname, tel,  matricule, role, locationAddress, cni, shippingAddress} = req.body
    try {
        
        let userMatricule = await userRepo.findOne({where : {matricule : matricule}});
        let userCni = await userRepo.findOne({where : {cni : cni}});
        if (userCni!=null && userMatricule!=null) {
        res.status(400).json({msg : 'user already exists'})
            
        }
        
        const user: Partial <User>= new User(username,lastname,tel,locationAddress,shippingAddress,matricule,role,cni)

        await userRepo.save(user)
        
        res.status(201).json({msg : 'user registered'})
    } catch (error) {
        
    }
}

export const signIn = async (req:Request,res : Response, next : NextFunction) => {
    res.header('Access-Control-Allow-Origin','*');
    const {matricule, cni} = req.body
    try {
        
        const user= await userRepo.findOneOrFail({where :{matricule,cni}});
       
        const token = jwt.sign(
            {
                matricule : user.matricule,
                cni : user.cni
            },
            'secretfortoken',
            {expiresIn : '24h'}
        )
        res.status(200).json({
            token : token,
            role : user.role, 
            matricule : user.matricule,
            username : user.username,
            msg : "registered"
        })
    } catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        res.status(401).json({msg:"registration failed"})
        // next(error)
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
        await userRepo.delete(id).then(res.status(200).send({msg:'user deleted'}))
    
    } catch (error) {
        res.status(400).send({msg:"invalid id, user not found"})
    }
}

export const updateUser = async (req:Request,res : Response) => {
    const { id,username, lastname, tel, matricule,cni,locationAddress, shippingAddress,role} = req.body
    try {
        const user = await userRepo.findOneOrFail({where:{id}})
        user.username = username
        user.lastname = lastname
        user.tel = tel
        user.locationAddress = locationAddress
        user.shippingAddress = shippingAddress
        user.cni = cni
        user.matricule = matricule
        user.role = role
        userRepo.save(user)
        res.status(200).json({msg : 'user updated'})

    } catch (error) {
        res.status(404).send({msg :"invalid id, user not found"})
    }
}
export const editUser =  async (req:Request,res : Response) => {
    const{id} = req.params
    try {
        const user = await userRepo.findOneOrFail({where:{id}})
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({msg: "invalid id, user not found"})
    }
}