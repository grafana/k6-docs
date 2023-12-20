---
title: 'getParameter'
head_title: 'SystemsManagerClient.getParameter()'
description: "SystemsManagerClient.getParameter gets a Systems Manager parameter in the caller's AWS account and region"
weight: 10
---

# getParameter

`SystemsManagerClient.getParameter` gets a Systems Manager parameter in the caller's AWS account and region.

### Returns

| Type                                                                                                                                                    | Description                                                                                                                                                                                    |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Promise<SystemsManagerParameter[]>`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/systemsmanagerclient/systemsmanagerparameter/) | A Promise that fulfills with an array of [`SystemsManagerParameter`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/systemsmanagerclient/systemsmanagerparameter/) objects. |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import { AWSConfig, SystemsManagerClient } from 'https://jslib.k6.io/aws/0.11.0/ssm.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const systemsManager = new SystemsManagerClient(awsConfig);
const testParameterName = 'jslib-test-parameter';
const testParameterValue = 'jslib-test-value';
const testParameterSecretName = 'jslib-test-parameter-secret';
// this value was created with --type SecureString
const testParameterSecretValue = 'jslib-test-secret-value';

export default async function () {
  // Currently the parameter needs to be created before hand

  // Let's get its value
  // getParameter returns a parameter object: e.g. {name: string, value: string...}
  const parameter = await systemsManager.getParameter(testParameterName);
  if (parameter.value !== testParameterValue) {
    exec.test.abort('test parameter not found');
  }

  // Let's get the secret value with decryption
  // destructure the parameter object to get to the values you want
  const { value: encryptedParameterValue } = await systemsManager.getParameter(
    testParameterSecretName,
    true
  );
  if (encryptedParameterValue !== testParameterSecretValue) {
    exec.test.abort('encrypted test parameter not found');
  }
}
```

_A k6 script querying a user's Systems Manager Service parameter_

{{< /code >}}
