---
title: 'KMSDataKey'
slug: 'kmsdatakey'
head_title: 'KMSDataKey'
description: 'KMSDataKey is returned by the KMSClient.*DataKey methods that query KMS data keys'
weight: 20
---

# KMSDataKey

`KMSClient.*DataKey` methods, querying Key Management Service data keys, return some KMSDataKey instances.
The KMSDataKey object describes an Amazon Key Management Service data key.
For instance, the [`generateDataKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kmsclient/generatedatakey/) returns the generated KMSDataKey object.

| Name                        | Type   | Description                                                                                                                                         |
| :-------------------------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `KMSDataKey.id`             | string | The identifier of the Key Management Service key that encrypted the data key.                                                                       |
| `KMSDataKey.ciphertextBlob` | string | The base64-encoded encrypted copy of the data key.                                                                                                  |
| `KMSDataKey.plaintext`      | string | The plain text data key. Use this data key to encrypt your data outside of Key Management Service. Then, remove it from memory as soon as possible. |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import { AWSConfig, KMSClient } from 'https://jslib.k6.io/aws/0.11.0/kms.js';

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

  // Generate a data key from the KMS key.
  const key = await kms.generateDataKey(testKeyId, 32);
}
```

_A k6 script that generating a data key from an AWS Key Management Service key_

{{< /code >}}
