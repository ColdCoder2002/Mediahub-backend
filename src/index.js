import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
    path:'./env'
})



//Best Practice
const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.log("Server Error: ", error);
            throw error;
        });

        const PORT = process.env.PORT || 8080;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on("error", (error) => {
            console.error("Server crashed:", error)
        });

    } catch (err) {
        console.log("MONGO DB connection failed !!!", err);
        process.exit(1);
    }
    // app.on("error") → catches runtime errors inside the Express app logic (e.g., middleware or route handler errors).
    // server.on("error") → catches low-level Node.js server errors (e.g., port conflicts, permission issues during startup).
    // process.exit(1) → ensures the app stops if DB connection fails, avoiding running in a half-broken state.
}
startServer();









/*  >>>First Approch to connect DB<<<
import express from "express";
const app = express();

( async()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Err: ", error);
            throw error
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Error: ", error);
        throw error
    }
})()
*/