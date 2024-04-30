---
aliases:
  - ./kmsclient-generatedatakey/ # /docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kmsclient/kmsclient-generatedatakey/
title: 'generateDataKey'
description: 'KMSClient.generateDataKey generates a symmetric data key for use outside of the AWS Key Management Service'
weight: 10
---

# generateDataKey

`KMSClient.generateDataKey` generates a symmetric data key for use outside of the AWS Key Management Service.

### Parameters

| Name   | Type   | Description                                                                                                                                                                  |
| :----- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`   | string | The identifier of the key. This can be either the key ID or the Amazon Resource Name (ARN) of the key.                                                                       |
| `size` | number | The length of the data key. For example, use the value 64 to generate a 512-bit data key (64 bytes is 512 bits). For 256-bit (32-byte) data keys, use the value 32, instead. |

### Returns

| Type                                                                                                          | Description                                                                                                                             |
| :------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<[KMSDataKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kmsclient/kmsdatakey)> | A Promise that fulfills with a [KMSDataKey](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kmsclient/kmskey) object. |

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
