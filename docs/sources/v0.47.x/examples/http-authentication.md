---
title: 'HTTP Authentication'
description: 'Scripting examples on how to use different authentication or authorization methods in your load test.'
weight: 02
---

# HTTP Authentication

Scripting examples on how to use different authentication or authorization methods in your load test.

## Basic authentication

{{< code >}}

```javascript
import encoding from 'k6/encoding';
import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
  const credentials = `${username}:${password}`;

  // Passing username and password as part of the URL will
  // allow us to authenticate using HTTP Basic Auth.
  const url = `https://${credentials}@httpbin.test.k6.io/basic-auth/${username}/${password}`;

  let res = http.get(url);

  // Verify response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });

  // Alternatively you can create the header yourself to authenticate
  // using HTTP Basic Auth
  const encodedCredentials = encoding.b64encode(credentials);
  const options = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  };

  res = http.get(`https://httpbin.test.k6.io/basic-auth/${username}/${password}`, options);

  // Verify response (checking the echoed data from the httpbin.test.k6.io
  // basic auth test API endpoint)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });
}
```

{{< /code >}}

## Digest authentication

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
  // Passing username and password as part of URL plus the auth option will
  // authenticate using HTTP Digest authentication.
  const credentials = `${username}:${password}`;
  const res = http.get(
    `https://${credentials}@httpbin.test.k6.io/digest-auth/auth/${username}/${password}`,
    {
      auth: 'digest',
    }
  );

  // Verify response (checking the echoed data from the httpbin.test.k6.io digest auth
  // test API endpoint)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });
}
```

{{< /code >}}

## NTLM authentication

{{< code >}}

```javascript
import http from 'k6/http';

const username = 'user';
const password = 'passwd';

export default function () {
  // Passing username and password as part of URL and then specifying
  // "ntlm" as auth type will do the trick!
  const credentials = `${username}:${password}`;
  const res = http.get(`http://${credentials}@example.com/`, { auth: 'ntlm' });
}
```

{{< /code >}}

## AWS Signature v4 authentication with the [k6-jslib-aws](https://github.com/grafana/k6-jslib-aws)

To authenticate requests to AWS APIs using [AWS Signature Version 4](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html), k6 offers the [k6-jslib-aws](https://github.com/grafana/k6-jslib-aws) JavaScript library, which provides a dedicated `SignatureV4` class. This class can produce authenticated requests to send to AWS APIs using the `http` k6 module.

Here's an example script to demonstrate how to sign a request to fetch an object from an S3 bucket:

{{< code >}}

```javascript
import http from 'k6/http';
import { AWSConfig, SignatureV4 } from 'https://jslib.k6.io/aws/0.11.0/signature.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,

  /**
   * Optional session token for temporary credentials.
   */
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

export default function () {
  /**
   * Create a signer instance with the AWS credentials.
   * The signer will be used to sign the request.
   */
  const signer = new SignatureV4({
    service: 's3',
    region: awsConfig.region,
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      sessionToken: awsConfig.sessionToken,
    },
  });

  /**
   * Use the signer to prepare a signed request.
   * The signed request can then be used to send the request to the AWS API.
   */
  const signedRequest = signer.sign(
    {
      method: 'GET',
      protocol: 'https',
      hostname: 'test-jslib-aws.s3.us-east-1.amazonaws.com',
      path: '/bonjour.txt',
      headers: {},
      uriEscapePath: false,
      applyChecksum: false,
    },
    {
      signingDate: new Date(),
      signingService: 's3',
      signingRegion: 'us-east-1',
    }
  );

  /**
   * The `signedRequest` object contains the signed request URL and headers.
   * We can use them to send the request to the AWS API.
   */
  http.get(signedRequest.url, { headers: signedRequest.headers });
}
```

{{< /code >}}
