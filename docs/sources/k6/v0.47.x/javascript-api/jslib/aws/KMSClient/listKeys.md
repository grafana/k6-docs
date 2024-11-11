---
title: 'listKeys'
head_title: 'KMSClient.listKeys()'
description: "KMSClient.listKeys lists all the KMS keys in the caller's AWS account and region"
description: "KMSClient.listKeys lists all the KMS keys in the caller's AWS account and region"
weight: 10
---

# listKeys

`KMSClient.listKeys()` lists all the Key Management Service keys in the caller's AWS account and region.

### Returns

| Type                                                                                                    | Description                                                                                                                                      |
| :------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<[KMSKey[]](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kmsclient/kmskey)> | A Promise that fulfills with an array of [`KMSKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kmsclient/kmskey) objects. |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import {
  AWSConfig,
  KMSClient,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/kms.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const kms = new KMSClient(awsConfig);
const testKeyId = 'e67f95-4c047567-4-a0b7-62f7ce8ec8f48';

export default async function () {
  // List the KMS keys the AWS authentication configuration
  // gives us access to.
  const keys = await kms.listKeys();

  // If our test key does not exist, abort the execution.
  if (keys.filter((b) => b.keyId === testKeyId).length == 0) {
    exec.test.abort();
  }
}
```

_A k6 script querying the user's Key Management Service keys and verifying their test key exists_

{{< /code >}}
