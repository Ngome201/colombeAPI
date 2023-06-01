import { getItems } from "../controller/item.controller"
import { saveStockAccessory, saveStockBook, saveStockExerciseBook } from "../controller/stock.controller";
const express = require ("express")
const router = express.Router()

router.get('/stock/listItems/:cat',getItems);
router.post('/stock/saveStockExerciseBook/:id',saveStockExerciseBook);
router.post('/stock/saveStockBook/:id',saveStockBook);
router.post('/stock/saveStockAccessory/:id',saveStockAccessory);


// router.get('/listItems/:cat',getItems);
// router.post('/saveStockExerciseBook/:id',saveStockExerciseBook);
// router.post('/saveStockBook/:id',saveStockBook);
// router.post('/saveStockAccessory/:id',saveStockAccessory);


module.exports = router
