---
title: 'listObjects'
head_title: 'S3Client.listObjects(bucketName, [prefix])'
description: 'S3Client.listObjects lists the objects contained in a bucket'
weight: 10
---

# listObjects

`S3Client.listObjects()` lists the objects contained in a bucket.

### Parameters

| Parameter         | Type   | Description                                                       |
| :---------------- | :----- | :---------------------------------------------------------------- |
| bucketName        | string | Name of the bucket to fetch the object from.                      |
| prefix (optional) | string | Limits the response to keys that begin with the specified prefix. |

### Returns

| Type                                                                                                        | Description                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<Array<[Object](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/object)>> | A Promise that fulfills with an array of [Object](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/object) objects. |

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
const testFileKey = 'bonjour.txt';

export default async function () {
  // List our bucket's objects
  const objects = await s3.listObjects(testBucketName);

  // If our test object does not exist, abort the execution.
  if (objects.filter((o) => o.key === testFileKey).length == 0) {
    exec.test.abort();
  }

  // ... work with the bucket's objects
  console.log(JSON.stringify(objects));
}
```

{{< /code >}}
