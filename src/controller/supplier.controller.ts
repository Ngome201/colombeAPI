import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { AccessorySupplier, BookSupplier, ExerciseBookSupplier } from '../models'

const exerciseBookSupplierRepo = AppDataSource.getRepository(ExerciseBookSupplier)
const bookSupplierRepo = AppDataSource.getRepository(BookSupplier)
const accessorySupplierRepo = AppDataSource.getRepository(AccessorySupplier)

export const saveExerciseBookSupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const exerciseBookSupplier :Partial <ExerciseBookSupplier> = new ExerciseBookSupplier(name,tel,address,description)
    await exerciseBookSupplierRepo.save(exerciseBookSupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}

export const saveBookSupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const bookSupplier :Partial <BookSupplier> = new BookSupplier(name,tel,address,description)
    await bookSupplierRepo.save(bookSupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}

export const saveAccessorySupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const accessorySupplier : Partial <AccessorySupplier> = new AccessorySupplier(name,tel,address,description)
    await accessorySupplierRepo.save(accessorySupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}
/********************************/
export const listExerciseBookSupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const exerciseBookSupplier :Partial <ExerciseBookSupplier> = new ExerciseBookSupplier(name,tel,address,description)
    await exerciseBookSupplierRepo.save(exerciseBookSupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}

export const listBookSupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const bookSupplier :Partial <BookSupplier> = new BookSupplier(name,tel,address,description)
    await bookSupplierRepo.save(bookSupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}

export const listAccessorySupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const accessorySupplier : Partial <AccessorySupplier> = new AccessorySupplier(name,tel,address,description)
    await accessorySupplierRepo.save(accessorySupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}
/*******************************/

export const editExerciseBookSupplier = async (req:Request, res : Response) => {
    const {id} = req.params
    try {
        const exerciseBookSupplier = await exerciseBookSupplierRepo.findOneOrFail({where : {id}})
        res.status(200).send(exerciseBookSupplier);
    } catch (error) {
        res.status(400).send('invalid id, supplier not found')
    }
    
}

export const editBookSupplier = async (req:Request, res : Response) => {
    const {id} = req.params
    try {
        const bookSupplier = await bookSupplierRepo.findOneOrFail({where : {id}})
        res.status(200).send(bookSupplier);
    } catch (error) {
        res.status(400).send('invalid id, supplier not found')
    }
    
}

export const editAccessorySupplier = async (req:Request, res : Response) => {
    const {id} = req.params
    try {
        const accessorySupplier = await accessorySupplierRepo.findOneOrFail({where : {id}})
        res.status(200).send(accessorySupplier);
    } catch (error) {
        res.status(400).send('invalid id, supplier not found')
    }
    
}
/*******************************/
export const updateExerciseBookSupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const exerciseBookSupplier :Partial <ExerciseBookSupplier> = new ExerciseBookSupplier(name,tel,address,description)
    await exerciseBookSupplierRepo.save(exerciseBookSupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}

export const updateBookSupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const bookSupplier :Partial <BookSupplier> = new BookSupplier(name,tel,address,description)
    await bookSupplierRepo.save(bookSupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}

export const updateAccessorySupplier = async (req:Request, res : Response) => {
    
    const {name,address,tel,description} = req.body;
    const accessorySupplier : Partial <AccessorySupplier> = new AccessorySupplier(name,tel,address,description)
    await accessorySupplierRepo.save(accessorySupplier);
    res.status(201).json({message : "supplier save successfully"}) 
    
}