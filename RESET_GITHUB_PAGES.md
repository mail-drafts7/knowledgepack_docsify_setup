# 🔄 Reset GitHub Pages Deployment

## Overview
This guide shows you how to delete an existing GitHub Pages deployment and set it up fresh from scratch.

---

## Step 1: Delete Current GitHub Pages Deployment

### 1.1 Go to Repository Settings
1. Open browser and go to: `https://github.com/mail-drafts7/knowledgepack_docsify_setup`
2. Click **"Settings"** tab (top right of repository page)

### 1.2 Find Pages Section
1. In the **left sidebar**, scroll down to **"Pages"**
2. Click on **"Pages"**

### 1.3 Disable GitHub Pages
1. You should see your current deployment status
2. Under **"Build and deployment"** → **"Source"**
3. Select **"None"** (this disables GitHub Pages)
4. Click **"Save"**
5. You should see: "GitHub Pages is currently disabled"

### 1.4 Delete GitHub Pages Environment (Optional)
1. Go to **"Settings"** → **"Environments"** (in left sidebar)
2. If you see **"github-pages"** environment, click on it
3. Click **"Delete environment"**
4. Confirm deletion by typing "github-pages"
5. Click **"I understand the consequences, delete this environment"**

---

## Step 2: Clear GitHub Actions (Optional)

### 2.1 Stop Running Workflows
1. Go to **"Actions"** tab
2. If any workflows are currently running, click on them
3. Click **"Cancel workflow"** to stop them

### 2.2 Clear Workflow History (Optional)
1. In **"Actions"** tab, you can see all past runs
2. You can leave them (they don't hurt) or manually delete by clicking each one and clicking "Delete"

---

## Step 3: Clean Up Local Files (Optional)

### 3.1 Remove Cache Files
On your local machine, in the project folder:

```bash
# Remove any cache files
rm -f .nav-cache

# Remove any build artifacts
rm -rf dist/
rm -rf _site/

# Remove node modules and reinstall (optional)
rm -rf node_modules/
npm install
```

---

## Step 4: Fresh GitHub Pages Setup

### 4.1 Enable GitHub Pages Again
1. Go to **"Settings"** → **"Pages"** (same as Step 1.2)
2. Under **"Build and deployment"** → **"Source"**:

**Option A - GitHub Actions (Recommended):**
- Select **"GitHub Actions"**
- You should see: "Use a workflow from your repository"

**Option B - Deploy from Branch:**
- Select **"Deploy from a branch"**
- **Branch**: `main`
- **Folder**: `/ (root)`
- Click **"Save"**

### 4.2 Enable Actions (if needed)
1. Go to **"Actions"** tab
2. If disabled, click **"I understand my workflows, go ahead and enable them"**

---

## Step 5: Trigger Fresh Deployment

### 5.1 Make a Small Change and Push
On your local machine:

```bash
# Make a small change to trigger deployment
echo "# Fresh deployment $(date)" >> README.md

# Commit and push
git add .
git commit -m "Fresh GitHub Pages deployment"
git push origin main
```

### 5.2 Watch New Deployment
1. Go to **"Actions"** tab
2. You should see **"Deploy Knowledge Pack to GitHub Pages"** starting
3. Click on it to watch progress
4. Wait for green checkmark (success)

---

## Step 6: Verify Fresh Deployment

### 6.1 Check Pages Status
1. Go to **"Settings"** → **"Pages"**
2. You should see: **"Your site is published at https://mail-drafts7.github.io/knowledgepack_docsify_setup"**

### 6.2 Test Your Refreshed Site
Open these URLs in **new private/incognito browser windows** (to avoid cache):

**Documentation:**
```
https://mail-drafts7.github.io/knowledgepack_docsify_setup
```

**Admin Dashboard:**
```
https://mail-drafts7.github.io/knowledgepack_docsify_setup/admin/
```

---

## 🔧 Troubleshooting Fresh Deployment

### Problem: Old site still showing
**Solutions:**
1. Use **hard refresh**: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. Open in **private/incognito browser**
3. Clear browser cache completely
4. Wait 10-15 minutes for DNS propagation

### Problem: 404 errors on fresh site
**Solutions:**
1. Check **Actions** tab for deployment errors
2. Make sure all files were pushed to GitHub
3. Verify repository is still public

### Problem: Admin dashboard not working
**Solutions:**
1. Check if repository is public
2. Try logging out and back in to GitHub
3. Clear browser cache and cookies

---

## ⚡ Quick Reset Commands

If you want to do everything quickly:

```bash
# Local cleanup
rm -f .nav-cache
rm -rf dist/ _site/

# Fresh commit
git add .
git commit -m "Reset GitHub Pages deployment"
git push origin main
```

Then follow Steps 1 and 4 above in GitHub dashboard.

---

## 🎯 When to Use This Guide

- GitHub Pages is not updating properly
- You're seeing old cached content
- Admin dashboard stopped working
- You want a completely fresh start
- Deployment is stuck or failed

**After following this guide, you'll have a completely fresh GitHub Pages deployment!** ✨
