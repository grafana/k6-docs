---
title: 'KinesisClient'
description: 'KinesisClient allows interacting with AWS Kinesis streams'
weight: 00
---

# KinesisClient

{{< docs/shared source="k6" lookup="blocking-aws-blockquote.md" version="<K6_VERSION>" >}}

`KinesisClient` interacts with the AWS Kinesis service.

With it, you can perform operations such as creating streams, putting records, listing streams, and reading records from streams. For a full list of supported operations, see [Methods](#methods).

Both the dedicated `kinesis.js` jslib bundle and the all-encompassing `aws.js` bundle include the `KinesisClient`.

### Methods

| Function                                                                                                                                                                | Description                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------- |
| [createStream(streamName, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/createstream)                                     | Create a new Kinesis stream                            |
| [deleteStream(streamName)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/deletestream)                                                | Delete a Kinesis stream                                |
| [listStreams([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/liststreams)                                                   | List available Kinesis streams                         |
| [putRecords(streamName, records)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/putrecords)                                           | Put multiple records into a Kinesis stream             |
| [getRecords(shardIterator, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/getrecords)                                      | Get records from a Kinesis stream shard                |
| [listShards(streamName, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/listshards)                                         | List shards in a Kinesis stream                        |
| [getShardIterator(streamName, shardId, shardIteratorType, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/kinesisclient/getsharditerator) | Get a shard iterator for reading records from a stream |

### Throws

KinesisClient methods will throw errors in case of failure.

| Error                 | Condition                                                  |
| :-------------------- | :--------------------------------------------------------- |
| InvalidSignatureError | When invalid credentials are provided.                    |
| KinesisServiceError   | When AWS replies to the requested operation with an error. |

### Examples

{{< code >}}

<!-- md-k6:skip -->

```javascript
import { check } from 'k6';
import exec from 'k6/execution';

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
const testStreamName = 'test-stream';

export default async function () {
  // List available streams
  const streams = await kinesis.listStreams();
  console.log('Available streams:', streams.streamNames);

  // Check if our test stream exists
  if (!streams.streamNames.includes(testStreamName)) {
    // Create the stream if it doesn't exist
    await kinesis.createStream(testStreamName, { shardCount: 1 });
    console.log(`Created stream: ${testStreamName}`);
  }

  // Put some records into the stream
  const records = [
    {
      data: JSON.stringify({ message: 'Hello from k6!', timestamp: Date.now() }),
      partitionKey: 'test-partition-1',
    },
    {
      data: JSON.stringify({ message: 'Another message', timestamp: Date.now() }),
      partitionKey: 'test-partition-2',
    },
  ];

  const putResult = await kinesis.putRecords(testStreamName, records);
  console.log('Put records result:', putResult);

  // List shards in the stream
  const shards = await kinesis.listShards(testStreamName);
  console.log('Stream shards:', shards.shards);

  // Get a shard iterator for reading records
  if (shards.shards.length > 0) {
    const shardId = shards.shards[0].shardId;
    const shardIterator = await kinesis.getShardIterator(testStreamName, shardId, 'TRIM_HORIZON');

    // Get records from the shard
    const getResult = await kinesis.getRecords(shardIterator.shardIterator);
    console.log('Retrieved records:', getResult.records);
  }
}
```

{{< /code >}}

#### Stream management

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

  // Create a stream with on-demand billing
  await kinesis.createStream(streamName, {
    streamModeDetails: {
      streamMode: 'ON_DEMAND',
    },
  });

  // List all streams
  const streams = await kinesis.listStreams();
  console.log('All streams:', streams.streamNames);

  // Clean up - delete the stream
  await kinesis.deleteStream(streamName);
  console.log(`Deleted stream: ${streamName}`);
}
```

{{< /code >}}
