# GitHub Pages Setup Instructions

## Step-by-Step GitHub Pages Configuration

### 1. Access Repository Settings
- Go to: `https://github.com/mail-drafts7/knowledgepack_docsify_setup`
- Click on **"Settings"** tab (top navigation)

### 2. Find GitHub Pages Section
- Scroll down in the left sidebar
- Look for **"Pages"** under "Code and automation" section
- Click on **"Pages"**

### 3. Configure Source
You should see a section that says **"Build and deployment"**:

**Source Options:**
- Select: **"GitHub Actions"** (recommended for this project)
- **NOT** "Deploy from a branch"

### 4. If You Don't See GitHub Actions Option:
If only "Deploy from a branch" is available:
- **Source**: Deploy from a branch  
- **Branch**: `main`
- **Folder**: `/ (root)`
- Click **"Save"**

### 5. Enable GitHub Actions (if needed)
- Go to **"Actions"** tab in your repository
- If disabled, click **"Enable Actions"**
- Confirm you want to enable GitHub Actions

### 6. Check Repository Visibility
- In repository **"Settings"** → **"General"**
- Make sure repository is **"Public"** (GitHub Pages requires public repos for free tier)

## After Configuration

1. **Push changes to trigger deployment:**
```bash
git add .
git commit -m "Enable GitHub Pages"
git push origin main
```

2. **Check deployment status:**
- Go to **"Actions"** tab
- You should see "Deploy Knowledge Pack to GitHub Pages" workflow running

3. **Access your site (after 2-5 minutes):**
- **Documentation**: `https://mail-drafts7.github.io/knowledgepack_docsify_setup`
- **Admin Panel**: `https://mail-drafts7.github.io/knowledgepack_docsify_setup/admin/`

## Troubleshooting

### If Pages section is not visible:
- Ensure repository is **public**
- Check if you have admin access to the repository
- Try refreshing the page

### If "GitHub Actions" option is not available:
- Use "Deploy from a branch" with `main` branch and `/ (root)` folder
- The existing GitHub Action will still work

### If deployment fails:
- Check **"Actions"** tab for error messages
- Ensure all files are committed and pushed to main branch
