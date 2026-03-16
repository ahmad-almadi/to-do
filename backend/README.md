# Task Manager Backend

Node.js + Express + PostgreSQL backend for the Task Manager application.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your database credentials:
```
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
PORT=3000
```

4. Run migrations:
```bash
npm run migrate
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Deploy to Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
cd server
railway init
```

4. Add PostgreSQL database:
```bash
railway add
```
Select PostgreSQL from the list.

5. Link the database:
Railway will automatically set the `DATABASE_URL` environment variable.

6. Deploy:
```bash
railway up
```

7. Run migrations on Railway:
```bash
railway run npm run migrate
```

Your backend will be live at the URL provided by Railway!
