import 'reflect-metadata';
import { DataSource } from 'typeorm';
import{Accessory, AccessoryStock, AccessorySupplier, Bill, BillItem, Book, BookStock, BookSupplier, Command, ExerciseBook,  ExerciseBookStock, ExerciseBookSupplier, User} from './models'

 export const AppDataSource = new DataSource({
    type : "sqlite",
    database : "./db/main.sqlite3",
    entities : [User,
                Bill,
                BillItem,
                Book,
                BookStock,
                BookSupplier,
                ExerciseBook,
                ExerciseBookStock,
                ExerciseBookSupplier,
                Accessory,
                AccessoryStock,
                AccessorySupplier,
                Command
                ],
    synchronize : true
})
