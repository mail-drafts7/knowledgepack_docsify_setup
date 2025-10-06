---
title: Setup Guide
---

# Quick Setup Guide

## For Demo Purposes

This system is already set up and running! Here's how to use it:

### 🌐 View Documentation
- **Current Page**: You're viewing the live documentation
- **Navigation**: Use the sidebar to browse different sections
- **Search**: Type in the search box to find content

### ⚙️ Edit Content (Demo)
1. Open the [Admin Panel](http://localhost:3000/admin/) in a new tab
2. Click "Login with GitHub" (for demo, authentication is required)
3. Create or edit documentation pages
4. Changes publish automatically

## For Your Organization

### Step 1: Get the Code
```bash
git clone https://github.com/your-org/knowledge-base
cd knowledge-base
npm install
```

### Step 2: Start Development
```bash
npm start
# Opens at http://localhost:3000
```

### Step 3: Customize Content
- Edit files in the `docs/` folder
- Update navigation in `docs/_sidebar.md`
- Add your organization's branding

### Step 4: Deploy to Production
- Push changes to GitHub
- Enable GitHub Pages in repository settings  
- Your site goes live at `https://your-org.github.io/knowledge-base`

## Configuration Options

### Basic Settings
- **Site Name**: Edit `index.html`
- **Navigation**: Update `docs/_sidebar.md`
- **Homepage**: Modify `docs/README.md`

### Advanced Features
- **Custom Domain**: Configure in GitHub Pages settings
- **Team Access**: Manage in GitHub repository settings
- **Themes**: Customize CSS in `index.html`

## Need Help?

- Check the [FAQ](faq.md) for common questions
- Review [Features](features.md) for capabilities
- Contact your system administrator
