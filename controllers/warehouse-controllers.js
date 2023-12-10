const knex = require("knex")(require("../knexfile"));

const warehouses = (_req, res) => {
  knex("warehouses")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Warehouses: ${err}`)
    );
};

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

module.exports = {
  warehouses,
  findOne,
};
