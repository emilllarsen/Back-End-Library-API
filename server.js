import express from "express";
import nonApiRouter from "./routers/non-api.router.js";
import apiV1Router from "./routers/api.v1.router.js";
import { connect as connect2DB, close as closeDB } from './config/db.js';
// Create express app
const libApp = express();

// Mounting routers
libApp.use("/",nonApiRouter);
libApp.use("/api/v1", apiV1Router);


// Establishing a connection to mongoDB before we start listening, aka before any interactions with the database can happen

await connect2DB();





libApp.get("/", (req, res) => {
    res.send("Server is running");
})



// Listen on a port
const httpServer = libApp.listen(process.env.BACKEND_APP_PORT);
httpServer.on("Listening", () => console.log("Our lib app", httpServer.address().port()));


function gracefulShutDown(){
    console.log("\nThe lib app is being shut down")
    httpServer.close( async ()=>{
        await closeDB(); // Doing some clean up closing connections to MongoDB
        process.exit(0) // Telling oout node process to stop. 
    })
}
process.on("SIGINT", gracefulShutDown)
process.on("SIGTERM", gracefulShutDown)