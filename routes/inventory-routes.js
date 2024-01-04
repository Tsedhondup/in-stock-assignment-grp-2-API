const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL INVENTORY FROM ALL WAREHOUSES
router
  .route("/")
  .get((req, res, next) => {
    if (req.query.sort_by === 'item_name'|| req.query.sort_by === 'category') {
      return inventoryController.inventorySort(req, res, next);
    } else {
      return inventoryController.inventory(req, res, next);
    }
  })
  .post(inventoryController.addItem);

router
  .route("/:id")
  .get(inventoryController.findOneItem)
  .patch(inventoryController.editItem)
  .delete(inventoryController.deleteInventoryItem);

//router.route("")

module.exports = router;
