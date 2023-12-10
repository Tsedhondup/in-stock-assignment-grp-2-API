const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;

const warehouseRoutes = require("./routes/warehouse-routes");

app.get("/", (req, res) => {
  res.send("Welcome to Our API");
});

app.use(express.json());

app.use("/warehouses", warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
