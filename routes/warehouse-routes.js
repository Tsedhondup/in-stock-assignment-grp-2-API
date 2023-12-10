const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controllers");

router.route("/").get(warehouseController.warehouses);

//GET SINGLE WAREHOUSE
router.route("/:id").get(warehouseController.findOne);

module.exports = router;
