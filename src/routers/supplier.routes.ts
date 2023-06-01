import {saveBookSupplier,saveExerciseBookSupplier,saveAccessorySupplier,
        updateBookSupplier,updateExerciseBookSupplier,updateAccessorySupplier,
        listBookSupplier,listExerciseBookSupplier,listAccessorySupplier,
        editBookSupplier,editExerciseBookSupplier,editAccessorySupplier  } from "../controller/supplier.controller"

const express = require ("express")
const router = express.Router()

/**************************/
router.post('/supplier/saveBookSupplier',saveBookSupplier);
router.post('/supplier/saveExerciseBookSupplier',saveExerciseBookSupplier);
router.post('/supplier/saveAccessorySupplier',saveAccessorySupplier);

// router.post('/saveBookSupplier',saveBookSupplier);
// router.post('/saveExerciseBookSupplier',saveExerciseBookSupplier);
// router.post('/saveAccessorySupplier',saveAccessorySupplier);

/***************************/
router.get('/supplier/listBookSupplier',listBookSupplier);
router.get('/supplier/listExerciseBookSupplier',listExerciseBookSupplier);
router.get('/supplier/listAccessorySupplier',listAccessorySupplier);

// router.get('/listBookSupplier',listBookSupplier);
// router.get('/listExerciseBookSupplier',listExerciseBookSupplier);
// router.get('/listAccessorySupplier',listAccessorySupplier);

/**************************/
router.get('/supplier/editBookSupplier/:id',editBookSupplier)
router.get('/supplier/editExerciseBookSupplier/:id',editExerciseBookSupplier)
router.get('/supplier/editAccessorySupplier/:id',editAccessorySupplier)

// router.get('/editBookSupplier/:id',editBookSupplier)
// router.get('/editExerciseBookSupplier/:id',editExerciseBookSupplier)
// router.get('/editAccessorySupplier/:id',editAccessorySupplier)

/**************************/
router.put('/supplier/updateExerciseBookSupplier',updateExerciseBookSupplier)
router.put('/supplier/updateBookSupplier',updateBookSupplier)
router.put('/supplier/updateAccessorySupplier',updateAccessorySupplier)

// router.put('/updateExerciseBookSupplier',updateExerciseBookSupplier)
// router.put('/updateBookSupplier',updateBookSupplier)
// router.put('/updateAccessorySupplier',updateAccessorySupplier)

module.exports = router