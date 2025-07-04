---
title: 'receiveMessages'
description: 'SQSClient.receiveMessages receives messages from the specified queue.'
weight: 10
---

# receiveMessages

`SQSClient.receiveMessages(queueUrl, [options])` receives messages from the specified Amazon Simple Queue Service (SQS) queue.

### Parameters

| Name     | Type                                                       | Description                                                                                                |
| :------- | :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| queueUrl | string                                                     | The URL of the Amazon SQS queue from which messages are received. Queue URLs and names are case-sensitive. |
| options  | [ReceiveMessageOptions](#receivemessageoptions) (optional) | Options for the receive operation.                                                                         |

#### ReceiveMessageOptions

| Name                     | Type              | Description                                                                                                                                                                                                                                   |
| :----------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxNumberOfMessages      | number (optional) | The maximum number of messages to return. Amazon SQS never returns more messages than this value (however, fewer messages might be returned). Valid values: 1 to 10. Default: 1.                                                              |
| visibilityTimeoutSeconds | number (optional) | The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by a `receiveMessages` request. Valid values: 0 to 43200 (12 hours). Default: the queue's default visibility timeout. |
| waitTimeSeconds          | number (optional) | The duration (in seconds) for which the call waits for a message to arrive in the queue before returning. Valid values: 0 to 20. Default: 0.                                                                                                  |

### Returns

| Type                                 | Description                                                 |
| :----------------------------------- | :---------------------------------------------------------- |
| Promise<[SQSMessage[]](#sqsmessage)> | A Promise that fulfills with an array of received messages. |

#### SQSMessage

| Name          | Type   | Description                                                                                                                                                                                                                     |
| :------------ | :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| messageId     | string | A unique identifier for the message.                                                                                                                                                                                            |
| body          | string | The message's contents (not URL-encoded).                                                                                                                                                                                       |
| receiptHandle | string | An identifier associated with the act of receiving the message. A new receipt handle is returned every time you receive a message. When deleting a message, you provide the last received receipt handle to delete the message. |
| md5OfBody     | string | An MD5 digest of the non-URL-encoded message body string.                                                                                                                                                                       |

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
  if (queuesResponse.urls.filter((q) => q === testQueue).length == 0) {
    exec.test.abort();
  }

  // Receive messages from the queue
  const messages = await sqs.receiveMessages(testQueue, {
    maxNumberOfMessages: 10,
    waitTimeSeconds: 2,
  });

  // Process received messages
  for (const message of messages) {
    console.log('Received message:', message.body);
    console.log('Message ID:', message.messageId);
    console.log('Receipt handle:', message.receiptHandle);
  }
}
```

{{< /code >}}
