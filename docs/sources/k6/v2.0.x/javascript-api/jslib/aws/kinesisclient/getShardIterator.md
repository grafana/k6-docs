---
title: 'getShardIterator'
description: 'KinesisClient.getShardIterator gets a shard iterator for reading records from a Kinesis stream'
weight: 10
---

# getShardIterator

`KinesisClient.getShardIterator(streamName, shardId, shardIteratorType, [options])` gets a shard iterator for reading records from a Kinesis stream shard.

### Parameters

| Parameter         | Type   | Description                                    |
| :---------------- | :----- | :--------------------------------------------- |
| streamName        | string | The name of the Kinesis stream.                |
| shardId           | string | The shard ID for which to get the iterator.    |
| shardIteratorType | string | The type of shard iterator to get.             |
| options           | object | Optional configuration for the shard iterator. |

#### Shard Iterator Types

| Type                  | Description                                                                   |
| :-------------------- | :---------------------------------------------------------------------------- |
| TRIM_HORIZON          | Start reading at the last untrimmed record in the shard.                      |
| LATEST                | Start reading just after the most recent record in the shard.                 |
| AT_SEQUENCE_NUMBER    | Start reading from the position denoted by a specific sequence number.        |
| AFTER_SEQUENCE_NUMBER | Start reading right after the position denoted by a specific sequence number. |
| AT_TIMESTAMP          | Start reading from the position denoted by a specific timestamp.              |

#### Options

| Parameter              | Type   | Description                                                                                          |
| :--------------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| startingSequenceNumber | string | The sequence number to start from (required for `AT_SEQUENCE_NUMBER` and `AFTER_SEQUENCE_NUMBER` types). |
| timestamp              | Date   | The timestamp to start from (required for `AT_TIMESTAMP` type).                                        |

### Returns

| Type              | Description                                               |
| :---------------- | :-------------------------------------------------------- |
| `Promise<Object>` | A Promise that fulfills with the shard iterator response. |

#### Returns object

| Property      | Type   | Description                                    |
| :------------ | :----- | :--------------------------------------------- |
| shardIterator | string | The shard iterator to use for reading records. |

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
  const streamName = 'my-test-stream';

  // First, get the shards for the stream
  const shards = await kinesis.listShards(streamName);

  if (shards.shards.length > 0) {
    const shardId = shards.shards[0].shardId;

    // Get a shard iterator starting from the beginning
    const trimHorizonIterator = await kinesis.getShardIterator(streamName, shardId, 'TRIM_HORIZON');
    console.log('Trim horizon iterator:', trimHorizonIterator.shardIterator);

    // Get a shard iterator starting from the latest records
    const latestIterator = await kinesis.getShardIterator(streamName, shardId, 'LATEST');
    console.log('Latest iterator:', latestIterator.shardIterator);

    // Get a shard iterator starting from a specific timestamp
    const timestampIterator = await kinesis.getShardIterator(streamName, shardId, 'AT_TIMESTAMP', {
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    });
    console.log('Timestamp iterator:', timestampIterator.shardIterator);

    // Use the iterator to read records
    const records = await kinesis.getRecords(trimHorizonIterator.shardIterator);
    console.log('Records retrieved:', records.records.length);

    // If we have records, we can get an iterator starting after a specific sequence number
    if (records.records.length > 0) {
      const sequenceNumber = records.records[0].sequenceNumber;
      const afterSequenceIterator = await kinesis.getShardIterator(
        streamName,
        shardId,
        'AFTER_SEQUENCE_NUMBER',
        {
          startingSequenceNumber: sequenceNumber,
        }
      );
      console.log('After sequence iterator:', afterSequenceIterator.shardIterator);
    }
  }
}
```

