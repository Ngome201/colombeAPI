import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { BillItem } from './BillItem';
import { Item } from './Item';
import { Stock } from './Stock';

@Entity()
export class Book extends Item{
    constructor(
        designation : string,
        quantity : number,
        price : number,
        author : string,
        publisher : string,
        level : string,
        section : string
        )
        {
        super(designation,quantity,price);
        this.author = author 
        this.publisher = publisher 
        this.level = level
        this.section = section

    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    author : string;

    @Column()
    publisher: string;

    @Column()
    level : string; // represents the level of the student
    
    @Column()
    section : string; // represents the anglosaxon or francophone section
    

    @OneToMany('BillItem',(billItem:BillItem)=>{billItem.book},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    billItems : Array<BillItem>

    @OneToMany('Stock',(stock:Stock)=>{stock.book},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<Stock>

    toString = (()=>{return this.designation+" "+this.level+" "+this.publisher})

    
}