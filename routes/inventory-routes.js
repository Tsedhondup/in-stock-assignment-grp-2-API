const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL INVENTORY FROM ALL WAREHOUSES
router
  .route("/")
  .get(inventoryController.inventory)
  .post(inventoryController.addItem);

router
  .route("/:id")
  .get(inventoryController.findOneItem)
  .patch(inventoryController.editItem)
  .delete(inventoryController.deleteInventoryItem);

//router.route("")

module.exports = router;
