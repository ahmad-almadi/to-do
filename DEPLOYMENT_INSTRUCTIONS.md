# Railway Deployment Instructions

## Project Structure
```
newest-to-do-list/
├── frontend/          # React frontend
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/           # Express backend
│   ├── src/
│   │   ├── db/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
├── package.json       # Root package.json with build scripts
└── railway.json       # Railway configuration
```

## Railway Configuration Steps

### 1. Railway Settings
- **Root Directory**: Leave EMPTY (or set to `/`)
- **Build Command**: `npm run build:frontend` (already in railway.json)
- **Start Command**: `npm start` (already in railway.json)

### 2. Environment Variables
Add these in Railway dashboard:
- `DATABASE_URL` - Should be automatically set when you link the PostgreSQL service
- `PORT` - Railway sets this automatically

### 3. Database Connection
- Make sure your PostgreSQL service is linked to your backend service
- The DATABASE_URL should be automatically available

### 4. Deploy
1. Push code to GitHub
2. Railway will automatically:
   - Run `npm install` in root
   - Run `npm run build:frontend` (builds React app to frontend/dist)
   - Run `npm start` (runs migrations and starts backend server)
3. Backend serves API at `/api/tasks` and frontend from `/`

## How It Works
1. Railway builds frontend: `cd frontend && npm install && npm run build`
2. Frontend builds to `frontend/dist/`
3. Backend starts: `cd backend && node src/db/migrate.js && node src/index.js`
4. Backend serves frontend static files from `frontend/dist/`
5. All routes go through one server on Railway

## Testing Locally
```bash
# Install all dependencies
npm run install:all

# Build frontend
npm run build:frontend

# Start backend (serves frontend + API)
npm start
```

Visit http://localhost:3000 - you'll see the frontend and API working together.
