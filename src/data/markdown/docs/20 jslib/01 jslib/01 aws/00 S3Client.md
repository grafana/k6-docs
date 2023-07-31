---
title: 'S3Client'
head_title: 'S3Client'
description: 'S3Client allows interacting with AWS S3 buckets and objects'
excerpt: 'S3Client class allows interacting with AWS S3 buckets and objects'
---

<BlockingAwsBlockquote />

S3Client allows interacting with AWS S3's buckets and objects. Namely, it allows the user to list buckets and the objects they contain, as well as download, uploading, and deleting objects. The S3Client operations are blocking, and we recommend reserving their usage to the [`setup`](/using-k6/test-lifecycle/) and [`teardown`](/using-k6/test-lifecycle/) functions as much as possible.

S3Client is included in both the dedicated jslib `s3.js` bundle, and the `aws.js` one, containing all the services clients.

### Methods

| Function                                                                                                                                     | Description                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------|
| [listBuckets()](/javascript-api/jslib/aws/s3client/s3client-listbuckets)                                                                     | List the buckets the authenticated user has access to        |
| [listObjects(bucketName, [prefix])](/javascript-api/jslib/aws/s3client/s3client-listobjects/)                                                | List the objects contained in a bucket                       |
| [getObject(bucketName, objectKey)](/javascript-api/jslib/aws/s3client/s3client-getobject/)                                                   | Download an object from a bucket                             |
| [putObject(bucketName, objectKey, data)](/javascript-api/jslib/aws/s3client/s3client-putobject/)                                             | Upload an object to a bucket                                 |
| [deleteObject(bucketName, objectKey)](/javascript-api/jslib/aws/s3client/s3client-deleteobject/)                                             | Delete an object from a bucket                               |
| [createMultipartUpload(bucketName, objectKey)](/javascript-api/jslib/aws/s3client/s3client-createmultipartupload/)                           | Create a multipart upload for a given objectKey to a bucket  |
| [uploadPart(bucketName, objectKey, uploadId, partNumber, data)](/javascript-api/jslib/aws/s3client/s3client-uploadpart/)                     | Upload a part in a multipart upload                          |
| [completeMultipartUpload(bucketName, objectKey, uploadId, parts)](/javascript-api/jslib/aws/s3client/s3client-completemultipartupload/)      | Complete a previously assembled multipart upload             |
| [abortMultipartUpload(bucketName, objectKey, uploadId)](/javascript-api/jslib/aws/s3client/s3client-abortmultipartupload/)                   | Abort a multipart upload                                     |

### Throws

S3 Client methods will throw errors in case of failure.

| Error                 | Condition                                                  |
| :-------------------- | :--------------------------------------------------------- |
| InvalidSignatureError | when invalid credentials were provided.                    |
| S3ServiceError        | when AWS replied to the requested operation with an error. |

### Examples

<CodeGroup labels={[]}>

```javascript
import { check } from 'k6';
import exec from 'k6/execution';
import http from 'k6/http';

import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.8.1/s3.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const s3 = new S3Client(awsConfig);
const testBucketName = 'test-jslib-aws';
const testInputFileKey = 'productIDs.json';
const testOutputFileKey = `results-${Date.now()}.json`;

export function setup() {
  // If our test bucket does not exist, abort the execution.
  const buckets = s3.listBuckets();
  if (buckets.filter((b) => b.name === testBucketName).length == 0) {
    exec.test.abort();
  }

  // If our test object does not exist, abort the execution.
  const objects = s3.listObjects(testBucketName);
  if (objects.filter((o) => o.key === testInputFileKey).length == 0) {
    exec.test.abort();
  }

  // Download the S3 object containing our test data
  const inputObject = s3.getObject(testBucketName, testInputFileKey);

  // Let's return the downloaded S3 object's data from the
  // setup function to allow the default function to use it.
  return {
    productIDs: JSON.parse(inputObject.data),
  };
}

export default function (data) {
  // Pick a random product ID from our test data
  const randomProductID = data.productIDs[Math.floor(Math.random() * data.productIDs.length)];

  // Query our ecommerce website's product page using the ID
  const res = http.get(`http://your.website.com/product/${randomProductID}/`);
  check(res, { 'is status 200': res.status === 200 });
}

export function handleSummary(data) {
  // Once the load test is over, let's upload the results to our
  // S3 bucket. This is executed after teardown.
  s3.putObject(testBucketName, testOutputFileKey, JSON.stringify(data));
}
```

</CodeGroup>

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';
import exec from 'k6/execution';

import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.8.1/s3.js';

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
    sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const s3 = new S3Client(awsConfig);

const testBucketName = 'test-jslib-aws';
const testFileKey = 'multipart.txt';

export default function () {
    // List the buckets the AWS authentication configuration
    // gives us access to.
    const buckets = s3.listBuckets();

    // If our test bucket does not exist, abort the execution.
    if (buckets.filter((b) => b.name === testBucketName).length == 0) {
        exec.test.abort();
    }

    // Produce random bytes to upload of size ~12MB, that
    // we will upload in two 6MB parts. This is done as the
    // minimum part size supported by S3 is 5MB.
    const bigFile = crypto.randomBytes(12 * 1024 * 1024);

    // Initialize a multipart upload
    const multipartUpload = s3.createMultipartUpload(testBucketName, testFileKey);

    // Upload the first part
    const firstPartData = bigFile.slice(0, 6 * 1024 * 1024);
    const firstPart = s3.uploadPart(
        testBucketName,
        testFileKey,
        multipartUpload.uploadId,
        1,
        firstPartData
    );

    // Upload the second part
    const secondPartData = bigFile.slice(6 * 1024 * 1024, 12 * 1024 * 1024);
    const secondPart = s3.uploadPart(
        testBucketName,
        testFileKey,
        multipartUpload.uploadId,
        2,
        secondPartData
    );

    // Complete the multipart upload
    s3.completeMultipartUpload(testBucketName, testFileKey, multipartUpload.uploadId, [
        firstPart,
        secondPart,
    ]);

    // Let's redownload it verify it's correct, and delete it
    const obj = s3.getObject(testBucketName, testFileKey);
    s3.deleteObject(testBucketName, testFileKey);
}
```

</CodeGroup>