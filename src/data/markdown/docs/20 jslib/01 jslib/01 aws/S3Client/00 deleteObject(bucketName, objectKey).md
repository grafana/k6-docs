---
title: 'S3Client.deleteObject(bucketName, objectKey)'
description: 'S3Client.deleteObject deletes an object from a bucket'
excerpt: 'S3Client.deleteObject deletes an object from a bucket'
---

`S3Client.deleteObject` deletes an object from a bucket.

| Parameter  | Type                  | Description                                  |
| :--------- | :-------------------- | :------------------------------------------- |
| bucketName | string                | Name of the bucket to delete the object from.|
| objectKey  | string                | Name of the object to delete.                |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.8.1/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';
const testFileKey = 'bonjour.txt';

export default function () {
  // Let's delete our test object
  s3.deleteObject(testBucketName, testFileKey);

  // And make sure it was indeed deleted
  const objects = s3.listObjects();
  if (objects.filter((o) => o.name === testBucketName).length != 0) {
    exec.test.abort();
  }
}
```

_A k6 script that will delete an object from a S3 bucket_

</CodeGroup>