import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, OneToMany} from 'typeorm';
import { BillItem } from './BillItem';
import { Item } from './Item';
import { Stock } from './Stock';

@Entity()
export class Accessory extends Item{
    constructor(
        // uuid : string,
        designation : string,
        quantity : number,
        price : number,
        mark : string
        )
        {
        super(designation,quantity,price);
        // super(uuid,designation,quantity,price);
        this.mark = mark 
    }
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    mark : string; // a mark can be either one element of this table or not[white,Lite,JeuneAfrique,safca...]
    

    @OneToMany('BillItem',(billItem:BillItem)=>{billItem.accessory},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    billItems : Array<BillItem>

    @OneToMany('Stock',(stock:Stock)=>{stock.accessory},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<Stock>

    toString = (()=>{return this.designation+" "+this.mark})

}