---
title: 'SQSClient.sendMessage()'
description: "SQSClient.sendMessage sends a message to the specified Amazon SQS queue"
excerpt: "SQSClient.sendMessage sends a message to the specified Amazon SQS queue"
---

`SQSClient.sendMessage(queueUrl, messageBody, options)` sends a message to the specified Amazon Simple Queue Service (SQS) queue.

### Parameters

| Name          | Type              | Description                                                                                                                                                                                                           |
| :------------ | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `queueUrl`    | string            | The URL of the Amazon SQS queue to which a message is sent. Queue URLs and names are case-sensitive.                                                                                                                  |
| `messageBody` | string            | The message to send. The minimum size is one character. The maximum size is 256 KB.                                                                                                                                   |
| `options`     | object (optional) | Options for the request. Accepted properties are `messageDeduplicationId` (optional string) setting the message deduplication id, and `messageGroupId` (optional string) setting the message group ID for FIFO queues |

### Returns

| Type     | Description                                                                                                                                                                                                                  |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `object` | The message that was sent, as an object containing an `id` string property holding the unique identifier for the message, and a `bodyMD5` string property holding the MD5 digest of the non-URL-encoded message body string. |

### Example

<CodeGroup labels={[]}>

```javascript
import exec from 'k6/execution'

import { AWSConfig, SQSClient } from 'https://jslib.k6.io/aws/0.8.1/sqs.js'

const awsConfig = new AWSConfig({
    region: __ENV.AWS_REGION,
    accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
    sessionToken: __ENV.AWS_SESSION_TOKEN,
})

const sqs = new SQSClient(awsConfig)
const testQueue = 'https://sqs.us-east-1.amazonaws.com/000000000/test-queue'

export default function () {
    // If our test queue does not exist, abort the execution.
    const queuesResponse = sqs.listQueues()
    if (queuesResponse.queueUrls.filter((q) => q === testQueue).length == 0) {
        exec.test.abort()
    }

    // Send message to test queue
    sqs.sendMessage(testQueue, JSON.stringify({value: '123'}));
}
```

</CodeGroup>