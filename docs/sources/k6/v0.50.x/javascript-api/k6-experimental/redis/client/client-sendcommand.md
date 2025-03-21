---
title: 'Client.sendCommand(command, args)'
description: 'Issue a command to the Redis server.'
---

# Client.sendCommand(command, args)

In the event a Redis command you wish to use is not implemented yet, the `sendCommand` method can be used to send a custom commands to the server.

### Parameters

| Parameter | Type                                              | Description                                                                                                    |
| :-------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------- |
| `command` | string                                            | command name to issue to the Redis server, as described in [Redis' documentation](https://redis.io/commands/). |
| `args`    | a variadic array of strings, numbers, or booleans | command arguments to pass to the Redis server.                                                                 |

### Returns

| Type           | Resolves with                                                                                                       | Rejected when |
| :------------- | :------------------------------------------------------------------------------------------------------------------ | :------------ |
| `Promise<any>` | On success, the promise resolves with string, number, or boolean result the server would reply to the command sent. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  const result = await redisClient.sendCommand('ECHO', 'Hello world');
  if (result !== 'Hello world') {
    throw new Error('ECHO should have returned "Hello world"');
  }
}
```

{{< /code >}}
