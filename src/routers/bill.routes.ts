import {addBill, addBillItem, decBillItem, validateBill,detailsBill, cancelBill} from '../controller/bill.controller'

const express = require ("express")
const router = express.Router()

router.get('/bill/addBill',addBill)
router.get('/bill/addBillItem/:billId/:itemId/:itemType',addBillItem)
router.get('/bill/decBillItem/:billId/:itemId/:itemType',decBillItem)
router.get('/bill/validateBill/:billId/:matricule',validateBill)
router.get('/bill/detailsBill/:billId',detailsBill)
router.get('/bill/cancelBill/:billId',cancelBill)


// router.get('/addBill',addBill)
// router.get('/addBillItem/:billId/:itemId/:itemType',addBillItem)
// router.get('/decBillItem/:billId/:itemId/:itemType',decBillItem)
// router.get('/validateBill/:billId/:cni',validateBill)
// router.get('/detailsBill/:billId',detailsBill)
// router.get('/cancelBill/:billId',cancelBill)



module.exports = router