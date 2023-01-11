---
title: 'SecretsManagerClient.putSecretValue(secretID, secretString, [versionID], [tags])'
description: "SecretsManagerClient.putSecretValue updates an existing secret's value"
excerpt: "SecretsManagerClient.putSecretValue updates an existing secret's value"
---

`SecretsManagerClient.putSecretValue` updates a secret's value in AWS' secrets manager.

| Parameter            | Type                     | Description                                                                                                                                           |
| :------------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| secretID             | string                   | The ARN or name of the secret to update.                                                                                                              |
| secretString         | string                   | The text data to encrypt and store in this new version of the secret. We recommend you use a JSON structure of key/value pairs for your secret value. |
| versionID (optional) | string                   | Optional unique version identifier for the updated version of the secret. If no versionID is provided, an auto-generated UUID will be used instead.    |
| tags (optional)      | Array<{"key": "value"},> | A list of tags to attach to the secret. Each tag is a key and value pair of strings in a JSON text string                                             |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.7.1/secrets-manager.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const secretsManager = new SecretsManagerClient(awsConfig);
const testSecretName = 'jslib-test-secret';
const testSecretValue = 'jslib-test-value';

export default function () {
  // Let's make sure our test secret is created
  const testSecret = secretsManager.createSecret(
    testSecretName,
    testSecretValue,
    'this is a test secret, delete me.'
  );

  // Now that we know the secret exist, let's update its value
  const newTestSecretValue = 'new-test-value';
  const u = secretsManager.putSecretValue(testSecretName, newTestSecretValue);

  // Let's get its value back and verify it was indeed updated
  const updatedSecret = secretsManager.getSecret(testSecretName);
  if (updatedSecret.secret !== newTestSecretValue) {
    exec.test.abort('unable to update test secret');
  }
}
```

_A k6 script that will update a secret's value in AWS secrets manager_

</CodeGroup>