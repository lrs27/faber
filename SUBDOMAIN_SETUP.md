# Portfolio Display Guide

## Overview
This guide explains how to set up and access user portfolios using regular server routes (no subdomains required).

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

- `https://yourdomain.com/u/johndoe` → Shows John's main portfolio

## Database Migration

Run the migration to add new fields:

```bash
cd frontend
npx prisma migrate dev --name add_username_and_main_portfolio
npx prisma generate
```

This creates the `username` field on Users and `isMainPortfolio` on Portfolios.

## Troubleshooting

### Username Already Taken
- Usernames must be unique
- Check database for existing username
- Consider adding suffix (e.g., `username2`)

### Portfolio Not Displaying
- Ensure portfolio is marked as `isPublished: true`
- Verify user has set a main portfolio or has at least one published portfolio
- Check API endpoint `/api/portfolio/user/[username]` response

## Security Considerations

1. **Username Validation:** Usernames are sanitized and validated server-side
2. **Published Only:** Only published portfolios are accessible publicly
3. **Rate Limiting:** Consider adding rate limiting to prevent abuse
4. **HTTPS Required:** Always use HTTPS in production for security

## Future Enhancements

- Custom domain support (e.g., `johndoe.com` → user's portfolio)
- Username reservation/verification
- Analytics per user
- SEO optimization per user portfolio
- Social media preview cards (Open Graph)
