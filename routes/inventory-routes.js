const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controllers");

// GET ALL INVENTORY FROM ALL WAREHOUSES
router
  .route("/")
  .get((req, res, next) => {
    const validSortFields = ['item_name', 'category', 'status', 'quantity',  'warehouse_name'];
    const sortBy = req.query.sort_by;

    if (sortBy && validSortFields.includes(sortBy)) {
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
