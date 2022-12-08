---
title: 'SecretsManagerClient.listSecrets()'
description: 'SecretsManagerClient.listSecrets lists the secrets the authenticated user has access to'
excerpt: 'SecretsManagerClient.listSecrets lists the secrets the authenticated user has access to'
---

`S3Client.listSecrets` lists the secrets the authenticated user has access to in the region set by the `SecretsManagerClient` instance's configuration.

### Returns

| Type                                                                   | Description                                                                          |
| :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Array<[Secret](/javascript-api/jslib/aws/secretsmanagerclient/secret)> | An array of [Secret](/javascript-api/jslib/aws/secretsmanagerclient/secret) objects. |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.7.0/secrets-manager.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const secretsManager = new SecretsManagerClient(awsConfig);
const testSecretName = 'jslib-test-secret';

export default function () {
  // List the secrets the AWS authentication configuration
  // gives us access to, and verify the test secret exists.
  const secrets = secretsManager.listSecrets();
  if (!secrets.filter((s) => s.name === testSecretName).length == 0) {
    exec.test.abort('test secret not found');
  }

  console.log(JSON.stringify(secrets));
}
```

_A k6 script that will list a user's secrets from AWS secrets manager_

</CodeGroup>