import { deleteUser, editUser, getCamrails, getUsers, saveUser, signIn, updateUser } from "../controller/user.controller"
const express = require('express')
const router = express.Router()

router.post('/user/saveUser',saveUser)
router.post('/user/signIn',signIn)
router.get('/user/getUsers',getUsers)
router.get('/user/getCamrails',getCamrails)
router.get('/user/editUser/:id',editUser)
router.delete('/user/deleteUser/:id',deleteUser)
router.put('/user/updateUser',updateUser)

// router.post('/saveUser',saveUser)
// router.post('/signIn',signIn)
// router.get('/getUsers',getUsers)
// router.get('/getCamrails',getCamrails)
// router.get('/editUser/:id',editUser)
// router.delete('/deleteUser/:id',deleteUser)
// router.put('/updateUser',updateUser)

module.exports = router