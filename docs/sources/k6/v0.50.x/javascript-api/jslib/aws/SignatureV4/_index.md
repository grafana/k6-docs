---
title: 'SignatureV4'
head_title: 'SignatureV4'
description: 'SignatureV4 is used to sign or pre-sign requests to AWS services using the Signature V4 algorithm'
description: 'SignatureV4 is used to sign and pre-sign requests to AWS services using the Signature V4 algorithm'
weight: 00
---

# SignatureV4

{{< docs/shared source="k6" lookup="blocking-aws-blockquote.md" version="<K6_VERSION>" >}}

With SignatureV4, you can produce authenticated HTTP requests to AWS services. Namely, it lets you sign and pre-sign requests to AWS services using the [Signature V4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) algorithm. The `sign` operation produces a signed request with authorization information stored in its headers.
The `presign` operation produces a pre-signed request with authorization information stored in its query string parameters.

SignatureV4 is included in both the dedicated jslib `signature.js` bundle and the `aws.js` one, containing all the service's clients.

Instantiating a new `SignatureV4` requires a single options object argument with the following properties:

| Property      | Type                                                                                      | Description                                                                                                                                                                                                                                                                  |
| :------------ | :---------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service       | string                                                                                    | the AWS region to sign or pre-sign requests for. As described by [Amazon AWS docs](https://docs.aws.amazon.com/general/latest/gr/rande.html)                                                                                                                                 |
| region        | string                                                                                    | the AWS service to sign or pre-sign requests for. As described by [Amazon AWS docs](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/)]                                                                                                                     |
| credentials   | an object with `accessKeyId`, `secretAccessKeyId`, and optional `sessionToken` properties | the AWS credentials to sign or pre-sign requests with.                                                                                                                                                                                                                       |
| uriEscapePath | boolean                                                                                   | Whether to uri-escape the request URI path as part of computing the canonical request string. As of late 2017, this is **required for every AWS service** except Amazon S3.                                                                                                  |
| applyChecksum | boolean                                                                                   | Whether to calculate a checksum of the request body and include it as either a request header (when signing) or as a query string parameter (when pre-signing). This is **required for AWS Glacier and Amazon S3** and optional for every other AWS service as of late 2017. |

## Methods

<!-- vale off -->

| Method                                                                                             | Description                                                                   |
| :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| [sign()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/signaturev4/sign)       | Signs an authenticated HTTP request using the AWS signature v4 algorithm      |
| [presign()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/signaturev4/presign) | Produces an authenticated pre-signed URL using the AWS signature v4 algorithm |

<!-- vale on -->

### Throws

SignatureV4 methods throw errors on failure.

| Error                 | Condition                               |
| :-------------------- | :-------------------------------------- |
| InvalidSignatureError | when invalid credentials were provided. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

import { AWSConfig, SignatureV4 } from 'https://jslib.k6.io/aws/0.11.0/aws.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

export default function () {
  /**
   * In order to be able to sign an HTTP request's,
   * we need to instantiate a SignatureV4 object.
   */
  const signer = new SignatureV4({
    service: 's3',
    region: awsConfig.region,
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      sessionToken: awsConfig.sessionToken,
    },

    /**
     * Whether the URI should be escaped or not.
     */
    uriEscapePath: false,

    /**
     * Whether or not the body's hash should be calculated and included
     * in the request.
     */
    applyChecksum: false,
  });

  /**
   * The sign operation will return a new HTTP request with the
   * AWS signature v4 protocol headers added. It returns an Object
   * implementing the SignedHTTPRequest interface, holding a `url` and a `headers`
   * properties, ready to use in the context of k6's http call.
   */
  const signedRequest = signer.sign(
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
      hostname: 'mybucket.s3.us-east-1.amazonaws.com',

      /**
       * The path of the request.
       */
      path: '/myfile.txt',

      /**
       * The headers we will be sending in the request.
       */
      headers: {},
    },

    /**
     * (optional) Signature operation options allows to override the
     * SignatureV4's options in the context of this specific request.
     */
    {
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
       * The region name to sign the request. It will override the signing region of the
       * signer in current invocation
       */
      signingRegion: 'us-east-1',
    }
  );

  http.get(signedRequest.url, { headers: signedRequest.headers });
}
```

{{< /code >}}
