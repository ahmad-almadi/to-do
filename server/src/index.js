import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readdirSync } from 'fs';
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

// Try to find dist folder
const possiblePaths = [
  path.join(process.cwd(), 'dist'),
  path.join(__dirname, '../../dist'),
  '/app/dist',
  path.join('/app', 'dist')
];

let distPath = null;
for (const p of possiblePaths) {
  if (existsSync(p)) {
    distPath = p;
    console.log('✅ Found dist folder at:', p);
    break;
  }
}

if (!distPath) {
  console.log('❌ Dist folder not found. Checked:');
  possiblePaths.forEach(p => console.log('  -', p));
  console.log('Current directory:', process.cwd());
  console.log('Files in current directory:', readdirSync(process.cwd()));
}

if (distPath && existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.json({ 
      error: 'Frontend not built',
      message: 'Run npm run build to create the frontend',
      checkedPaths: possiblePaths
    });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
