# Team Workflow Setup Guide

This guide is for repository administrators and team leads to set up the editorial workflow for multiple content editors.

## 🚀 Quick Setup Checklist

- [ ] Enable GitHub repository features
- [ ] Configure branch protection rules
- [ ] Set up Netlify CMS with editorial workflow
- [ ] Configure team member access
- [ ] Train team on new workflow
- [ ] Test the complete workflow

## 🔧 GitHub Repository Configuration

### 1. Enable Required Repository Features

In your GitHub repository settings:

**General Settings:**
- ✅ Enable Issues
- ✅ Enable Pull Requests
- ✅ Enable Actions (for automated workflows)

**Actions Settings:**
- ✅ Allow all actions and reusable workflows
- ✅ Allow GitHub Actions to create and approve pull requests

### 2. Branch Protection Rules

Navigate to: **Settings → Branches → Add rule**

**Branch name pattern:** `main`

**Protect matching branches:**
- ✅ Require a pull request before merging
  - ✅ Require approvals: **1** (or more based on team size)
  - ✅ Dismiss stale PR approvals when new commits are pushed
  - ✅ Require review from code owners
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - **Required status checks:**
    - `content-validation`
    - `deploy-preview`
- ✅ Require conversation resolution before merging
- ✅ Include administrators
- ✅ Allow force pushes: **Disabled**
- ✅ Allow deletions: **Disabled**

### 3. Repository Labels

Create these labels for workflow management:

```bash
# Run these GitHub CLI commands or create manually
gh label create "merge-conflicts" --color "d73a4a" --description "PR has merge conflicts"
gh label create "content-review" --color "0e8a16" --description "Content pending review"
gh label create "auto-merge-approved" --color "1d76db" --description "Approved for auto-merge"
gh label create "urgent" --color "fbca04" --description "Urgent content update"
gh label create "draft" --color "6f42c1" --description "Work in progress"
```

## 👥 Team Member Access Configuration

### 1. Repository Permissions

Set appropriate permissions for team members:

**Content Editors:**
- Permission: **Write** (can create branches and PRs)
- Cannot merge directly to main
- Can review and approve others' PRs

**Content Reviewers/Leads:**
- Permission: **Maintain** or **Admin**
- Can merge PRs
- Can manage repository settings

**External Contributors:**
- Permission: **Read** (can fork and create PRs)
- All changes require review

### 2. Team Organization

Consider creating GitHub teams:
- `@content-editors`: All content creators
- `@content-reviewers`: Senior editors and reviewers
- `@site-admins`: Technical administrators

## 🎯 Netlify Configuration

### 1. Netlify Site Settings

In your Netlify dashboard:

**Build & Deploy:**
- Build command: `npm run build` (if applicable)
- Publish directory: `./` (root directory for Docsify)

**Deploy contexts:**
- Production branch: `main`
- Branch deploys: **All branches** (for preview)
- Deploy previews: **Any pull request against main**

### 2. Identity & Git Gateway

**Enable Identity:**
1. Go to **Site settings → Identity**
2. Click **Enable Identity**
3. Set registration preferences (invite only recommended)

**Configure Git Gateway:**
1. In Identity settings, enable **Git Gateway**
2. Add GitHub as OAuth provider
3. Configure with your GitHub OAuth app

### 3. Environment Variables

Set these in Netlify:
```
SITE_URL=https://your-site.netlify.app
BRANCH=main
```

## 📝 CMS Configuration Validation

Verify your `admin/config.yml` contains:

```yaml
backend:
  name: git-gateway
  branch: main

# This is crucial for the review workflow
publish_mode: editorial_workflow

# Enable previews
editor:
  preview: true

# Site configuration
site_url: https://your-site.netlify.app
display_url: https://your-site.netlify.app
```

## 👩‍🏫 Team Training

### 1. Onboarding Checklist for New Editors

- [ ] GitHub account created and added to repository
- [ ] Netlify CMS access granted
- [ ] Read conflict resolution guide
- [ ] Completed practice edit workflow
- [ ] Understands editorial workflow process

### 2. Training Materials

**Required Reading:**
- `CONFLICT_RESOLUTION.md` - Complete workflow guide
- `README.md` - Project overview
- This setup guide (for team leads)

**Practice Exercises:**
1. Create a test document
2. Submit for review
3. Practice resolving a simulated conflict
4. Review someone else's PR

## 🧪 Testing the Complete Workflow

### Test Scenario 1: Normal Content Creation

1. **Editor A** creates new content via CMS
2. Saves as draft
3. Submits for review
4. **Editor B** reviews and approves
5. Content auto-merges and deploys

### Test Scenario 2: Conflict Resolution

1. **Editor A** starts editing `docs/setup.md`
2. **Editor B** also edits `docs/setup.md`
3. **Editor A** submits first (gets merged)
4. **Editor B** submits → conflict detected
5. System provides conflict resolution guidance
6. **Editor B** resolves conflicts manually
7. Resolved content gets approved and merged

### Test Scenario 3: Emergency Procedures

1. Test content rollback process
2. Practice hotfix deployment
3. Verify backup and recovery procedures

## 🚨 Troubleshooting Common Setup Issues

### GitHub Actions Not Running

**Issue:** Workflows don't trigger
**Solution:**
- Check Actions are enabled in repository settings
- Verify workflow files are in `.github/workflows/`
- Check branch protection rules don't block Actions

### CMS Can't Save Content

**Issue:** "Error persisting entry in git repo"
**Solution:**
- Verify Git Gateway is properly configured
- Check GitHub OAuth app permissions
- Ensure user has repository write access

### Branch Protection Too Strict

**Issue:** Even admins can't merge
**Solution:**
- Temporarily disable "Include administrators"
- Make necessary changes
- Re-enable protection rules

### Conflict Resolution Confusion

**Issue:** Team doesn't understand conflict resolution
**Solution:**
- Provide hands-on training session
- Create video walkthrough
- Assign conflict resolution buddy system

## 📊 Monitoring and Maintenance

### Weekly Maintenance Tasks

- [ ] Review open PRs and their status
- [ ] Check for stale branches (auto-cleanup recommended)
- [ ] Monitor GitHub Actions usage
- [ ] Review team workflow feedback

### Monthly Tasks

- [ ] Audit team member permissions
- [ ] Update documentation as needed
- [ ] Review and optimize workflows
- [ ] Backup content and configuration

### Performance Metrics

Track these metrics for workflow success:
- Average time from content creation to publication
- Number of merge conflicts per month
- PR approval time
- Content editor satisfaction scores

## 🔄 Workflow Optimization Tips

### For Large Teams (10+ editors)

1. **Content Ownership Matrix**: Assign specific files/sections to editors
2. **Time Slots**: Coordinate editing schedules
3. **Multiple Reviewers**: Require 2+ approvals for major changes
4. **Automated Assignment**: Use GitHub's auto-assignment features

### For Frequent Updates

1. **Batch Reviews**: Schedule regular review sessions
2. **Priority Labels**: Use labels to prioritize urgent content
3. **Fast-Track Process**: Create expedited approval for urgent fixes

### For Complex Content

1. **Preview Environments**: Set up staging environments
2. **Content Templates**: Create templates for common content types
3. **Style Guides**: Maintain consistent content standards

## 📞 Support and Help

### Internal Support

- **Technical Issues**: Contact site administrators
- **Content Questions**: Reach out to content team leads
- **Process Issues**: Review documentation or ask in team chat

### External Resources

- [Netlify CMS Documentation](https://www.netlifycms.org/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Git Conflict Resolution Guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)

Remember: This setup ensures content quality and prevents conflicts, but requires proper team coordination and initial training investment.
