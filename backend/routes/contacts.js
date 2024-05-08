import express from "express";

const ContactRouter = express.Router();

ContactRouter.get('/:username', async (req, res) => {
    const db = req.app.get("db");

    const contactsList = await db.collection("contacts").find({ username: req.params.username }).toArray();
    return res.json(contactsList);
})

ContactRouter.get('/add/:username', async (req, res) => {
    const db = req.app.get("db");

    const newContact = await db.collection("logins").findOne({ username: req.params.username });
    
    if (newContact === null) {
        return res.status(404).json(newContact);
    } else {
        return res.status(200).json(newContact);
    }
})

ContactRouter.post('/', async (req, res) => {
    const db = req.app.get("db");

    try {
        const result = await db.collection("contacts").insertOne({...req.body});
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).end();
    }
})

export default ContactRouter;