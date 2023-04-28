---
title: 'SecretsManagerClient'
head_title: 'SecretsManagerClient'
description: 'SecretsManagerClient allows interacting with AWS secrets stored in Secrets Manager'
excerpt: 'SecretsManagerClient allows interacting with AWS secrets stored in Secrets Manager'
---

<BlockingAwsBlockquote />

SecretsManagerClient allows interacting with secrets stored in AWS's Secrets Manager. Namely, it allows the user to list, download, create, modify and delete secrets. Note that the SecretsManagerClient operations are blocking, and we recommend reserving their usage to the [`setup`](/using-k6/test-lifecycle/) and [`teardown`](/using-k6/test-lifecycle/) functions as much as possible.

SecretsManagerClient is included in both the dedicated jslib `secrets-manager.js` bundle, and the `aws.js` one, containing all the services clients.

### Methods

| Function                                                                                                                                                | Description                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| [listSecrets()](/javascript-api/jslib/aws/secretsmanagerclient/secretsmanagerclient-listsecrets/)                                                       | List secrets owned by the authenticated user |
| [getSecret(secretID)](/javascript-api/jslib/aws/secretsmanagerclient/secretsmanagerclient-getsecret/)                                                   | Download a secret                            |
| [createSecret(name, secretString, description, [versionID], [tags])](/javascript-api/jslib/aws/secretsmanagerclient/secretsmanagerclient-createsecret/) | Create a new secret                          |
| [putSecretValue(secretID, secretString, [versionID])](/javascript-api/jslib/aws/secretsmanagerclient/secretsmanagerclient-putsecretvalue/)              | Update a secret                              |
| [deleteSecret(secretID, { recoveryWindow: 30, noRecovery: false}})](/javascript-api/jslib/aws/secretsmanagerclient/secretsmanagerclient-deletesecret/)  | Delete a secret                              |

### Throws

S3 Client methods will throw errors in case of failure.

| Error                      | Condition                                                  |
| :------------------------- | :--------------------------------------------------------- |
| InvalidSignatureError      | when invalid credentials were provided.                    |
| SecretsManagerServiceError | when AWS replied to the requested operation with an error. |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.7.2/secrets-manager.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const secretsManager = new SecretsManagerClient(awsConfig);
const testSecretName = 'jslib-test-secret';
const testSecretValue = 'jslib-test-value';

export function setup() {
  // Let's make sure our test secret is created
  const testSecret = secretsManager.createSecret(
    testSecretName,
    testSecretValue,
    'this is a test secret, delete me.'
  );

  // List the secrets the AWS authentication configuration
  // gives us access to, and verify the creation was successful.
  const secrets = secretsManager.listSecrets();
  if (!secrets.filter((s) => s.name === testSecret.name).length == 0) {
    exec.test.abort('test secret not found');
  }
}

export default function () {
  // Knnowing that we know the secret exist, let's update its value
  const newTestSecretValue = 'new-test-value';
  secretsManager.putSecretValue(testSecretName, newTestSecretValue);

  // Let's get its value and verify it was indeed updated
  const updatedSecret = secretsManager.getSecret(testSecretName);
  if (updatedSecret.secret !== newTestSecretValue) {
    exec.test.abort('unable to update test secret');
  }

  // Let's now use our secret in the context of our load test...
}

export function teardown() {
  // Finally, let's clean after ourselves and delete our test secret
  secretsManager.deleteSecret(testSecretName, { noRecovery: true });
}
```

</CodeGroup>


