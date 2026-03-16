import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes FIRST
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

app.use('/api/tasks', taskRoutes);

// Check if dist folder exists - try multiple locations
let distPath = path.join(process.cwd(), 'dist');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Checking dist at:', distPath);
console.log('Dist exists:', existsSync(distPath));

// If not found, try relative to server
if (!existsSync(distPath)) {
  distPath = path.join(__dirname, '../../dist');
  console.log('Trying alternate path:', distPath);
  console.log('Dist exists:', existsSync(distPath));
}

// List what's actually in the working directory
console.log('Files in cwd:', require('fs').readdirSync(process.cwd()));

if (existsSync(distPath)) {
  // Serve static files from React build
  app.use(express.static(distPath));

  // Serve React app for all other routes (MUST be last)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.warn('⚠️  Dist folder not found. Frontend will not be served.');
  app.get('*', (req, res) => {
    res.json({ 
      error: 'Frontend not built',
      message: 'The frontend build folder was not found. Run npm run build first.',
      distPath: distPath
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
