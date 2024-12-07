import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import groupRoutes from './routes/groupRecognition.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
    try {
        const mongoURI = 'mongodb://127.0.0.1:27017/group-management';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        // More detailed error information
        if (err.message.includes('ECONNREFUSED')) {
            console.error('Make sure MongoDB is running on your machine.');
            console.error('1. Check if MongoDB service is running');
            console.error('2. Try running MongoDB manually: mongod --dbpath C:\\data\\db');
        }
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);

// Create uploads directory if it doesn't exist
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadsDir = join(__dirname, 'uploads');
if (!existsSync(uploadsDir)) {
    mkdir(uploadsDir);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
