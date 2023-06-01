import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import { BookStock } from './BookStock';
import { Supplier } from './Supplier';
import { ExerciseBookStock } from './ExerciseBookStock';

@Entity()
export class ExerciseBookSupplier extends Supplier{
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

    @OneToMany('ExerciseBookStock',(stock:ExerciseBookStock)=>{stock.supplier},{onDelete : 'CASCADE', onUpdate : 'CASCADE'})
    stocks : Array<ExerciseBookStock>

}