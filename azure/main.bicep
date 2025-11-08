# Deploy to Azure App Service
# This template creates the necessary Azure resources for the Israeli Stadiums Database

param location string = resourceGroup().location
param appName string = 'israeli-stadiums-${uniqueString(resourceGroup().id)}'
param appServicePlanName string = '${appName}-plan'
param storageAccountName string = 'storage${uniqueString(resourceGroup().id)}'

# App Service Plan (Linux)
resource appServicePlan 'Microsoft.Web/serverfarms@2022-09-01' = {
  name: appServicePlanName
  location: location
  properties: {
    reserved: true # Required for Linux
  }
  sku: {
    name: 'B1' # Basic tier - sufficient for small applications
    tier: 'Basic'
    size: 'B1'
    family: 'B'
    capacity: 1
  }
  kind: 'linux'
}

# Web App (App Service)
resource webApp 'Microsoft.Web/sites@2022-09-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      appSettings: [
        {
          name: 'WEBSITE_NODE_DEFAULT_VERSION'
          value: '~18'
        }
        {
          name: 'NODE_ENV'
          value: 'production'
        }
        {
          name: 'PORT'
          value: '3000'
        }
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
      ]
      alwaysOn: true
      httpLoggingEnabled: true
      logsDirectorySizeLimit: 35
      detailedErrorLoggingEnabled: true
    }
    httpsOnly: true
  }
}

# Storage Account for static files and database
resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
    supportsHttpsTrafficOnly: true
  }
}

# Application Insights for monitoring
resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${appName}-insights'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'rest'
  }
}

# Output values
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output appServicePlanId string = appServicePlan.id
output storageAccountName string = storageAccount.name
output applicationInsightsInstrumentationKey string = applicationInsights.properties.InstrumentationKey