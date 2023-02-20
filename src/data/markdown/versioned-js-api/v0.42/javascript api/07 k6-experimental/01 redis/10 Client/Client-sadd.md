---
title: 'Client.sadd(key, members)'
excerpt: 'Adds the specified members to the set stored at `key`.'
---

Adds the specified members to the set stored at `key`. Specified members that are already a member of this set are ignored. If key does not exist, a new set is created before adding the specified members.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the set to add the members to. |
| `members` | any[]  | members to add to the set.                 |


### Returns

| Type              | Resolves with                                                                                                                                          | Rejected when |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `Promise<number>` | On success, the promise resolves with the number of elements that were added to the set, not including elements already present in the set. |          |

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