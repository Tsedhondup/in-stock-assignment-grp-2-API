const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL INVENTORY FROM ALL WAREHOUSES
router.route("/").get(inventoryController.inventory);

//GET ALL INVENTORY FROM WAREHOUSE WITH GIVEN ID
router.route("/:warehouse_id").get(inventoryController.findInventoryForWarehouse);

//router.route("")

module.exports = router;