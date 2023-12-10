const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const warehouseRoutes = require('./routes/warehouse-routes')

app.use(express.json());

// all warehouse routes
app.use('/warehouses', warehouseRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});