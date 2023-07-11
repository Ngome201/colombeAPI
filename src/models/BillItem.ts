import {SharedProp} from './SharedProp.helper'
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Bill } from './Bill';
import { Accessory } from './Accessory';
import { Book } from './Book';
import { ExerciseBook } from './ExerciseBook';

@Entity()
export class BillItem extends SharedProp{
    constructor(quantity : number,unitPrice : number,totalPrice : number,designation : string){
        super()
        this.unitPrice  =unitPrice;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.designation = designation
    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    quantity : number;

    @Column()
    unitPrice : number;

    @Column()
    totalPrice : number;
    
    @Column()
    designation : string;

    @Column({nullable:true})
    bookId : number;

    @Column({nullable:true})
    exerciseBookId : number;

    @Column({nullable:true})
    accessoryId : number;
    
    @Column({nullable:true})
    billId : number;
    
    @ManyToOne(()=>Bill,(bill : Bill)=>bill.billItems,{onDelete:'CASCADE'})
    @JoinColumn({name:'billId'})
    bill : Bill;
    
    @ManyToOne(()=>Accessory,(accessory : Accessory)=>accessory.billItems)
    @JoinColumn({name:'accessoryId'})
    accessory : Accessory;

    @ManyToOne(()=>Book,(book : Book)=>book.billItems)
    @JoinColumn({name:'bookId'})
    book : Book;

    @ManyToOne(()=>ExerciseBook,(exerciseBook : ExerciseBook)=>exerciseBook.billItems)
    @JoinColumn({name:'exerciseBookId'})
    exerciseBook : ExerciseBook;
                                                                                                                                
}
//connection.manager.save(user)