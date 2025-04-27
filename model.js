import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    servity: {
        required: true,
        type: String,
        enum: ['Low', 'Medium', 'High'], 
    },
}, { timestamps: true });

export const Incident = mongoose.model('Incident', incidentSchema);
