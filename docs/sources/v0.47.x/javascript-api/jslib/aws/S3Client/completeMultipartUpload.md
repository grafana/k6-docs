---
title: 'completeMultipartUpload'
head_title: 'S3Client.completeMultipartUpload(bucketName, objectKey, uploadId, parts)'
description: 'S3Client.completeMultipartUpload uploads a multipar object to a bucket'
weight: 10
---

# completeMultipartUpload

`S3Client.completeMultipartUpload` uploads a multipart object to an S3 bucket.

### Parameters

| Parameter  | Type                                                                                               | Description                                                                                                   |
| :--------- | :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| bucketName | string                                                                                             | Name of the bucket to delete the object to.                                                                   |
| objectKey  | string                                                                                             | Name of the uploaded object.                                                                                  |
| uploadId   | number                                                                                             | UploadId of the multipart upload to complete.                                                                 |
| parts      | Array<[S3Part](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/s3part)> | The [S3Part](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/s3part)s to assemble. |

### Returns

| Type            | Description                                                           |
| :-------------- | :-------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the multipart upload has been completed. |

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
  // List the buckets the AWS authentication configuration
  // gives us access to.
  const buckets = await s3.listBuckets();

  // If our test bucket does not exist, abort the execution.
  if (buckets.filter((b) => b.name === testBucketName).length == 0) {
    exec.test.abort();
  }

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

_A k6 script that will upload a multipart upload to an S3 bucket_

{{< /code >}}
