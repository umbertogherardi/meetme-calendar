import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();

async function connect() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  return client.db('meetme-db').collection('logins');
}

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const loginsCollection = await connect();

  try {
    // Check if the username already exists
    const existingUser = await loginsCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new user
    await loginsCollection.insertOne({ username, password });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const loginsCollection = await connect();

  try {
    // Find the user by username
    const user = await loginsCollection.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
