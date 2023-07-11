import { deleteUser, editUser, getCamrails, getUsers, saveUser, signIn, updateUser } from "../controller/user.controller"
const express = require('express')
const auth = require('../controller/auth.controller')
const router = express.Router()

router.post('/user/saveUser',auth,saveUser)
// router.post('/user/saveUser',auth,saveUser)
router.post('/user/signIn',signIn)
router.get('/user/getUsers',auth,getUsers)
router.get('/user/getCamrails',auth,getCamrails)
router.get('/user/editUser/:id',auth,editUser)
router.delete('/user/deleteUser/:id',auth,deleteUser)
router.put('/user/updateUser',auth,updateUser)
//ng build --output-path pages --base-href /testcolombecamrail/ 
//git remote add origin https://github.com/Ngome201/colombecamrail.git
// git branch -M main
// git push -u origin main
// ng build --output-path docs --base-href /colombe/
// router.post('/saveUser',saveUser)
// router.post('/signIn',signIn)
// router.get('/getUsers',getUsers)
// router.get('/getCamrails',getCamrails)
// router.get('/editUser/:id',editUser)
// router.delete('/deleteUser/:id',deleteUser)
// router.put('/updateUser',updateUser)

module.exports = router