import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import { SharedProp } from './SharedProp.helper';
import { Supplier } from './Supplier';
import { Book } from './Book';
import { ExerciseBook } from './ExerciseBook';
import { Accessory } from './Accessory';
@Entity()
export class Stock extends SharedProp{
    constructor(
        designation : string,
        quantity : number,
        description : string,
        category : string)
        {
        super();
        this.designation = designation 
        this.quantity = quantity 
        this.description = description
        this.category  = category
    }
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    designation : string;

    @Column({nullable:true})
    description : string;

    @Column()
    quantity: number;

    @Column({nullable:true})
    category : string;

    
    @Column({nullable:true})
    bookId : number
    
    @Column({nullable:true})
    exerciseBookId : number
    
    @Column({nullable:true})
    accessoryId : number

    @Column({nullable:true})
    supplierId : number

    @ManyToOne(()=>Book,(book:Book)=>{book.stocks})
    @JoinColumn({name : "bookId"})
    book :Book
    
    @ManyToOne(()=>ExerciseBook,(exerciseBook:ExerciseBook)=>{exerciseBook.stocks})
    @JoinColumn({name : "exerciseBookId"})
    exerciseBook : ExerciseBook
    
    @ManyToOne(()=>Accessory,(accessory:Accessory)=>{accessory.stocks})
    @JoinColumn({name : "accessoryId"})
    accessory : Accessory
    
    
    @ManyToOne(()=>Supplier,(supplier:Supplier)=>{supplier.stocks})
    supplier :Supplier
    

}


