import  express from "express";
const router = express.Router();

import {getNewCars, getNewCarById, getNewCarsByPriceAsc, getNewCarsByPriceDesc,
         createNewCar, updateNewCar, deleteNewCar,
        getUsedCars, getUsedCarById, 
        createUsedCar, updateUsedCar, deleteUsedCar } from '../controllers/CarsController.js';

//uz proslijeđeni /api/ iz server.js
router.route('/newcars').get(getNewCars).post(createNewCar);
router.route('/newcars/:id').get(getNewCarById).put(updateNewCar).delete(deleteNewCar);
router.route('/newcars/sort/asc').get(getNewCarsByPriceAsc);
router.route('/newcars/sort/desc').get(getNewCarsByPriceDesc);

router.route('/usedcars').get(getUsedCars).post(createUsedCar);
router.route('/usedcars/:id').get(getUsedCarById).put(updateUsedCar).delete(deleteUsedCar);

export default router;