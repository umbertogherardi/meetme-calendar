import express from "express";
import { ObjectId } from "mongodb";
import moment from "moment";

const CalendarRouter = express.Router();

let monthData = {
    "currentYear": moment().year(),
    "currentMonth": moment().month(),
    "currentDay": moment().date(),
    "daysInMonth": moment().daysInMonth(),
    "startOfMonth": (moment().date() - (7 * (moment().date() % 7))) - moment().day() + 1
}

CalendarRouter.get('/month', async (req, res) => {
    return res.json(monthData);
})

export default CalendarRouter;