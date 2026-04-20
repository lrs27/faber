# Custom Subdomain Setup Guide

## Overview
This guide explains how to set up custom user subdomains (e.g., `username.faber.io`) for hosting user portfolios.

## Architecture

### User Flow
1. User creates an account and chooses a unique username
2. User creates one or more portfolios
3. User designates one portfolio as their "main portfolio"
4. User's main portfolio is accessible at `username.faber.io`

### Technical Implementation

#### 1. Database Schema
Added two new fields:
- **Users.username** - Unique username for subdomain routing
- **Portfolios.isMainPortfolio** - Boolean flag marking the main portfolio

#### 2. Next.js Middleware (`src/middleware.ts`)
- Intercepts all incoming requests
- Detects if request is from a subdomain (e.g., `johndoe.faber.io`)
- Rewrites subdomain requests to `/u/[username]` route
- Main domain (`faber.io`) routes normally

#### 3. Dynamic Portfolio Page (`/u/[username]`)
- Fetches user by username via API
- Loads their main portfolio (or first published portfolio as fallback)
- Renders portfolio sections dynamically based on template
- Increments view count

#### 4. API Endpoints

**GET `/api/portfolio/user/[username]`**
- Returns user's main published portfolio
- Falls back to first published portfolio if no main portfolio set
- Includes user profile data

**PATCH `/api/users/[userId]/settings`**
- Updates username (validates uniqueness and format)
- Sets main portfolio flag

## DNS Configuration

### Production Setup (faber.io)

#### Step 1: Wildcard DNS Record
Add a wildcard DNS record in your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare):

**Type:** A or CNAME  
**Name:** `*` (wildcard)  
**Value:** Your server IP or hosting domain  
**TTL:** 3600

Example for Vercel:
```
Type: CNAME
Name: *
Value: cname.vercel-dns.com
TTL: Auto
```

Example for Railway.app:
```
Type: CNAME
Name: *
Value: your-app.railway.app
TTL: Auto
```

#### Step 2: Update Environment Variables
In production `.env.production`:
```bash
NEXT_PUBLIC_MAIN_DOMAIN=faber.io
```

In Vercel/Railway deployment settings, add:
- Domain: `faber.io`
- Wildcard: `*.faber.io`

#### Step 3: Verify Setup
1. Deploy application with updated env vars
2. Test main domain: `https://faber.io`
3. Test subdomain: `https://testuser.faber.io`

### Local Development Setup

#### Step 1: Update Hosts File
To test subdomains locally, edit your hosts file:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`  
**Mac/Linux:** `/etc/hosts`

Add:
```
127.0.0.1 localhost
127.0.0.1 testuser.localhost
127.0.0.1 johndoe.localhost
```

#### Step 2: Access Locally
- Main site: `http://localhost:3000`
- User portfolio: `http://testuser.localhost:3000`

**Note:** Some browsers don't support `.localhost` subdomains. Use `.local` instead:
```
127.0.0.1 testuser.local
```
Then access: `http://testuser.local:3000`

## Usage

### Setting a Username

Users can set their username via the settings API:

```javascript
const response = await fetch(`/api/users/${userId}/settings`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'johndoe',
  }),
});
```

**Username Requirements:**
- Lowercase letters, numbers, hyphens, underscores only
- Must be unique across all users
- Cannot start/end with hyphen

### Setting Main Portfolio

```javascript
const response = await fetch(`/api/users/${userId}/settings`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mainPortfolioId: 'portfolio_abc123',
  }),
});
```

### Accessing User Portfolios

**Via Subdomain:**
- `https://johndoe.faber.io` → Shows John's main portfolio

**Via URL Path:**
- `https://faber.io/u/johndoe` → Same as above

## Database Migration

Run the migration to add new fields:

```bash
cd frontend
npx prisma migrate dev --name add_username_and_main_portfolio
npx prisma generate
```

This creates the `username` field on Users and `isMainPortfolio` on Portfolios.

## Vercel Deployment Configuration

In `vercel.json`, ensure wildcard routing is enabled:

```json
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/:path*"
    }
  ]
}
```

In Vercel dashboard:
1. Go to Settings → Domains
2. Add domain: `faber.io`
3. Add wildcard domain: `*.faber.io`
4. Verify both domains

## Troubleshooting

### Subdomain Not Working
- Check DNS propagation (can take 24-48 hours)
- Verify wildcard record is set correctly
- Check `NEXT_PUBLIC_MAIN_DOMAIN` environment variable
- Clear browser cache/DNS cache

### Username Already Taken
- Usernames must be unique
- Check database for existing username
- Consider adding suffix (e.g., `username2`)

### Portfolio Not Displaying
- Ensure portfolio is marked as `isPublished: true`
- Verify user has set a main portfolio or has at least one published portfolio
- Check API endpoint `/api/portfolio/user/[username]` response

### Middleware Not Detecting Subdomain
- Verify middleware matcher config in `src/middleware.ts`
- Check if subdomain is excluded from matcher
- Log hostname in middleware for debugging

## Security Considerations

1. **Username Validation:** Usernames are sanitized and validated server-side
2. **Published Only:** Only published portfolios are accessible publicly
3. **Rate Limiting:** Consider adding rate limiting to prevent abuse
4. **HTTPS Required:** Always use HTTPS in production for security

## Future Enhancements

- Custom domain support (e.g., `johndoe.com` → user's portfolio)
- Username reservation/verification
- Analytics per subdomain
- SEO optimization per user portfolio
- Social media preview cards (Open Graph)
