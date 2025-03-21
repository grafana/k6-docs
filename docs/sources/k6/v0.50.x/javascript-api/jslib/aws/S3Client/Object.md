---
title: 'Object'
head_title: 'Object'
description: "Object is returned by the S3Client.* methods who query S3 buckets' objects."
weight: 20
---

# Object

Object is returned by the S3Client.\* methods that query S3 buckets' objects. Namely, [`listObjects`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/listobjects), [`getObject`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/getobject), [`putObject`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/putobject),
and [`deleteObject`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/deleteobject). The Object construct describes an Amazon S3 object.

| Name                  | Type                                                                                                                                      | Description                                                                                                                                                                                 |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Object.key`          | string                                                                                                                                    | The S3 object's name.                                                                                                                                                                       |
| `Object.lastModified` | number                                                                                                                                    | The S3 object's last modification date.                                                                                                                                                     |
| `Object.etag`         | string                                                                                                                                    | The S3 object's `etag` is a hash of the object. The ETag reflects changes only to the contents of an object, not its metadata. The ETag may or may not be an MD5 digest of the object data. |
| `Object.size`         | size                                                                                                                                      | The S3 object's size in bytes.                                                                                                                                                              |
| `Object.storageClass` | `STANDARD` \| `REDUCED_REDUNDANCY` \| `GLACIER` \| `STANDARD_IA` \| `INTELLIGENT_TIERING` \| `DEEP_ARCHIVE` \| `OUTPOSTS` \| `GLACIER_IR` | The S3 object's class of storage used to store it.                                                                                                                                          |
| `Object.data`         | `string` or `bytes` or `null`                                                                                                             | The S3 object's content.                                                                                                                                                                    |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import {
  // listBuckets,
  AWSConfig,
  S3Client,
} from 'https://jslib.k6.io/aws/0.11.0/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';
const testFileKey = 'bonjour.txt';

export default async function () {
  const objects = await s3.listObjects(testBucketName);

  // If our test object does not exist, abort the execution.
  if (objects.filter((o) => o.key === testFileKey).length == 0) {
    exec.test.abort();
  }

  // Let's download our test object and print its content
  const object = await s3.getObject(testBucketName, testFileKey);
  console.log(JSON.stringify(object));
}
```

_A k6 script that will query a S3 bucket's objects and print its content and metadata_

{{< /code >}}
