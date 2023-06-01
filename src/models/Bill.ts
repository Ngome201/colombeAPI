import {SharedProp} from './SharedProp.helper'
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne,OneToMany, OneToOne} from 'typeorm'
import { User } from './User';
import { BillItem } from './BillItem';
import { Command } from './Command';

@Entity()
export class Bill extends SharedProp{
    constructor(totalItems : number,totalAmount : number){
        super()
        this.totalAmount  =totalAmount;
        this.totalItems = totalItems;
    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    totalItems : number;

    @Column()
    totalAmount : number;

    @Column({default : "CREATED"})
    status : string;
    
    
    @OneToMany('BillItem',(billItem : BillItem)=> billItem.bill,{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    billItems : Array<BillItem>;

    @OneToOne('Command',(command:Command)=>command.bill,{onDelete:'CASCADE'})

    command : Command;
}
//connection.manager.save(user)