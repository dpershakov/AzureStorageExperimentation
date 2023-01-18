const azure = require('azure-storage');
const config = require('config');

const storageAccountName = config.azure.storageAccountName;
const storageAccountKey = config.azure.storageAccountKey;
const containerNameParam = 'container';
const blobNameParam = 'blob';

function generateSignedUrl(containerName, blobName) {

    const sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
            Start: new Date(),
            Expiry: azure.date.minutesFromNow(1),
        },
    };

    const blobService = azure.createBlobService(storageAccountName, storageAccountKey);
    const sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    const blobUrl = blobService.getUrl(containerName, blobName, sasToken);

    return blobUrl;
}

var argv = require('minimist')(process.argv.slice(2));

var container = argv[containerNameParam];
var blob = argv[blobNameParam];

console.log("Generating Shared Access Signature URL for " + "container: " + container + ", blob: " + blob);
console.log(generateSignedUrl(container, blob));