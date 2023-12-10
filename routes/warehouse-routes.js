const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

//Index Route - GET ALL WareHouses - TBD by Maddison

//GET SINGLE WAREHOUSE
router.route("/:id").get(warehouseController.findOne);

module.exports = router;
