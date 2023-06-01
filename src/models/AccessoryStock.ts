import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, OneToMany} from 'typeorm';
import { Stock } from './Stock';
import { Accessory } from './Accessory';
import { AccessorySupplier } from './AccessorySupplier';

@Entity()
export class AccessoryStock extends Stock{
    constructor(
        designation : string,
        quantity : number,
        price : number,
        )
    {
        super(designation,quantity,price);
    }
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>Accessory,(accessory:Accessory)=>{accessory.stocks})
    accessory :Accessory

    @ManyToOne(()=>AccessorySupplier,(supplier:AccessorySupplier)=>{supplier.stocks})
    supplier :AccessorySupplier

}