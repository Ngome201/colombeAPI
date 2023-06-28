import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook } from '../models'
import { findAccessory, findAllItem, findBook, findExerciseBook, insertAccessory, insertBook, insertExerciseBook} from '../services/item.service'

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
                const exerciseBook : ExerciseBook = new ExerciseBook(designation,
                                                                                quantity,
                                                                                price,
                                                                                type,
                                                                                shape,
                                                                                pages,
                                                                                mark)
                insertExerciseBook(exerciseBook);
                res.status(201).send("exercise book saved successfully")
                break;
            case "book":
                const book : Book= new Book(designation,
                                                        quantity,
                                                        price,
                                                        author,
                                                        publisher,
                                                        level,
                                                        section)

                insertBook(book);
                res.status(201).send("Book saved successfully")
                break;
            case "accessory":
                const accessory : Accessory = new Accessory(designation,
                                                        quantity,
                                                        price,
                                                        mark)
                                                        
                insertAccessory(accessory);
                res.status(201).send("Accessory saved successfully")
        
        }
    } catch (error) {
        throw error
    }        
    
} 
export const getItems = async (req:Request,res : Response) => {
    const {cat} = req.params
    let list
    switch(cat){
        case "1":
            list = await exerciseBookRepo.find()
            break;
        case "2":
            list = await bookRepo.find()
            break;
        case "3":
            list = await accessoryRepo.find()
            break;     
    }
    res.status(200).send(list)


}
export const editExerciseBook = async (req:Request,res : Response) => {
    const {id} = req.params;
    const exerciseBook = findExerciseBook(id);
    res.status(200).send(exerciseBook);
    
}
export const editBook =async (req:Request,res : Response) => {
    let {id} = req.params
    const book = findBook(id);
    res.status(200).send(book);
}

export const editAccessory =async (req:Request,res : Response) => {
    let {id} = req.params
    const accessory = findAccessory(id);
    res.status(200).send(accessory);

}

export const updateExerciseBook =async (req:Request,res : Response) => {
    let {id,designation,type,shape,pages,mark}=req.body;
    if(id == null) res.status(400).send("invalid id")

    const exerciseBook = await exerciseBookRepo.findOneOrFail({where : {id}});
    exerciseBook.designation = designation;
    exerciseBook.shape = shape;
    exerciseBook.pages = pages;
    exerciseBook.type = type;
    exerciseBook.mark = mark;

    insertExerciseBook(exerciseBook);
    res.status(201).send("exercise book saved successfully")

    
}

export const updateBook =async (req:Request,res : Response) => {
    let {id,designation,author,level,section,publisher}=req.body;
    if(id == null) res.status(400).send("invalid id")
    
    const book = await bookRepo.findOneOrFail({where : {id}});
    book.designation = designation;
    book.level = level;
    book.section = section;
    book.author = author;
    book.publisher = publisher;
    insertBook(book);
    res.status(201).send("Book saved successfully")
}

export const updateAccessory =async (req:Request,res : Response) => {
    let {id,designation,mark}=req.body;
    if(id == null) res.status(400).send("invalid id")
    
    const accessory = await accessoryRepo.findOneOrFail({where : {id}});
    accessory.designation = designation;
    accessory.mark = mark;
    insertAccessory(accessory);
    res.status(200).send("Accessory saved successfully")
}