---
title: 'AWSConfig'
head_title: 'AWSConfig'
description: 'AWSConfig is used to configure an AWS service client instances'
excerpt: 'AWSConfig is used to configure an AWS service client instances'
---

AWSConfig is used to configure an AWS service client instance, such as [S3Client](/javascript-api/jslib/aws/s3client) or [SecretsManagerClient](/javascript-api/jslib/aws/secretsmanagerclient). It effectively allows the user to select a [region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) they wish to interact with, and the AWS credentials they wish to use to authenticate.

AWSConfig is included in the `aws.js` bundle, which includes all the content of the library. It is also included in the various services clients dedicated bundles such as `s3.js` and `secrets-manager.js`.

| Parameter                  | Type   | Description                                                                                                               |
| :------------------------- | :----- | :------------------------------------------------------------------------------------------------------------------------ |
| region                     | string | the AWS region to connect to. As described by [Amazon AWS docs](https://docs.aws.amazon.com/general/latest/gr/rande.html) |
| accessKeyID                | string | The AWS access key ID credential to use for authentication.                                                               |
| secretAccessKey (optional) | string | The AWS secret access credential to use for authentication.                                                               |

### Throws

S3 Client methods will throw errors in case of failure.

| Error                      | Condition                                                  |
| :------------------------- | :--------------------------------------------------------- |
| InvalidArgumentException   | when an invalid region name or credentials were used.      |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution';

// Note that you AWSConfig is also included in the dedicated service
// client bundles such as `s3.js` and `secrets-manager.js`
import { AWSConfig, SecretsManagerClient } from 'https://jslib.k6.io/aws/0.4.0/aws.js';

const awsConfig = new AWSConfig(
  __ENV.AWS_REGION,
  __ENV.AWS_ACCESS_KEY_ID,
  __ENV.AWS_SECRET_ACCESS_KEY
);

const secretsManager = new SecretsManagerClient(awsConfig);

export default function () {
  // ...
}
```

_k6 will instantiate an `AWSConfig` object and use it to configure a `SecretsManagerClient` instance_

</CodeGroup>


