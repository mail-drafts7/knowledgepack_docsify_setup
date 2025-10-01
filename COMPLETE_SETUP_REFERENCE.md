# Complete Setup Reference: Docsify + Netlify CMS

This comprehensive guide covers everything from local development to production hosting for your Docsify documentation site with Netlify CMS.

## Table of Contents
- [Local Development Setup](#local-development-setup)
- [GitHub Authentication Setup](#github-authentication-setup)
- [Hosting & Deployment](#hosting--deployment)
- [Commands Reference](#commands-reference)
- [Troubleshooting](#troubleshooting)
- [Project Configuration](#project-configuration)

---

## Local Development Setup

### Prerequisites
- Node.js (version 12 or higher)
- npm or yarn
- Git installed
- GitHub account
- Code editor (VS Code recommended)

### Step 1: Clone & Setup Project
```bash
# Clone the repository
git clone git@github.com:mail-drafts7/knowledgepack_docsify_setup.git
cd knowledgepack_docsify_setup

# Install dependencies
npm install

# Install Docsify CLI globally
npm install -g docsify-cli
```

### Step 2: Choose Development Mode

#### Option A: Local Development (No GitHub Auth Required)
**Best for: Content editing, testing, development**

1. **Enable Local Backend**
   ```bash
   # Edit admin/config.yml and change:
   local_backend: false
   # to:
   local_backend: true
   ```

2. **Start Development Servers**
   ```bash
   # Terminal 1: Start CMS proxy server
   npx netlify-cms-proxy-server
   
   # Terminal 2: Start Docsify server
   docsify serve .
   ```

3. **Access Your Site**
   - Documentation: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin/` (no login required)

#### Option B: GitHub Integration (Production-like)
**Best for: Testing production setup, team collaboration**

1. **Keep GitHub Backend**
   ```yaml
   # In admin/config.yml:
   local_backend: false
   ```

2. **Start Docsify Only**
   ```bash
   docsify serve .
   ```

3. **Setup GitHub OAuth** (see next section)

---

## GitHub Authentication Setup

### Understanding the Authentication Flow

**Without GitHub Auth (`local_backend: true`)**:
- Changes saved to local files only
- No authentication required
- Perfect for development and content creation
- Changes need manual git push

**With GitHub Auth (`local_backend: false`)**:
- Changes committed directly to GitHub
- Requires user authentication
- Real-time collaboration
- Production-ready setup

### Setting Up GitHub OAuth App

#### Step 1: Create OAuth Application
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click **"New OAuth App"**
3. Fill in the details:
   ```
   Application name: Netlify CMS - [Your Site Name]
   Homepage URL: https://your-domain.com (or http://localhost:3000 for dev)
   Authorization callback URL: https://api.netlify.com/auth/done
   ```
4. Click **"Register application"**
5. **Save the Client ID and Client Secret**

#### Step 2: For Localhost Development (Advanced)
If you want GitHub auth on localhost:

1. **Create Development OAuth App**
   ```
   Application name: Netlify CMS - Local Dev
   Homepage URL: http://localhost:3000
   Authorization callback URL: https://api.netlify.com/auth/done
   ```

2. **Use Netlify Dev** (recommended approach):
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Start dev server with Netlify integration
   netlify dev
   ```

#### Step 3: Repository Permissions
Ensure your GitHub user has:
- Write access to the repository
- Admin access for OAuth app configuration
- Proper branch protection rules if needed

---

## Hosting & Deployment

### Option 1: Netlify Deployment (Recommended)

#### Step 1: Deploy to Netlify
1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository

2. **Configure Build Settings**
   ```
   Build command: (leave empty or use: echo "Static site")
   Publish directory: /
   ```

3. **Deploy Site**
   - Click "Deploy site"
   - Note your site URL: `https://amazing-name-123456.netlify.app`

#### Step 2: Setup Netlify Identity & CMS Authentication
1. **Enable Identity**
   - Go to Site settings → Identity
   - Click "Enable Identity"

2. **Configure External Providers**
   - In Identity settings, click "External providers"
   - Add GitHub provider:
     ```
     Client ID: [Your OAuth App Client ID]
     Client Secret: [Your OAuth App Client Secret]
     ```

3. **Update OAuth App Callback URL**
   - In GitHub OAuth app settings, update callback URL:
   ```
   https://your-netlify-site.netlify.app/.netlify/identity/callback
   ```

4. **Configure Git Gateway**
   - In Netlify Identity settings
   - Enable "Git Gateway"
   - This allows CMS to commit to your repo

#### Step 3: Update CMS Configuration
```yaml
# admin/config.yml - Production settings
backend:
  name: git-gateway
  branch: main

local_backend: false

# Rest of your configuration...
```

#### Step 4: Invite Users (Optional)
- In Netlify Identity, invite team members
- They can register and access the CMS

### Option 2: GitHub Pages Deployment

#### Step 1: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Choose source: "Deploy from a branch"
3. Select branch: `main`
4. Select folder: `/ (root)`

#### Step 2: Configure Custom Domain (Optional)
1. Add CNAME file to repository root:
   ```
   your-domain.com
   ```
2. In GitHub Pages settings, add custom domain
3. Enable "Enforce HTTPS"

#### Step 3: CMS Authentication Limitation
**Important**: GitHub Pages doesn't support server-side authentication.
For CMS functionality, you need:
- Netlify Identity (even with GitHub Pages hosting)
- Or use local development for content editing

### Option 3: Vercel Deployment

#### Step 1: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Step 2: Configure Domain
- Follow Vercel dashboard instructions
- Add custom domain if needed

#### Step 3: Authentication
Similar to Netlify, you'll need external authentication service for CMS.

---

## Commands Reference

### Development Commands
```bash
# Install global dependencies
npm install -g docsify-cli netlify-cms-proxy-server netlify-cli

# Local development (no auth)
npx netlify-cms-proxy-server &
docsify serve .

# Local development with Netlify integration
netlify dev

# Custom port
docsify serve . --port 3001

# Production build test
docsify serve . --port 8080
```

### Git Commands
```bash
# Check status
git status

# Add and commit changes
git add .
git commit -m "Update documentation"

# Push to GitHub
git push origin main

# Create new branch
git checkout -b feature/new-content
```

### Deployment Commands
```bash
# Netlify deployment
netlify deploy --prod

# Vercel deployment
vercel --prod

# Manual GitHub Pages (if auto-deploy fails)
git push origin main
```

### Content Management
```bash
# Create new doc file
touch docs/new-feature.md

# Update sidebar
nano docs/_sidebar.md

# Check for broken links
docsify serve . --port 3000
# Then manually check links in browser
```

---

## Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use
```bash
# Error: Port 3000 is already in use
# Solution: Use different port
docsify serve . --port 3001

# Or kill process using port 3000
lsof -ti:3000 | xargs kill
```

#### 2. CMS Login Issues
**Problem**: Can't access admin panel at `/admin/`

**Solutions**:
- Check `local_backend` setting in `admin/config.yml`
- Verify proxy server is running (for local backend)
- Check browser console for errors
- Clear browser cache and cookies

#### 3. GitHub Authentication Failures
**Problem**: "Failed to authenticate with GitHub"

**Solutions**:
- Verify OAuth app Client ID and Secret
- Check callback URL configuration
- Ensure user has repository access
- Try different browser or incognito mode

#### 4. Build/Deployment Failures
**Problem**: Site doesn't deploy correctly

**Solutions**:
- Check build logs in hosting platform
- Verify file paths are correct
- Ensure all dependencies are listed
- Test locally before deploying

#### 5. Content Not Saving
**Problem**: Changes in CMS don't appear

**Solutions**:
- Check GitHub commits (for GitHub backend)
- Verify local files (for local backend)
- Refresh browser and clear cache
- Check CMS configuration in `config.yml`

### Debug Mode
Enable debug logging:
```bash
# For Docsify
DEBUG=* docsify serve .

# For Netlify CMS
# Add to admin/index.html:
<script>
  window.CMS_MANUAL_INIT = true;
  window.netlifyIdentity = {
    debug: true
  };
</script>
```

---

## Project Configuration

### File Structure Explained
```
knowledgepack_docsify_setup/
├── index.html              # Main Docsify configuration
├── package.json            # Node.js dependencies
├── COMPLETE_SETUP_REFERENCE.md # This guide
├── RUN_PROJECT.md         # Quick start guide
├── AUTHENTICATION_SETUP.md # Auth troubleshooting
├── admin/
│   ├── index.html         # Netlify CMS interface
│   └── config.yml         # CMS configuration
└── docs/                  # Documentation content
    ├── README.md          # Homepage content
    ├── _sidebar.md        # Navigation menu
    └── *.md              # Documentation pages
```

### Key Configuration Files

#### `index.html` - Docsify Configuration
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Knowledge Pack</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: 'Knowledge Pack',
      repo: 'https://github.com/mail-drafts7/knowledgepack_docsify_setup',
      loadSidebar: true,
      subMaxLevel: 2,
      search: 'auto'
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
</body>
</html>
```

#### `admin/config.yml` - CMS Configuration
```yaml
# Backend configuration
backend:
  name: github  # or git-gateway for Netlify
  repo: https://github.com/mail-drafts7/knowledgepack_docsify_setup
  branch: main

# Local development
local_backend: false  # Set to true for local dev

# File management
media_folder: "docs/assets"
public_folder: "/assets"

# Content collections
collections:
  - name: "docs"
    label: "Documentation"
    folder: "docs"
    create: true
    slug: "{{slug}}"
    extension: "md"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
```

### Environment-Specific Settings

#### Development Environment
```yaml
# admin/config.yml
local_backend: true
backend:
  name: github
  repo: https://github.com/mail-drafts7/knowledgepack_docsify_setup
  branch: main
```

#### Production Environment
```yaml
# admin/config.yml
local_backend: false
backend:
  name: git-gateway  # For Netlify
  # OR
  name: github       # For direct GitHub integration
  repo: https://github.com/mail-drafts7/knowledgepack_docsify_setup
  branch: main
```

---

## Quick Start Checklists

### 🚀 First Time Setup
- [ ] Clone repository
- [ ] Install Node.js and npm
- [ ] Run `npm install`
- [ ] Install `docsify-cli` globally
- [ ] Choose development mode (local vs GitHub)
- [ ] Start development servers
- [ ] Access site at `http://localhost:3000`
- [ ] Test admin panel at `http://localhost:3000/admin/`

### 🔐 GitHub Authentication Setup
- [ ] Create GitHub OAuth App
- [ ] Configure callback URLs
- [ ] Set up Netlify Identity (if using Netlify)
- [ ] Update `admin/config.yml`
- [ ] Test authentication flow
- [ ] Verify repository permissions

### 🌐 Production Deployment
- [ ] Choose hosting platform (Netlify/GitHub Pages/Vercel)
- [ ] Configure build settings
- [ ] Set up custom domain (optional)
- [ ] Configure CMS authentication
- [ ] Test deployment
- [ ] Invite team members (if needed)

### 📝 Content Management
- [ ] Understand file structure
- [ ] Learn Markdown syntax
- [ ] Update navigation sidebar
- [ ] Test content creation workflow
- [ ] Set up content review process

---

## Support & Resources

### Official Documentation
- [Docsify](https://docsify.js.org)
- [Netlify CMS](https://netlifycms.org)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)

### Useful Links
- [Markdown Guide](https://www.markdownguide.org)
- [Netlify Deploy Logs](https://app.netlify.com)
- [GitHub Repository Settings](https://github.com/mail-drafts7/knowledgepack_docsify_setup/settings)

### Getting Help
1. Check this documentation first
2. Review error messages and logs
3. Test in different browsers
4. Check GitHub issues in the repository
5. Refer to official documentation

---

*This reference guide covers the complete workflow from local development to production hosting. Bookmark this file for quick reference during setup and maintenance.*
