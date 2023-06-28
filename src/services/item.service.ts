import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook } from '../models'

const exerciseBookRepo = AppDataSource.getRepository(ExerciseBook)
const bookRepo = AppDataSource.getRepository(Book)
const accessoryRepo = AppDataSource.getRepository(Accessory)

export const insertExerciseBook =async (exerciseBook : ExerciseBook) => {
    await exerciseBookRepo.save(exerciseBook)
}
export const insertBook = async (book : Book) => {
    await bookRepo.save(book)
}
export const insertAccessory = async ( accessory : Accessory) => {
    await accessoryRepo.save(accessory)
}

export const findAllItem = async (cat : String) => {
    let list : any

    switch(cat){
        case "1":
            list = await exerciseBookRepo.find()
            return list;
        case "2":
            list = await bookRepo.find()
            return list;
        case "3":
            list = await accessoryRepo.find()
            return list;
            
    }
}
export const findExerciseBook =async ( id : any) => {
    try {
        const exerciseBook = await exerciseBookRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        return exerciseBook;
    } catch (error) {
        return null;
    }
 
}
export const findBook =async ( id : any) => {
    try {
        const book = await bookRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        return book;
    } catch (error) {
        return null;
    }
}
export const findAccessory =async (id : any) => {
    try {
        const accessory = await accessoryRepo.findOneOrFail({where : {id}}) // findOneOrFail is a findByAttribute finder
        return accessory;

    } catch (error) {
        return null;
    }
}
