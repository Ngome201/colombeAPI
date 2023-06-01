import {SharedProp} from './SharedProp.helper'
import {Entity,Column,PrimaryGeneratedColumn, ManyToOne,OneToMany, OneToOne, JoinColumn} from 'typeorm'
import { User } from './User';
import { Bill } from './Bill';

@Entity()
export class Command extends SharedProp{
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
    
    @Column()
    username : String;

    @Column({nullable:true})
    userId : number;
    
    @Column({nullable:true})
    billId : number;

    @Column({default : "UNDELIVERED"})
    status : string;
    
    @ManyToOne(()=>User,(user : User)=>user.commands)
    @JoinColumn({name:'userId'})
    user : User;

    @OneToOne(()=>Bill,(bill:Bill)=>bill.command,{onDelete:'CASCADE'})
    @JoinColumn({name:'billId'})
    bill : Bill;
}
//connection.manager.save(user)