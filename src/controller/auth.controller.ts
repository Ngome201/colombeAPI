import { Response,Request,NextFunction } from "express"
const jwt = require('jsonwebtoken')

module.exports=(req : Request, res : Response, next : NextFunction)=>{
    const authHeader = req.header('Authorization');
    if(!authHeader){
        res.status(401).send('not authenticated')
    }
    console.log(authHeader)
    const token = authHeader.split(' ')[1];
    console.log(token)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token,'secretfortoken')
    } catch (error) { 
        res.status(500).send("internal server, token doesn't match")
    }
    if (!decodedToken) {
        req.isLoggedIn = true;
    } 
    next();
}