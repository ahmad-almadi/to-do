# Railway Setup - Separate Frontend & Backend

## Project Structure
```
newest-to-do-list/
├── frontend/          # React frontend
│   ├── railway.json   # Frontend Railway config
│   └── package.json
└── backend/           # Express backend
    ├── railway.json   # Backend Railway config
    └── package.json
```

## Railway Services Configuration

### 1. Backend Service (to-do-back)
- **Root Directory**: `/backend`
- **Environment Variables**:
  - `DATABASE_URL` (auto-set when you link PostgreSQL)
  - `PORT` (auto-set by Railway)
- **Build**: Automatic via railway.json
- **Start**: `node src/db/migrate.js && node src/index.js`

### 2. Frontend Service (to-do-front)
- **Root Directory**: `/frontend`
- **Environment Variables**:
  - `VITE_API_URL` = `https://to-do-back-production.up.railway.app/api` (YOUR BACKEND URL)
- **Build**: `npm install && npm run build`
- **Start**: `serve -s dist -l 3000`

### 3. Database Service (Postgres-vtc-to-do)
- Link this to the backend service only

## Steps to Deploy

### Backend:
1. Click on "to-do-back" service
2. Settings → Root Directory → Set to `/backend`
3. Settings → Environment → Make sure `DATABASE_URL` is set
4. Redeploy

### Frontend:
1. Click on "to-do-front" service
2. Settings → Root Directory → Set to `/frontend`
3. Settings → Environment → Add variable:
   - Name: `VITE_API_URL`
   - Value: `https://YOUR-BACKEND-URL.up.railway.app/api`
4. Redeploy

## Important Notes
- Frontend calls backend via the `VITE_API_URL` environment variable
- Backend must have CORS enabled (already done)
- Both services deploy from the same GitHub repo but different folders
