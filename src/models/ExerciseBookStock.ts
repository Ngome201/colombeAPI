import {Entity,PrimaryGeneratedColumn,Column,ManyToOne} from 'typeorm';
import { ExerciseBook } from './ExerciseBook';
import { Supplier } from './Supplier';
import { Stock } from './Stock';
import { ExerciseBookSupplier } from './ExerciseBookSupplier';

@Entity()
export class ExerciseBookStock extends Stock{
    constructor(
        designation : string,
        quantity : number,
        price : number)
        {
        super(designation,quantity,price);
    }
    @PrimaryGeneratedColumn()
    id : number;
    
    @ManyToOne(()=>ExerciseBook,(exerciseBook:ExerciseBook)=>{exerciseBook.stocks})
    exerciseBook : ExerciseBook
    
    @ManyToOne(()=>ExerciseBookSupplier,(supplier:ExerciseBookSupplier)=>{supplier.stocks})
    supplier : ExerciseBookSupplier
}