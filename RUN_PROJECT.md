# How to Run the Docsify + Netlify CMS Project

This guide explains how to run the Docsify documentation site with Netlify CMS admin interface.

## Project Structure
```
knowledgepack_docsify_setup/
├── index.html                 # Main Docsify site
├── package.json              # Dependencies
├── admin/
│   ├── index.html           # Netlify CMS admin interface
│   └── config.yml           # CMS configuration
└── docs/                    # Documentation files
    ├── README.md
    ├── setup.md
    ├── features.md
    └── ...
```

## Prerequisites
- Node.js (version 12 or higher)
- npm or yarn
- Git
- GitHub account (for production CMS)

## Installation

### 1. Clone the Repository
```bash
git clone git@github.com:mail-drafts7/knowledgepack_docsify_setup.git
cd knowledgepack_docsify_setup
```

### 2. Install Dependencies
```bash
npm install
```

## Running the Project

### Option 1: Local Development with GitHub Authentication (Current Setup)

#### Step 1: Install Docsify CLI
```bash
npm install -g docsify-cli
```

#### Step 2: Start Docsify Server
```bash
docsify serve .
```
This will start the documentation site at: `http://localhost:3000`

#### Step 3: Access Admin Interface
Navigate to: `http://localhost:3000/admin/`

**Note**: With `local_backend: false`, you'll need GitHub authentication to access the admin panel.

### Option 2: Local Development WITHOUT GitHub Authentication

If you want to develop locally without GitHub authentication:

#### Step 1: Enable Local Backend
Edit `admin/config.yml` and change:
```yaml
local_backend: false
```
to:
```yaml
local_backend: true
```

#### Step 2: Install and Run Proxy Server
```bash
# Install proxy server globally
npm install -g netlify-cms-proxy-server

# Start proxy server in one terminal
npx netlify-cms-proxy-server

# Start Docsify in another terminal
docsify serve .
```

#### Step 3: Access Both Interfaces
- Documentation: `http://localhost:3000`
- Admin Panel: `http://localhost:3000/admin/`

## Available Commands

### Development Commands
```bash
# Install dependencies
npm install

# Start Docsify server
docsify serve .

# Start CMS proxy server (only needed with local_backend: true)
npx netlify-cms-proxy-server

# Install Docsify globally
npm install -g docsify-cli
```

### Quick Start Script
Create this as a bash script if you want one-command startup:

```bash
#!/bin/bash
# Start both servers for local development

# Check if docsify is installed globally
if ! command -v docsify &> /dev/null; then
    echo "Installing Docsify CLI globally..."
    npm install -g docsify-cli
fi

# Start proxy server in background (only if local_backend is true)
if grep -q "local_backend: true" admin/config.yml; then
    echo "Starting Netlify CMS proxy server..."
    npx netlify-cms-proxy-server &
    PROXY_PID=$!
fi

# Start Docsify server
echo "Starting Docsify server..."
docsify serve .

# Clean up proxy server when docsify stops
if [ ! -z "$PROXY_PID" ]; then
    kill $PROXY_PID
fi
```

## Configuration Options

### For Local Development (No GitHub Auth)
In `admin/config.yml`:
```yaml
local_backend: true  # Enable local development
```

### For Production (GitHub Auth Required)
In `admin/config.yml`:
```yaml
local_backend: false  # Use GitHub backend
backend:
  name: github
  repo: https://github.com/mail-drafts7/knowledgepack_docsify_setup
  branch: main
```

## Accessing the Interfaces

### Documentation Site
- URL: `http://localhost:3000`
- Features: Browse documentation, search, navigation

### Admin Panel
- URL: `http://localhost:3000/admin/`
- Features: Edit content, create new docs, manage files
- Authentication: 
  - With `local_backend: true`: No auth required
  - With `local_backend: false`: GitHub auth required

## Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
docsify serve . --port 3001
```

### CMS Not Loading
1. Check if proxy server is running (for local backend)
2. Verify admin/config.yml syntax
3. Check browser console for errors

### GitHub Authentication Issues
1. Ensure GitHub OAuth app is configured
2. Check repository permissions
3. Verify callback URLs

## Production Deployment

### To Netlify
1. Connect GitHub repository to Netlify
2. Set build command: `echo "Static site"`
3. Set publish directory: `/`
4. Configure Netlify Identity for CMS authentication

### To GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to main branch
3. Configure custom domain if needed

## File Structure for Content

### Adding New Documentation
Create `.md` files in the `docs/` folder:
```
docs/
├── new-feature.md
├── troubleshooting.md
└── api-reference.md
```

Update `docs/_sidebar.md` to include new pages in navigation.

## Support
For issues or questions:
1. Check this documentation
2. Review Docsify documentation: https://docsify.js.org
3. Check Netlify CMS docs: https://netlifycms.org
