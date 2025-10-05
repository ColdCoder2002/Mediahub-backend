import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);  
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1);
    }
}
// connectionInstance.connection.host → tells which host MongoDB is connected to (e.g. localhost or cluster).
// process.exit(1) → stops the Node.js app if DB connection fails (exit code 1 = error).
// These help in debugging connection issues and preventing app from running without a database.


// async/await → makes async code look synchronous, easier to read & handle errors with try/catch.
// Normal (sync) function can't wait for DB connection — JS will move ahead before connect() finishes.
// .then() / .catch() → alternative to async/await for Promises, but less clean in big projects.


export default connectDB;