---
title: 'getObject'
head_title: 'S3Client.getObject(bucketName, objectKey)'
description: 'S3Client.getObject downloads an object from a bucket'
weight: 10
---

# getObject

`S3Client.getObject` downloads an object from a bucket.

As a default, the object's data will be treated as a string. In order to treat the object's data as binary content, and
receive the data as an `ArrayBuffer`, you can pass [`additionalHeaders`](#parameters) to `getObject`, with the `Accept` header set to
`application/octet-stream`.

### Parameters

| Parameter         | Type   | Description                                  |
| :---------------- | :----- | :------------------------------------------- |
| bucketName        | string | Name of the bucket to fetch the object from. |
| objectKey         | string | Name of the object to download.              |
| additionalHeaders | Object | Additional headers to send with the request. |

### Returns

| Type                                                                                                 | Description                                                                                                                                                                |
| :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<[Object](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/object)> | A Promise that fulfills with an [Object](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/object) describing and holding the downloaded content. |

### Example

#### Downloading a text file from AWS S3

{{< code >}}

```javascript
import exec from 'k6/execution';

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

_A k6 script that will download an object from a bucket_

{{< /code >}}

#### Downloading a binary file from AWS S3

{{< code >}}

```javascript
import exec from 'k6/execution';

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
const testBucketName = 'test-jslib-aws';
const testFileKey = 'quick.pdf';

export default async function () {
  // Download an object from S3, and require from the `getObject` operation
  // to treat it as a binary content's file, and return an Object who's data
  // parameter is an ArrayBuffer.
  const s3Object = await s3.getObject(testBucketName, testFileKey, {
    Accept: 'application/octet-stream',
  });

  console.log(`Successfully downloaded a binary file of size ${s3Object.data.byteLength} bytes`);
}
```

_A k6 script that will download a binary object from a bucket_

{{< /code >}}
