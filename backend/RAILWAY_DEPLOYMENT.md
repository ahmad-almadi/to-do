# Railway Deployment Guide

## Step-by-Step Deployment

### 1. Prepare Your Project

Make sure you're in the server directory:
```bash
cd newest-to-do-list/server
```

### 2. Create Railway Account

Go to [railway.app](https://railway.app) and sign up with GitHub.

### 3. Deploy via Railway Dashboard (Recommended)

1. Click "New Project" in Railway dashboard
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account and select your repository
4. Railway will detect the Node.js project automatically

### 4. Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a PostgreSQL instance
4. The `DATABASE_URL` environment variable will be set automatically

### 5. Configure Environment Variables

Railway auto-sets `DATABASE_URL`, but you can add more if needed:
- Go to your service → Variables tab
- Add any additional variables from `.env.example`

### 6. Set Root Directory (Important!)

Since your backend is in a subdirectory:
1. Go to Settings tab
2. Set "Root Directory" to `newest-to-do-list/server`
3. Save changes

### 7. Run Database Migration

After first deployment:
1. Go to your service in Railway
2. Click on "Settings" → "Deploy"
3. Add a custom start command temporarily: `npm run migrate && npm start`
4. Or use Railway CLI:
```bash
railway run npm run migrate
```

### 8. Deploy

Railway will automatically deploy on every push to your main branch.

### 9. Get Your Backend URL

1. Go to Settings → Networking
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://your-app.railway.app`)

### 10. Update Frontend

Update your frontend `.env` file:
```
VITE_API_URL=https://your-app.railway.app/api
```

## Alternative: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add

# Deploy
railway up

# Run migrations
railway run npm run migrate
```

## Verify Deployment

Test your API:
```bash
curl https://your-app.railway.app/health
```

## Troubleshooting

- Check logs in Railway dashboard under "Deployments"
- Ensure `DATABASE_URL` is set correctly
- Verify the root directory is set to `newest-to-do-list/server`
- Make sure migrations ran successfully
