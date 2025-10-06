# 🚀 Complete Deployment & Workflow Guide

## Overview
This guide covers the complete setup for deploying your Knowledge Pack with Decap CMS using free hosting services and GitHub workflow integration.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   GitHub Repo   │    │  GitHub Pages   │    │    Netlify      │
│    (develop)    │───▶│ (Documentation) │    │  (CMS Admin)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       ▼                       ▼
         │              https://your-site.           https://cms-
         │              github.io/repo               admin.netlify.app
         │
         ▼
  ┌─────────────────┐
  │ Editorial Flow  │
  │ (PR Workflow)   │
  └─────────────────┘
```

## 📋 Step-by-Step Deployment

### Step 1: GitHub Pages Setup (Documentation Site)

1. **Enable GitHub Pages:**
   - Go to your repository: `https://github.com/mail-drafts7/knowledgepack_docsify_setup`
   - Navigate to Settings → Pages
   - Source: Deploy from a branch → `develop` branch
   - Folder: `/ (root)`
   - Save the settings

2. **The GitHub Action will automatically:**
   - Build your documentation from the `develop` branch
   - Deploy to GitHub Pages
   - Your site will be available at: `https://mail-drafts7.github.io/knowledgepack_docsify_setup`

### Step 2: Netlify Setup (CMS Dashboard)

1. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - Branch to deploy: `develop`
     - Build command: `npm run build`
     - Publish directory: `docs`
   - Deploy site

2. **Enable Netlify Identity:**
   - In Netlify dashboard → Site settings → Identity
   - Enable Identity service
   - Set registration to "Invite only" or "Open" based on your needs
   - Enable Git Gateway in Identity settings

3. **Configure GitHub OAuth:**
   - In Netlify Identity → Settings → External providers
   - Enable GitHub provider
   - Add GitHub OAuth credentials (if you created a GitHub OAuth app)

### Step 3: Configure Editorial Workflow

The `admin/config.yml` is already configured with:
- **Editorial workflow enabled** (`publish_mode: editorial_workflow`)
- **Branch targeting develop** (`branch: develop`)
- **Local development support** (`local_backend: true`)

## 🔄 Complete Workflow Process

### For Content Creators:

1. **Access CMS Dashboard:**
   - Visit your Netlify site URL + `/admin/`
   - Login with GitHub credentials
   - Start creating/editing content

2. **Content Creation Flow:**
   ```
   Create/Edit Content → Save Draft → Publish → Creates PR → Review → Merge
   ```

3. **What happens automatically:**
   - Draft changes are saved in CMS
   - Publishing creates a Pull Request to `develop` branch
   - PR triggers preview deployment
   - After merge, main site updates

### For Reviewers:

1. **Review Process:**
   - Receive PR notification on GitHub
   - Review changes in GitHub interface
   - Check preview deployment
   - Approve or request changes
   - Merge to `develop` branch

2. **Merge Conflict Resolution:**
   - GitHub will show conflicts in PR
   - Use GitHub web editor or local git to resolve
   - CMS will show conflict status
   - Re-submit after resolution

## 🔧 Local Development

### Setup Local Environment:
```bash
# Clone repository
git clone https://github.com/mail-drafts7/knowledgepack_docsify_setup.git
cd knowledgepack_docsify_setup

# Switch to develop branch
git checkout develop

# Install dependencies
npm install

# Start CMS proxy server (Terminal 1)
npm run dev

# Start documentation server (Terminal 2)
npm start

# Access locally:
# Documentation: http://localhost:3000
# CMS Admin: http://localhost:3000/admin/
```

## 🔐 Authentication Setup

### GitHub OAuth (Production):
1. Create GitHub OAuth App:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - New OAuth App with these settings:
     - App name: `Knowledge Pack CMS`
     - Homepage URL: `https://your-netlify-site.netlify.app`
     - Authorization callback: `https://api.netlify.com/auth/done`

2. Configure in Netlify:
   - Add GitHub OAuth credentials in Netlify Identity settings
   - Enable Git Gateway

### Local Development:
- Uses proxy server authentication
- No OAuth setup required
- Full CMS functionality available locally

## 🚀 Available URLs After Deployment

| Service | URL | Purpose |
|---------|-----|---------|
| **Documentation** | `https://mail-drafts7.github.io/knowledgepack_docsify_setup` | Public documentation site |
| **CMS Admin** | `https://your-site.netlify.app/admin/` | Content management dashboard |
| **GitHub Repository** | `https://github.com/mail-drafts7/knowledgepack_docsify_setup` | Source code and content |
| **Local Development** | `http://localhost:3000` | Local documentation |
| **Local CMS** | `http://localhost:3000/admin/` | Local CMS interface |

## 📝 Content Management Features

### Available Collections:
1. **📚 Documentation** - Main content pages
2. **🧭 Site Navigation** - Sidebar menu management  
3. **⚙️ Site Configuration** - Main README and settings

### Editorial Features:
- ✅ **Draft/Publish workflow**
- ✅ **Pull Request creation**
- ✅ **Content preview**
- ✅ **Media upload support**
- ✅ **Markdown editing with preview**
- ✅ **Search functionality**
- ✅ **Conflict resolution support**

## 🔧 Troubleshooting

### Common Issues:

1. **CMS not loading:**
   - Check if Netlify Identity is enabled
   - Verify GitHub OAuth configuration
   - Check browser console for errors

2. **Authentication failed:**
   - Verify OAuth app callback URLs
   - Check GitHub repository permissions
   - Ensure Git Gateway is enabled

3. **Local development issues:**
   - Ensure proxy server is running (`npm run dev`)
   - Check if ports 3000 and 8081 are available
   - Verify all dependencies are installed

4. **Deployment failures:**
   - Check GitHub Actions logs
   - Verify package.json build scripts
   - Check Netlify build logs

## 📊 Cost Analysis (All Free!)

| Service | Cost | Limits |
|---------|------|--------|
| **GitHub Pages** | Free | Public repos, 1GB storage, 100GB bandwidth/month |
| **Netlify** | Free | 300 build minutes/month, 100GB bandwidth |
| **GitHub Actions** | Free | 2000 minutes/month for public repos |
| **Domain** | Optional | Can use free subdomains |

**Total Monthly Cost: $0** 🎉

## 🎯 Next Steps

1. Complete the deployment following this guide
2. Test the complete workflow
3. Invite team members to Netlify Identity
4. Set up branch protection rules (optional)
5. Configure custom domain (optional)
6. Add team workflow documentation

## 🔗 Quick Links

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docsify Documentation](https://docsify.js.org/)
