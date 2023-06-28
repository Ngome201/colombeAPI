import {AppDataSource} from './app'
import {Request,Response,NextFunction} from "express"
const express = require('express')
const user = require('./routers/user.routes')
const item = require('./routers/item.routes')
const supplier = require('./routers/supplier.routes')
const stock = require('./routers/stock.routes')
const bill = require('./routers/bill.routes')
const command = require('./routers/command.routes')
const bodyParser = require ('body-parser')
const cors = require ('cors') 
//const auth = require('./routers/auth.routes')
const session = require('express-session')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
//app.use('/auth',auth)
app.use (cors())
app.use(session({
    secret:'some secret',
    cookie: {maxAge: 30000},
    saveUninitialized : false

}))
try{
    
    AppDataSource.initialize().then(()=>console.log('connection established'))

}catch{
    console.log('connection has not been established')
} 

app.use((req : Request,res :Response,next : NextFunction)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept,Content-Type,Authorization');
   
    
    return next();
})
app.use('/colombe/api/v0',user,item,supplier,stock,bill,command)
// app.use('/user',user)
// app.use('/item',item)
// app.use('/supplier',supplier)
// app.use('/stock',stock)
// app.use('/bill',bill)
// app.use('/command',command)




app.listen(3000, ()=>{ console.log("app running on port 3000")})