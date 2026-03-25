---
title: 'putObject'
description: 'S3Client.putObject uploads an object to a bucket'
weight: 10
---

# putObject

`S3Client.putObject` uploads an object to a bucket.

### Parameters

| Parameter  | Type                                           | Description                                 |
| :--------- | :--------------------------------------------- | :------------------------------------------ |
| bucketName | string                                         | Name of the bucket to upload the object to. |
| objectKey  | string                                         | Name of the uploaded object.                |
| data       | string \| ArrayBuffer                          | Content of the object to upload.            |
| params     | [PutObjectParams](#putobjectparams) (optional) | Options for the request.                    |

#### PutObjectParams

| Name               | Type              | Description                                                                                                                                                                                                                                                         |
| :----------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| contentDisposition | string (optional) | Specifies presentational information for the object. For more information, see [RFC 6266](https://tools.ietf.org/html/rfc6266).                                                                                                                                     |
| contentEncoding    | string (optional) | Specifies what content encodings have been applied to the object and thus what decoding mechanisms must be applied to obtain the media-type referenced by the Content-Type header field. For more information, see [RFC 2616](https://tools.ietf.org/html/rfc2616). |
| contentLength      | number (optional) | Size of the body in bytes. This parameter is useful when the size of the body cannot be determined automatically.                                                                                                                                                   |
| contentMD5         | string (optional) | The base64-encoded 128-bit MD5 digest of the message (without the headers) according to RFC 1864. This header can be used as a message integrity check to verify that the received message is identical to the message that was sent.                               |
| contentType        | string (optional) | A standard MIME type describing the format of the object data. For more information, see [RFC 2616](https://tools.ietf.org/html/rfc2616).                                                                                                                           |

### Returns

| Type                                                                                                                     | Description                                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Promise<[S3UploadedObject](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/s3uploadedobject)> | A Promise that fulfills with an [S3UploadedObject](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/s3client/s3uploadedobject) containing metadata about the uploaded object, including ETag and optional checksums. |

### Example

{{< code >}}

<!-- md-k6:skip -->

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
const testBucketName = 'test-jslib-aws';
const testFileKey = 'bonjour.txt';
const testFile = open('./bonjour.txt', 'r');

export default async function () {
  // Let's upload our test file to the bucket
  const uploadResult = await s3.putObject(testBucketName, testFileKey, testFile, {
    contentType: 'text/plain',
    contentLength: testFile.length,
  });

  // Access the upload metadata
  console.log('Upload successful! ETag:', uploadResult.eTag);

  if (uploadResult.size) {
    console.log('Object size:', uploadResult.size);
  }

  // Check if checksums are available
  if (uploadResult.sha256) {
    console.log('SHA256 checksum:', uploadResult.sha256);
  }

  // And let's redownload it to verify it's correct
  const obj = await s3.getObject(testBucketName, testFileKey);
  console.log(JSON.stringify(obj));
}
```

_A k6 script that will upload an object to a S3 bucket_

{{< /code >}}
