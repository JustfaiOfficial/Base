import express from "express";
import freelancerRoutes from "./routes/freelancerRoutes.routes.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/signup/freelancers", freelancerRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message });
});

export default app;
