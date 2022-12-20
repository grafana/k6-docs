---
title: 'Client.sismember(key, member)'
excerpt: 'Determines if a given value is a member of the set stored at `key`.'
---

Returns if member is a member of the set stored at `key`.

### Parameters

| Parameter | Type   | Description                                                |
| :-------- | :----- | :--------------------------------------------------------- |
| `key`     | string | key holding the set to check if the member is a member of. |
| `member`  | any    | member to check if is a member of the set.                 |


### Returns

| Type               | Resolves with                                                                                                     | Rejected when |
| :----------------- | :------------------------------------------------------------------------------------------------------------- | :------- |
| `Promise<boolean>` | On success, the promise resolves with `true` if the element is a member of the set, `false` otherwise. |          |

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
  redisClient
    .sadd('myset', 'foo')
    .then((_) => redisClient.sadd('myset', 'bar'))
    .then((_) => redisClient.sismember('myset', 'foo'))
    .then((isit) => {
      if (isit === false) {
        throw new Error('sismember should have returned true');
      }
    });
}
```

</CodeGroup>