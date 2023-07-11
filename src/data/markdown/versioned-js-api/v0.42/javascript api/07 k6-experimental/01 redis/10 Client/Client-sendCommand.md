---
title: 'Client.sendCommand(command, args)'
excerpt: 'Issue a command to the Redis server.'
---

In the event a Redis command you wish to use is not implemented yet, the `sendCommand` method can be used to send a custom commands to the server.

### Parameters

| Parameter | Type   | Description                                                                                                    |
| :-------- | :----- | :------------------------------------------------------------------------------------------------------------- |
| `command` | string | command name to issue to the Redis server, as described in [Redis' documentation](https://redis.io/commands/). |
| `args`    | any[]  | command arguments to pass to the Redis server.                                                                 |


### Returns

| Type           | Resolves with                                                                                | Rejected when |
| :------------- | :------------------------------------------------------------------------------------------- | :------------ |
| `Promise<any>` | On success, the promise resolves with any result the server would reply to the command sent. |               |

### Example

<CodeGroup labels={[]}>

```javascript
import redis from 'k6/experimental/redis';

// Get the redis instance(s) address and password from the environment
const redis_addrs = __ENV.REDIS_ADDRS || '';
const redis_password = __ENV.REDIS_PASSWORD || '';

// Instantiate a new redis client
const redisClient = new redis.Client({
  addrs: redis_addrs.split(',') || new Array('localhost:6379'), // in the form of 'host:port', separated by commas
  password: redis_password,
});

export default function () {
  redisClient.sendCommand('ECHO', 'Hello world').then((result) => {
    if (result !== 'Hello world') {
      throw new Error('ECHO should have returned "Hello world"');
    }
  });
}
```

</CodeGroup>