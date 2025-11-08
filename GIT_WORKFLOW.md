# Git Workflow Guide

## Daily Workflow

### Making Changes
1. **Edit files** - Make your changes in VS Code
2. **Stage changes** - Add files to commit
   ```bash
   git add .
   ```
3. **Commit changes** - Save with a message
   ```bash
   git commit -m "Brief description of changes"
   ```
4. **Push to GitHub** - Sync to repository
   ```bash
   git push
   ```

### Before Starting Work
Always pull latest changes first:
```bash
git pull
```

### Check Status
See what files have changed:
```bash
git status
```

### View History
See recent commits:
```bash
git log --oneline -10
```

## Common Commit Messages

- `"Add [feature]"` - New feature
- `"Fix [bug]"` - Bug fix
- `"Update [component]"` - Improvements
- `"Refactor [code]"` - Code restructuring
- `"Docs: [description]"` - Documentation
- `"Style: [description]"` - CSS/formatting

## Branch Management (Future)

Create feature branch:
```bash
git checkout -b feature/feature-name
```

Switch branches:
```bash
git checkout main
```

## Repository Info

- **GitHub**: https://github.com/Rmap91/Israeli-football-stadiums
- **Live Site**: https://fanstadiums.com
- **Azure**: shovalstadiums (resource group: fdfa)

## Deployment to Azure

After pushing to GitHub:
```powershell
cd "C:\Users\Ram\Desktop\Stadiums in israel"
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
& "C:\Program Files\7-Zip\7z.exe" a -tzip deploy-linux.zip public server database package.json package-lock.json .deployment web.config .env
az webapp deployment source config-zip --resource-group fdfa --name shovalstadiums --src deploy-linux.zip --timeout 600
```

## Important Notes

- ⚠️ Never commit `.env` file (contains API keys)
- ⚠️ Database file is in `.gitignore` (not tracked)
- ✅ Always test locally before pushing
- ✅ Write clear commit messages
- ✅ Push regularly to keep GitHub synced
