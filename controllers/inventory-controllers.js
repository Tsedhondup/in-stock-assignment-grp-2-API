const knex = require("knex")(require("../knexfile"));

// FIND ALL INVENTORY
const inventories = (req, res) => {
    
}


// find all inventory with given warehouse id
const findInventoryForWarehouse = (req, res) => {
    knex("inventories")
      .where({ warehouse_id: req.params.warehouse_id })
      .then((inventoryFound) => {
        if (inventoryFound.length === 0) {
          return res
            .status(404)
            .json({ message: `Warehouse with ID: ${req.params.id} not found` });
        }
  
        const inventoryData = inventoryFound[0];
  
        return res.status(200).json(inventoryData);
      })
      .catch(() => {
        res.status(500).json({
          message: `Unable to retrieve inventory data for warehouse with ID: ${req.params.id}`,
        });
      });
  };

  module.exports = {
    findInventoryForWarehouse,
    inventories,
  };
  