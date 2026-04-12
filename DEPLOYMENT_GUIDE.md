# Vercel Serverless Deployment Guide

## ✅ Migration Complete!

Your Express backend has been migrated to Vercel serverless functions. All API routes are now inside your Next.js app.

---

## 📁 What Changed

### New Files Created:
- `frontend/prisma/schema.prisma` - Database schema
- `frontend/src/lib/prisma.ts` - Serverless-optimized Prisma client
- `frontend/src/lib/auth.ts` - JWT authentication utilities
- `frontend/src/app/api/auth/signup/route.ts` - Signup endpoint
- `frontend/src/app/api/auth/login/route.ts` - Login endpoint
- `frontend/src/app/api/auth/google/route.ts` - Google OAuth endpoint
- `frontend/src/app/api/auth/me/route.ts` - Get current user endpoint
- `frontend/src/app/api/users/[userId]/route.ts` - Get user by ID
- `frontend/src/app/api/users/[userId]/portfolios/route.ts` - Get user's portfolios
- `frontend/src/app/api/evaluation/score/route.ts` - Portfolio evaluation
- `frontend/src/app/api/health/route.ts` - Health check endpoint

### Updated Files:
- `frontend/package.json` - Added backend dependencies
- `frontend/vercel.json` - Updated build command

---

## 🚀 Deployment Steps

### 1. Install Dependencies
```bash
cd faber/frontend
npm install
```

### 2. Set Up Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```env
DATABASE_URL=your-neon-connection-string
JWT_SECRET=your-random-secret-key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id (optional)
GOOGLE_CLIENT_SECRET=your-google-secret (optional)
```

**Important:** Your Neon database URL should look like:
```
postgresql://username:password@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Run Prisma Migration

In your local environment (with DATABASE_URL pointing to Neon):
```bash
npx prisma generate
npx prisma db push
```

This will sync your Neon database with the Prisma schema.

### 4. Deploy to Vercel

Option A - Via GitHub:
```bash
git add .
git commit -m "Migrate backend to Vercel serverless"
git push
```
Vercel will auto-deploy on push.

Option B - Via Vercel CLI:
```bash
npm i -g vercel
vercel
```

---

## 🔧 API Endpoints

All endpoints are now relative to your Vercel domain:

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/me` - Get current user (requires Bearer token)

### Users
- `GET /api/users/:userId` - Get user by ID
- `GET /api/users/:userId/portfolios` - Get user's portfolios

### Evaluation
- `POST /api/evaluation/score` - Evaluate portfolio (not implemented)

### Health
- `GET /api/health` - Check API status

---

## 🔄 Update Frontend API Calls

Update any frontend code that calls your backend. Change from:

```javascript
// Old (separate backend)
const response = await fetch('http://localhost:5000/api/auth/login', ...)

// New (serverless)
const response = await fetch('/api/auth/login', ...)
```

---

## ✨ Benefits of Serverless

- **No separate hosting** - Everything in one Vercel project
- **Auto-scaling** - Handles traffic spikes automatically
- **Free tier** - 100GB-hours/month compute time
- **Global CDN** - Fast API responses worldwide
- **Zero cold starts** - With Vercel's edge network

---

## 🧪 Testing Locally

```bash
# Start dev server
npm run dev

# Test API endpoint
curl http://localhost:3000/api/health

# Open Prisma Studio
npm run prisma:studio
```

---

## ⚠️ Important Notes

1. **Connection Pooling**: The Prisma client is configured for serverless (singleton pattern)
2. **Neon Benefits**: Neon has built-in connection pooling perfect for serverless
3. **Environment Variables**: Make sure all env vars are set in Vercel dashboard
4. **Migrations**: Run `prisma db push` locally first, then deploy
5. **Old Backend**: You can now safely ignore the `/backend` folder

---

## 📊 Monitoring

Check your Vercel dashboard for:
- Function logs
- Performance metrics
- Error tracking
- Database connection count

---

## 🐛 Troubleshooting

**"Too many connections" error:**
- This is handled by the singleton Prisma client pattern

**"DATABASE_URL not found":**
- Add it to Vercel environment variables
- Redeploy after adding

**Build fails:**
- Check that Prisma generates: `npm run prisma:generate`
- Verify all dependencies are installed

**401 Unauthorized:**
- JWT_SECRET must match between environments
- Check Authorization header format: `Bearer <token>`

---

## 🎉 Next Steps

1. Test all endpoints locally
2. Push to GitHub
3. Verify Vercel deployment
4. Update any frontend API calls to use relative paths
5. Remove the old `/backend` folder (optional)

Your backend is now fully serverless on Vercel! 🚀
