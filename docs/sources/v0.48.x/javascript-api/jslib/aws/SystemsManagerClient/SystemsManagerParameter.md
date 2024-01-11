---
title: 'SystemsManagerParameter'
head_title: 'SystemsManagerParameter'
slug: 'systemsmanagerparameter'
description: 'SystemsManagerParameter is returned by the SystemsManagerClient.* methods that query parameters'
weight: 20
---

# SystemsManagerParameter

`SystemsManagerParameter.*` methods querying the Systems Manager Service parameters return some `SystemsManagerParameter` instances. Namely, `getParameter` returns an array of `SystemsManagerParameter` objects. The `SystemsManagerParameter` object describes an Amazon Systems Manager Service parameter.

| Name                                       | Type   | Description                                                                           |
| :----------------------------------------- | :----- | :------------------------------------------------------------------------------------ |
| `SystemsManagerParameter.arn`              | string | The Amazon Resource Name (ARN) of the parameter                                       |
| `SystemsManagerParameter.dataType`         | string | The data type of the parameter, such as text or aws:ec2:image. The default is text.   |
| `SystemsManagerParameter.lastModifiedDate` | number | Date the parameter was last changed or updated and the parameter version was created. |
| `SystemsManagerParameter.name`             | string | The friendly name of the parameter.                                                   |
| `SystemsManagerParameter.selector`         | string | Either the version number or the label used to retrieve the parameter value           |
| `SystemsManagerParameter.sourceResult`     | string | The raw result or response from the source.                                           |
| `SystemsManagerParameter.type`             | string | The type of parameter                                                                 |
| `SystemsManagerParameter.value`            | string | The parameter value                                                                   |
| `SystemsManagerParameter.version`          | string | The parameter version                                                                 |

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

_A k6 script querying a user Systems Manager Service parameter_

{{< /code >}}
