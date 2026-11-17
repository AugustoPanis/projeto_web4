import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());  

import equipamentRoutes from "./routes/equipamentRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import { requireAuth } from "./middlewares/auth.js";
import technicianRoutes from "./routes/technicianRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import workOrderRoutes from "./routes/workOrderRoutes.js";




app.use("/equipament", requireAuth, equipamentRoutes);
app.use("/technician", requireAuth, technicianRoutes);
app.use("/category", requireAuth, categoryRoutes);
app.use("/location", requireAuth, locationRoutes);
app.use("/workOrder", requireAuth, workOrderRoutes);
app.use("/client", clientRoutes);
app.use(errorHandler);


export default app;