import {PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { SharedProp } from './SharedProp.helper';

export class Item extends SharedProp{
    constructor(
        // uuid:string,
        designation : string,
        quantity : number,
        price : number)
        {
        super();
        // this.uuid = uuid
        this.designation = designation 
        this.quantity = quantity 
        this.price = price

    }
    @PrimaryGeneratedColumn()
    id : number;

    // @Column()
    // uuid : string;

    @Column()
    designation : string;

    @Column({unsigned : true})
    quantity: number;

    @Column()
    price : number;
    
    
    
}