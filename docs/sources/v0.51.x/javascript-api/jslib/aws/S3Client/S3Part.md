---
title: 'S3Part'
head_title: 'S3Part'
slug: 's3part'
description: 'S3Part is returned by the S3Client.uploadPart method when uploading a part to a multipart upload.'
weight: 20
---

# S3Part

S3Part is returned by the [`uploadPart(bucketName, objectKey, uploadId, partNumber, data)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/uploadpart) method when uploading a part to a multipart upload. The S3Part object describes an Amazon S3 Part.

| Name                  | Type   | Description        |
| :-------------------- | :----- | :----------------- |
| `S3Part.partNumber`   | number | The S3 Part'number |
| `S3Part.eTag        ` | String | The S3 Part's etag |

### Example

{{< code >}}

```javascript
import crypto from 'k6/crypto';
import exec from 'k6/execution';

import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.11.0/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const s3 = new S3Client(awsConfig);

const testBucketName = 'test-jslib-aws';
const testFileKey = 'multipart.txt';

export default async function () {
  // Produce random bytes to upload of size ~12MB, that
  // we will upload in two 6MB parts. This is done as the
  // minimum part size supported by S3 is 5MB.
  const bigFile = crypto.randomBytes(12 * 1024 * 1024);

  // Initialize a multipart upload
  const multipartUpload = await s3.createMultipartUpload(testBucketName, testFileKey);

  // Upload the first part
  const firstPartData = bigFile.slice(0, 6 * 1024 * 1024);
  const firstPart = await s3.uploadPart(
    testBucketName,
    testFileKey,
    multipartUpload.uploadId,
    1,
    firstPartData
  );

  // Upload the second part
  const secondPartData = bigFile.slice(6 * 1024 * 1024, 12 * 1024 * 1024);
  const secondPart = await s3.uploadPart(
    testBucketName,
    testFileKey,
    multipartUpload.uploadId,
    2,
    secondPartData
  );

  // Complete the multipart upload
  await s3.completeMultipartUpload(testBucketName, testFileKey, multipartUpload.uploadId, [
    firstPart,
    secondPart,
  ]);

  // Let's redownload it verify it's correct, and delete it
  const obj = await s3.getObject(testBucketName, testFileKey);
  await s3.deleteObject(testBucketName, testFileKey);
}
```

_A k6 script that will upload a part in a multipart upload to an S3 bucket_

{{< /code >}}
