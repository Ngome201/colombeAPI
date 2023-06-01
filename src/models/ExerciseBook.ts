import {Entity,PrimaryGeneratedColumn,Column,ManyToOne, OneToMany} from 'typeorm';
import { BillItem } from './BillItem';
import { Item } from './Item';
import { Stock } from './Stock';
import { ExerciseBookStock } from './ExerciseBookStock';

@Entity()
export class ExerciseBook extends Item{
    constructor(
        designation : string,
        quantity : number,
        price : number,
        type : string,
        shape : string,
        pages : number,
        mark : string
        )
        {
        super(designation,quantity,price);
        this.type = type 
        this.shape = shape
        this.pages = pages
        this.mark = mark
    }
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    type: string; //enum : [HC,HCsq,HCpl,TP,SQ,PL,normal,DL,spirale]

    @Column()
    shape : string; // enum : [A4,A5,A6]

    @Column()
    pages : number; 

    @Column()
    mark : string;// a mark can be either one element of this table or not[white,Lite,JeuneAfrique,safca...]

    @OneToMany('BillItem',(billItem:BillItem)=>{billItem.exerciseBook},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    billItems : Array<BillItem>

    @OneToMany('ExerciseBookStock',(stock:ExerciseBookStock)=>{stock.exerciseBook},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<ExerciseBookStock>

    toString = (()=>{return this.designation+" "+this.pages+"p "+this.type+" "+this.shape+" "+this.mark})
// example of returned : cahier 144p TP
}