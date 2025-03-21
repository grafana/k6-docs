---
title: 'createSecret'
head_title: 'SecretsManagerClient.createSecret(name, secretString, description, [versionID], [tags])'
description: 'SecretsManagerClient.createSecret creates a new secret'
weight: 10
---

# createSecret

`SecretsManagerClient.createSecret` creates a secret in AWS' secrets manager.

### Parameters

| Parameter            | Type                     | Description                                                                                                                                           |
| :------------------- | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                 | string                   | The friendly name of the secret. You can use forward slashes in the name to represent a path hierarchy.                                               |
| secretString         | string                   | The text data to encrypt and store in this new version of the secret. We recommend you use a JSON structure of key/value pairs for your secret value. |
| description          | string                   | The description of the secret.                                                                                                                        |
| versionID (optional) | string                   | Optional unique version identifier for the created secret. If no versionID is provided, an auto-generated UUID will be used instead.                  |
| tags (optional)      | Array<{"key": "value"},> | A list of tags to attach to the secret. Each tag is a key and value pair of strings in a JSON text string                                             |

### Returns

| Type                                                                                                             | Description                                                                                                                                                                                    |
| :--------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<[Secret](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/secret)> | A Promise that fulfills with a [Secret](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/secret) object that contains the details of the created secret. |

### Example

{{< code >}}

```javascript
import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.11.0/secrets-manager.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const secretsManager = new SecretsManagerClient(awsConfig);
const testSecretName = 'jslib-test-secret';
const testSecretValue = 'jslib-test-value';

export default async function () {
  // Let's create our test secret.
  const testSecret = await secretsManager.createSecret(
    testSecretName,
    testSecretValue,
    'this is a test secret, delete me.'
  );

  // Let's get its value and verify it was indeed created.
  const createdSecret = await secretsManager.getSecret(testSecretName);
  console.log(JSON.stringify(createdSecret));
}
```

_A k6 script that will create a secret in AWS secrets manager_

{{< /code >}}
