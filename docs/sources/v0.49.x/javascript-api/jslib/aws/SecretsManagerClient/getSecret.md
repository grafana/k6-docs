---
title: 'getSecret'
head_title: 'SecretsManagerClient.getSecret(secretID)'
description: 'SecretsManagerClient.getSecret(secretID) downloads a secret from AWS secrets manager'
weight: 10
---

# getSecret

`SecretsManagerClient.getSecret` downloads a secret from AWS secrets manager.

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| secretID  | string | The ARN or name of the secret to retrieve. |

### Returns

| Type                                                                                                             | Description                                                                                                                                                                          |
| :--------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<[Secret](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/secret)> | A Promise that fulfills with a [Secret](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/secret) describing and holding the downloaded secret. |

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

export default async function () {
  // List the secrets the AWS authentication configuration
  // gives us access to.
  const secrets = await secretsManager.listSecrets();
  if (secrets.filter((s) => s.name === testSecretName).length == 0) {
    exec.test.abort('test secret not found');
  }

  // Let's get our test secret's value and print it.
  const secret = await secretsManager.getSecret(testSecretName);
  console.log(JSON.stringify(secret));
}
```

_A k6 script that will download a user's secret from AWS secrets manager_

{{< /code >}}
