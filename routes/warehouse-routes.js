const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").get(warehouseController.warehouses);

//GET SINGLE WAREHOUSE
router.route("/:id").get(warehouseController.findOne);

router.route("/:warehouseId/inventories").get(warehouseController.findInventoryForWarehouse);

router.route("")

module.exports = router;
