const express = require("express");
const cors = require("cors"); 

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

const equipamentRoutes = require("./routes/equipamentRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

app.use("/equipament", equipamentRoutes)
app.use("/auth", authRoutes)
module.exports = app;