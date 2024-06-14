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
  getUsedCarsByPriceAsc,
  getUsedCarsByPriceDesc,
  getUsedCarsModelByBrands,
  createUsedCar,
  updateUsedCar,
  deleteUsedCar,
  getNewCarBrands,
  getUsedCarBrands,
  getFilteredNewCars,
  getFilteredUsedCars,
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
router.route("/usedcars/filter").get(getFilteredUsedCars);
router.route("/usedcars/brands").get(getUsedCarBrands);
router.route("/usedcars/models/:brand").get(getUsedCarsModelByBrands);
router
  .route("/usedcars/:id")
  .get(getUsedCarById)
  .put(updateUsedCar)
  .delete(deleteUsedCar);
  router.route("/usedcars/sort/asc").get(getUsedCarsByPriceAsc);
  router.route("/usedcars/sort/desc").get(getUsedCarsByPriceDesc);

export default router;
