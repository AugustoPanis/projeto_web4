import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());  

import equipamentRoutes from "./routes/equipamentRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

app.use("/equipament", equipamentRoutes)
app.use("/client", clientRoutes);


export default app;