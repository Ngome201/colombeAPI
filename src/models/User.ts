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
        address : string,
        // password : string, 
        matricule:string,
        role : string,
        cni : String)
        {
        super();
        this.username = username 
        this.lastname = lastname 
        this.tel = tel 
        this.address = address 
        // this.password = password 
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
    
    @Column()
    address : string;

    @Column()
    cni : String

    @Column({ default : "00000"})
    matricule : string;

    @Column({enum : ['admin','camrail','staff'], default: 'camrail'})
    role : string;

    @OneToMany('Command',(command:Command)=>{command.user},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    commands : Array<Command>

    toString = (()=>{return this.username+" "+this.matricule+" "+this.address})
    
} 
// hashPassword() {
    //     this.password = bcrypt.hashSync(this.password, 8);
    //   }
    
    // checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    //     return bcrypt.compareSync(unencryptedPassword, this.password);
    //   }