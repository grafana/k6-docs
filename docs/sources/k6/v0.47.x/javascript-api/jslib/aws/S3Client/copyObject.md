---
title: 'copyObject'
head_title: 'S3Client.copyObject'
description: 'S3Client.copyObject copies an object from a bucket to another'
weight: 10
---

# copyObject

`S3Client.copyObject` copies an object from one bucket to another.

### Parameters

| Parameter         | Type   | Description                                        |
| :---------------- | :----- | :------------------------------------------------- |
| sourceBucket      | string | Name of the bucket to copy the object from.        |
| sourceKey         | string | Name of the object to copy from the source bucket. |
| destinationBucket | string | Name of the bucket to copy the object to.          |
| destinationKey    | string | Name of the destination object.                    |

### Returns

| Type            | Description                                                                         |
| :-------------- | :---------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the object has been copied from one bucket to another. |

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

const testFile = open('./bonjour.txt', 'r');
const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';
const testFileKey = 'bonjour.txt';
const testDestinationBucketName = 'test-jslib-aws-destination';

export default async function () {
  // Let's upload our test file to the bucket
  await s3.putObject(testBucketName, testFileKey, testFile);

  // Let's create our destination bucket
  await s3.copyObject(testBucketName, testFileKey, testDestinationBucketName, testFileKey);
}
```

_A k6 script that will copy an object from a source S3 bucket to a destination bucket_

{{< /code >}}
