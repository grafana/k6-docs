---
title: 'Bucket'
head_title: 'Bucket'
description: 'Bucket is returned by the S3Client.* methods who query S3 buckets.'
weight: 20
---

# Bucket

Bucket is returned by the S3Client.\* methods that query S3 buckets. Namely, `listBuckets()` returns an array of Bucket objects. The Bucket object describes an Amazon S3 bucket.

| Name                  | Type   | Description                  |
| :-------------------- | :----- | :--------------------------- |
| `Bucket.name`         | string | The S3 bucket's name         |
| `Bucket.creationDate` | Date   | The S3 bucket's creationDate |

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
});

const s3 = new S3Client(awsConfig);

export default async function () {
  // List the buckets the AWS authentication configuration
  // gives us access to.
  const buckets = await s3.listBuckets();
  console.log(JSON.stringify(buckets));
}
```

_A k6 script that will query the user's S3 buckets and print all of their metadata_

{{< /code >}}
