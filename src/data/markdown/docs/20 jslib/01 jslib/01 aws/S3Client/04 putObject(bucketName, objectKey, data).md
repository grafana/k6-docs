---
title: 'S3Client.putObject(bucketName, objectKey, data)'
description: 'S3Client.putObject uploads an object to a bucket'
excerpt: 'S3Client.putObject uploads an object to a bucket'
---

`S3Client.putObject` uploads an object to a bucket.

| Parameter  | Type                  | Description                                  |
| :--------- | :-------------------- | :------------------------------------------- |
| bucketName | string                | Name of the bucket to upload the object to.  |
| objectKey  | string                | Name of the uploaded object.                 |
| data       | string \| ArrayBuffer | Content of the object to upload.             |

### Example

<CodeGroup labels={[]}>

```javascript
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.7.0/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';
const testFileKey = 'bonjour.txt';
const testFile = open('./bonjour.txt', 'r');

export default function () {
  // Let's upload our test file to the bucket
  s3.putObject(testBucketName, testFileKey, testFile);

  // And let's redownload it to verify it's correct
  const obj = s3.getObject(testBucketName, testFileKey);
  console.log(JSON.stringify(obj));
}
```

_A k6 script that will upload an object to a S3 bucket_

</CodeGroup>