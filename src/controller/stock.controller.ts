import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import {Accessory,ExerciseBook,Book, Supplier } from '../models'
import { Stock } from '../models/Stock'

const stockRepo = AppDataSource.getRepository(Stock)
const exerciseBookRepo = AppDataSource.getRepository(ExerciseBook)
const bookRepo = AppDataSource.getRepository(Book)

const accessoryRepo = AppDataSource.getRepository(Accessory)
const supplierRepo = AppDataSource.getRepository(Supplier)


export const saveStockExerciseBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    const exerciseBook = await exerciseBookRepo.findOne({where:{id : id}})
    const {quantity,supplier, description} = req.body
    const foundSuppier = await supplierRepo.findOne({where:{name : supplier}})

    const qty = parseInt(quantity);

    try {
        const stock  : Partial <Stock> = new Stock(exerciseBook.toString(),qty,description,'EXERCISE_BOOK');
        stock.exerciseBook = exerciseBook;
        stock.supplier = foundSuppier;
        exerciseBook.quantity += qty ;
        await stockRepo.save(stock)
        await exerciseBookRepo.save(exerciseBook)
        res.status(201).json({msg:'exercise Book stock saved successfully'})
    }catch(e){
        console.log(e) ;
        res.status(500).send({msg : "stock cannot be saved"})
    }
}

export const saveStockBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    const book = await bookRepo.findOne({where:{id : id}})
    const {quantity,supplier,description} = req.body
    const foundSuppier = await supplierRepo.findOne({where:{name : supplier}})

    const qty = parseInt(quantity);

    try {
        const stock  : Partial <Stock> = new Stock(book.toString(),qty,description,"BOOK");
        stock.book = book;
        stock.supplier = foundSuppier;
        book.quantity += qty;
        await stockRepo.save(stock)
        await bookRepo.save(book)
        res.status(201).json({msg:'Book stock saved successfully'})
    }catch(e){
        console.log(e) ;
        res.status(500).send({msg : "stock cannot be saved"})
    }
        
}
export const saveStockAccessory = async (req:Request, res : Response) => {
    const {id} = req.params;
    const accessory = await accessoryRepo.findOne({where:{id : id}})
    const {quantity,supplier,description} = req.body
    const foundSuppier = await supplierRepo.findOne({where:{name : supplier}})

    const qty = parseInt(quantity);

    try {
        const stock  : Partial <Stock> = new Stock(accessory.toString(),qty,description,"ACCESSORY");
        stock.accessory = accessory;
        stock.supplier = foundSuppier;
        accessory.quantity += qty
        await stockRepo.save(stock)
        res.status(201).json({msg:'accessory stock saved successfully'})
    }catch(e){
        console.log(e) ;
        res.status(500).send({msg : "stock cannot be saved"})
    }     
}

export const listStockAccessory = async (req:Request, res : Response) => {
    const {id} = req.params;
    try {
        const stocks = await stockRepo.find({where : {accessoryId : id}})
        res.status(201).json(stocks) 
    } catch (e) {
        console.log(e) ;
        res.status(500).send({msg : "list cannot be fetched"})
    }
} 
export const globalListStockAccessory = async (req:Request, res : Response) => {
    try {
        const stocks = await stockRepo.find({where : {category : "ACCESSORY"}})
        res.status(201).json(stocks) 
    } catch (e) {
        console.log(e) ;
        res.status(500).send({msg : "list cannot be fetched"})
    }
} 
export const listStockBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    try {
        const stocks = await stockRepo.find({where : {bookId : id}})
        res.status(201).json(stocks) 
    } catch (e) {
        console.log(e) ;
        res.status(500).send({msg : "list cannot be fetched"})
    }
} 
export const globalListStockBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    try {
        const stocks = await stockRepo.find({where : {category : "BOOK"}})
        res.status(201).json(stocks) 
    } catch (e) {
        console.log(e) ;
        res.status(500).send({msg : "list cannot be fetched"})
    }
} 
export const listStockExerciseBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    try {
        const stocks = await stockRepo.find({where : {exerciseBookId : id}})
        res.status(201).json(stocks) 
    } catch (e) {
        console.log(e) ;
        res.status(500).send({msg : "list cannot be fetched"})
    }
} 
export const globalListStockExerciseBook = async (req:Request, res : Response) => {
    const {id} = req.params;
    try {
        const stocks = await stockRepo.find({where : {category : "EXERCISE_BOOK"}})
        res.status(201).json(stocks) 
    } catch (e) {
        console.log(e) ;
        res.status(500).send({msg : "list cannot be fetched"})
    }
} 