---
title: 'deleteStream'
head_title: 'KinesisClient.deleteStream(streamName)'
description: 'KinesisClient.deleteStream deletes a Kinesis stream'
weight: 10
---

# deleteStream

`KinesisClient.deleteStream(streamName)` deletes a Kinesis stream.

### Parameters

| Parameter  | Type   | Description                               |
| :--------- | :----- | :---------------------------------------- |
| streamName | string | The name of the Kinesis stream to delete. |

### Returns

| Type            | Description                                                           |
| :-------------- | :-------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the stream deletion request is complete. |

### Example

{{< code >}}

<!-- md-k6:skip -->

```javascript
import {
  AWSConfig,
  KinesisClient,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/kinesis.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
});

const kinesis = new KinesisClient(awsConfig);

export default async function () {
  const streamName = 'my-test-stream';

  // Delete the stream
  await kinesis.deleteStream(streamName);
  console.log(`Stream ${streamName} deleted`);
}
```

{{< /code >}}
