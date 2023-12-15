const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL INVENTORY FROM ALL WAREHOUSES
router.route("/").get(inventoryController.inventory);


//router.route("")

module.exports = router;