
## Prereq

Before getting started, ensure you have these installed on your machine:

- Node.js

### Step 1: Clone

git clone https://github.com/lrs27/faber.git
cd faber

### Step 2: Install Dependencies

Install all dependencies for frontend, backend, and root:
npm run install-all

### Step 3: Configure Environment Variables

**Backend environment:**

`
# Create .env from the example file
cp backend/.env.example backend/.env

# Edit backend/.env and add the shared DATABASE_URL (sent through discord)

**Frontend environment:**
# Create .env from the example
cp frontend/.env.example frontend/.env


### Step 4: Initialize Database
npm run prisma:migrate -w backend

### Step 5: Start Development
npm run dev

You should see:
[0] Server running on http://localhost:5001
[1] ➜  Local:   http://localhost:3001/

## Accessing the Application

| **Frontend** | http://localhost:3001 | 3001 |
| **Backend** | http://localhost:5001 | 5001 |
| **Prisma Studio** | http://localhost:5555 | 5555 |

---

## Working with the Database

### Prisma Studio - Visual Database Manager
npm run prisma:studio -w backend

This opens a visual interface at http://localhost:5555 where you can:
- View all tables and records
- Insert, update, or delete data
- Explore relationships
Stop with `Ctrl+C`.


## Development Commands

```bash
npm run dev                        # Start frontend + backend
npm run dev -w frontend            # Frontend only
npm run dev -w backend             # Backend only
npm run prisma:studio -w backend   # Open Prisma Studio
npm run build                      # Build for production
```


## Stopping Servers
Press `Ctrl+C` in the terminal where `npm run dev` is running.

## Troubleshooting
### DATABASE_URL Not Found

1. Verify `backend/.env` exists
2. Check `DATABASE_URL` is in `backend/.env`
3. Restart: `npm run dev`

### Can't Connect to Database

1. Verify connection string is correct
2. Check database server is running

### Module Not Found

```bash
npm run install-all
```