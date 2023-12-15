const knex = require("knex")(require("../knexfile"));

// FIND ALL INVENTORY
const inventory = (_req, res) => {
  knex("warehouses")
  .join("inventories", "inventories.warehouse_id", "=", "warehouses.id")
    .then((data) => {
      // Create respond body
      console.log(data);
      const inventoryList = data.map((element) => {
        return (inventoryObject = {
          id: element.id,
          warehouse_name: element.warehouse_name,
          item_name: element.item_name,
          description: element.description,
          category: element.category,
          status: element.status,
          quantity: element.quantity,
        });
      });
      res.status(200).json(inventoryList);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving Inventories: ${err}`);
    });
};

// find all inventory with given warehouse id
const findInventoryForWarehouse = (req, res) => {
  knex("inventories")
    .where({ warehouse_id: req.params.warehouse_id })
    .then((inventoryFound) => {
      if (inventoryFound.length === 0) {
        return res;
      }

      return res.status(200).json(inventoryFound);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve inventory data for warehouse with ID: ${req.params.id}`,
      });
    });
};

module.exports = {
  findInventoryForWarehouse,
  inventory,
};
