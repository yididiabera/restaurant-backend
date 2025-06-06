require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
// app.use("/auth", authRoutes);

// testing
app.get("/", (req, res) => {
  res.send("Restaurant API Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
