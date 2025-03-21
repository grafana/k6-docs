---
title: 'listBuckets'
head_title: 'S3Client.listBuckets()'
description: 'S3Client.listBuckets lists the buckets the authenticated user has access to'
weight: 10
---

# listBuckets

`S3Client.listBuckets()` lists the buckets the authenticated user has access to in the region set by the `S3Client` instance's configuration.

### Returns

| Type                                                                                                        | Description                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<Array<[Bucket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/bucket)>> | A Promise that fulfills with an array of [Bucket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/bucket) objects. |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.11.0/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';

export default async function () {
  // List the buckets the AWS authentication configuration
  // gives us access to.
  const buckets = await s3.listBuckets();

  // If our test bucket does not exist, abort the execution.
  if (buckets.filter((b) => b.name === testBucketName).length == 0) {
    exec.test.abort();
  }

  // ... work with the bucket's content
}
```

{{< /code >}}
