const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").get(warehouseController.warehouses);

//GET SINGLE WAREHOUSE
router.route("/:id").get(warehouseController.findOne);

router.route("")

router
  .route("/:id")
  .get(warehouseController.findOne)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;
