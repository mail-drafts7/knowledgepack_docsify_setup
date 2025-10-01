# Hosting and Testing Guide: /admin Panel Changes

This guide will help you host your project and test if changes made in the /admin panel reflect in GitHub.

## Step 1: Host Your Project on Netlify

### 1.1 Deploy to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"New site from Git"**
3. Choose **GitHub** and authorize Netlify
4. Select your repository: `knowledgepack_docsify_setup`
5. Configure build settings:
   ```
   Build command: (leave empty)
   Publish directory: /
   ```
6. Click **"Deploy site"**
7. Wait for deployment to complete
8. Note your site URL: `https://[random-name].netlify.app`

### 1.2 Custom Domain (Optional)
- In Netlify dashboard → Domain settings
- Add custom domain if you have one

## Step 2: Configure Authentication for /admin Panel

### 2.1 Enable Netlify Identity
1. In your Netlify site dashboard
2. Go to **Site settings → Identity**
3. Click **"Enable Identity"**

### 2.2 Configure Git Gateway
1. Still in Identity settings
2. Scroll down to **"Git Gateway"**
3. Click **"Enable Git Gateway"**
4. This allows the CMS to commit to your GitHub repo

### 2.3 Update CMS Configuration
Edit your local `admin/config.yml` file:

```yaml
backend:
  name: git-gateway    # Change from 'github' to 'git-gateway'
  branch: main

local_backend: false   # Make sure this is false for production

media_folder: "docs/assets"
public_folder: "/assets"

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

### 2.4 Push Configuration Changes
```bash
git add admin/config.yml
git commit -m "Update CMS config for Netlify hosting"
git push origin main
```

Wait for Netlify to redeploy (usually 1-2 minutes).

## Step 3: Set Up User Account

### 3.1 Invite Yourself as Admin
1. In Netlify Identity settings
2. Click **"Invite users"**
3. Enter your email: `maildrafts7@gmail.com`
4. Click **"Send invitation"**

### 3.2 Accept Invitation
1. Check your email for invitation from Netlify
2. Click the link in the email
3. Set up your password
4. Complete registration

## Step 4: Test the /admin Panel

### 4.1 Access Admin Panel
1. Go to your hosted site: `https://[your-site].netlify.app/admin/`
2. Click **"Login with Netlify Identity"**
3. Enter your email and password
4. You should see the CMS dashboard

### 4.2 Make a Test Change
1. In the CMS dashboard, click **"New Documentation"**
2. Fill in:
   ```
   Title: Test Page
   Body: This is a test page created through the CMS admin panel.
   ```
3. Click **"Publish"**
4. Wait for the success message

### 4.3 Verify GitHub Commit
1. Go to your GitHub repository: https://github.com/mail-drafts7/knowledgepack_docsify_setup
2. Check recent commits - you should see a new commit like:
   ```
   "Create test-page.md"
   ```
3. Click on the commit to see the changes
4. Verify the new file `docs/test-page.md` was created

### 4.4 Verify Website Update
1. Go to your main site: `https://[your-site].netlify.app`
2. Look for the new "Test Page" in navigation
3. Click on it to see your content

## Step 5: Edit Existing Content

### 5.1 Edit Through CMS
1. In `/admin/` panel, click on an existing document
2. Make some changes to the content
3. Click **"Publish"**

### 5.2 Verify Changes
1. Check GitHub for a new commit showing your edits
2. Check the main website to see updated content
3. Verify the changes appear immediately

## Troubleshooting Common Issues

### Issue 1: Can't Access /admin Panel
**Problem**: 404 error or blank page

**Solution**:
- Ensure site has fully deployed
- Check URL: `https://your-site.netlify.app/admin/` (with trailing slash)
- Clear browser cache

### Issue 2: Login Issues
**Problem**: Can't log in or "User not found"

**Solution**:
- Verify you accepted the email invitation
- Try password reset
- Check spam folder for invitation email

### Issue 3: Changes Not Saving
**Problem**: Publish button doesn't work

**Solution**:
- Check Git Gateway is enabled in Netlify Identity
- Verify `backend: git-gateway` in config.yml
- Check browser console for errors

### Issue 4: No GitHub Commits
**Problem**: Changes save in CMS but no GitHub commits appear

**Solution**:
- Verify Git Gateway is properly configured
- Check Netlify Identity is enabled
- Ensure user has proper permissions

## Expected Workflow

Once everything is set up correctly, this is what should happen:

1. **Edit in CMS** → Make changes in `/admin/` panel
2. **Click Publish** → Changes are saved
3. **Automatic Commit** → CMS creates GitHub commit automatically
4. **Website Update** → Netlify rebuilds and updates the live site
5. **Immediate Reflection** → Changes are visible on your website

## Quick Test Checklist

- [ ] Site deployed to Netlify
- [ ] Netlify Identity enabled
- [ ] Git Gateway enabled
- [ ] User account created (maildrafts7@gmail.com)
- [ ] Can access `/admin/` panel
- [ ] Can create new content
- [ ] New commits appear in GitHub
- [ ] Changes reflect on live website
- [ ] Can edit existing content

## Commands for Quick Setup

```bash
# Update config and push
git add admin/config.yml
git commit -m "Configure for Netlify hosting"
git push origin main

# Check deployment status
curl -I https://your-site.netlify.app/admin/
```

---

**Next Steps**: Follow this guide step by step, and you'll be able to test the complete workflow from CMS editing to GitHub commits to live website updates.
