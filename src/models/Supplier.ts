import { SharedProp } from './SharedProp.helper';
import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { Stock } from './Stock';

@Entity()
export class Supplier extends SharedProp{
    constructor(
        name : string,
        tel : string,
        address : string,
        category : string ,
        description : string
        )
        {
        super();
        this.name = name 
        this.tel = tel 
        this.description = description
        this.address = address 
        this.category = category

    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    tel : string;
    
    @Column()
    address : string;

    @Column()
    category : string;

    @Column()
    description : string;

    @OneToMany('Stock',(stock:Stock)=>{stock.supplier},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<Stock>

}