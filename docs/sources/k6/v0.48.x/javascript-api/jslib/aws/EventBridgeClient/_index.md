---
title: 'EventBridgeClient'
head_title: 'EventBridgeClient'
description: 'EventBridgeClient allows interacting with AWS EventBridge service'
description: 'EventBridgeClient class allows sending custom events to Amazon EventBridge so that they can be matched to rules.'
weight: 00
---

# EventBridgeClient

`EventBridgeClient` interacts with the AWS EventBridge service.

With it, you can send custom events to Amazon EventBridge. These events can then be matched to rules defined in EventBridge. For a full list of supported operations, see [Methods](#methods).

Both the dedicated `event-bridge.js` jslib bundle and the all-encompassing `aws.js` bundle include the `EventBridgeClient`.

### Methods

| Function                                                                                                          | Description                               |
| :---------------------------------------------------------------------------------------------------------------- | :---------------------------------------- |
| [putEvents(input)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/aws/eventbridgeclient/putevents) | Send custom events to Amazon EventBridge. |

### Throws

EventBridgeClient methods will throw errors in case of failure.

| Error                   | Condition                                                                   |
| :---------------------- | :-------------------------------------------------------------------------- |
| InvalidSignatureError   | when invalid credentials were provided or the request signature is invalid. |
| EventBridgeServiceError | when AWS replied to the requested operation with an error.                  |

### Examples

{{< code >}}

```javascript
import { AWSConfig, EventBridgeClient } from 'https://jslib.k6.io/aws/0.11.0/event-bridge.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const eventBridge = new EventBridgeClient(awsConfig);

export default async function () {
  const eventDetails = {
    Source: 'my.custom.source',
    Detail: { key1: 'value1', key2: 'value2' },
    DetailType: 'MyDetailType',
    Resources: ['arn:aws:resource1'],
  };

  const input = {
    Entries: [eventDetails],
  };

  try {
    await eventBridge.putEvents(input);
  } catch (error) {
    console.error(`Failed to put events: ${error.message}`);
  }
}
```

{{< /code >}}
