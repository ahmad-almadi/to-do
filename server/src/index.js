import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

app.use('/api/tasks', taskRoutes);

// Serve static frontend files
const distPath = path.join(__dirname, '../../dist');
app.use(express.static(distPath));

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
