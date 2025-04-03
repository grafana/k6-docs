---
aliases:
title: 'sendMessageBatch'
description: 'SQSClient.sendMessageBatch Delivers up to ten messages to the specified queue.'
weight: 10
---

# sendMessage

`SQSClient.sendMessageBatch(queueUrl, entries)` delivers up to ten messages to the specified Amazon Simple Queue
Service (SQS) queue.

### Parameters

| Name       | Type                                            | Description                                                                                          |
| :--------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `queueUrl` | string                                          | The URL of the Amazon SQS queue to which a message is sent. Queue URLs and names are case-sensitive. |
| `entries`  | [SendMessageBatchEntry](#sendmessagebatchentry) | A list of up to ten messages to send.                                                                |

#### SendMessageBatchEntry

| Name              | Type                                                                                                                   | Description                                                                         |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `messageId`       | string                                                                                                                 | The identifier of the batch entry message.                                          |
| `messageBody`     | string                                                                                                                 | The message to send. The minimum size is one character. The maximum size is 256 KB. |
| `messageOptions?` | [SendMessageOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/sqs/sendmessageoption)>) (optional) | Options for the request.                                                            |

### Returns

| Type                                                     | Description                                                     |
| :------------------------------------------------------- | :-------------------------------------------------------------- |
| `Promise<[MessageBatchResponse](#messagebatchresponse)>` | A Promise that fulfills with a batch message creation response. |

#### MessageBatchResponse

| Name         | Type              | Description                                                                                                                                                                                                                   |
| :----------- | :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `successful` | object[]          | A list of succesful messages as objects containing an `id` string property holding the unique identifier for the message, and a `bodyMD5` string property holding the MD5 digest of the non-URL-encoded message body string.. |
| `failed`     | SQSServiceError[] | A list of error responses.                                                                                                                                                                                                    |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import {
  AWSConfig,
  SQSClient,
} from 'https://jslib.k6.io/aws/{{< param "JSLIB_AWS_VERSION" >}}/sqs.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const sqs = new SQSClient(awsConfig);
const testQueue = 'https://sqs.us-east-1.amazonaws.com/000000000/test-queue';

export default async function () {
  // If our test queue does not exist, abort the execution.
  const queuesResponse = await sqs.listQueues();
  if (queuesResponse.queueUrls.filter((q) => q === testQueue).length == 0) {
    exec.test.abort();
  }

  // Prepare a bunch of batch messages to add to the queue
  const messageBatch = [
    { messageId: '0', messageBody: 'test0' },
    { messageId: '1', messageBody: 'test1' },
  ];

  // Send the batch of messages to the queue
  await sqs.sendMessageBatch(testQueue, messageBatch);
}
```

{{< /code >}}
