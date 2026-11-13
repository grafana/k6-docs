---
title: 'createStream'
description: 'KinesisClient.createStream creates a new Kinesis stream'
weight: 10
---

# createStream

`KinesisClient.createStream(streamName, [options])` creates a new Kinesis stream.

### Parameters

| Parameter  | Type   | Description                                     |
| :--------- | :----- | :---------------------------------------------- |
| streamName | string | The name of the Kinesis stream to create.       |
| options    | object | Optional configuration for the stream creation. |

#### Options

| Parameter                    | Type   | Description                                                           |
| :--------------------------- | :----- | :-------------------------------------------------------------------- |
| shardCount                   | number | The number of shards for the stream (for provisioned mode).           |
| streamModeDetails            | object | Configuration for the stream mode.                                    |
| streamModeDetails.streamMode | string | The billing mode for the stream. Either `PROVISIONED` or `ON_DEMAND`. |

### Returns

| Type            | Description                                                           |
| :-------------- | :-------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the stream creation request is complete. |

### Example


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
  // Create a stream with provisioned billing and 2 shards
  await kinesis.createStream('my-provisioned-stream', {
    shardCount: 2,
  });

  // Create a stream with on-demand billing
  await kinesis.createStream('my-on-demand-stream', {
    streamModeDetails: {
      streamMode: 'ON_DEMAND',
    },
  });
}
```

