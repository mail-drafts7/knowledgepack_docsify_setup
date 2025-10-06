# GitHub Authentication Setup for Decap CMS

## Overview
This guide shows how to set up GitHub authentication for Decap CMS, allowing you to manage your documentation through a web-based admin interface.

## Step 1: GitHub OAuth App Setup

### 1.1 Create GitHub OAuth Application
1. Go to your GitHub account settings: https://github.com/settings/applications/new
2. Fill in the application details:
   - **Application name**: `Knowledge Pack CMS`
   - **Homepage URL**: `https://mail-drafts7.github.io/knowledgepack_docsify_setup`
   - **Application description**: `CMS for Knowledge Pack Documentation`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`

3. Click "Register application"
4. Copy the **Client ID** and **Client Secret** (you'll need these later)

### 1.2 Alternative: Using Netlify for Hosting and Auth
If you deploy to Netlify, authentication is handled automatically:
1. Deploy your repository to Netlify
2. Enable Netlify Identity in site settings
3. Configure GitHub as an external provider

## Step 2: Local Development Setup

### 2.1 Using Decap CMS Local Backend
For local development, we use the proxy server:

```bash
# Install dependencies
npm install

# Start the proxy server (in one terminal)
npm run dev

# Start the documentation server (in another terminal)
npm start
```

### 2.2 Access Admin Interface
- **Local Development**: http://localhost:3000/admin/
- **Production**: https://your-site-url.com/admin/

## Step 3: GitHub Repository Permissions

### 3.1 Required Repository Settings
1. Go to your repository settings
2. Navigate to "Settings" > "Actions" > "General"
3. Ensure "Read and write permissions" are enabled for workflows

### 3.2 Branch Protection (Optional but Recommended)
1. Go to "Settings" > "Branches"
2. Add protection rules for the main branch
3. Enable "Require pull request reviews" for editorial workflow

## Step 4: Authentication Methods

### Method 1: Direct GitHub Authentication (Recommended for GitHub Pages)
Uses GitHub OAuth directly with implicit grant flow:

```yaml
# In admin/config.yml
backend:
  name: github
  repo: your-username/your-repo
  branch: main
```

### Method 2: Netlify Identity (Recommended for Netlify hosting)
```yaml
# In admin/config.yml  
backend:
  name: github
  repo: your-username/your-repo
  branch: main
  auth_endpoint: api/auth
```

### Method 3: Custom Authentication Server
For advanced setups, you can use your own authentication server.

## Step 5: Testing Authentication

### 5.1 Local Testing
1. Start the development servers:
   ```bash
   npm run dev  # Proxy server on port 8081
   npm start    # Docsify server on port 3000
   ```

2. Open http://localhost:3000/admin/
3. You should see the login interface

### 5.2 Production Testing
1. Deploy your site to your hosting platform
2. Navigate to your-site-url.com/admin/
3. Authenticate with GitHub
4. Start managing content!

## Troubleshooting

### Common Issues:
1. **Authentication failed**: Check OAuth app settings and callback URLs
2. **No access to repository**: Ensure proper permissions are set
3. **Local backend not working**: Make sure proxy server is running
4. **Changes not appearing**: Check branch settings and permissions

### Debug Mode:
Add to config.yml for debugging:
```yaml
# Enable debug mode
debug: true
```

## Security Considerations

1. Never commit OAuth client secrets to your repository
2. Use environment variables for sensitive configuration
3. Enable branch protection for production workflows
4. Regularly review access permissions

## Next Steps

After authentication is set up:
1. Configure your collections in `admin/config.yml`
2. Customize the admin interface as needed
3. Set up editorial workflows if using team collaboration
4. Configure media library for file uploads

## References
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [GitHub OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Netlify Identity](https://docs.netlify.com/visitor-access/identity/)
