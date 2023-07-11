import 'reflect-metadata';
import { DataSource } from 'typeorm';
import{Accessory, Supplier,Stock, Bill, BillItem, Book, Command, ExerciseBook,  User} from './models'

 export const AppDataSource = new DataSource({
    type : "sqlite",
    database : "./db/main.sqlite3",
    entities : [User,
                Bill,
                BillItem,
                Book,
                Supplier,
                ExerciseBook,
                Accessory,
                Command,
                Stock
                ],
    synchronize : true
})
