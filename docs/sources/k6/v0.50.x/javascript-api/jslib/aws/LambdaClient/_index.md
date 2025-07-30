---
title: 'LambdaClient'
description: 'LambdaClient allows interacting with the AWS Lambda service'
weight: 00
---

# LambdaClient

{{< docs/shared source="k6" lookup="blocking-aws-blockquote.md" version="<K6_VERSION>" >}}

`LambdaClient` interacts with [AWS Lambda](https://aws.amazon.com/lambda/). With it, you can invoke a Lambda function.

Both the dedicated `lambda.js` jslib bundle and the all-encompassing `aws.js` bundle include the `LambdaClient`.

### Methods

| Function                                                                                                                  | Description                     |
| :------------------------------------------------------------------------------------------------------------------------ | :------------------------------ |
| [invoke(name, payload, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/lambdaclient/invoke) | Invokes an AWS Lambda function. |

### Throws

`LambdaClient` methods will throw errors in case of failure.

| Error                 | Condition                                                   |
| :-------------------- | :---------------------------------------------------------- |
| InvalidSignatureError | When invalid credentials were provided.                     |
| LambdaInvocationError | When AWS replied to the requested invocation with an error. |

### Examples

{{< code >}}

<!-- md-k6:skip -->

```javascript
import {
  AWSConfig,
  LambdaClient,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/lambda.js';
import { check } from 'k6';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const lambdaClient = new LambdaClient(awsConfig);

export default async function () {
  const response = await lambdaClient.invoke('add-numbers', JSON.stringify({ x: 1, y: 2 }));

  check(response, {
    'status is 200': (r) => r.statusCode === 200,
    'payload is 3': (r) => r.payload === 3,
  });
}
```

{{< /code >}}
