---
aliases:
  - ./sqsclient-sendmessage/ # /docs/k6/<K6_VERSION>/javascript-api/jslib/aws/sqsclient/sqsclient-sendmessage/
title: 'sendMessage'
description: 'SQSClient.sendMessage sends a message to the specified Amazon SQS queue'
weight: 10
---

# sendMessage

`SQSClient.sendMessage(queueUrl, messageBody, options)` sends a message to the specified Amazon Simple Queue Service (SQS) queue.

### Parameters

| Name          | Type                                                 | Description                                                                                          |
| :------------ | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `queueUrl`    | string                                               | The URL of the Amazon SQS queue to which a message is sent. Queue URLs and names are case-sensitive. |
| `messageBody` | string                                               | The message to send. The minimum size is one character. The maximum size is 256 KB.                  |
| `options`     | [SendMessageOptions](#sendmessageoptions) (optional) | Options for the request.                                                                             |

#### SendMessageOptions

| Name                     | Type              | Description                                                                                                                                                                                                                                                                                                                  |
| :----------------------- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `messageDeduplicationId` | string (optional) | The token used for deduplication of sent messages. This parameter applies only to FIFO (first-in-first-out) queues. If a message with a particular MessageDeduplicationId is sent successfully, any messages with the same MessageDeduplicationId are accepted but not delivered during the 5-minute deduplication interval. |
| `messageGroupId`         | string (optional) | The tag that specifies that a message belongs to a specific message group. Messages that belong to the same message group are processed in a FIFO manner. Messages in different message groups might be processed out of order.                                                                                              |
| `messageAttributes`      | object (optional) | Each message attribute consists of a `Name`, `Type`, and `Value`. For more information, see [Amazon SQS Message Attributes](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-attributes.html).                                                                                         |
| `delaySeconds`           | number (optional) | The length of time, in seconds, for which to delay a specific message. Valid values: 0 to 900. Maximum: 15 minutes. Messages with a positive `delaySeconds` value become available for processing after the delay period is finished. If you don't specify a value, the default value for the queue applies.                 |

### Returns

| Type              | Description                                                                                                                                                                                                                                               |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<object>` | A Promise that fulfills with the message that was sent, as an object containing an `id` string property holding the unique identifier for the message, and a `bodyMD5` string property holding the MD5 digest of the non-URL-encoded message body string. |

### Example

{{< code >}}

```javascript
import exec from 'k6/execution';

import { AWSConfig, SQSClient } from 'https://jslib.k6.io/aws/0.11.0/sqs.js';

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

  // Send message to test queue
  await sqs.sendMessage(testQueue, 'test', {
    messageAttributes: {
      'test-string': {
        type: 'String',
        value: 'test',
      },
      'test-number': {
        type: 'Number',
        value: '23',
      },
      'test-binary': {
        type: 'Binary',
        value: 'dGVzdA==',
      },
    },
  });
}
```

{{< /code >}}
