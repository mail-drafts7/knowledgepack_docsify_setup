# Netlify CMS Authentication Setup Guide

## Current Issue
You're seeing a login screen because `local_backend: false` requires GitHub OAuth setup. Simply approving GitHub access in the browser isn't enough - you need a configured OAuth application.

## Option 1: Use Local Development (Recommended for Development)

### Step 1: Enable Local Backend
Change `admin/config.yml`:
```yaml
local_backend: true  # Change this from false to true
```

### Step 2: Run with Proxy Server
```bash
# Install proxy server (one time)
npm install -g netlify-cms-proxy-server

# Start proxy server (in one terminal)
npx netlify-cms-proxy-server

# Start Docsify (in another terminal)
docsify serve .
```

### Step 3: Access Admin
- Documentation: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin/` (no login required)

## Option 2: Proper GitHub OAuth Setup (For Production)

If you want to keep `local_backend: false`, you need to set up GitHub OAuth:

### Step 1: Create GitHub OAuth App
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: `Netlify CMS for knowledgepack_docsify_setup`
   - Homepage URL: `http://localhost:3000` (or your domain)
   - Authorization callback URL: `https://api.netlify.com/auth/done`

### Step 2: Get Client ID and Secret
1. Note down the Client ID and Client Secret from the OAuth app

### Step 3: Configure Netlify Identity
1. Deploy your site to Netlify first
2. Go to Netlify dashboard → Site settings → Identity
3. Enable Identity
4. Add GitHub as external provider using your OAuth app credentials

### Step 4: Update Config
Add identity settings to your site (this is complex for local development)

## Why Authentication is Required with local_backend: false

When `local_backend: false`, Netlify CMS:
- Uses GitHub API to read/write files
- Requires user authentication to access your repository
- Needs proper OAuth flow setup
- Works best when deployed (not localhost)

## Recommendation

**For Development**: Use `local_backend: true`
- No authentication required
- Works immediately on localhost
- Changes saved to local files
- Perfect for content editing and testing

**For Production**: Use `local_backend: false` with proper Netlify deployment
- Requires GitHub OAuth setup
- Users authenticate with GitHub
- Changes committed directly to repository
- Best for live websites

## Quick Fix for Your Current Issue

Change one line in `admin/config.yml`:
```yaml
# Change this line:
local_backend: false

# To this:
local_backend: true
```

Then run:
```bash
npx netlify-cms-proxy-server &
docsify serve .
```

Your admin panel will work without any authentication!
