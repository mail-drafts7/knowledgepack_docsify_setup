---
title: "Setup Guide"
description: "Step-by-step instructions to get your documentation site running"
---

# Setup Guide

Get your documentation site up and running in just a few steps!

## Prerequisites
- Node.js (version 16 or higher)
- Basic knowledge of Markdown (optional)

## Quick Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

Your site will be available at `http://localhost:3000`

### Step 3: Start CMS Proxy (Optional)
For content editing through the admin interface:
```bash
npm run cms-proxy
```

## File Structure
```
docs/
├── README.md          # Homepage content
├── features.md        # Feature descriptions
├── setup.md          # This setup guide
├── getting-started.md # Quick start guide
└── _sidebar.md       # Navigation menu
```

## Adding Content
1. Create new `.md` files in the `docs/` folder
2. Write content using Markdown syntax
3. Navigation updates automatically

That's it! You're ready to start documenting.

---

Need help? Check out [Getting Started](getting-started.md) for more details.
