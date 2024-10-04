const categories = {
  "Develop Azure Compute Solutions": {
    subcategories: [
      "Create and manage container images for solutions",
      "Publish an image to Azure Container Registry",
      "Run containers by using Azure Container Instance",
      "Create solutions by using Azure Container Apps",
      "Create an Azure App Service Web App",
      "Configure and implement diagnostics and logging",
      "Deploy code and containers",
      "Configure settings including Transport Layer Security (TLS), API settings, and service connections",
      "Implement autoscaling",
      "Configure deployment slots",
      "Create and configure an Azure Functions app",
      "Implement input and output bindings",
      "Implement function triggers by using data operations, timers, and webhooks",
    ],
  },
  "Develop for Azure Storage": {
    subcategories: [
      "Perform operations on containers and items by using the SDK",
      "Set the appropriate consistency level for operations",
      "Implement change feed notifications",
      "Set and retrieve properties and metadata",
      "Perform operations on data by using the appropriate SDK",
      "Implement storage policies and data lifecycle management",
    ],
  },
  "Implement Azure Security": {
    subcategories: [
      "Authenticate and authorise users by using the Microsoft Identity platform",
      "Authenticate and authorise users and apps by using Microsoft Entra ID",
      "Create and implement shared access signatures",
      "Implement solutions that interact with Microsoft Graph",
      "Secure app configuration data by using App Configuration or Azure Key Vault",
      "Develop code that uses keys, secrets, and certificates stored in Azure Key Vault",
      "Implement Managed Identities for Azure resources",
    ],
  },
  "Monitor, Troubleshoot, and Optimise Azure Solutions": {
    subcategories: [
      "Configure cache and expiration policies for Azure Cache for Redis",
      "Implement secure and optimized application cache patterns including data sizing, connections, encryption, and expiration",
      "Implement Azure Content Delivery Network endpoints and profiles",
      "Monitor and analyze metrics, logs, and traces",
      "Implement Application Insights web tests and alerts",
      "Implement an app or service to use Application Insights",
    ],
  },
  "Connect to and consume Azure services and third-party services": {
    subcategories: [
      "Create an Azure API Management instance",
      "Create and document APIs",
      "Configure access to APIs",
      "Implement policies for APIs",
    ],
  },
};

module.exports = categories;
