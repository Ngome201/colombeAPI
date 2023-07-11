import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook,Bill, User, BillItem,Command } from '../models'
import { Between, LessThan, MoreThan, createQueryBuilder } from 'typeorm'
import { format } from 'date-fns'

const billRepository = AppDataSource.getRepository(Bill)
const billItemRepository = AppDataSource.getRepository(BillItem)
const userRepository = AppDataSource.getRepository(User)
const commandRepository = AppDataSource.getRepository(Command)
const bookRepository = AppDataSource.getRepository(Book)
const accessoryRepository = AppDataSource.getRepository(Accessory)
const exerciseBookRepository = AppDataSource.getRepository(ExerciseBook)
let unsufficient : Array<{designation : string, quantity : number}>


export const sendCommand = async (req:Request,res:Response) => {
    let commandId = req.params.commandId
    try {
        const command =   await commandRepository.findOneOrFail({where:{id:commandId}});//findOne is a findById finder
        if (command.status == "DELIVERD") {
            res.status(200).send({msg :"command already sent"})
        } else {
            
            command.status = "DELIVERED"; 
            commandRepository.save(command);
     
            const bill = await billRepository.findOne({where:{id:command.billId}})

            let bookBillItems = await billItemRepository.createQueryBuilder("billItem")
                                                        .innerJoinAndSelect('billItem.book','Book')
                                                        .select(["billItem.quantity","billItem.bookId","billItem.billId"])
                                                        .addOrderBy("bookId","ASC")
                                                        .andWhere({billId:bill.id})
                                                        .getMany()

            let exerciseBookBillItems = await billItemRepository.createQueryBuilder("billItem")
                                                        .innerJoinAndSelect('billItem.exerciseBook','ExerciseBook')
                                                        .select(["billItem.quantity","billItem.exerciseBookId","billItem.billId"])
                                                        .addOrderBy("exerciseBookId","ASC")
                                                        .andWhere({billId:bill.id})
                                                        .getMany()

            let accessoryBillItems = await billItemRepository.createQueryBuilder("billItem")
                                                        .innerJoinAndSelect('billItem.accessory','Accessory')
                                                        .select(["billItem.quantity","billItem.accessoryId","billItem.billId"])
                                                        .addOrderBy("accessoryId","ASC")
                                                        .andWhere({billId:bill.id})
                                                        .getMany()
            /*****@aim : verify the availability of items and indicate the unsufficient ones*******/
            if (bookBillItems.length !=0) {
                bookBillItems.forEach(async bookBillItem => {
                    const book = await bookRepository.findOne({where : {id:bookBillItem.bookId}})
                    if(book.quantity<bookBillItem.quantity){
                        unsufficient.push({designation : bookBillItem.designation,
                                                quantity : bookBillItem.quantity-book.quantity})
                    }
                })
            } 
            if (exerciseBookBillItems.length !=0) {
                exerciseBookBillItems.forEach(async exerciseBookBillItem => {
                    const exerciseBook = await exerciseBookRepository.findOne({where : {id:exerciseBookBillItem.exerciseBookId}})
                    if(exerciseBook.quantity<exerciseBookBillItem.quantity){
                        unsufficient.push({designation : exerciseBookBillItem.designation,
                            quantity : exerciseBookBillItem.quantity-exerciseBook.quantity})
                    }
                })
            } 
            if (accessoryBillItems.length !=0) {
                accessoryBillItems.forEach(async accessoryBillItem => {
                    const accessory = await accessoryRepository.findOne({where : {id:accessoryBillItem.accessoryId}})
                    if(accessory.quantity<accessoryBillItem.quantity){
                        unsufficient.push({designation : accessoryBillItem.designation,
                            quantity : accessoryBillItem.quantity-accessory.quantity})
                    }
                })
            } 
            if (unsufficient.length!=0) {
                res.status(200).send({unsufficient, msg:"unsufficient"})
            }
            /*****@aim : subtract the indicated quantity to the global stock of items*******/

            if (bookBillItems.length!=0) {
                bookBillItems.forEach(async bookBillItem => {
                    const book = await bookRepository.findOne({where : {id:bookBillItem.bookId}})
                    book.quantity = book.quantity - bookBillItem.quantity
                    bookRepository.save(book)
                    
                });
            }
            if (exerciseBookBillItems.length!=0) {
                exerciseBookBillItems.forEach(async exerciseBookBillItem => {
                    const exerciseBook = await exerciseBookRepository.findOne({where : {id:exerciseBookBillItem.exerciseBookId}})
                    exerciseBook.quantity = exerciseBook.quantity - exerciseBookBillItem.quantity
                    exerciseBookRepository.save(exerciseBook)
                });
            }
            if (accessoryBillItems.length!=0) {
                accessoryBillItems.forEach(async accessoryBillItem => {
                    const accessory = await accessoryRepository.findOne({where : {id:accessoryBillItem.accessoryId}})
                    accessory.quantity = accessory.quantity - accessoryBillItem.quantity
                    accessoryRepository.save(accessory)
                });
            }
            res.status(200).send({msg : "delivered successfully"})
    
        }
    } catch (error) {
        console.log(error)
    }
    
}
export const detailsCommand =async (req:Request,res : Response) => {
    let commandId = req.params.commandId;

    const command = await commandRepository.findOne({where:{id:commandId}});
    const bill = await billRepository.findOne({where:{id:command.billId}})
    const user = await userRepository.findOne({where:{id:command.userId}})
    const billItems = await billItemRepository.find({where:{billId:bill.id}})
    res.status(200).json({billItems,user})
}
export const commandList =async (req:Request,res:Response) => {
    const type = req.params.type
    let commandList :any
    try {
        if (type=="UNDELIVERED") {
            
            commandList = await commandRepository.find({where : {status : "UNDELIVERED"}});
            res.status(200).send(commandList);
        } else {
            
            commandList = await commandRepository.find({where : {status : "DELIVERED"}});
            res.status(200).send(commandList);
        }
        
    } catch (error) {
        res.status(500).send({msg : "no command available"})
    }
}

export const commandListByUser = async (req:Request,res:Response) => {
    let mat = req.params.matricule;
    let user : User = await userRepository.findOne({where:{matricule : mat}});
    const username : any = user.toString();
    // console.log(user.toString())
    try { 
        const commands = await commandRepository.find({where:{username : username}}); 
        // console.log(commands)
        res.status(200).send(commands);
        
    } catch (error) {
        res.status(500).send({msg : "no bill available"})
    }
}
export const statistics = async (req:Request,res:Response) => {
    try {
        let yesterday = new Date()
        let commandList = await commandRepository.find({where : {status : "DELIVERED"}});
        let amountEncountered : number = 0
        commandList.forEach(command => {
            amountEncountered += command.totalAmount;
        });

        let totalCamrails = await userRepository.find({where : {role : "CAMRAIL"}})
        let totalStaffs = await userRepository.find({where : {role : "CAMRAIL"}})
        let totalAdmins = await userRepository.find({where : {role : "ADMIN"}})
        let toDayCommands = await commandRepository.findAndCount({
            where : {
                createdAt: Between(
                new Date(), 
                new Date(yesterday.setDate(yesterday.getDate()-1))
            ),
            }
        })
        res.status(200).send({amountEncountered,totalCamrails,totalAdmins,totalStaffs, toDayCommands})
    } catch (error) {
        
    }

}
export const BetweenDates = (from: Date | string, to: Date | string) =>
  Between(
    format(typeof from === 'string' ? new Date(from) : from, 'YYYY-MM-DD HH:MM:SS'),
    format(typeof to === 'string' ? new Date(to) : to, 'YYYY-MM-DD HH:MM:SS'),
  );