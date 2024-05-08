import express from "express";
import moment from "moment";
import { ObjectId } from "mongodb";

const CalendarRouter = express.Router();

CalendarRouter.post('/', async (req, res) => {
    const db = req.app.get("db");

    try {
        const result = await db.collection("events").insertOne({...req.body});
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).end();
    }
})

CalendarRouter.get('/month/:year/:month/:day', async (req, res) => {
    const db = req.app.get("db");

    const monthEvents = await db.collection("events")
                                .find({ year: parseInt(req.params.year), month: parseInt(req.params.month) })
                                .sort({ startTime: 1 }).toArray();
    return res.json(monthEvents);
})

CalendarRouter.get('/week/:year/:month/:day', async (req, res) => {
    const db = req.app.get("db");
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const day = parseInt(req.params.day);

    const dayOfWeek = moment(`${year}/${month}/${day}`, "YYYY/MM/DD").weekday();
    const daysInCurrentMonth = moment(`${year}/${month}/${day}`, "YYYY/MM/DD").daysInMonth();
    
    let weekEvents = [];

    // Lower bound must have days from prev month
    if (day - dayOfWeek < 1) {
        let daysInPrevMonth = 0;
        if (month == 1) {
            daysInPrevMonth = moment(`${year - 1}/${12}/${1}`, "YYYY/MM/DD").daysInMonth();
        } else {
            daysInPrevMonth = moment(`${year}/${month - 1}/${1}`, "YYYY/MM/DD").daysInMonth();
        }

        const lowerBoundCurrMonth = 1;
        const upperBoundCurrMonth = day + (6 - dayOfWeek);
        const lowerBoundPrevMonth = daysInPrevMonth + (day - dayOfWeek);
        const upperBoundPrevMonth = daysInPrevMonth;

        let prevMonthWeekEvents = [];
        // Get events from prev month
        if (month == 1) {
            prevMonthWeekEvents = await db.collection("events")
                .find({ year: year - 1, month: 12, day: { $gte: lowerBoundPrevMonth, $lte: upperBoundPrevMonth } })
                .sort({ startTime: 1 }).toArray();
        } else {
            prevMonthWeekEvents = await db.collection("events")
                .find({ year: year, month: month - 1, day: { $gte: lowerBoundPrevMonth, $lte: upperBoundPrevMonth } })
                .sort({ startTime: 1 }).toArray();
        }

        // Get events from current month
        const currMonthWeekEvents = await db.collection("events")
            .find({ year: year, month: month, day: { $gte: lowerBoundCurrMonth, $lte: upperBoundCurrMonth } })
            .sort({ startTime: 1 }).toArray();

        weekEvents = prevMonthWeekEvents.concat(currMonthWeekEvents);
    }
    // Upper bound must have days from next month
    else if ((day + (6 - dayOfWeek)) > daysInCurrentMonth) {
        let daysInNextMonth = 0;
        if (month == 12) {
            daysInNextMonth = moment(`${year + 1}/${1}/${1}`, "YYYY/MM/DD").daysInMonth();
        } else {
            daysInNextMonth = moment(`${year}/${month + 1}/${1}`, "YYYY/MM/DD").daysInMonth();
        }

        const lowerBoundCurrMonth = day - dayOfWeek;
        const upperBoundCurrMonth = daysInCurrentMonth;
        const lowerBoundNextMonth = 1;
        const upperBoundNextMonth = 6 - (daysInCurrentMonth - lowerBoundCurrMonth);

        let nextMonthWeekEvents = [];
        // Get events from prev month
        if (month == 12) {
            nextMonthWeekEvents = await db.collection("events")
                .find({ year: year + 1, month: 1, day: { $gte: lowerBoundNextMonth, $lte: upperBoundNextMonth } })
                .sort({ startTime: 1 }).toArray();
        } else {
            nextMonthWeekEvents = await db.collection("events")
                .find({ year: year, month: month + 1, day: { $gte: lowerBoundNextMonth, $lte: upperBoundNextMonth } })
                .sort({ startTime: 1 }).toArray();
        }

        // Get events from current month
        const currMonthWeekEvents = await db.collection("events")
            .find({ year: year, month: month, day: { $gte: lowerBoundCurrMonth, $lte: upperBoundCurrMonth } })
            .sort({ startTime: 1 }).toArray();

        weekEvents = nextMonthWeekEvents.concat(currMonthWeekEvents);
    }
    else {
        const lowerBound = day - dayOfWeek;
        const upperBound = day + (6 - dayOfWeek);
        weekEvents = await db.collection("events")
            .find({ year: year, month: month, day: { $gte: lowerBound, $lte: upperBound } })
            .sort({ startTime: 1 }).toArray();
    }

    return res.json(weekEvents);
})

CalendarRouter.get('/day/:year/:month/:day', async (req, res) => {
    const db = req.app.get("db");

    const dayEvents = await db.collection("events")
                                .find({ year: parseInt(req.params.year), month: parseInt(req.params.month), day: parseInt(req.params.day) })
                                .sort({ startTime: 1 }).toArray();
    return res.json(dayEvents);
})

CalendarRouter.get('/:eventId', async (req, res) => {
    const db = req.app.get("db");

    const event = await db.collection("events").findOne({ _id: new ObjectId(`${req.params.eventId}`) });
    return res.json(event);
})

CalendarRouter.delete('/:eventId', async (req, res) => {
    const db = req.app.get("db");

    const deletedEvent = await db.collection("events").deleteOne({ _id: new ObjectId(`${req.params.eventId}`) });
    return res.json(deletedEvent);
})

CalendarRouter.patch('/:eventId', async (req, res) => {
    const db = req.app.get("db");
    const {eventName, startTime, endTime} = req.body;

    const updatedEvent = await db.collection("events").updateOne({ _id: new ObjectId(`${req.params.eventId}`) }, 
    { $set: {eventName: eventName, startTime: parseFloat(startTime), endTime: parseFloat(endTime)} });

    return res.json(updatedEvent);
})

export default CalendarRouter;