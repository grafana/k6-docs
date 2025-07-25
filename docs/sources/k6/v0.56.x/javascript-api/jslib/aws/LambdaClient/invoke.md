---
title: 'invoke'
description: 'LambdaClient.invoke invokes an AWS Lamba function'
weight: 10
---

# LambdaClient.invoke(name, payload, [options])

`LambdaClient.invoke` invokes an AWS Lambda function.

### Parameters

| Parameter | Type                                    | Description                                     |
| :-------- | :-------------------------------------- | :---------------------------------------------- |
| name      | string                                  | Name of the function to invoke.                 |
| payload   | string                                  | Payload to send to the function being invoked.  |
| options   | [InvocationOptions](#invocationoptions) | Additional options to customize the invocation. |

#### InvocationOptions

InvocationOptions is an object used to customize the invocation of a Lambda function.
It has the following properties:

| Property       | Type              | Description                                                                                                                                                                                                                                                                                                                                                  |
| :------------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| invocationType | string (optional) | Specifies the invocation type (synchronous or asynchronous). Possible values are: `RequestResponse`, which invokes the function synchronously, `Event`, which invokes the function asynchronously, and `DryRun` which validates the parameter values and verifies that the user or role has permission to invoke the function. Default is `RequestResponse`. |
| logType        | string (optional) | Specifies the type of log to include in the response. Set to `Tail` to include the execution log in the response. Applies to synchronously invoked functions only. Default is `None`.                                                                                                                                                                        |
| clientContext  | string (optional) | Client context to pass to the function. Can be made up of up to 3,583 bytes of base64-encoded data. Default is `null`.                                                                                                                                                                                                                                       |
| qualifier      | string (optional) | Version or alias of the function to invoke.                                                                                                                                                                                                                                                                                                                  |

### Returns

| Type                                               | Description                                                       |
| :------------------------------------------------- | :---------------------------------------------------------------- |
| Promise<[InvocationResponse](#invocationresponse)> | A promise that fulfills when the object has been deleted from S3. |

#### InvocationResponse

InvocationResponse is an object that represents the response of an invocation. It has the following properties:

| Property        | Type              | Description                                |
| :-------------- | :---------------- | :----------------------------------------- |
| statusCode      | number            | Status code of the invocation.             |
| executedVersion | string (optional) | The version of the function that executed. |
| logResult       | string (optional) | Log result of the invocation.              |
| payload         | string (optional) | Payload returned by the function.          |

### Example

{{< code >}}

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
