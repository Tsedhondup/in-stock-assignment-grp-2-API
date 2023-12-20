const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

router
  .route("/")
  .get(warehouseController.warehouses)
  .post(warehouseController.addWarehouse);

//GET SINGLE WAREHOUSE
router
  .route("/:id")
  .get(warehouseController.findOne)
  .patch(warehouseController.editWarehouse);

router
  .route("/:warehouseId/inventories")
  .get(warehouseController.findInventoryForWarehouse);

router.route("");

module.exports = router;
