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

CalendarRouter.get('/year/:year/month/:month', async (req, res) => {
    const db = req.app.get("db");

    const monthEvents = await db.collection("events")
                                .find({ year: parseInt(req.params.year), month: parseInt(req.params.month) })
                                .sort({}).toArray();
    return res.json(monthEvents);
})

export default CalendarRouter;