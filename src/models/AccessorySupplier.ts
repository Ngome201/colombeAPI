import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { AccessoryStock } from './AccessoryStock';
import { Supplier } from './Supplier';

@Entity()
export class AccessorySupplier extends Supplier{
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

    @OneToMany('AccessoryStock',(stock:AccessoryStock)=>{stock.supplier},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<AccessoryStock>

}