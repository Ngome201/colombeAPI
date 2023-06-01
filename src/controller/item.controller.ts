import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook } from '../models'

const exerciseBookRepo = AppDataSource.getRepository(ExerciseBook)
const bookRepo = AppDataSource.getRepository(Book)
const accessoryRepo = AppDataSource.getRepository(Accessory)

export const saveItem = async (req:Request,res : Response) => {
    const {designation, quantity, price,
            type,shape, pages,
            author,publisher,level,section,
            mark, category} = req.body
    try {
        switch(category){
            case "exerciseBook":
                const exerciseBook : Partial <ExerciseBook> = new ExerciseBook(designation,
                                                                                quantity,
                                                                                price,
                                                                                type,
                                                                                shape,
                                                                                pages,
                                                                                mark)
                await exerciseBookRepo.save(exerciseBook)
                res.status(201).json({"msg":'exercise Book saved successfully'})
                break;
            case "book":
                const book : Partial <Book> = new Book(designation,
                                                        quantity,
                                                        price,
                                                        author,
                                                        publisher,
                                                        level,
                                                        section)
                await bookRepo.save(book)
                res.status(201).json({"msg":'Book saved successfully'})
                break;
            case "accessory":
                const accessory : Partial <Accessory> = new Accessory(designation,
                                                        quantity,
                                                        price,
                                                        mark)
                                                        
                await accessoryRepo.save(accessory)
                res.status(201).json({"msg":'accessory saved successfully'})
        
        }
    } catch (error) {
        throw error
    }        
    
} 
export const getItems = async (req:Request,res : Response) => {
    const {cat} = req.params
    let list : any

    switch(cat){
        case "1":
            list = await exerciseBookRepo.find()
            res.status(200).send(list)
            break;
        case "2":
            list = await bookRepo.find()
            res.status(200).send(list)
            break;
        case "3":
            list = await accessoryRepo.find()
            res.status(200).send(list)
            
    }
}
export const editExerciseBook =async (req:Request,res : Response) => {
    const {id} = req.params;
    try {
        const exerciseBook = await exerciseBookRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        res.status(200).send(exerciseBook);
    } catch (error) {
        res.status(400).send('invalid id, item not found')
    }
    
}
export const editBook =async (req:Request,res : Response) => {
    let book : any;
    let {id} = req.params
    
    try {
        book = await bookRepo.findOneOrFail({where : {id}})
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send('invalid id, item not found')
    }
    
}
export const editAccessory =async (req:Request,res : Response) => {
    let accessory : any;
    let {id} = req.params
    
    try {
        accessory = await accessoryRepo.findOneOrFail({where : {id}})
        res.status(200).send(accessory);
    } catch (error) {
        res.status(400).send('invalid id, item not found')
    }
}

export const updateExerciseBook =async (req:Request,res : Response) => {
    let {id,designation,type,shape,pages,mark}=req.body;
    try{
        const exerciseBook = await exerciseBookRepo.findOneOrFail({where : {id}});
        exerciseBook.designation = designation;
        exerciseBook.shape = shape;
        exerciseBook.pages = pages;
        exerciseBook.type = type;
        exerciseBook.mark = mark;
        exerciseBookRepo.save(exerciseBook);
        res.status(200).json({message:'item updated'})
    }
    catch(error){
        res.status(404).send("invalid id, item not found")
    }
}

export const updateBook =async (req:Request,res : Response) => {
    let {id,designation,author,level,section,publisher}=req.body;
    try{
        const book = await bookRepo.findOneOrFail({where : {id}});
        book.designation = designation;
        book.level = level;
        book.section = section;
        book.author = author;
        book.publisher = publisher;
        bookRepo.save(book);
        res.status(200).json({message:'item updated'})
    }
    catch(error){
        res.status(404).send("invalid id, item not found")
    }
}

export const updateAccessory =async (req:Request,res : Response) => {
    let {id,designation,mark}=req.body;
    try{
        const exerciseBook = await exerciseBookRepo.findOneOrFail({where : {id}});
        exerciseBook.designation = designation;
        exerciseBook.mark = mark;
        exerciseBookRepo.save(exerciseBook);
        res.status(200).json({message:'item updated'})
    }
    catch(error){
        res.status(404).send("invalid id, item not found")
    }
}