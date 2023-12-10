const router = require('express').Router();
const warehouseController = require('../controllers/warehouse-controllers');

router.route('/').get(warehouseController.warehouses);

module.exports = router