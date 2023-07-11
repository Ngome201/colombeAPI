import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Supplier } from '../models'

const supplierRepo = AppDataSource.getRepository(Supplier)


export const saveSupplier = async (req:Request, res : Response) => {
    
    try {
        const {name,address,tel,description,category} = req.body;
        const supplier :Partial <Supplier>=new Supplier(name,tel,address,category,description)
    
        await supplierRepo.save(supplier);
        res.status(201).json({msg : "supplier save successfully"}) 
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : "cannot save current supplier "}) 
    }
}

/********************************/
export const suppliersList = async (req:Request, res : Response) => {
    try {
        const list = await supplierRepo.find();
        res.status(200).json(list) 
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : "cannot retrieve list "}) 
    }
    
}

/*******************************/

export const editSupplier = async (req:Request, res : Response) => {
    const {id} = req.params
    try {
        const supplier = await supplierRepo.findOneOrFail({where : {id}})
        res.status(200).send(supplier);
    } catch (error) {
        console.log(error)
        res.status(500).send('invalid id, supplier not found')
    }
    
}

export const updateSupplier = async (req:Request, res : Response) => {
    
    const {id, name,address,tel,description, category} = req.body;
    try {
        let supplier = await supplierRepo.findOneOrFail({where : {id}})
        supplier.name = name
        supplier.address = address
        supplier.tel = tel
        supplier.description = description
        supplier.category = category
        await supplierRepo.save(supplier)
        res.statuts(200).send({msg : "updated successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).send('invalid id, supplier not found')
        
    }
}
export const deleteSupplier = async (req:Request, res : Response) => {
    const {id} = req.params
    try {
        await supplierRepo.delete(id)
        res.status(200).send({msg : "deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send('invalid id, supplier not found')
        
    }
}