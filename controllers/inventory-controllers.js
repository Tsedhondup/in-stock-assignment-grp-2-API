const knex = require("knex")(require("../knexfile"));

// FIND ALL INVENTORY
const inventory = (_req, res) => {
  knex("inventories")
    .join("warehouses", "inventories.warehouse_id", "warehouses.id")
    .then((data) => {
      // Create respond body
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




module.exports = {
  inventory,
};
