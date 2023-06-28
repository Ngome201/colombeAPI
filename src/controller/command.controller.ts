import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook,Bill, User, BillItem,Command } from '../models'

const billRepository = AppDataSource.getRepository(Bill)
const billItemRepository = AppDataSource.getRepository(BillItem)
const userRepository = AppDataSource.getRepository(User)
const commandRepository = AppDataSource.getRepository(Command)


export const sendCommand = async (req:Request,res:Response) => {
    let commandId = req.params.commandId
    const command =   await commandRepository.findOneOrFail({where:{id:commandId}});//findOne is a findById finder
    if (command.status == "DELIVERD") {
        res.status(200).send("commans already sent")
    } else {
        try {
        command.status = "DELIVERED"; 
        commandRepository.save(command);
        res.status(200).send("delivered successfully")

        } catch (error) {
            res.status(500).send("an error occured restart the operation")
            
        }
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

    try {
        const commandList = await commandRepository.find();
        res.status(200).send(commandList);
        
    } catch (error) {
        res.status(500).send("no command available")
    }
}

export const commandListByUser = async (req:Request,res:Response) => {
    let mat = req.params.matricule;
    let user : User = await userRepository.findOne({where:{matricule : mat}});
    const username : any = user.toString();
    try {
        const commands = await commandRepository.find({where:{username : username}}); 
        res.status(200).send(commands);
        
    } catch (error) {
        res.status(500).send("no bill available")
    }
}