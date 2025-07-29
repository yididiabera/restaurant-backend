import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors())
app.use(express.json())

// basic health check route
app.get("/", (_req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running🚀",
        timestamp: new Date().toISOString()
    });
});

//routes
app.use("/api/auth", authRoutes);


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is runnig at port: ${PORT}`)
        });
    } catch (err) {
        console.log(`Failed to start a server`, err)
        process.exit(1);
    }
}

startServer();