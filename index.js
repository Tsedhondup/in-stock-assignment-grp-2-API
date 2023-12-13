const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const warehouseRoutes = require("./routes/warehouse-routes");
const inventoryRoutes = require("./routes/inventory-routes");

app.get("/", (req, res) => {
  res.send("Welcome to Our API");
});

app.use(express.json());

// Use CORS middleware
app.use(cors());

// all warehouse routes
app.use("/warehouses", warehouseRoutes);
// all inventory routes
app.use("/warehouses", inventoryRoutes);


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
