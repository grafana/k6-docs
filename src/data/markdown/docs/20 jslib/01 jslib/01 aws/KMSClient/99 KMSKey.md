---
title: 'KMSKey'
description: 'KMSKey is returned by the KMSClient.* methods that query KMS keys'
excerpt: 'KMSKey is returned by the KMSClient.* methods that query KMS keys'
---

`KMSClient.*` methods querying Key Management Service keys return some `KMSKey` instances. Namely, `listKeys()` returns an array of `KMSKey` objects. The `KMSKey` object describes an Amazon Key Management Service key.

| Name            | Type   | Description                  |
| :-------------- | :----- | :--------------------------- |
| `KMSKey.keyId`  | string | Unique identifier of the key |
| `KMSKey.keyArn` | string | ARN of the key               |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

import { AWSConfig, KMSClient } from 'https://jslib.k6.io/aws/0.7.2/kms.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const kms = new KMSClient(awsConfig);
const testKeyId = 'e67f95-4c047567-4-a0b7-62f7ce8ec8f48';

export default function () {
  // List the KMS keys the AWS authentication configuration
  // gives us access to.
  const keys = kms.listKeys();

  // If our test key does not exist, abort the execution.
  if (keys.filter((b) => b.keyId === testKeyId).length == 0) {
    exec.test.abort();
  }
}
```

_A k6 script querying the user's Key Management Service keys and verifying their test key exists_

</CodeGroup>