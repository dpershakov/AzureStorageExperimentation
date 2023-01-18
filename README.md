# AzureStorageExperimentation

This codesample shows how to generate a Shared Access Signature based URL for allowing restricted access to individual blobs in Azure Storge

##How to setup Azure Storage Account

* Create Azure Storage Account
* Create a Container in your Storage Account
  * Restrict access to Private
* Upload file(s) into the Container

##How to setup the runtime
* install node
* run npm update
* update config/default.json with your storageAccountName and storageAccountKey

##How to run
* node index.js --container <name-of-your-blob-containder>  --blob <name-of-your-blob>

The output should contain a signed URL with embedded SAS token limited for access time of 1 minute.

