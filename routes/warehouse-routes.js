const router = require("express").Router();
const { inventory } = require("../controllers/inventory-controllers");
const warehouseController = require("../controllers/warehouse-controllers");


  router
  .route("/")
  .get((req, res, next) => {
    const validSortFields = ["warehouse_name", "city", "contact_name", "contact_email"];
    const sortBy = req.query.sort_by;

    if (sortBy && validSortFields.includes(sortBy)) {
      return warehouseController.warehouseSort(req, res, next);
    } else {
      return warehouseController.warehouses(req, res, next);
    }
  })
  .post(warehouseController.addWarehouse);

//GET SINGLE WAREHOUSE
router
  .route("/:id")
  .get(warehouseController.findOne)
  .patch(warehouseController.editWarehouse)
  .delete(warehouseController.deleteWarehouse);

router
  .route("/:warehouseId/inventories")
  .get(warehouseController.findInventoryForWarehouse)

router.route("");

module.exports = router;
