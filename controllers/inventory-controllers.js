const knex = require("knex")(require("../knexfile"));

// FIND ALL INVENTORY
const inventory = (_req, res) => {
  knex("warehouses")
    .join("inventories", "inventories.warehouse_id", "=", "warehouses.id")

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
  // checks if there are any expty fields
  if (!req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.quantity ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .json({ message: `Item with ID: ${req.params.id} has empty or undefined fields` });
  }
  // checks if quantity field is a number
  if (!Number(req.body.quantity)) {
    return res
      .status(400)
      .json({ message: `Item with ID: ${req.params.id} must have quantity of number type` });
  }

  // checks if the warehouse field is a warehouse that exsits
  knex("warehouses")
    .where({ id: req.body.warehouse_id })
    .then((warehouseFound) => {
      if (warehouseFound.length === 0) {
        return res
          .status(400)
          .json({ message: `Warehouse with ID: ${req.params.id} not found` });
      }
    });

  knex("inventories")
    .where({ id: req.params.id })
    .then((itemFound) => {
      if (itemFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Item with ID: ${req.params.id} not found` });
      }
    });

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
        .json({
          message: `Unable to update inventory with ID: ${req.params.id}`,
        });
// =======
//       return res
//         .status(404)
//         .json({ message: `Item with ID: ${req.params.id} not found` });
// >>>>>>> develop
    });

};

const deleteInventoryItem = (req, res) => {

  knex("inventories")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Inventory Item with ID: ${id} to be deleted not found.`,
        });
      }

      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete Inventory item" });
    });
};


module.exports = {
  inventory,
  findOneItem,
  editItem,
  deleteInventoryItem
};
