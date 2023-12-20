---
title: 'Secret'
head_title: 'Secret'
description: 'Secret is returned by the SecretsManagerClient.* methods who query secrets from AWS secrets manager.'
weight: 20
---

# Secret

Secret is returned by the SecretsManagerClient.\* methods that query secrets. Namely, [listSecrets](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/listsecrets/),
[getSecret](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/getsecret),
[createSecret](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/createsecret), and
[putSecretValue](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/secretsmanagerclient/putsecretvalue) returns either an instance or array of Secret objects. The Secret object describes an Amazon Secrets Manager secret.

| Name                     | Type                    | Description                                                                                                                                   |
| :----------------------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `Secret.name`            | string                  | The friendly name of the secret. You can use forward slashes in the name to represent a path hierarchy.                                       |
| `Secret.arn`             | string                  | The Amazon Resource Name (ARN) of the secret.                                                                                                 |
| `Secret.createdAt`       | number                  | The date and time (timestamp) when a secret was created.                                                                                      |
| `Secret.lastAccessDate`  | number                  | The last date that this secret was accessed. This value is truncated to midnight of the date and therefore shows only the date, not the time. |
| `Secret.lastChangedDate` | number                  | The last date and time that this secret was modified in any way.                                                                              |
| `Secret.tags`            | Array<{"key": "value"}> | The list of user-defined tags associated with the secret.                                                                                     |

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

  // If our test secret does not exist, abort the execution.
  if (secrets.filter((s) => s.name === testSecretName).length == 0) {
    exec.test.abort('test secret not found');
  }

  // Let's get it and print its content
  const downloadedSecret = await secretsManager.getSecret(testSecretName);
  console.log(downloadedSecret.secret);
}
```

_A k6 script that will query the user's secrets and print a test secret's value_

{{< /code >}}
