---
title: 'SecretsManagerClient'
head_title: 'SecretsManagerClient'
description: 'SecretsManagerClient allows interacting with AWS secrets stored in Secrets Manager'
weight: 00
---

# SecretsManagerClient

`SecretsManagerClient` interacts with the AWS Secrets Manager.

With it, you can perform several operations such as listing, creating and downloading secrets owned by the authenticated user. For a full list of supported operations, see [Methods](#methods).

`SecretsManagerClient` is included in both the dedicated jslib `secrets-manager.js` bundle, and the `aws.js` one, containing all the services clients.

### Methods

| Function                                                                                                                                                                  | Description                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| [listSecrets()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/listsecrets)                                                       | List secrets owned by the authenticated user |
| [getSecret(secretID)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/getsecret)                                                   | Download a secret                            |
| [createSecret(name, secretString, description, [versionID], [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/createsecret) | Create a new secret                          |
| [putSecretValue(secretID, secretString, [versionID])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/putsecretvalue)              | Update a secret                              |
| [deleteSecret(secretID, { recoveryWindow: 30, noRecovery: false}})](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/deletesecret)  | Delete a secret                              |

### Throws

S3 Client methods will throw errors in case of failure.

| Error                      | Condition                                                  |
| :------------------------- | :--------------------------------------------------------- |
| InvalidSignatureError      | when invalid credentials were provided.                    |
| SecretsManagerServiceError | when AWS replied to the requested operation with an error. |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.11.0/secrets-manager.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const secretsManager = new SecretsManagerClient(awsConfig);
const testSecretName = 'jslib-test-secret';
const testSecretValue = 'jslib-test-value';

export async function setup() {
  // Let's make sure our test secret is created
  const testSecret = await secretsManager.createSecret(
    testSecretName,
    testSecretValue,
    'this is a test secret, delete me.'
  );

  // List the secrets the AWS authentication configuration
  // gives us access to, and verify the creation was successful.
  const secrets = await secretsManager.listSecrets();
  if (!secrets.filter((s) => s.name === testSecret.name).length == 0) {
    exec.test.abort('test secret not found');
  }
}

export default async function () {
  // Knnowing that we know the secret exist, let's update its value
  const newTestSecretValue = 'new-test-value';
  await secretsManager.putSecretValue(testSecretName, newTestSecretValue);

  // Let's get its value and verify it was indeed updated
  const updatedSecret = await secretsManager.getSecret(testSecretName);
  if (updatedSecret.secret !== newTestSecretValue) {
    exec.test.abort('unable to update test secret');
  }

  // Let's now use our secret in the context of our load test...
}

export async function teardown() {
  // Finally, let's clean after ourselves and delete our test secret
  await secretsManager.deleteSecret(testSecretName, { noRecovery: true });
}
```

{{< /code >}}
