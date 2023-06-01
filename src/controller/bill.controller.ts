import {Request, Response} from 'express'
import { AppDataSource } from '../app'
import { Accessory, Book, ExerciseBook,Bill, User, BillItem,Command } from '../models'

const billRepository = AppDataSource.getRepository(Bill)
const billItemRepository = AppDataSource.getRepository(BillItem)
const userRepository = AppDataSource.getRepository(User)
const exerciseBookRepo = AppDataSource.getRepository(ExerciseBook)
const bookRepo = AppDataSource.getRepository(Book)
const accessoryRepo = AppDataSource.getRepository(Accessory)
const commandRepo = AppDataSource.getRepository(Command)

export const addBill =async (req:Request,res:Response) => {
    const bill : Partial <Bill> = new Bill(0,0);
    const createdBill = await billRepository.save(bill);
    res.status(201).send(createdBill);
}

export const addBillItem =async (req:Request,res:Response) => {
    let billId = req.params.billId;
    let itemId = req.params.itemId;
    let itemType = req.params.itemType;

    const bill : Bill= await billRepository.findOne({where:{id:billId}}) //findOne is a findById finder
    
    let item : any;
    let billItem : BillItem;
    switch(itemType){
        case 'exerciseBook':
            item = await exerciseBookRepo.findOne({where:{id:itemId}})
            billItem = await billItemRepository.findOne({where:{exerciseBookId:itemId,billId:billId}});

            break;

        case 'book':
 
            item= await bookRepo.findOne({where:{id:itemId}})
            billItem = await billItemRepository.findOne({where:{bookId:itemId,billId:billId}});
            
            break;

        case 'accessory':
            item = await accessoryRepo.findOne({where:{id:itemId}})
            billItem = await billItemRepository.findOne({where:{accessoryId:itemId,billId:billId}});

    }


    if (billItem==null) {
        switch(itemType){
            case 'exerciseBook':
                billItem = new BillItem(1,item.price,item.price,item.toString());
                billItem.exerciseBook = item;
                break;
    
            case 'book':
                billItem = new BillItem(1,item.price,item.price,item.designation);
                billItem.book = item;
                break;
    
            case 'accessory':
                billItem = new BillItem(1,item.price,item.price,item.toString());
                billItem.accessory = item;
        }
    }
    else{
        switch(itemType){
            case 'exerciseBook':
                billItem.quantity +=1;
                billItem.totalPrice += item.price;
                break;
    
            case 'book':
                
                billItem.quantity +=1;
                billItem.totalPrice += item.price;
                break;
    
            case 'accessory':
                    
                billItem.quantity +=1;
                billItem.totalPrice += item.price;
        }
    }
    billItem.bill=bill;
    billItemRepository.save(billItem);
    billRepository.save(bill);

    res.status(200).send(billId);
}

export const decBillItem = async ( req :Request,res:Response) => {
    let billId = req.params.billId;
    let itemId = req.params.itemId;
    let itemType = req.params.itemType;

    const bill : Bill= await billRepository.findOne({where:{id:billId}}) //findOne is a findById finder
     
    let item : any;
    let billItem : BillItem;
    switch(itemType){
        case 'exerciseBook':
            item = await exerciseBookRepo.findOne({where:{id:itemId}})
            billItem = await billItemRepository.findOne({where:{exerciseBookId:itemId,billId:billId}});

            break;

        case 'book':
 
            item= await bookRepo.findOne({where:{id:itemId}})
            billItem = await billItemRepository.findOne({where:{bookId:itemId,billId:billId}});
            
            break;

        case 'accessory':
            item = await accessoryRepo.findOne({where:{id:itemId}})
            billItem = await billItemRepository.findOne({where:{accessoryId:itemId,billId:billId}});

    }
  
    if (billItem==null) {
        res.status(500).send("no entry to subtract")
    }
    else{
        switch(itemType){
            case 'exerciseBook':
                billItem.quantity -=1;
                billItem.totalPrice -= item.price;
                break;
    
            case 'book':
                
                billItem.quantity -=1;
                billItem.totalPrice -= item.price;
                break;
    
            case 'accessory':
                    
                billItem.quantity -=1;
                billItem.totalPrice -= item.price;
        }
    }

    if(billItem.quantity==0){
        await billItemRepository.delete({id:billItem.id})
    }
    else{
            
        billItem.bill=bill;
        billItemRepository.save(billItem);
        billRepository.save(bill);
    }

    res.status(200).send(billId);

}

export const validateBill = async (req:Request,res:Response) => {
    let billId = req.params.billId;
    let cni = req.params.cni;
    const user : User = await userRepository.findOne({where:{cni:cni}});
    
    const bill : Bill = await billRepository.findOne({where:{id:billId}}) //findOne is a findById finder
    const billItems = await billItemRepository.find({where : {billId:billId}});
    console.log(billItems)
    let cost = 0;
    let items = 0;

    if (bill.status=="ACHIEVED") {
        res.status(200).send('bill already sent')
        
    } else {
        try {
            billItems.forEach(billItem => {
                cost +=billItem.totalPrice
                items += billItem.quantity
            });
        
            bill.totalAmount = cost;
            bill.totalItems = items;
            bill.status = "ACHIEVED";
            let savedBill = await billRepository.save(bill);
    
            const command:Partial<Command> = new Command(bill.totalItems,bill.totalAmount)
            command.user = user;
            command.bill = bill;
            command.userId = user.id;
            command.username = user.toString()
            command.billId = parseInt(billId)
    
            let savedCommand=await commandRepo.save(command); 
            res.status(200).json({savedBill,savedCommand})
        } catch (error) {
            console.log(error)
        }    
        
    }

    

}

export const billList =async (req:Request,res:Response) => {
    try {
        const bill = await billRepository.find(); 
        res.status(200).send(bill);
        
    } catch (error) {
        res.status(500).send("no bill available")
    }
}

export const detailsBill =async (req:Request,res:Response) => {
    let billId = req.params.billId
    let totalAmount = 0;
    let totalItems = 0;
    const bill : Bill = await billRepository.findOne({where:{id:billId}}) //findOne is a findById finder
    try {
        const billItems = await billItemRepository.find({where:{billId:billId}});
        
        billItems.forEach(billItem => {
            totalAmount +=billItem.totalPrice
            totalItems +=billItem.quantity

        });

        res.status(200).send({billItems,totalAmount,totalItems});
    } catch (error) {
        res.status(500).send("emptyBill")
    }
    
}

export const cancelBill = async (req:Request,res:Response) => {
    let billId = req.params.billId
    const command = await commandRepo.findOne({where:{billId:billId}});
    try {
        if (command==null) {
            
                billRepository.delete({id:billId});
                res.status(200).send("deleted successfully")     
        }
        else{
            if (command.status=="UNDELIVERED") {
                billRepository.delete({id:billId});
            res.status(200).send("deleted successfully")     
            }
            else {
            res.status(200).send("sorry but command already sent")
        } 
        }
        
    }
    catch (error) {
                res.status(500).send("an error occured restart the operation")
    }
}
