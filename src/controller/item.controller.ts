import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook } from '../models'
import { findAccessory, findAllItem, findBook, findExerciseBook, insertAccessory, insertBook, insertExerciseBook} from '../services/item.service'

const exerciseBookRepo = AppDataSource.getRepository(ExerciseBook)
const bookRepo = AppDataSource.getRepository(Book)
const accessoryRepo = AppDataSource.getRepository(Accessory)

export const saveExerciseBook = async (req:Request,res : Response) => {
    const {designation, price, type, shape, pages, mark} = req.body
    try {
        const exerciseBook : ExerciseBook = new ExerciseBook(designation,
                                                            0,
                                                            price,
                                                            type,
                                                            shape,
                                                            pages,
                                                            mark)
        insertExerciseBook(exerciseBook);
        res.status(201).send({msg :"exercise book saved successfully"})
    
    } catch (error) {
        throw error
    }        
    
} 

export const saveBook = async (req:Request,res : Response) => {
    const {designation, price,author,publisher,level,section} = req.body
    try {
        const book : Book= new Book( designation,
                                    0,
                                    price,
                                    author,
                                    publisher,
                                    level,
                                    section)
    
        insertBook(book);
        res.status(201).send({msg : "Book saved successfully"})
    } catch (error) {
        console.log(error)
    }
}

export const saveAccessory = async (req:Request,res : Response) => {
    const {designation, price, mark} = req.body
    try {
        const accessory : Accessory = new Accessory(designation,
                                                    0,
                                                    price,
                                                    mark)
        
        insertAccessory(accessory);
        res.status(201).send({msg : "Accessory saved successfully"})
    } catch (error) {
        console.log(error)
        
    }
}   
export const getItems = async (req:Request,res : Response) => {
    const {cat} = req.params
    let list
    switch(cat){
        case "EXERCISE_BOOK":
            list = await exerciseBookRepo.find()
            break;
        case "BOOK":
            list = await bookRepo.find()
            break;
        case "ACCESSORY":
            list = await accessoryRepo.find()
            break;     
    }
    res.status(200).send(list)


}
export const editExerciseBook = async (req:Request,res : Response) => {
    const {id} = req.params;    
    try {
        const exerciseBook = await exerciseBookRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        res.status(200).send(exerciseBook);

    } catch (error) {
        res.status(500).send({msg : "unable to find this item"});
    }  
}
export const editBook =async (req:Request,res : Response) => {
    let {id} = req.params   
    try {
        const book = await bookRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        res.status(200).send(book);

    } catch (error) {
        res.status(500).send({msg : "unable to find this item"});
    }  
}

export const editAccessory =async (req:Request,res : Response) => {
    let {id} = req.params
    try {
        const accessory = await accessoryRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        res.status(200).send(accessory);

    } catch (error) {
        res.status(500).send({msg : "unable to find this item"});
    }   
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