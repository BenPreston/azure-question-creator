const questions = [
  {
    question:
      "Your team is automating the build process for a Java based application by using Azure Devops.\nThe team needs to have code coverage in place and then ensure the outcomes are published to Azure Pipelines.\nWhich of the following can be used for the code coverage?",
    answers: ["DevTest", "MSTest", "Cobertura", "JavaTest"],
    rationale:
      "Correct \nAnswer – C\nCobertura is a code coverage tool for Java. Below is a snippet of the documentation page for the tool.\nIt also has the ability to publish results to Azure Devops as mentioned in the Microsoft documentation\nFor more information on the code coverage tool and publishing results, please visit the below URL\nhttp://cobertura.github.io/cobertura/\nhttps://docs.microsoft.com/en-us/azure/devops/pipelines/tasks/test/publish-code-coverage-results?view=azure-devops",
    quizNumber: "microsoft-azure-az-400-practice-sets",
  },
  {
    question:
      "A team is planning on using Azure Automation for a set of Azure Virtual machines. They need to use Azure state configuration to manage the state of the virtual machines. Which of the following actions would need to be performed to ensure the state of the virtual machines are managed effectively?\nChoose 5 answers from the options given below",
    answers: [
      "1. \n\n Onboard the set of virtual machines onto Azure Automation state configuration",
      "2. \n\n Check the status of the node",
      "3. \n\n Assign the node configuration",
      "4. \n\n Create a node management group",
      "5. \n\n Compile the configuration",
      "6. \n\n Upload a configuration",
    ],
    rationale:
      "Correct \nAnswer A,B,C,E and F\nThe Microsoft documentation lists the various steps for onboarding machines onto Azure Automation state configuration\nThe first step is to import an existing configuration\n2. The next step is to compile the configuration\n3. The next step is to on-board the set of virtual machines onto Azure Automation state configuration\n4. Ensure to assign the node configuration\n5. And then check the status of the nodes\nSince this is clearly mentioned in the Microsoft documentation, all other options are incorrect\nFor more information on Azure Automation State Node configuration, please visit the below URL\nhttps://docs.microsoft.com/en-us/azure/automation/automation-dsc-getting-started",
    quizNumber: "microsoft-azure-az-400-practice-sets",
  },
  {
    question:
      "A team is using Azure Resource Manager templates in their Devops pipeline. The templates need to reference secrets in the Azure Key vault dynamically. You need to complete the below snippet of the Resource Manager template.\n\nWhich of the following would go into SLOT_1?",
    answers: [
      "1. \n\n Microsoft.Deployments/resources",
      "2. \n\n Deployments.Resources",
      "3. \n\n Microsoft.Resources/deployments",
      "4. \n\n Resources/Azure.KeyVault",
    ],
    rationale:
      "Correct \nAnswer: C\nAn example of this is given in the Microsoft documentation on an ARM template which is used to reference secrets dynamically from an Azure Key vault service\n\nSince this is clearly given in the Microsoft documentation, all other options are incorrect\nFor more information on referencing Azure Key vault in the Resource Manager, please visit the below URL\nhttps://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-keyvault-parameter",
    quizNumber: "microsoft-azure-az-400-practice-sets",
  },
  {
    question:
      "A team is using Azure Resource Manager templates in their Devops pipeline. The templates need to reference secrets in the Azure Key vault dynamically. You need to complete the below snippet of the Resource Manager template.\n\nWhich of the following would go into SLOT_2?",
    answers: [
      "1. \n\n templateURI",
      "2. \n\n templateLink",
      "3. \n\n keyVaultlink",
      "4. \n\n secretlink",
    ],
    rationale:
      "Correct \nAnswer: B and C\nAn example of this is given in the Microsoft documentation on an ARM template which is used to reference secrets dynamically from an Azure Key vault service\n\n.\nSince this is clearly given in the Microsoft documentation, all other options are incorrect\nFor more information on referencing Azure Key vault in the Resource Manager, please visit the below URL\nhttps://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-manager-keyvault-parameter",
    quizNumber: "microsoft-azure-az-400-practice-sets",
  },
];

module.exports = questions;
