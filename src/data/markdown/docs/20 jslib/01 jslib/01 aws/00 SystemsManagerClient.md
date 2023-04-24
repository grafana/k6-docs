---
title: 'SystemsManagerClient'
head_title: 'SystemsManagerClient'
description: 'SystemsManagerClient allows interacting with the AWS Systems Manager Service'
excerpt: 'SystemsManagerClient allows interacting with the AWS Systems Manager Service'
---

<BlockingAwsBlockquote />

`SystemsManagerClient` interacts with the AWS Systems Manager Service.
With it, the user can get parameters from the Systems Manager Service in the caller's AWS account and region. `SystemsManagerClient` operations are blocking. k6 recommends reserving their use to the [`setup`](/using-k6/test-lifecycle/) and [`teardown`](/using-k6/test-lifecycle/) stages as much as possible.

Both the dedicated `ssm.js` jslib bundle and the all-encompassing `aws.js` bundle include the `SystemsManagerClient`.

### Methods

| Function                                                                                          | Description                                        |
| :------------------------------------------------------------------------------------------------ | :------------------------------------------------- |
| [getParameter](/javascript-api/jslib/aws/systemsmanagerclient/systemsmanagerclient-getparameter/) | Retrieves a parameter from Amazon Systems Manager. |

### Throws

`SystemsManagerClient` methods throw errors in case of failure.

| Error                        | Condition                                                 |
| :--------------------------- | :-------------------------------------------------------- |
| `InvalidSignatureError`      | when using invalid credentials                            |
| `SystemsManagerServiceError` | when AWS replied to the requested operation with an error |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

import { AWSConfig, SystemsManagerClient } from 'https://jslib.k6.io/aws/0.7.2/ssm.js';

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

export default function () {
  // Currently the parameter needs to be created before hand

  // Let's get its value
  // getParameter returns a parameter object: e.g. {name: string, value: string...}
  const parameter = systemsManager.getParameter(testParameterName);
  if (parameter.value !== testParameterValue) {
    exec.test.abort('test parameter not found');
  }

  // Let's get the secret value with decryption
  // destructure the parameter object to get to the values you want
  const { value: encryptedParameterValue } = systemsManager.getParameter(
    testParameterSecretName,
    true
  );
  if (encryptedParameterValue !== testParameterSecretValue) {
    exec.test.abort('encrypted test parameter not found');
  }
}
```

_A k6 script querying a user's Systems Manager Service parameter_

</CodeGroup>
