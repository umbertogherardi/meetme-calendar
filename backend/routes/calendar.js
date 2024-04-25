import express from "express";

const CalendarRouter = express.Router();

CalendarRouter.get('/month', async (req, res) => {
    return res.status(200);
})

export default CalendarRouter;