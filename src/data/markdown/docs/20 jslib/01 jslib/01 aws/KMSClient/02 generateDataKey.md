---
title: 'KMSClient.generateDataKey'
description: 'KMSClient.generateDataKey generates a symmetric data key for use outside of the AWS Key Management Service'
excerpt: 'KMSClient.generateDataKey generates a symmetric data key for use outside of the AWS Key Management Service'
---

`KMSClient.generateDataKey` generates a symmetric data key for use outside of the AWS Key Management Service.

### Parameters

| Name | Type   | Description                                                                                                                                                                  |
| :--- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`   | string | The identifier of the key. This can be either the key ID or the Amazon Resource Name (ARN) of the key.                                                                       |
| `size` | number | The length of the data key. For example, use the value 64 to generate a 512-bit data key (64 bytes is 512 bits). For 256-bit (32-byte) data keys, use the value 32, instead. |

### Returns

| Type                                                         | Description                                                        |
| :----------------------------------------------------------- | :----------------------------------------------------------------- |
| [`KMSDataKey`](/javascript-api/jslib/aws/kmsclient/kmsdatakey) | A [KMSDataKey](/javascript-api/jslib/aws/kmsclient/kmskey) object. |

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

  // Generate a data key from the KMS key.
  const key = kms.generateDataKey(testKeyId, 32);
}
```

_A k6 script that generating a data key from an AWS Key Management Service key_

</CodeGroup>


