const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL INVENTORY FROM ALL WAREHOUSES
router.route("/inventory").get(inventoryController.inventories);

//GET ALL INVENTORY FROM WAREHOUSE WITH GIVEN ID
router.route("/inventory/:warehouse_id").get(inventoryController.findInventoryForWarehouse);

router.route("")

module.exports = router;