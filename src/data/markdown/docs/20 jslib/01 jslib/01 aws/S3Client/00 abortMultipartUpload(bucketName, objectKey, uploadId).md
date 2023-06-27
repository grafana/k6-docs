---
title: 'S3Client.abortMultipartUpload(bucketName, objectKey, uploadId)'
description: 'S3Client.abortMultipartUpload aborts a multipart upload to a bucket'
excerpt: 'S3Client.abortMultipartUpload aborts a multipart upload to a bucket'
---

`S3Client.abortMultipartUpload` aborts a multipart upload to an S3 bucket.

| Parameter  | Type                  | Description                                            |
| :--------- | :-------------------- | :----------------------------------------------------- |
| bucketName | string                | Name of the bucket to delete the multipart object from.|
| objectKey  | string                | Name of the multipart object to delete.                |
| uploadId   | number                | UploadId of the multipart upload to abort.             |

### Example

<CodeGroup labels={[]}>

```javascript
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.8.0/s3.js';

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
    sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const s3 = new S3Client(awsConfig);

const testBucketName = 'test-jslib-aws';
const testFileKey = 'multipart.txt';

export default function () {
    // Initialize a multipart upload
    const multipartUpload = s3.createMultipartUpload(testBucketName, testFileKey);

    // Abort multipart upload
    s3.abortMultipartUpload(testBucketName, testFileKey, multipartUpload.uploadId);
}
```

_A k6 script that will create a multipart upload and abort the multipart_

</CodeGroup>