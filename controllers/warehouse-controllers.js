const knex = require("knex")(require("../knexfile"));

// Find all warehouses
const warehouses = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

// find warehouse with given warehouse id
const findOne = (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .then((warehouseFound) => {
      if (warehouseFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Warehouse with ID: ${req.params.id} not found` });
      }

      const warehousesData = warehouseFound[0];

      res.status(200).json(warehousesData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve warehouse data for warehouse with ID: ${req.params.id}`,
      });
    });
};

// find all inventory with given warehouse id
const findInventoryForWarehouse = (req, res) => {
  knex(`inventories`)
    .where({ warehouse_id: req.params.warehouseId })
    .then((inventoryFound) => {
      if (inventoryFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Item with ID: ${req.params.id} not found` });
      }

      return res.status(200).json(inventoryFound);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve inventory data for warehouse with ID: ${req.params.warehouseId}`,
      });
    });
};

const addWarehouse = (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    return res.status(400).send("Please provide values for all necessary data");
  }

  knex("warehouses")
    .insert(req.body)
    .then((result) => {
      return knex("warehouses").where({ id: result[0] });
    })
    .then((createdWarehouse) => {
      res.status(201).json(createdWarehouse);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to create new warehouse" });
    });
};

const editWarehouse = (req, res) => {
  // =======
  // const addWarehouse = (req, res) => {
  // >>>>>>> develop
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    res.status(400).json("Incomplete form");
  }

  //  GET ALL THE WAREHOUSES
  knex("warehouses").then((respond) => {
    // AND THEN FIND WAREHOUSE WHOSE ID === req.params.id
    const warehouseArray = respond.filter((item) => {
      return item.id == req.params.id;
    });
    /*
    # CHECK IF WAREHOUSE WITH PROVIDED ID IS FOUND IN DATABASE 
    # IF FOUND, TOTAL ITEM INSIDE wareHouse ARRAY WILL BE GREATER THEN ONE
    */
    if (warehouseArray.length < 1) {
      res.status(404).json({
        message: `Unable to update warehouse with ID: ${req.params.id}`,
      });
    } else {
      knex("warehouses")
        .where({ id: req.params.id })
        .update(req.body)
        .then(() => {
          return knex("warehouses").where({
            id: req.params.id,
          });
        })
        .then((updatedWarehouse) => {
          res.json(updatedWarehouse[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

const deleteWarehouse =  (req, res) => {
  knex("warehouses")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(400).json({
          message: `Warehuse with ID: ${req.params.id} to be deleted not found.`,
        });
      }

      // no content response
      res.status(204).send();
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete warehuse" });
    });
};

module.exports = {
  warehouses,
  findOne,
  findInventoryForWarehouse,
  addWarehouse,
  editWarehouse,
  deleteWarehouse
};
