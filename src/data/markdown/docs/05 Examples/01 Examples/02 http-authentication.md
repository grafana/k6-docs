---
title: 'HTTP Authentication'
excerpt: 'Scripting examples on how to use different authenitcation or authorization methods in your load test.'
---

Scripting examples on how to use different authentication or authorization methods in your load test.

## Basic authentication

<div class="code-group" data-props='{ "labels": ["basic-auth.js"], "lineNumbers": [true] }'>

```js
import encoding from 'k6/encoding';
import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
  const credentials = `${username}:${password}`;

  // Passing username and password as part of the URL will
  // allow us to authenticate using HTTP Basic Auth.
  const url = `http://${credentials}@httpbin.org/basic-auth/${username}/${password}`;

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

  res = http.get(
    `http://httpbin.org/basic-auth/${username}/${password}`,
    options,
  );

  // Verify response (checking the echoed data from the httpbin.org
  // basic auth test API endpoint)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });
}
```

</div>

## Digest authentication

<div class="code-group" data-props='{ "labels": ["digest-auth.js"], "lineNumbers": [true] }'>

```js
import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
  // Passing username and password as part of URL plus the auth option will
  // authenticate using HTTP Digest authentication.
  const credentials = `${username}:${password}`;
  const res = http.get(
    `http://${credentials}@httpbin.org/digest-auth/auth/${username}/${password}`,
    { auth: 'digest' },
  );

  // Verify response (checking the echoed data from the httpbin.org digest auth
  // test API endpoint)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });
}
```

</div>

## NTLM authentication

<div class="code-group" data-props='{ "labels": ["ntlm-auth.js"], "lineNumbers": [true] }'>

```js
import http from 'k6/http';

const username = 'user';
const password = 'passwd';

export default function () {
  // Passing username and password as part of URL and then specifying
  // "ntlm" as auth type will do the trick!
  const credentials = `${username}:${password}`;
  let res = http.get(`http://${credentials}@example.com/`, { auth: 'ntlm' });
}
```

</div>

## AWS Signature v4 authentication

Requests to the AWS APIs requires a special type of auth, called AWS Signature Version 4. k6
does not support this authentication mechanism out of the box, so we'll have to resort to using
a Node.js library called [awsv4.js](https://github.com/mhart/aws4) and
[Browserify](http://browserify.org/) (to make it work in k6).

For this to work, we first need to do the following:

1. Make sure you have the necessary prerequisites installed: [Node.js](https://nodejs.org/en/download/)
   and [Browserify](http://browserify.org/)
2. Install the `awsv4.js` library:

   <div class="code-group" data-props='{ "labels": [""], "lineNumbers": [false] }'>

   ```shell
   $ npm install aws4
   ```

   </div>

3. Run it through browserify:

   <div class="code-group" data-props='{ "labels": [""], "lineNumbers": [false] }'>

   ```shell
    $ browserify node_modules/aws4/aws4.js -s aws4 > aws4.js
   ```

   </div>

4. Move the `aws4.js` file to the same folder as your script file and you'll be able to import
   it into your test script:

   <div class="code-group" data-props='{ "labels": [""], "lineNumbers": [false] }'>

   ```js
   import aws4 from "./aws4.js"`
   ```

   </div>

Here's an example script to list all the regions available in EC2. Note that the AWS access key
and secret key needs to be provided through [environment variables](/using-k6/environment-variables).

> ### ⚠️ CPU- and Memory-heavy
>
> As the browserified version of this Node.js library includes several Node.js APIs
> implemented in pure JS (including crypto APIs) it will be quite heavy on CPU and memory hungry
> when run with more than just a few VUs.

<div class="code-group" data-props='{ "labels": ["awsv4-auth.js"], "lineNumbers": [false] }'>

```js
import http from 'k6/http';
import { sleep } from 'k6';

// Import browserified AWSv4 signature library
import aws4 from './aws4.js';

// Get AWS credentials from environment variables
const AWS_CREDS = {
  accessKeyId: __ENV.AWS_ACCESSKEY,
  secretAccessKey: __ENV.AWS_SECRETKEY,
};

export default function () {
  // Sign the AWS API request
  const signed = aws4.sign(
    {
      service: 'ec2',
      path: '/?Action=DescribeRegions&Version=2014-06-15',
    },
    AWS_CREDS,
  );

  // Make the actual request to the AWS API including the
  // "Authorization" header with the signature
  let res = http.get(`https://${signed.hostname}${signed.path}`, {
    headers: signed.headers,
  });

  // Print the response
  console.log(res.body);

  sleep(1);
}
```

</div>
