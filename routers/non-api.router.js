import express from "express";

const nonApiRouter = express.Router();

nonApiRouter.get("/", (req, res) => {
    res.send("Check out our v1 Library API here: /api/v1");
});

export default nonApiRouter;