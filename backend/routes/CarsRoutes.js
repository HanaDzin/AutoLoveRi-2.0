import  express from "express";
const router = express.Router();

import {getNewCars, getNewCarById, createNewCar, updateNewCar, deleteNewCar,
        getUsedCars, getUsedCarById, createUsedCar, updateUsedCar, deleteUsedCar } from '../controllers/CarsController.js';

import { admin, protect } from '../middleware/authMiddleware.js'


//uz proslijeđeni /api/ iz server.js
router.route('/newcars').get(getNewCars).post(protect, createNewCar);
router.route('/newcars/:id').get(getNewCarById).put(updateNewCar).delete(deleteNewCar);

router.route('/usedcars').get(getUsedCars).post(createUsedCar);
router.route('/usedcars/:id').get(getUsedCarById).put(updateUsedCar).delete(deleteUsedCar);


export default router;