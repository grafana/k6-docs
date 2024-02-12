---
title: 'putEvents'
head_title: 'EventBridgeClient.putEvents'
description: 'EventBridgeClient.putEvents sends custom events to Amazon EventBridge'
description: 'EventBridgeClient.putEvents sends custom events to Amazon EventBridge'
weight: 10
---

# putEvents

`EventBridgeClient.putEvents` sends custom events to Amazon EventBridge so that they can be matched to rules.

### Parameters

| Parameter | Type                              | Description                                              |
| :-------- | :-------------------------------- | :------------------------------------------------------- |
| input     | [PutEventsInput](#puteventsinput) | An array of objects representing events to be submitted. |

#### PutEventsInput

| Parameter  | Type                                    | Description                                              |
| :--------- | :-------------------------------------- | :------------------------------------------------------- |
| Entries    | [EventBridgeEntry](#eventbridgeentry)[] | An array of objects representing events to be submitted. |
| EndpointId | string (optional)                       | The ID of the target to receive the event.               |

#### EventBridgeEntry

| Parameter    | Type                | Description                                                                                                                                       |
| :----------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Source       | string              | The source of the event.                                                                                                                          |
| Detail       | object              | A JSON object containing event data.                                                                                                              |
| DetailType   | string              | Free-form string used to decide what fields to expect in the event detail.                                                                        |
| Resources    | string[] (optional) | AWS resources, identified by Amazon Resource Name (ARN), which the event primarily concerns.                                                      |
| EventBusName | string (optional)   | The event bus that will receive the event. If you omit this, the default event bus is used. Only the AWS account that owns a bus can write to it. |

### Returns

| Type            | Description                                                                   |
| :-------------- | :---------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the events have been sent to Amazon EventBridge. |

### Example

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
const eventEntry = {
  Source: 'my.source',
  Detail: {
    key: 'value',
  },
  DetailType: 'MyDetailType',
  Resources: ['resource-arn'],
};

export default async function () {
  await eventBridge.putEvents({
    Entries: [eventEntry],
  });
}
```

{{< /code >}}
