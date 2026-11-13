---
title: 'getRecords'
description: 'KinesisClient.getRecords gets records from a Kinesis stream shard'
weight: 10
---

# getRecords

`KinesisClient.getRecords(shardIterator, [options])` gets records from a Kinesis stream shard using a shard iterator.

### Parameters

| Parameter     | Type   | Description                                           |
| :------------ | :----- | :---------------------------------------------------- |
| shardIterator | string | The shard iterator from which to get records.         |
| options       | object | Optional configuration for the get records operation. |

#### Options

| Parameter | Type   | Description                              |
| :-------- | :----- | :--------------------------------------- |
| limit     | number | The maximum number of records to return. |

### Returns

| Type              | Description                                        |
| :---------------- | :------------------------------------------------- |
| `Promise<Object>` | A Promise that fulfills with the records response. |

#### Returns object

| Property           | Type          | Description                                          |
| :----------------- | :------------ | :--------------------------------------------------- |
| records            | Array<Object> | An array of records retrieved from the stream.       |
| nextShardIterator  | string        | The next shard iterator to use for subsequent calls. |
| millisBehindLatest | number        | The number of milliseconds behind the latest record. |

#### Record object

| Property                    | Type   | Description                                      |
| :-------------------------- | :----- | :----------------------------------------------- |
| sequenceNumber              | string | The sequence number of the record.               |
| approximateArrivalTimestamp | Date   | The approximate arrival timestamp of the record. |
| data                        | string | The data payload of the record.                  |
| partitionKey                | string | The partition key of the record.                 |

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

    // Get a shard iterator for the first shard
    const shardIteratorResponse = await kinesis.getShardIterator(
      streamName,
      shardId,
      'TRIM_HORIZON'
    );

    const shardIterator = shardIteratorResponse.shardIterator;

    // Get records from the shard
    const recordsResponse = await kinesis.getRecords(shardIterator, { limit: 10 });

    console.log('Records retrieved:', recordsResponse.records.length);
    console.log('Milliseconds behind latest:', recordsResponse.millisBehindLatest);

    // Process the records
    recordsResponse.records.forEach((record, index) => {
      console.log(`Record ${index}:`);
      console.log('  Sequence number:', record.sequenceNumber);
      console.log('  Partition key:', record.partitionKey);
      console.log('  Data:', record.data);
      console.log('  Arrival timestamp:', record.approximateArrivalTimestamp);

      // Parse JSON data if applicable
      try {
        const jsonData = JSON.parse(record.data);
        console.log('  Parsed data:', jsonData);
      } catch (e) {
        console.log('  Data is not JSON');
      }
    });

    // Continue reading with the next shard iterator
    if (recordsResponse.nextShardIterator) {
      const nextBatch = await kinesis.getRecords(recordsResponse.nextShardIterator, { limit: 5 });
      console.log('Next batch size:', nextBatch.records.length);
    }
  }
}
```

