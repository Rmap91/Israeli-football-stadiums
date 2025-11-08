# Azure Deployment Prerequisites Checklist

## 🔧 Required Setup Steps

### 1. Azure Account & Subscription
- [ ] Active Azure subscription
- [ ] Billing configured (even for free tier)
- [ ] Resource group permissions (Contributor role minimum)

### 2. Local Development Environment
- [ ] Azure CLI installed: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli
- [ ] PowerShell 7+ (for deployment scripts)
- [ ] Git (for version control)

### 3. Authentication Options

#### Option A: Personal Account (Easiest)
```powershell
# Login to Azure
az login

# Select subscription (if you have multiple)
az account set --subscription "Your-Subscription-Name"

# Verify login
az account show
```

#### Option B: Service Principal (For CI/CD)
```powershell
# Create service principal
az ad sp create-for-rbac --name "israeli-stadiums-deploy" --role "Contributor" --scopes "/subscriptions/{your-subscription-id}"

# Save the output JSON - you'll need:
# - appId (client ID)
# - password (client secret)  
# - tenant
```

#### Option C: GitHub Actions Setup
1. Get publish profile from Azure App Service
2. Add as GitHub secret: `AZURE_WEBAPP_PUBLISH_PROFILE`

### 4. Estimated Azure Costs
- **App Service (Basic B1)**: ~$13-15/month
- **Storage Account**: ~$2-3/month
- **Application Insights**: Free tier available
- **Total estimated**: ~$15-20/month

### 5. Deployment Commands

#### First-time deployment:
```powershell
# Navigate to project folder
cd "C:\Users\Ram\Desktop\Stadiums in israel"

# Run deployment script
.\azure\deploy.ps1 -ResourceGroupName "israeli-stadiums-rg" -Location "East US"
```

#### Updates:
```powershell
.\azure\quick-deploy.ps1 -ResourceGroupName "israeli-stadiums-rg" -AppName "your-app-name"
```

## ⚠️ Important Notes
- You control all credentials and access
- No credentials are stored in the project files
- You can delete all Azure resources anytime to stop billing
- Free Azure account includes $200 credit for first 30 days