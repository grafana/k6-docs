---
title: 'S3MultipartUpload'
description: 'S3MultipartUpload is returned by the S3Client.createMultipartUpload method when creating a multipart upload.'
weight: 20
---

# S3MultipartUpload

S3MultipartUpload is returned by the [`createMultipartUpload(bucketName, objectKey)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/createmultipartupload) method when creating a [multipart upload](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CreateMultipartUpload.html).

| Name                         | Type   | Description                   |
| :--------------------------- | :----- | :---------------------------- |
| `S3MultipartUpload.key`      | string | The S3 Multipart object's key |
| `S3MultipartUpload.uploadId` | Date   | The S3 Multipart upload Id    |

### Example

{{< code >}}

```javascript
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
  // Initialize a multipart upload
  const multipartUpload = await s3.createMultipartUpload(testBucketName, testFileKey);
  console.log(multipartUpload.uploadId);

  // Abort multipart upload
  await s3.abortMultipartUpload(testBucketName, testFileKey, multipartUpload.uploadId);
}
```

_A k6 script that will create a multipart upload and log the multipart `uploadId` and abort the multipart upload_

{{< /code >}}
