
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5050;

const warehouseRoutes = require("./routes/warehouse-routes");

app.get("/", (req, res) => {
  res.send("Welcome to Our API");
});

app.use(express.json());

// Use CORS middleware
app.use(cors());

// all warehouse routes
app.use('/warehouses', warehouseRoutes);


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
