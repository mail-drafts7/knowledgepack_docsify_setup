# Content Management & Conflict Resolution Guide

This guide explains how to manage content safely with multiple editors and resolve conflicts when they occur.

## 🔄 New Editorial Workflow

### How It Works

1. **Editorial Workflow**: All content changes now go through a review process
2. **Pull Request Based**: Changes create pull requests instead of direct commits
3. **Automated Validation**: GitHub Actions validate content before merge
4. **Conflict Detection**: Automatic detection and guidance for merge conflicts

### Content Creation Process

1. **Create/Edit Content** in Netlify CMS admin panel
2. **Save Draft**: Content is saved as a draft (creates a branch)
3. **Submit for Review**: When ready, submit for review (creates PR)
4. **Automated Checks**: GitHub Actions validate the content
5. **Review Process**: Team members review and approve
6. **Auto-Merge**: Approved content is automatically merged and deployed

## 🚨 Handling Merge Conflicts

### What Are Merge Conflicts?

Merge conflicts occur when:
- Multiple people edit the same file
- Changes overlap or contradict each other
- Git cannot automatically determine which version to keep

### Automatic Conflict Detection

Our system automatically:
- ✅ Detects conflicts when PRs are created
- 📝 Comments on PRs with conflict details
- 🏷️ Adds "merge-conflicts" label
- 📋 Provides step-by-step resolution guidance

### Manual Conflict Resolution

When conflicts are detected, follow these steps:

#### Step 1: Clone the Repository Locally
```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

#### Step 2: Switch to the Conflict Branch
```bash
git fetch origin
git checkout cms/BRANCH-NAME  # Replace with actual branch name
```

#### Step 3: Merge Main Branch
```bash
git merge origin/main
```

#### Step 4: Identify Conflicted Files
```bash
git status
# Look for files marked as "both modified"
```

#### Step 5: Resolve Conflicts Manually

Open each conflicted file and look for conflict markers:

```markdown
<<<<<<< HEAD
Your changes are here
=======
Other person's changes are here
>>>>>>> main
```

**Resolution Options:**
- Keep only your changes: Delete conflict markers and other person's content
- Keep only their changes: Delete conflict markers and your content  
- Combine both changes: Merge both versions meaningfully
- Rewrite completely: Create new content incorporating both perspectives

#### Step 6: Clean Up and Commit
```bash
# After resolving all conflicts
git add .
git commit -m "Resolve merge conflicts"
git push origin cms/BRANCH-NAME
```

## 👥 Best Practices for Multiple Editors

### Before Making Changes

1. **Communicate**: Let others know what content you're working on
2. **Check Recent Changes**: Review recent commits to see what others have done
3. **Pull Latest**: Always work from the latest version

### While Editing

1. **Save Frequently**: Save drafts regularly in Netlify CMS
2. **Small Changes**: Make smaller, focused changes rather than large edits
3. **Clear Commit Messages**: Use descriptive commit messages

### Content Organization

1. **Separate Files**: Avoid multiple people editing the same file simultaneously
2. **Section Ownership**: Consider assigning content sections to specific editors
3. **Time Coordination**: Coordinate timing for large changes

## 🔧 Branch Protection Rules

To enable these protections on GitHub:

### Required Settings

1. Go to **Settings** → **Branches** in your GitHub repository
2. Add a branch protection rule for `main`:

**Required Status Checks:**
- ✅ `content-validation`
- ✅ `deploy-preview`

**Additional Protections:**
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging  
- ✅ Require branches to be up to date before merging
- ✅ Include administrators

## 🆘 Troubleshooting

### Common Issues

**Issue**: "Your branch is behind origin/main"
```bash
git pull origin main
git push origin your-branch-name
```

**Issue**: "Cannot automatically merge"  
- This means there are conflicts
- Follow the manual resolution steps above

**Issue**: "Netlify CMS shows error when saving"
- Check if someone else is editing the same content
- Try refreshing the page and saving again
- Contact an administrator if problems persist

### Getting Help

1. **GitHub Issues**: Create an issue in the repository
2. **PR Comments**: Ask for help in pull request comments  
3. **Team Chat**: Use your team's communication channel
4. **Documentation**: Check this guide and other project docs

## 📞 Emergency Procedures

### If Content Is Accidentally Deleted

1. **Don't Panic**: Git keeps history of all changes
2. **Check Git History**: `git log --oneline`
3. **Restore from Commit**: `git checkout COMMIT-HASH -- filename.md`
4. **Create Recovery PR**: Submit restored content through normal review process

### If Main Branch Is Broken

1. **Identify the Problem Commit**: `git log --oneline`
2. **Create Hotfix Branch**: `git checkout -b hotfix/fix-description`
3. **Fix the Issue**: Make necessary corrections
4. **Emergency Merge**: Contact repository administrator for expedited review

## 📊 Monitoring and Analytics

### GitHub Insights

Monitor your content workflow:
- **Pulse**: See recent activity and PRs
- **Contributors**: Track who's contributing content
- **Traffic**: Monitor site visits (if enabled)

### Automated Reports

GitHub Actions provide:
- ✅ Content validation results
- 📊 Change summaries in PR comments
- 🚨 Conflict detection and guidance
- 📈 Build and deployment status

## 🎯 Tips for Success

1. **Regular Communication**: Keep team informed of your content plans
2. **Small, Frequent Changes**: Better than large, infrequent updates
3. **Review Others' Work**: Learn from others' content and provide feedback
4. **Stay Updated**: Pull latest changes before starting work
5. **Test Locally**: Use local development server when making complex changes

Remember: This workflow prevents content conflicts and ensures quality, but requires coordination between team members. When in doubt, ask for help!
