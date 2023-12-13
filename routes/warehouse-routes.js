const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");
const inventoryController = require("../controllers/inventory-controllers");

router.route("/").get(warehouseController.warehouses);

//GET SINGLE WAREHOUSE
router.route("/:id").get(warehouseController.findOne);

router.route("/:warehouse_id/inventories").get(inventoryController.findInventoryForWarehouse);

router.route("")

module.exports = router;
