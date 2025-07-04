---
title: 'putRecords'
head_title: 'KinesisClient.putRecords(streamName, records)'
description: 'KinesisClient.putRecords puts multiple records into a Kinesis stream'
weight: 10
---

# putRecords

`KinesisClient.putRecords(streamName, records)` puts multiple records into a Kinesis stream.

### Parameters

| Parameter  | Type          | Description                                         |
| :--------- | :------------ | :-------------------------------------------------- |
| streamName | string        | The name of the Kinesis stream to put records into. |
| records    | Array<Object> | An array of records to put into the stream.         |

#### Records

Each record in the `records` array should be an object with the following properties:

| Property        | Type   | Description                                     |
| :-------------- | :----- | :---------------------------------------------- |
| data            | string | The data payload of the record.                 |
| partitionKey    | string | The partition key for the record.               |
| explicitHashKey | string | Optional. The explicit hash key for the record. |

### Returns

| Type              | Description                                            |
| :---------------- | :----------------------------------------------------- |
| `Promise<Object>` | A Promise that fulfills with the put records response. |

#### Returns object

| Property          | Type          | Description                                  |
| :---------------- | :------------ | :------------------------------------------- |
| failedRecordCount | number        | The number of records that failed to be put. |
| records           | Array<Object> | An array of record results.                  |

#### Record result object

| Property       | Type   | Description                                               |
| :------------- | :----- | :-------------------------------------------------------- |
| sequenceNumber | string | The sequence number of the record (if successful).        |
| shardId        | string | The shard ID where the record was placed (if successful). |
| errorCode      | string | The error code (if the record failed).                    |
| errorMessage   | string | The error message (if the record failed).                 |

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

  // Create records to put into the stream
  const records = [
    {
      data: JSON.stringify({
        message: 'Hello from k6!',
        timestamp: Date.now(),
        userId: 'user123',
      }),
      partitionKey: 'user123',
    },
    {
      data: JSON.stringify({
        message: 'Another message',
        timestamp: Date.now(),
        userId: 'user456',
      }),
      partitionKey: 'user456',
    },
    {
      data: JSON.stringify({
        message: 'Load test data',
        timestamp: Date.now(),
        userId: 'user789',
      }),
      partitionKey: 'user789',
      explicitHashKey: '123456789012345678901234567890123456789',
    },
  ];

  // Put records into the stream
  const result = await kinesis.putRecords(streamName, records);

  console.log('Put records result:');
  console.log('Failed record count:', result.failedRecordCount);

  // Check individual record results
  result.records.forEach((record, index) => {
    if (record.errorCode) {
      console.log(`Record ${index} failed: ${record.errorCode} - ${record.errorMessage}`);
    } else {
      console.log(
        `Record ${index} succeeded: sequence=${record.sequenceNumber}, shard=${record.shardId}`
      );
    }
  });
}
```

{{< /code >}}
