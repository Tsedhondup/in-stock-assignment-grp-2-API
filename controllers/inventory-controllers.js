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
      console.log(inventoryList)
      res.status(200).json(inventoryList);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving Inventories: ${err}`);
    });
};

const findOneItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .then((itemsFound) => {
      if (itemsFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Item with ID: ${req.params.id} not found` });
      }



      res.status(200).json(itemsFound);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve inventory data for item with ID: ${req.params.id}`,
      });
    });
};

const editItem = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => {
      return knex("inventories").where({
        id: req.params.id,
      });
    })
    .then((updatedInventory) => {
      res.json(updatedInventory[0]);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: `Unable to update inventory with ID: ${req.params.id}` });
    });
};




module.exports = {
  inventory,
  findOneItem,
  editItem,
};
