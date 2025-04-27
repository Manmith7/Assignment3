import express from 'express';
import dotenv from "dotenv";
import DBConnection from './db.js';
import { Incident } from './model.js';
import mongoose from 'mongoose';

dotenv.config({ path: './.env' });

const app = express();
DBConnection();  
app.use(express.json());


app.get('/api/incidents', async (req, res) => {
    try {
        const incidents = await Incident.find();
        return res.status(200).json(incidents);
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong while getting data"
        });
    }
});

app.post('/api/incidents', async (req, res) => {
    const { title, description, servity } = req.body;

    if (!title || !description || !servity) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const allowedServity = ['Low', 'Medium', 'High'];
    if (!allowedServity.includes(servity)) {
        return res.status(400).json({
            message: "Servity should be Low, Medium, or High"
        });
    }

    try {
        const incident = await Incident.create({ title, description, servity });
        return res.status(201).json({
            id: incident._id,
            title: incident.title,
            description: incident.description,
            reported_at: incident.createdAt,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong while creating the incident."
        });
    }
});

app.get('/api/incidents/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const incident = await Incident.findById(id);
        if (!incident) {
            return res.status(404).json({ message: "Incident not found" });
        }
        return res.status(200).json(incident);
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong while getting data"
        });
    }
});

app.delete('/api/incidents/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const incident = await Incident.deleteOne({ _id: id });
        if (incident.deletedCount === 0) {
            return res.status(404).json({ message: "Incident not found" });
        }
        return res.status(200).json({ message: 'Incident deleted successfully' });
    } catch (error) {
        return res.status(400).json({
            message: "Something went wrong while deleting data"
        });
    }
});


app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
});
