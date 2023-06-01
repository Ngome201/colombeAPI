import {PrimaryGeneratedColumn,Column} from 'typeorm';
import { SharedProp } from './SharedProp.helper';

export class Supplier extends SharedProp{
    constructor(
        name : string,
        tel : string,
        address : string,
        description : string
        )
        {
        super();
        this.name = name 
        this.tel = tel 
        this.description = description
        this.address = address 

    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    tel : string;
    
    @Column()
    address : string;

    @Column({ default : "00000"})
    description : string;


}