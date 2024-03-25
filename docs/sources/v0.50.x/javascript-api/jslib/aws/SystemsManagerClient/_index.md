---
title: 'SystemsManagerClient'
head_title: 'SystemsManagerClient'
description: 'SystemsManagerClient allows interacting with the AWS Systems Manager Service'
weight: 00
---

# SystemsManagerClient

`SystemsManagerClient` interacts with the AWS Systems Manager Service.

With it, the user can get parameters from the Systems Manager Service in the caller's AWS account and region.

Both the dedicated `ssm.js` jslib bundle and the all-encompassing `aws.js` bundle include the `SystemsManagerClient`.

### Methods

| Function                                                                                                            | Description                                        |
| :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------- |
| [getParameter](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/systemsmanagerclient/getparameter) | Retrieves a parameter from Amazon Systems Manager. |

### Throws

`SystemsManagerClient` methods throw errors in case of failure.

| Error                        | Condition                                                 |
| :--------------------------- | :-------------------------------------------------------- |
| `InvalidSignatureError`      | when using invalid credentials                            |
| `SystemsManagerServiceError` | when AWS replied to the requested operation with an error |

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
