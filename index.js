const azure = require('azure-storage');

const storageAccountName = 'dpershtestingsa01';
const storageAccountKey = '+j1QHJ21qKEhi5I7hcBRah1lF/WxtggdG3U6prx2q76yi6XbPscm4Uj8a1zmGJNibnZbiQNXdkDI+AStnZNXKg==';
//const containerName = 'dpershtesting-sa01-container01';
//const blobName = 'CA.jpg';

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
