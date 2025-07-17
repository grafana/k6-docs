---
title: 'abortMultipartUpload'
head_title: 'S3Client.abortMultipartUpload(bucketName, objectKey, uploadId)'
description: 'S3Client.abortMultipartUpload aborts a multipart upload to a bucket'
weight: 10
---

# abortMultipartUpload

`S3Client.abortMultipartUpload` aborts a multipart upload to an S3 bucket.

### Parameters

| Parameter  | Type   | Description                                             |
| :--------- | :----- | :------------------------------------------------------ |
| bucketName | string | Name of the bucket to delete the multipart object from. |
| objectKey  | string | Name of the multipart object to delete.                 |
| uploadId   | number | UploadId of the multipart upload to abort.              |

### Returns

| Type            | Description                                                         |
| :-------------- | :------------------------------------------------------------------ |
| `Promise<void>` | A promise that fulfills when the multipart upload has been aborted. |

### Example

{{< code >}}

```javascript
import {
  AWSConfig,
  S3Client,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/s3.js';

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
  // Initialize a multipart upload
  const multipartUpload = await s3.createMultipartUpload(testBucketName, testFileKey);

  // Abort multipart upload
  await s3.abortMultipartUpload(testBucketName, testFileKey, multipartUpload.uploadId);
}
```

_A k6 script that will create a multipart upload and abort the multipart_

{{< /code >}}
