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

// API routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

app.use('/api/tasks', taskRoutes);

// Find dist folder - try multiple paths
const distPaths = [
  path.join(__dirname, '../../dist'),
  '/app/dist',
  path.join(process.cwd(), '../dist')
];

let distPath = null;
for (const p of distPaths) {
  if (existsSync(p)) {
    distPath = p;
    console.log('✅ Found dist at:', p);
    break;
  }
}

if (distPath) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  console.log('❌ No dist folder found. Checked:', distPaths);
  app.get('*', (req, res) => {
    res.json({ error: 'Frontend not found', checked: distPaths });
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
