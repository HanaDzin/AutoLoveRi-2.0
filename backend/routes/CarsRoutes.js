import express from "express";
const router = express.Router();

import {
  getNewCars,
  getNewCarById,
  getNewCarsByPriceAsc,
  getNewCarsByPriceDesc,
  getNewCarsModelByBrands,
  createNewCar,
  updateNewCar,
  deleteNewCar,
  getUsedCars,
  getUsedCarById,
  createUsedCar,
  updateUsedCar,
  deleteUsedCar,
  getNewCarBrands,
  getFilteredNewCars,
} from "../controllers/CarsController.js";

router.route("/newcars").get(getNewCars).post(createNewCar);
router.route("/newcars/filter").get(getFilteredNewCars);
router.route("/newcars/brands").get(getNewCarBrands);
router.route("/newcars/models/:brand").get(getNewCarsModelByBrands);

router
  .route("/newcars/:id")
  .get(getNewCarById)
  .put(updateNewCar)
  .delete(deleteNewCar);
router.route("/newcars/sort/asc").get(getNewCarsByPriceAsc);
router.route("/newcars/sort/desc").get(getNewCarsByPriceDesc);

router.route("/usedcars").get(getUsedCars).post(createUsedCar);
router
  .route("/usedcars/:id")
  .get(getUsedCarById)
  .put(updateUsedCar)
  .delete(deleteUsedCar);

export default router;
