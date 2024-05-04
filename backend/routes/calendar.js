import express from "express";

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

CalendarRouter.get('/day/:year/:month/:day', async (req, res) => {
    const db = req.app.get("db");

    const monthEvents = await db.collection("events")
                                .find({ year: parseInt(req.params.year), month: parseInt(req.params.month), day: parseInt(req.params.day) })
                                .sort({ startTime: 1 }).toArray();
    return res.json(monthEvents);
})


export default CalendarRouter;