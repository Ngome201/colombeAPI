import { globalListStockAccessory, globalListStockBook, globalListStockExerciseBook, listStockAccessory, listStockBook, listStockExerciseBook, saveStockAccessory, saveStockBook, saveStockExerciseBook } from "../controller/stock.controller";
const express = require ("express")
const router = express.Router()
const auth = require('../controller/auth.controller')

router.get('/stock/listStockExerciseBook/:id',auth,listStockExerciseBook);
router.get('/stock/listStockBook/:id',auth,listStockBook);
router.get('/stock/listStockAccessory/:id',auth,listStockAccessory);

router.get('/stock/globalListStockExerciseBook',auth,globalListStockExerciseBook);
router.get('/stock/globalListStockBook',auth,globalListStockBook);
router.get('/stock/globalListStockAccessory',auth,globalListStockAccessory);

router.post('/stock/saveStockExerciseBook/:id',auth,saveStockExerciseBook);
router.post('/stock/saveStockBook/:id',auth,saveStockBook);
router.post('/stock/saveStockAccessory/:id',auth,saveStockAccessory);


// router.get('/listItems/:cat',getItems);
// router.post('/saveStockExerciseBook/:id',saveStockExerciseBook);
// router.post('/saveStockBook/:id',saveStockBook);
// router.post('/saveStockAccessory/:id',saveStockAccessory);


module.exports = router
