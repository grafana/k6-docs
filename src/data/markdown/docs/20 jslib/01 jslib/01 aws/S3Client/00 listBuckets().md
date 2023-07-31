---
title: 'S3Client.listBuckets()'
description: 'S3Client.listBuckets lists the buckets the authenticated user has access to'
excerpt: 'S3Client.listBuckets lists the buckets the authenticated user has access to'
---

`S3Client.listBuckets()` lists the buckets the authenticated user has access to in the region set by the `S3Client` instance's configuration.

### Returns

| Type            | Description                                                              |
| :-------------- | :----------------------------------------------------------------------- |
| Array<[Bucket](/javascript-api/jslib/aws/s3client/bucket)> | An array of [Bucket](/javascript-api/jslib/aws/s3client/bucket) objects. |

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

export default function () {
  // List the buckets the AWS authentication configuration
  // gives us access to.
  const buckets = s3.listBuckets();

  // If our test bucket does not exist, abort the execution.
  if (buckets.filter((b) => b.name === testBucketName).length == 0) {
    exec.test.abort();
  }

  // ... work with the bucket's content
}
```

</CodeGroup>


