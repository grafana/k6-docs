---
title: 'listStreams'
head_title: 'KinesisClient.listStreams([options])'
description: 'KinesisClient.listStreams lists Kinesis streams'
weight: 10
---

# listStreams

`KinesisClient.listStreams([options])` lists the Kinesis streams in the current region.

### Parameters

| Parameter | Type   | Description                                       |
| :-------- | :----- | :------------------------------------------------ |
| options   | object (optional) | Configuration for the listing operation. |

#### Options

| Parameter                | Type   | Description                                               |
| :----------------------- | :----- | :-------------------------------------------------------- |
| exclusiveStartStreamName | string | The name of the stream to start listing from (exclusive). |
| limit                    | number | The maximum number of streams to return.                  |

### Returns

| Type              | Description                                       |
| :---------------- | :------------------------------------------------ |
| `Promise<Object>` | A Promise that fulfills with the list of streams. |

#### Returns object

| Property       | Type          | Description                                  |
| :------------- | :------------ | :------------------------------------------- |
| streamNames    | Array<string> | An array of stream names.                    |
| hasMoreStreams | boolean       | Indicates if there are more streams to list. |

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
  // List all streams
  const streams = await kinesis.listStreams();
  console.log('Available streams:', streams.streamNames);
  console.log('Has more streams:', streams.hasMoreStreams);

  // List streams with pagination
  const limitedStreams = await kinesis.listStreams({ limit: 5 });
  console.log('First 5 streams:', limitedStreams.streamNames);

  // List streams starting from a specific stream
  if (limitedStreams.hasMoreStreams && limitedStreams.streamNames.length > 0) {
    const nextBatch = await kinesis.listStreams({
      exclusiveStartStreamName: limitedStreams.streamNames[limitedStreams.streamNames.length - 1],
    });
    console.log('Next batch of streams:', nextBatch.streamNames);
  }
}
```

{{< /code >}}
