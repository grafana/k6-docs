---
title: 'sign'
description: 'Signaturev4.sign signs an HTTP request with the AWS Signature V4 algorithm'
excerpt: 'SignatureV4.sign signs an HTTP request with the AWS Signature V4 algorithm'
---

`SignatureV4.sign()` signs an HTTP request with the AWS Signature V4 algorithm. Given an HTTP request description, it returns a new HTTP request with the AWS signature v4 protocol headers added. It returns an Object holding a `url` and a `headers` properties, ready to use in the context of k6's HTTP call.

### Parameters

The first parameter of the `sign` method consists of an Object with the following properties.

| Property      | Type                     | Description                                                                                                                                                                                                                                                             |
| :------------ | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method        | string                   | The HTTP method of the request                                                                                                                                                                                                                                          |
| protocol      | `http` or `https` string | The network protocol of the request                                                                                                                                                                                                                                     |
| hostname      | string                   | The hostname the request is sent to                                                                                                                                                                                                                                     |
| path          | string                   | The path of the request                                                                                                                                                                                                                                                 |
| headers       | Object                   | The headers of the HTTP request                                                                                                                                                                                                                                         |
| body?         | string or ArrayBuffer    | The optional body of the HTTP request                                                                                                                                                                                                                                   |
| uriEscapePath | boolean                  | Whether to uri-escape the request URI path as part of computing the canonical request string. This is required for every AWS service, except Amazon S3, as of late 2017.                                                                                                |
| applyChecksum | boolean                  | Whether to calculate a checksum of the request body and include it as either a request header (when signing) or as a query string parameter (when pre-signing). This is required for AWS Glacier and Amazon S3 and optional for every other AWS service as of late 2017. |
|               |                          |                                                                                                                                                                                                                                                                         |

You can override SignatureV4 options in the context of this specific request. To do this, pass a second parameter to the `sign` method, which is an Object with the following parameters.

| Property          | Type        | Description                                                                |
| :---------------- | :---------- | :------------------------------------------------------------------------- |
| signingDate       | Date        | overrides the Date used in the signing operation                           |
| signingService    | string      | overrides the signer's AWS service in the context of the `sign` operation. |
| signingRegion     | string      | overrides the signer's AWS region in the context of the `sign` operation   |
| unsignableHeaders | `Set<string>` | excludes headers from the signing process                                  |
| signableHeaders   | `Set<string>` | mark headers as signed                                                     |

### Returns

| Property | Type   | Description                                                             |
| :------- | :----- | :---------------------------------------------------------------------- |
| headers  | Object | The signed request's headers to use in the context of a k6 HTTP request |
| url      | string | The signed url to use in the context of a k6 HTTP request               |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http.js'

import { AWSConfig, SignatureV4 } from 'https://jslib.k6.io/aws/0.7.1/kms.js'

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
    sessionToken: __ENV.AWS_SESSION_TOKEN,
})

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
    })

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

            /**
             * Whether the URI should be escaped or not.
             */
            uriEscapePath: false,

            /**
             * Whether or not the body's hash should be calculated and included
             * in the request.
             */
            applyChecksum: false,
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
    )

    http.get(signedRequest.url, { headers: signedRequest.headers })
}
```

</CodeGroup>
