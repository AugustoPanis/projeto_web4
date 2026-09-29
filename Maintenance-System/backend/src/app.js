const express = require("express");
const cors = require("cors"); 

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const equipamentRoutes = require("./routes/equipamentRoutes.js");

app.use("/equipament", equipamentRoutes);

module.exports = app;