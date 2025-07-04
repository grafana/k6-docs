---
title: 'listShards'
head_title: 'KinesisClient.listShards(streamName, [options])'
description: 'KinesisClient.listShards lists shards in a Kinesis stream'
weight: 10
---

# listShards

`KinesisClient.listShards(streamName, [options])` lists the shards in a Kinesis stream.

### Parameters

| Parameter  | Type   | Description                                           |
| :--------- | :----- | :---------------------------------------------------- |
| streamName | string | The name of the Kinesis stream.                       |
| options    | object | Optional configuration for the list shards operation. |

#### Options

| Parameter             | Type   | Description                                     |
| :-------------------- | :----- | :---------------------------------------------- |
| nextToken             | string | The token to use for pagination.                |
| exclusiveStartShardId | string | The shard ID to start listing from (exclusive). |
| maxResults            | number | The maximum number of shards to return.         |

### Returns

| Type              | Description                                      |
| :---------------- | :----------------------------------------------- |
| `Promise<Object>` | A Promise that fulfills with the list of shards. |

#### Returns object

| Property  | Type          | Description                                    |
| :-------- | :------------ | :--------------------------------------------- |
| shards    | Array<Object> | An array of shard objects.                     |
| nextToken | string        | The token to use for the next page of results. |

#### Shard object

| Property              | Type   | Description                                         |
| :-------------------- | :----- | :-------------------------------------------------- |
| shardId               | string | The unique identifier of the shard.                 |
| parentShardId         | string | The shard ID of the parent shard (if any).          |
| adjacentParentShardId | string | The shard ID of the adjacent parent shard (if any). |
| hashKeyRange          | Object | The hash key range for the shard.                   |
| sequenceNumberRange   | Object | The sequence number range for the shard.            |

### Example

{{< code >}}

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

  // List all shards in the stream
  const shardsResponse = await kinesis.listShards(streamName);

  console.log('Number of shards:', shardsResponse.shards.length);

  // Display information about each shard
  shardsResponse.shards.forEach((shard, index) => {
    console.log(`Shard ${index}:`);
    console.log('  Shard ID:', shard.shardId);
    console.log('  Parent Shard ID:', shard.parentShardId || 'None');
    console.log('  Adjacent Parent Shard ID:', shard.adjacentParentShardId || 'None');
    console.log('  Hash Key Range:', shard.hashKeyRange);
    console.log('  Sequence Number Range:', shard.sequenceNumberRange);
  });

  // List shards with pagination
  const limitedShards = await kinesis.listShards(streamName, { maxResults: 2 });
  console.log('Limited shards:', limitedShards.shards.length);

  // Continue pagination if there are more shards
  if (limitedShards.nextToken) {
    const nextPage = await kinesis.listShards(streamName, {
      nextToken: limitedShards.nextToken,
    });
    console.log('Next page shards:', nextPage.shards.length);
  }
}
```

{{< /code >}}
