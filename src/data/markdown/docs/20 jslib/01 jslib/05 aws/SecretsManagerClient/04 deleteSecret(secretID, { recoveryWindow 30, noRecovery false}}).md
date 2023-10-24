---
title: 'SecretsManagerClient.deleteSecret(secretID, { recoveryWindow: 30, noRecovery: false}})'
description: 'SecretsManagerClient.deleteSecret deletes a secret'
excerpt: 'SecretsManagerClient.deleteSecret deletes a secret'
---

`SecretsManagerClient.deleteSecret` deletes a secret from AWS' secrets manager.

| Parameter | Type                                      | Description                              |
| :-------- | :---------------------------------------- | :--------------------------------------- |
| secretID  | string                                    | The ARN or name of the secret to update. |
| options   | { recoveryWindow: 30, noRecovery: false } | Use options to control the deletion behavior. recoveryWindow defines how long a secret will remain “soft-deleted”, in days, before being hard-deleted. noRecovery set to true would hard-delete the secret immediately. Note that both options are exclusive. |

### Example

<CodeGroup labels={[]}>

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

export default function () {
  // Let's make sure our test secret is created
  const testSecret = secretsManager.createSecret(
    testSecretName,
    testSecretValue,
    'this is a test secret, delete me.'
  );

  // Let's hard delete our test secret and verify it worked
  secretsManager.deleteSecret(testSecretName, { noRecovery: true });
}
```

_A k6 script that will delete a secret in AWS secrets manager_

</CodeGroup>

