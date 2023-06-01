import {Column} from 'typeorm';

import { SharedProp } from './SharedProp.helper';

export class Stock extends SharedProp{
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

    @Column()
    designation : string;

    @Column()
    quantity: number;

    @Column()
    price : number;
    

}