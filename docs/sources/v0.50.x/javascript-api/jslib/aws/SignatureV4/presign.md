---
title: 'presign'
head_title: 'presign'
slug: 'presign'
description: 'Signaturev4.presign pre-signs a URL with the AWS Signature V4 algorithm'
description: 'SignatureV4.sign pre-signs a URL with the AWS Signature V4 algorithm'
---

# presign

`SignatureV4.presign()` pre-signs a URL with the AWS Signature V4 algorithm. Given an HTTP request description, it returns a new HTTP request with the AWS signature v4 authorization added. It returns an Object holding a `url` containing the authorization information encoded in its query string, ready to use in the context of a k6 HTTP call.

### Parameters

The first parameter of the `presign` method consists of an Object with the following properties.

| Property | Type                     | Description                         |
| :------- | :----------------------- | :---------------------------------- |
| method   | string                   | The HTTP method of the request      |
| protocol | `http` or `https` string | The network protocol of the request |
| hostname | string                   | The hostname the request is sent to |
| path     | string                   | The path of the request             |
| headers  | Object                   | The headers of the HTTP request     |

You can provide further options and override SignatureV4 options in the context of this specific request.
To do this, pass a second parameter to the `presign` method, which is an Object with the following parameters.

| Property          | Type          | Description                                                                |
| :---------------- | :------------ | :------------------------------------------------------------------------- |
| expiresIn         | number        | The number of seconds before the pre-signed URL expires                    |
| signingDate       | Date          | overrides the Date used in the signing operation                           |
| signingService    | string        | overrides the signer's AWS service in the context of the `sign` operation. |
| signingRegion     | string        | overrides the signer's AWS region in the context of the `sign` operation   |
| unsignableHeaders | `Set<string>` | excludes headers from the signing process                                  |
| signableHeaders   | `Set<string>` | mark headers as signed                                                     |

### Returns

The `presign` operation returns an Object with the following properties.

| Property | Type   | Description                                                               |
| :------- | :----- | :------------------------------------------------------------------------ |
| headers  | Object | The pre-signed request headers to use in the context of a k6 HTTP request |
| url      | string | The pre-signed url to use in the context of a k6 HTTP request             |

### Example

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

import {
  AWSConfig,
  SignatureV4,
  AMZ_CONTENT_SHA256_HEADER,
  UNSIGNED_PAYLOAD,
} from 'https://jslib.k6.io/aws/0.11.0/kms.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

export default function () {
  // In order to be able to produce pre-signed URLs,
  // we need to instantiate a SignatureV4 object.
  const signer = new SignatureV4({
    service: 's3',
    region: awsConfig.region,
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      sessionToken: awsConfig.sessionToken,
    },
    uriEscapePath: false,
    applyChecksum: false,
  });

  // We can now use the signer to produce a pre-signed URL.
  const signedRequest = signer.presign(
    /**
     * HTTP request description
     */
    {
      /**
       * The HTTP method we will use in the request.
       */
      method: 'GET',

      /**
       * The network protocol we will use to make the request.
       */
      protocol: 'https',

      /**
       * The hostname of the service we will be making the request to.
       */
      hostname: 'my-bucket.s3.us-east-1.amazonaws.com',

      /**
       * The path of the request.
       */
      path: '/my-file.txt',

      /**
       * The headers we will be sending in the request.
       *
       * Note that in the specific case of this example, requesting
       * an object from S3, we want to set the `x-amz-content-sha256`
       * header to `UNSIGNED_PAYLOAD`. That way, we bypass the payload
       * hash calculation, and communicate that value instead, as specified.
       */
      headers: { [AMZ_CONTENT_SHA256_HEADER]: 'UNSIGNED-PAYLOAD' },
    },

    /**
     * (optional) pre-sign operation options.
     */
    {
      /**
       * The number of seconds before the pre-signed URL expires
       */
      expiresIn: 86400,

      /**
       * A set of strings whose representing headers that should not be hoisted
       * to pre-signed request's query string. If not supplied, the pre-signer
       * moves all the AWS-specific headers (starting with `x-amz-`) to the request
       * query string. If supplied, these headers remain in the pre-signed request's
       * header.
       * All headers in the provided request will have their names converted to
       * lower case and then checked for existence in the unhoistableHeaders set.
       *
       * In the case of pre-signing S3 URLs, the body needs to be empty.
       * however, the AMZ_CONTENT_SHA256_HEADER needs to be set to
       * UNSIGNED_PAYLOAD. To do this, we need to set the header,
       * but declare it as unhoistable, and unsignable.
       */
      unhoistableHeaders: new Set([AMZ_CONTENT_SHA256_HEADER]),

      /**
       * A set of strings whose members represents headers that cannot be signed.
       * All headers in the provided request will have their names converted to
       * lower case and then checked for existence in the unsignableHeaders set.
       *
       * In the case of pre-signing S3 URLs, the body needs to be empty.
       * however, the AMZ_CONTENT_SHA256_HEADER needs to be set to
       * UNSIGNED_PAYLOAD. To do this, we need to set the header,
       * but declare it as unhoistable, and unsignable.
       */
      unsignableHeaders: new Set([AMZ_CONTENT_SHA256_HEADER]),

      /**
       * A set of strings whose members represents headers that should be signed.
       * Any values passed here will override those provided via unsignableHeaders,
       * allowing them to be signed.
       *
       * All headers in the provided request will have their names converted to
       * lower case before signing.
       */
      signableHeaders: new Set(),

      /**
       * The date and time to be used as signature metadata. This value should be
       * a Date object, a unix (epoch) timestamp, or a string that can be
       * understood by the JavaScript `Date` constructor.If not supplied, the
       * value returned by `new Date()` will be used.
       */
      signingDate: new Date(),

      /**
       * The service signing name. It will override the service name of the signer
       * in current invocation
       */
      signingService: 's3',

      /**
       * The signingRegion and signingService options let the user
       * specify a different region or service to pre-sign the request for.
       */
      signingRegion: 'us-east-1',
    }
  );

  console.log(`presigned URL: ${signedRequest.url}`);

  /**
   * Our URL is now ready to be used.
   */
  const res = http.get(signedRequest.url, {
    headers: signedRequest.headers,
  });

  check(res, { 'status is 200': (r) => r.status === 200 });
}
```

{{< /code >}}
