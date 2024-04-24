import express from "express";
import { ObjectId } from "mongodb";

const CalendarRouter = express.Router();


CalendarRouter.get('/month', async (req, res) => {
    const db = req.app.get("db");

    let monthData = {
        "daysInMonth": 30,
        "currentDay": 12,
        "startOfMonth": 3
    }

    return res.json(monthData);
})

export default CalendarRouter;