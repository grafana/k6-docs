---
title: 'KMSClient'
head_title: 'KMSClient'
description: 'KMSClient allows interacting with the AWS Key Management Service'
excerpt: 'KMSClient allows interacting with the AWS Key Management Service'
---

`KMSClient` interacts with the AWS Key Management Service.
With it, the user can list all the Key Management Service keys in the caller's AWS account and region. They can also generate symmetric data keys to use outside of AWS Key Management Service. `KMSClient` operations are blocking. k6 recommends reserving their use to the [`setup`](/using-k6/test-life-cycle/) and [`teardown`](/using-k6/test-life-cycle/) stages as much as possible.

Both the dedicated `kms.js` jslib bundle and the all-encompassing `aws.js` bundle include the `KMSClient`. 

### Methods

| Function                                                                          | Description                                                                          |
| :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| [listKeys](/javascript-api/jslib/aws/kmsclient/kmsclient-listkeys/)               | List the all the Key Management Service keys in the caller's AWS account and region. |
| [generateDataKey](/javascript-api/jslib/aws/kmsclient/kmsclient-generatedatakey/) | Generate a symmetric data key for use outside of the AWS Key Management Service.     |

### Throws

`KMSClient` methods throw errors in case of failure.

| Error                 | Condition                                                  |
| :-------------------- | :--------------------------------------------------------- |
| `InvalidSignatureError` | when using invalid credentials                    |
| `KMSServiceError`        | when AWS replied to the requested operation with an error |

### Example

<CodeGroup labels={[]}>

```javascript
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

import { AWSConfig, KMSClient } from 'https://jslib.k6.io/aws/0.5.0/kms.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const kms = new KMSClient(awsConfig);
const keyAlias = 'alias/k6-key';

export function setup() {
  // Create a symmetric data key
  return {
    dataKey: kms.generateDataKey(keyAlias, 32),
  };
}

export default function (data) {
  // Use the data key to encrypt data
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    './test-run.key': data.dataKey,
  };
}
```

</CodeGroup>
