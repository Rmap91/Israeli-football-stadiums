# Deploy Israeli Stadiums Database to Azure
# Prerequisites: Azure CLI installed and logged in

param(
    [Parameter(Mandatory=$true)]
    [string]$ResourceGroupName,
    
    [Parameter(Mandatory=$true)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = "israeli-stadiums-$(Get-Random -Minimum 1000 -Maximum 9999)"
)

Write-Host "🏟️ Deploying Israeli Stadiums Database to Azure..." -ForegroundColor Green
Write-Host "Resource Group: $ResourceGroupName" -ForegroundColor Yellow
Write-Host "Location: $Location" -ForegroundColor Yellow
Write-Host "App Name: $AppName" -ForegroundColor Yellow

# Step 1: Create Resource Group
Write-Host "`n📦 Creating Resource Group..." -ForegroundColor Cyan
az group create --name $ResourceGroupName --location $Location

# Step 2: Deploy Bicep template
Write-Host "`n🏗️ Deploying Azure Infrastructure..." -ForegroundColor Cyan
$deploymentResult = az deployment group create `
    --resource-group $ResourceGroupName `
    --template-file "azure/main.bicep" `
    --parameters appName=$AppName `
    --query "properties.outputs" `
    --output json | ConvertFrom-Json

$webAppUrl = $deploymentResult.webAppUrl.value
$storageAccountName = $deploymentResult.storageAccountName.value

Write-Host "✅ Infrastructure deployed successfully!" -ForegroundColor Green
Write-Host "Web App URL: $webAppUrl" -ForegroundColor Yellow

# Step 3: Deploy application code
Write-Host "`n📁 Deploying Application Code..." -ForegroundColor Cyan

# Create deployment ZIP
$tempZip = "israeli-stadiums-deploy.zip"
Write-Host "Creating deployment package..."

# Create ZIP excluding node_modules, .git, etc.
$exclude = @("node_modules", ".git", "azure", "*.zip", ".env*")
Compress-Archive -Path @("server", "public", "package.json", "Book1.xlsx", "README.md") -DestinationPath $tempZip -Force

# Deploy using ZIP
Write-Host "Uploading to Azure App Service..."
az webapp deployment source config-zip --resource-group $ResourceGroupName --name $AppName --src $tempZip

# Clean up temp file
Remove-Item $tempZip -Force

# Step 4: Configure App Settings
Write-Host "`n⚙️ Configuring Application Settings..." -ForegroundColor Cyan
az webapp config appsettings set --resource-group $ResourceGroupName --name $AppName --settings `
    "WEBSITE_RUN_FROM_PACKAGE=1" `
    "NODE_ENV=production" `
    "PORT=8080" `
    "STORAGE_ACCOUNT_NAME=$storageAccountName"

# Step 5: Restart the app
Write-Host "`n🔄 Restarting Application..." -ForegroundColor Cyan
az webapp restart --resource-group $ResourceGroupName --name $AppName

Write-Host "`n🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "🌐 Your Israeli Stadiums Database is now live at: $webAppUrl" -ForegroundColor Cyan
Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Visit your website: $webAppUrl" -ForegroundColor White
Write-Host "   2. Set up custom domain (optional)" -ForegroundColor White
Write-Host "   3. Configure SSL certificate" -ForegroundColor White
Write-Host "   4. Set up monitoring and alerts" -ForegroundColor White

Write-Host "`n🛠️ Management Commands:" -ForegroundColor Yellow
Write-Host "   View logs: az webapp log tail --resource-group $ResourceGroupName --name $AppName" -ForegroundColor White
Write-Host "   Open in browser: az webapp browse --resource-group $ResourceGroupName --name $AppName" -ForegroundColor White