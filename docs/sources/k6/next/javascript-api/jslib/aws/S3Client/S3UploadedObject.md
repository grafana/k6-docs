---
title: 'S3UploadedObject'
description: 'S3UploadedObject represents the response from S3 upload operations'
weight: 20
---

# S3UploadedObject

`S3UploadedObject` represents the response returned by S3 upload operations such as [`putObject`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/putobject) and [`completeMultipartUpload`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/completemultipartupload). It contains metadata about the uploaded object, including checksums and upload verification information.

## Properties

| Name         | Type              | Description                                                                                                                               |
| :----------- | :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| eTag         | string            | The entity tag (ETag) of the uploaded object. This is a hash of the object that can be used to verify the integrity of the uploaded data. |
| crc32        | string (optional) | The base64-encoded CRC32 checksum of the uploaded object, if available.                                                                   |
| crc32c       | string (optional) | The base64-encoded CRC32C checksum of the uploaded object, if available.                                                                  |
| crc64nvme    | string (optional) | The base64-encoded CRC64NVME checksum of the uploaded object, if available.                                                               |
| sha1         | string (optional) | The base64-encoded SHA1 checksum of the uploaded object, if available.                                                                    |
| sha256       | string (optional) | The base64-encoded SHA256 checksum of the uploaded object, if available.                                                                  |
| checksumType | string (optional) | The type of checksum algorithm used. Can be "COMPOSITE" for multipart uploads or "FULL_OBJECT" for single-part uploads.                   |
| size         | number (optional) | The size of the uploaded object in bytes, if available.                                                                                   |

## Example

{{< code >}}

<!-- md-k6:skip -->

```javascript
import {
  AWSConfig,
  S3Client,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';
const testFileKey = 'test-file.txt';

export default async function () {
  const testData = 'Hello, World!';

  // Upload the object and get the upload response
  const uploadResult = await s3.putObject(testBucketName, testFileKey, testData);

  // Access the upload metadata
  console.log('Upload ETag:', uploadResult.eTag);
  console.log('Object size:', uploadResult.size);

  // Check if checksums are available
  if (uploadResult.sha256) {
    console.log('SHA256 checksum:', uploadResult.sha256);
  }

  if (uploadResult.checksumType) {
    console.log('Checksum type:', uploadResult.checksumType);
  }

  // Verify the upload was successful
  if (uploadResult.eTag) {
    console.log('Upload successful, ETag received:', uploadResult.eTag);
  }
}
```

{{< /code >}}

## Usage in Multipart Uploads

For multipart uploads, the `S3UploadedObject` is returned by the `completeMultipartUpload` method:

{{< code >}}

<!-- md-k6:skip -->

```javascript
import crypto from 'k6/crypto';
import {
  AWSConfig,
  S3Client,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);

export default async function () {
  const testBucketName = 'test-jslib-aws';
  const testFileKey = 'large-file.txt';

  // Create large file data
  const bigFile = crypto.randomBytes(12 * 1024 * 1024); // 12MB

  // Initialize multipart upload
  const multipartUpload = await s3.createMultipartUpload(testBucketName, testFileKey);

  // Upload parts
  const firstPart = await s3.uploadPart(
    testBucketName,
    testFileKey,
    multipartUpload.uploadId,
    1,
    bigFile.slice(0, 6 * 1024 * 1024)
  );

  const secondPart = await s3.uploadPart(
    testBucketName,
    testFileKey,
    multipartUpload.uploadId,
    2,
    bigFile.slice(6 * 1024 * 1024)
  );

  // Complete the multipart upload and get the result
  const uploadResult = await s3.completeMultipartUpload(
    testBucketName,
    testFileKey,
    multipartUpload.uploadId,
    [firstPart, secondPart]
  );

  // Access the completed upload metadata
  console.log('Multipart upload ETag:', uploadResult.eTag);
  console.log('Checksum type:', uploadResult.checksumType); // Likely "COMPOSITE"

  if (uploadResult.size) {
    console.log('Total object size:', uploadResult.size);
  }
}
```

{{< /code >}}
