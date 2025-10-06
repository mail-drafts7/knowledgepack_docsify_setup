# Quick Start Guide

Simple setup instructions for running the Knowledge Pack documentation site.

## Prerequisites
- Node.js (version 16 or higher)
- Git

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/mail-drafts7/knowledgepack_docsify_setup.git
cd knowledgepack_docsify_setup
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The site will be available at `http://localhost:3000`

## Available Commands

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the built site locally

## Adding Content

1. Create new `.md` files in the `docs/` folder
2. Update `docs/_sidebar.md` to add navigation links
3. Use standard Markdown syntax for formatting

## Deployment

Changes pushed to the main branch automatically deploy to GitHub Pages.

---

For more detailed information, see the [Deployment Guide](DEPLOYMENT_GUIDE.md).
