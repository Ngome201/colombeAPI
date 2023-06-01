import {PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { SharedProp } from './SharedProp.helper';

export class Item extends SharedProp{
    constructor(
        designation : string,
        quantity : number,
        price : number)
        {
        super();
        this.designation = designation 
        this.quantity = quantity 
        this.price = price

    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    designation : string;

    @Column()
    quantity: number;

    @Column()
    price : number;
    
    
    
}