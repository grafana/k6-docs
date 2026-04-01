---
title: 'deleteMessage'
description: 'SQSClient.deleteMessage deletes a message from the specified queue.'
weight: 10
---

# deleteMessage

`SQSClient.deleteMessage(queueUrl, receiptHandle)` deletes a message from the specified Amazon Simple Queue Service (SQS) queue.

### Parameters

| Name          | Type   | Description                                                                                                                                  |
| :------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| queueUrl      | string | The URL of the Amazon SQS queue from which messages are deleted. Queue URLs and names are case-sensitive.                                    |
| receiptHandle | string | The receipt handle associated with the message to delete. The receipt handle is returned when you receive a message using `receiveMessages`. |

### Returns

| Type          | Description                                                       |
| :------------ | :---------------------------------------------------------------- |
| Promise<void> | A Promise that fulfills when the message is successfully deleted. |

### Example

{{< code >}}

<!-- md-k6:skip -->

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
  if (queuesResponse.urls.filter((q) => q === testQueue).length == 0) {
    exec.test.abort();
  }

  // Send a message to the queue
  await sqs.sendMessage(testQueue, JSON.stringify({ value: '123' }));

  // Receive messages from the queue
  const messages = await sqs.receiveMessages(testQueue);

  // Delete each received message
  for (const message of messages) {
    console.log('Deleting message:', message.messageId);
    await sqs.deleteMessage(testQueue, message.receiptHandle);
  }
}
```

{{< /code >}}
