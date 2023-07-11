import {addBill, addBillItem, decBillItem, validateBill,detailsBill, cancelBill, addQuantity, deleteBillItem} from '../controller/bill.controller'

const express = require ("express")
const router = express.Router()
const auth = require('../controller/auth.controller')

router.post('/bill/addBill',auth,addBill)
router.put('/bill/addBillItem',auth,addBillItem)
router.put('/bill/decBillItem',auth,decBillItem)
router.put('/bill/deleteBillItem',auth,deleteBillItem)
router.put('/bill/addQuantity',auth,addQuantity)
router.put('/bill/validateBill',auth,validateBill)
router.get('/bill/detailsBill/:billId',auth,detailsBill)
router.put('/bill/cancelBill/:billId',auth,cancelBill)


// router.get('/addBill',addBill)
// router.get('/addBillItem/:billId/:itemId/:itemType',addBillItem)
// router.get('/decBillItem/:billId/:itemId/:itemType',decBillItem)
// router.get('/validateBill/:billId/:cni',validateBill)
// router.get('/detailsBill/:billId',detailsBill)
// router.get('/cancelBill/:billId',cancelBill)



module.exports = router