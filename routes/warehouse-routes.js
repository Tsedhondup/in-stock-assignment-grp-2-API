const router = require("express").Router();
const { inventory } = require("../controllers/inventory-controllers");
const warehouseController = require("../controllers/warehouse-controllers");

router
  .route("/")
  .get((req, res, next) => {
    if (req.query.sort_by ==='warehouse_name'){
      return warehouseController.warehousesSortByName(req,res, next);
    } else {
      return warehouseController.warehouses(req,res, next);
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
