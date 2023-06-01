import { saveItem,getItems, editExerciseBook, editAccessory, editBook, updateExerciseBook, updateBook, updateAccessory } from "../controller/item.controller"
const express = require ("express")
const router = express.Router()

router.post('/item/saveItem',saveItem)
router.get('/item/listItems/:cat',getItems)
router.get('/item/editExerciseBook/:id',editExerciseBook)
router.get('/item/editBook/:id',editBook)
router.get('/item/editAccessory/:id',editAccessory)
router.put('/item/updateExerciseBook',updateExerciseBook)
router.put('/item/updateBook',updateBook)
router.put('/item/updateAccessory',updateAccessory)

// router.post('/saveItem',saveItem)
// router.get('/listItems/:cat',getItems)
// router.get('/editExerciseBook/:id',editExerciseBook)
// router.get('/editBook/:id',editBook)
// router.get('/editAccessory/:id',editAccessory)
// router.put('/updateExerciseBook',updateExerciseBook)
// router.put('/updateBook',updateBook)
// router.put('/updateAccessory',updateAccessory)
module.exports = router