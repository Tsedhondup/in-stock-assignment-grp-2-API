const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL THE INVENTORIES
router.route("/").get(inventoryController.inventory);

module.exports = router;
