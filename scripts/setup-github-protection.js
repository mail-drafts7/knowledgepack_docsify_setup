#!/usr/bin/env node

/**
 * GitHub Branch Protection Setup Script
 * 
 * This script automates the setup of branch protection rules and labels
 * for the content management workflow.
 * 
 * Prerequisites:
 * - GitHub CLI (gh) installed and authenticated
 * - Repository admin permissions
 * 
 * Usage: node scripts/setup-github-protection.js
 */

const { execSync } = require('child_process');

// Configuration
const REPO_OWNER = process.env.GITHUB_OWNER || 'YOUR-USERNAME';
const REPO_NAME = process.env.GITHUB_REPO || 'YOUR-REPO-NAME';
const BRANCH = 'main';

// Labels to create
const LABELS = [
  {
    name: 'merge-conflicts',
    color: 'd73a4a',
    description: 'PR has merge conflicts that need resolution'
  },
  {
    name: 'content-review',
    color: '0e8a16',
    description: 'Content pending review'
  },
  {
    name: 'auto-merge-approved',
    color: '1d76db',
    description: 'Approved for automatic merge'
  },
  {
    name: 'urgent',
    color: 'fbca04',
    description: 'Urgent content update'
  },
  {
    name: 'draft',
    color: '6f42c1',
    description: 'Work in progress - not ready for review'
  },
  {
    name: 'needs-rebase',
    color: 'f9d0c4',
    description: 'Branch needs to be rebased on main'
  }
];

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} completed`);
    return result;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return null;
  }
}

function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...');
  
  // Check if GitHub CLI is installed
  const ghVersion = runCommand('gh --version', 'Checking GitHub CLI installation');
  if (!ghVersion) {
    console.error('❌ GitHub CLI not found. Please install: https://cli.github.com/');
    process.exit(1);
  }
  
  // Check if authenticated
  const authStatus = runCommand('gh auth status', 'Checking GitHub authentication');
  if (!authStatus) {
    console.error('❌ Not authenticated with GitHub. Run: gh auth login');
    process.exit(1);
  }
  
  console.log('✅ Prerequisites check passed');
}

function createLabels() {
  console.log('\n📋 Creating workflow labels...');
  
  LABELS.forEach(label => {
    const command = `gh label create "${label.name}" --color "${label.color}" --description "${label.description}" --repo "${REPO_OWNER}/${REPO_NAME}"`;
    const result = runCommand(command, `Creating label: ${label.name}`);
    
    if (!result && result !== '') {
      // Label might already exist, try to update it
      const updateCommand = `gh label edit "${label.name}" --color "${label.color}" --description "${label.description}" --repo "${REPO_OWNER}/${REPO_NAME}"`;
      runCommand(updateCommand, `Updating existing label: ${label.name}`);
    }
  });
}

function setupBranchProtection() {
  console.log('\n🛡️ Setting up branch protection rules...');
  
  // Enable branch protection with required status checks
  const protectionCommand = `gh api repos/${REPO_OWNER}/${REPO_NAME}/branches/${BRANCH}/protection \\
    --method PUT \\
    --field required_status_checks='{"strict":true,"contexts":["content-validation","deploy-preview"]}' \\
    --field enforce_admins=true \\
    --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \\
    --field restrictions=null`;
  
  runCommand(protectionCommand, 'Configuring branch protection rules');
}

function enableRepositoryFeatures() {
  console.log('\n⚙️ Enabling repository features...');
  
  // Enable Issues, Wiki, Projects etc.
  const settingsCommand = `gh api repos/${REPO_OWNER}/${REPO_NAME} \\
    --method PATCH \\
    --field has_issues=true \\
    --field has_projects=true \\
    --field has_wiki=false`;
  
  runCommand(settingsCommand, 'Enabling repository features');
}

function validateWorkflowFiles() {
  console.log('\n📁 Validating workflow files...');
  
  const fs = require('fs');
  const path = require('path');
  
  const workflowFiles = [
    '.github/workflows/content-review.yml',
    '.github/workflows/conflict-resolution.yml'
  ];
  
  workflowFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ Found: ${file}`);
    } else {
      console.error(`❌ Missing: ${file}`);
    }
  });
  
  // Check CMS config
  const cmsConfig = 'admin/config.yml';
  if (fs.existsSync(cmsConfig)) {
    const config = fs.readFileSync(cmsConfig, 'utf8');
    if (config.includes('publish_mode: editorial_workflow')) {
      console.log(`✅ Editorial workflow enabled in ${cmsConfig}`);
    } else {
      console.error(`❌ Editorial workflow not configured in ${cmsConfig}`);
    }
  } else {
    console.error(`❌ Missing: ${cmsConfig}`);
  }
}

function displayNextSteps() {
  console.log('\n🎉 GitHub repository configuration completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. Configure Netlify Identity and Git Gateway');
  console.log('2. Update admin/config.yml with your site URL');
  console.log('3. Train team members on the new workflow');
  console.log('4. Test the workflow with a sample PR');
  console.log('\n📚 Documentation:');
  console.log('- CONFLICT_RESOLUTION.md - For all team members');
  console.log('- SETUP_TEAM_WORKFLOW.md - For administrators');
  console.log('\n🔗 Useful Commands:');
  console.log(`- View repository: gh repo view ${REPO_OWNER}/${REPO_NAME} --web`);
  console.log(`- View Actions: gh run list --repo ${REPO_OWNER}/${REPO_NAME}`);
  console.log(`- View protection: gh api repos/${REPO_OWNER}/${REPO_NAME}/branches/${BRANCH}/protection`);
}

// Main execution
function main() {
  console.log('🚀 GitHub Repository Setup for Content Management Workflow');
  console.log('========================================================\n');
  
  // Get repository info from current directory or environment
  try {
    const remoteOutput = execSync('git remote get-url origin', { encoding: 'utf8' });
    const match = remoteOutput.match(/github\.com[\/:]([^\/]+)\/([^\/\s]+)/);
    if (match) {
      process.env.GITHUB_OWNER = process.env.GITHUB_OWNER || match[1];
      process.env.GITHUB_REPO = process.env.GITHUB_REPO || match[2].replace('.git', '');
      console.log(`📍 Detected repository: ${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}\n`);
    }
  } catch (error) {
    console.log('⚠️  Could not detect repository from git remote. Please set GITHUB_OWNER and GITHUB_REPO environment variables.\n');
  }
  
  checkPrerequisites();
  validateWorkflowFiles();
  createLabels();
  enableRepositoryFeatures();
  setupBranchProtection();
  displayNextSteps();
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
GitHub Branch Protection Setup Script

Usage: node scripts/setup-github-protection.js [options]

Environment Variables:
  GITHUB_OWNER    GitHub username/organization (auto-detected from git remote)
  GITHUB_REPO     Repository name (auto-detected from git remote)

Prerequisites:
  - GitHub CLI installed and authenticated
  - Repository admin permissions
  - Git repository with GitHub remote

Options:
  --help, -h      Show this help message
  
Examples:
  node scripts/setup-github-protection.js
  GITHUB_OWNER=myorg GITHUB_REPO=myrepo node scripts/setup-github-protection.js
  `);
  process.exit(0);
}

if (require.main === module) {
  main();
}

module.exports = { main, LABELS };
