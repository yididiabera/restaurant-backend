import express from "express"
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors())
app.use(express.json())

//routes

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is runnig at port: ${PORT}`)
        })
    } catch (err) {
        console.log(`Failed to start a server`, err)
        process.exit(1);
    }
}

startServer();