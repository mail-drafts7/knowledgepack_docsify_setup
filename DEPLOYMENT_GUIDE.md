# 🚀 Complete Deployment & Workflow Guide (Credit-Free!)

## Overview
This guide covers deploying your Knowledge Pack with Decap CMS using **GitHub Pages exclusively** - completely free with no credit limits or billing surprises.

## 🏗️ Simple Architecture (No Credit Issues!)

```
┌─────────────────┐    
│   GitHub Repo   │    
│     (main)      │───▶┌─────────────────────────────────┐
│                 │    │        GitHub Pages             │
└─────────────────┘    │  (Documentation + CMS Admin)   │
         │              │                                 │
         │              └─────────────────────────────────┘
         │                              │
         │                              ▼
         │              https://mail-drafts7.github.io/
         │              knowledgepack_docsify_setup
         ▼
  ┌─────────────────┐
  │ Editorial Flow  │
  │ (PR Workflow)   │
  └─────────────────┘
```

**Single URL for everything:**
- **Documentation**: `https://mail-drafts7.github.io/knowledgepack_docsify_setup`
- **CMS Dashboard**: `https://mail-drafts7.github.io/knowledgepack_docsify_setup/admin/`

## 📋 Step-by-Step Deployment (GitHub Pages Only!)

### Step 1: Enable GitHub Pages

1. **Go to Repository Settings:**
   - Navigate to: `https://github.com/mail-drafts7/knowledgepack_docsify_setup`
   - Click on "Settings" tab
   - Scroll down to "Pages" section

2. **Configure Pages:**
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/ (root)`
   - Click "Save"

3. **Automatic Deployment:**
   - GitHub Action will trigger automatically
   - Builds both documentation and CMS admin
   - Site will be live at: `https://mail-drafts7.github.io/knowledgepack_docsify_setup`

### Step 2: Access Your Sites

**After deployment (usually takes 2-5 minutes):**

| What | URL | Description |
|------|-----|-------------|
| **Documentation Site** | `https://mail-drafts7.github.io/knowledgepack_docsify_setup` | Your main documentation |
| **CMS Admin Dashboard** | `https://mail-drafts7.github.io/knowledgepack_docsify_setup/admin/` | Content management interface |

### Step 3: CMS Configuration (Already Done!)

Your `admin/config.yml` is pre-configured with:
- ✅ **GitHub backend** pointing to your repository
- ✅ **Editorial workflow** for PR-based content management
- ✅ **Main branch** as the target
- ✅ **Local development** support

## 🔄 Complete Workflow Process

### For Content Creators:

1. **Access CMS Dashboard:**
   - Visit: `https://mail-drafts7.github.io/knowledgepack_docsify_setup/admin/`
   - Login with GitHub credentials (direct GitHub OAuth)
   - Start creating/editing content

2. **Content Creation Flow:**
   ```
   Create/Edit Content → Save Draft → Publish → Creates PR → Review → Merge
   ```

3. **What happens automatically:**
   - Draft changes are saved in CMS
   - Publishing creates a Pull Request to `main` branch
   - PR triggers GitHub Pages rebuild
   - After merge, live site updates automatically

### For Reviewers:

1. **Review Process:**
   - Receive PR notification on GitHub
   - Review changes in GitHub interface
   - Check the changes in the PR diff
   - Approve or request changes
   - Merge to `main` branch

2. **Merge Conflict Resolution:**
   - GitHub will show conflicts in PR interface
   - Use GitHub web editor or local git to resolve conflicts
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
     - Homepage URL: `https://mail-drafts7.github.io/knowledgepack_docsify_setup`
     - Authorization callback: `https://api.github.com/auth/done`

2. Configure GitHub Authentication:
   - Use GitHub OAuth App credentials in your hosting environment
   - Enable repository access for the CMS

### Local Development:
- Uses proxy server authentication
- No OAuth setup required
- Full CMS functionality available locally

## 🚀 Available URLs After Deployment

| Service | URL | Purpose |
|---------|-----|---------|
| **Documentation** | `https://mail-drafts7.github.io/knowledgepack_docsify_setup` | Public documentation site |
| **CMS Admin** | `https://mail-drafts7.github.io/knowledgepack_docsify_setup/admin/` | Content management dashboard |
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
   - Verify GitHub OAuth configuration
   - Check browser console for errors
   - Ensure DecapCMS can access your repository

2. **Authentication failed:**
   - Verify OAuth app callback URLs
   - Check GitHub repository permissions
   - Ensure proper GitHub authentication setup

3. **Local development issues:**
   - Ensure proxy server is running (`npm run dev`)
   - Check if ports 3000 and 8081 are available
   - Verify all dependencies are installed

4. **Deployment failures:**
   - Check GitHub Actions logs
   - Verify package.json build scripts
   - Check GitHub Pages deployment status

## 📊 Cost Analysis (All Free!)

| Service | Cost | Limits |
|---------|------|--------|
| **GitHub Pages** | Free | Public repos, 1GB storage, 100GB bandwidth/month |
| **GitHub Actions** | Free | 2000 minutes/month for public repos |
| **Domain** | Optional | Can use free subdomains |

**Total Monthly Cost: $0** 🎉

## 🎯 Next Steps

1. Complete the deployment following this guide
2. Test the complete workflow
3. Invite team members to collaborate on GitHub
4. Set up branch protection rules (optional)
5. Configure custom domain (optional)
6. Add team workflow documentation

## 🔗 Quick Links

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Docsify Documentation](https://docsify.js.org/)
