---
title: 'sign'
slug: 'sign'
description: 'Signaturev4.sign signs an HTTP request with the AWS Signature V4 algorithm'
---

# sign

`SignatureV4.sign()` signs an HTTP request with the AWS Signature V4 algorithm. Given an HTTP request description, it returns a new HTTP request with the AWS signature v4 protocol headers added. It returns an Object holding a `url` and a `headers` properties, ready to use in the context of k6's HTTP call.

### Parameters

The first parameter of the `sign` method consists of an Object with the following properties.

| Property         | Type                                        | Description                                                                                                                                                                                                                                                                                   |
| :--------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method           | string                                      | The HTTP method of the request                                                                                                                                                                                                                                                                |
| endpoint         | Endpoint                                    | The endpoint of the request. The Endpoint constructor can be imported from both the `aws.js` bundle, as well as the `signature.js` file, and takes a string of the form `{scheme}://{hostname}[:{port}]` as input, allowing to define the target of the request (See provided example below). |
| path             | string                                      | The path of the request                                                                                                                                                                                                                                                                       |
| headers          | Object                                      | The headers of the HTTP request                                                                                                                                                                                                                                                               |
| body (optional)  | string or ArrayBuffer                       | The optional body of the HTTP request                                                                                                                                                                                                                                                         |
| query (optional) | `Object.<string, string \| Array.<string>>` | The optional query parameters of the HTTP request                                                                                                                                                                                                                                             |

You can override SignatureV4 options in the context of this specific request. To do this, pass a second parameter to the `sign` method, which is an Object with the following parameters.

| Property          | Type          | Description                                                                |
| :---------------- | :------------ | :------------------------------------------------------------------------- |
| signingDate       | Date          | overrides the Date used in the signing operation                           |
| signingService    | string        | overrides the signer's AWS service in the context of the `sign` operation. |
| signingRegion     | string        | overrides the signer's AWS region in the context of the `sign` operation   |
| unsignableHeaders | `Set<string>` | excludes headers from the signing process                                  |
| signableHeaders   | `Set<string>` | mark headers as signed                                                     |

### Returns

| Property | Type   | Description                                                             |
| :------- | :----- | :---------------------------------------------------------------------- |
| headers  | Object | The signed request's headers to use in the context of a k6 HTTP request |
| url      | string | The signed url to use in the context of a k6 HTTP request               |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

import {
  AWSConfig,
  Endpoint,
  SignatureV4,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/signature.js';

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
    applyChecksum: true,
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
       * The endpoint of the service we will be making the request to.
       *
       * The endpoint is instantiated from a URL string, of the format: `{scheme}://{hostname}[:{port}]`
       */
      endpoint: new Endpoint('https://s3.us-east-1.amazonaws.com'),

      /**
       * The path of the request.
       */
      path: '/my-bucket/bonjour.txt',

      /**
       * The query parameters to include in the request.
       */
      query: {
        'abc': '123',
        'easy as': ['do', 're', 'mi'],
      },

      /**
       * The headers we will be sending in the request.
       */
      headers: {},

      /**
       * The body of the request.
       */
      body: null,
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
