import {Entity,PrimaryGeneratedColumn,Column,ManyToOne} from 'typeorm';
import { Stock } from './Stock';
import { Book } from './Book';
import { Supplier } from './Supplier';
import { BookSupplier } from './BookSupplier';

@Entity()
export class BookStock extends Stock{
    constructor(
        designation : string,
        quantity : number,
        price : number)
        {
        super(designation,quantity,price);
        
    }
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>Book,(book:Book)=>{book.stocks})
    book :Book
    
    @ManyToOne(()=>BookSupplier,(supplier:BookSupplier)=>{supplier.stocks})
    supplier :BookSupplier
}