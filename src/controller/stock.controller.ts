import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { AccessoryStock, BookStock, ExerciseBookStock,Accessory,ExerciseBook,Book, ExerciseBookSupplier, BookSupplier, AccessorySupplier } from '../models'

const exerciseBookStockRepo = AppDataSource.getRepository(ExerciseBookStock)
const exerciseBookRepo = AppDataSource.getRepository(ExerciseBook)
const exerciseBookSupplierRepo = AppDataSource.getRepository(ExerciseBookSupplier)


const bookStockRepo = AppDataSource.getRepository(BookStock)
const bookRepo = AppDataSource.getRepository(Book)
const bookSupplierRepo = AppDataSource.getRepository(BookSupplier)

const accessoryStockRepo = AppDataSource.getRepository(AccessoryStock)
const accessoryRepo = AppDataSource.getRepository(Accessory)
const accessorySupplierRepo = AppDataSource.getRepository(AccessorySupplier)


export const saveStockExerciseBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    const exerciseBook = await exerciseBookRepo.findOneOrFail({where:{id}})
    const {designation, quantity, price,supplier} = req.body
    const exerciseBookSupplier = await exerciseBookSupplierRepo.findOneOrFail({where:supplier})

    const qty = quantity + exerciseBook.quantity;

    try {
        const exerciseBookStock : Partial <ExerciseBookStock> = 
                new ExerciseBookStock(designation,qty,price );
        exerciseBookStock.exerciseBook = exerciseBook;
        exerciseBookStock.supplier = exerciseBookSupplier;
        await exerciseBookStockRepo.save(exerciseBookStock)
        res.status(201).json({"msg":'exercise Book stock saved successfully'})
    }catch(e){
        throw e;
    }
}

export const saveStockBook = async (req:Request, res : Response) => {
    const {id} = req.params; 
    let supplierId : any;

    const {designation, quantity, price,supplier} = req.body
    const bookSupplier = await bookSupplierRepo.findOneOrFail({where:{name:supplier}})
    /************* je me suis arreté à l'enregistrement du stock des livres c'est OK */
    try {
        
        const bookStock : Partial <BookStock> = new BookStock(designation,parseInt(quantity),price);
        bookStock.book = id;
        supplierId = bookSupplier.id
        bookStock.supplier = supplierId;

        await bookStockRepo.save(bookStock)
        res.status(201).json({"msg":'exercise Book saved successfully'})
    }catch(e){
        throw e;
    }
        
}
export const saveStockAccessory = async (req:Request, res : Response) => {
    const {id} = req.params;
    const accessory = await accessoryRepo.findOneOrFail({where:{id}})

    const {designation, quantity, price,supplier} = req.body
    const accessorySupplier = await accessorySupplierRepo.findOneOrFail({where:supplier})
    try {
        const qty = quantity + accessory.quantity;
        const accessoryStock : Partial <AccessoryStock> = new AccessoryStock(designation,qty,price);
        accessoryStock.accessory = accessory;
        accessoryStock.supplier = accessorySupplier;
        await accessoryStockRepo.save(accessoryStock)
        res.status(201).json({"msg":'accessory saved successfully'})
    }catch(e){
        throw e;
    }
        
}