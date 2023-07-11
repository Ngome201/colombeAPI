import { deleteSupplier, editSupplier, saveSupplier, suppliersList, updateSupplier  } from "../controller/supplier.controller"

const express = require ("express")
const router = express.Router()
const auth = require('../controller/auth.controller')

router.post('/supplier/saveSupplier',auth,saveSupplier);

router.get('/supplier/suppliersList',auth,suppliersList);

router.get('/supplier/editSupplier/:id',auth,editSupplier)

router.put('/supplier/updateSupplier',auth,updateSupplier)

router.delete('/supplier/deleteSupplier/:id',auth,deleteSupplier)
 
module.exports = router