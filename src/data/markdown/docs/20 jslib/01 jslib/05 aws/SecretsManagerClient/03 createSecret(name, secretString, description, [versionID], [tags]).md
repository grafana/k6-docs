---
title: 'SecretsManagerClient.createSecret(name, secretString, description, [versionID], [tags])'
description: 'SecretsManagerClient.createSecret creates a new secret'
excerpt: 'SecretsManagerClient.createSecret creates a new secret'
---

`SecretsManagerClient.createSecret` creates a secret in AWS' secrets manager.

| Parameter            | Type                     | Description                                                                                                                                           |
| :------------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                 | string                   | The friendly name of the secret. You can use forward slashes in the name to represent a path hierarchy.                                               |
| secretString         | string                   | The text data to encrypt and store in this new version of the secret. We recommend you use a JSON structure of key/value pairs for your secret value. |
| description          | string                   | The description of the secret.                                                                                                                        |
| versionID (optional) | string                   | Optional unique version identifier for the created secret. If no versionID is provided, an auto-generated UUID will be used instead.                   |
| tags (optional)      | Array<{"key": "value"},> | A list of tags to attach to the secret. Each tag is a key and value pair of strings in a JSON text string                                             |

### Example

<CodeGroup labels={[]}>

```javascript
import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.6.0/secrets-manager.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const secretsManager = new SecretsManagerClient(awsConfig);
const testSecretName = 'jslib-test-secret';
const testSecretValue = 'jslib-test-value';

export default function () {
  // Let's create our test secret.
  const testSecret = secretsManager.createSecret(
    testSecretName,
    testSecretValue,
    'this is a test secret, delete me.'
  );

  // Let's get its value and verify it was indeed created.
  const createdSecret = secretsManager.getSecret(testSecretName);
  console.log(JSON.stringify(createdSecret));
}
```

_A k6 script that will create a secret in AWS secrets manager_

</CodeGroup>