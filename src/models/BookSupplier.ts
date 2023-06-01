import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { BookStock } from './BookStock';
import { Supplier } from './Supplier';

@Entity()
export class BookSupplier extends Supplier{
    constructor(
        name : string,
        tel : string,
        address : string,
        description : string
        )
        {
        super(name,tel,description,address);

    }
    @PrimaryGeneratedColumn()
    id : number;

    @OneToMany('BookStock',(stock:BookStock)=>{stock.supplier},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<BookStock>

}