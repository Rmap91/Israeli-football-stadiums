# Quick deployment script for updates
# Use this after initial deployment for quick updates

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$AppName
)

Write-Host "🚀 Quick update deployment for Israeli Stadiums Database..." -ForegroundColor Green

# Create deployment package
Write-Host "📦 Creating deployment package..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$zipFile = "update-$timestamp.zip"

Compress-Archive -Path @("server", "public", "package.json", "Book1.xlsx") -DestinationPath $zipFile -Force

# Deploy
Write-Host "🔄 Deploying to Azure..." -ForegroundColor Cyan
az webapp deployment source config-zip --resource-group $ResourceGroupName --name $AppName --src $zipFile

# Clean up
Remove-Item $zipFile -Force

# Restart app
Write-Host "♻️ Restarting application..." -ForegroundColor Cyan
az webapp restart --resource-group $ResourceGroupName --name $AppName

Write-Host "✅ Update deployment complete!" -ForegroundColor Green
Write-Host "🌐 Check your app: https://$AppName.azurewebsites.net" -ForegroundColor Cyan