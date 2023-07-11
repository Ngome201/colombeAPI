import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { Bill } from './Bill';
import { SharedProp } from './SharedProp.helper';
import * as bcrypt from "bcryptjs";
import { Command } from './Command';

@Entity()
export class User extends SharedProp{
    constructor(
        username : string,
        lastname : string,
        tel : string,
        locationAddress : string,
        shippingAddress : string, 
        matricule:string,
        role : string,
        cni : String)
        {
        super();
        this.username = username 
        this.lastname = lastname 
        this.tel = tel 
        this.locationAddress = locationAddress 
        this.shippingAddress = shippingAddress 
        this.matricule = matricule
        this.role = role, 
        this.cni =cni

    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    lastname : string;

    @Column()
    tel : string;
    
    @Column({nullable:true})
    locationAddress : string;

    @Column({nullable:true})
    shippingAddress : string;

    @Column()
    cni : String

    @Column({ default : "00000"})
    matricule : string;

    @Column({default: 'CAMRAIL'})
    role : string;

    @OneToMany('Command',(command:Command)=>{command.user},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    commands : Array<Command>

    toString = (()=>{return this.username+" "+this.matricule+" "+this.shippingAddress})
    
} 
// hashPassword() {
    //     this.password = bcrypt.hashSync(this.password, 8);
    //   }
    
    // checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    //     return bcrypt.compareSync(unencryptedPassword, this.password);
    //   }