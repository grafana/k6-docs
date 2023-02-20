---
title: 'Client.srem(key, members)'
excerpt: 'Removes the specified members from the set stored at `key`.'
---

Removes the specified members from the set stored at `key`. Specified members that are not a member of this set are ignored. If key does not exist, it is treated as an empty set and this command returns 0.

### Parameters

| Parameter | Type   | Description                                     |
| :-------- | :----- | :---------------------------------------------- |
| `key`     | string | key holding the set to remove the members from. |
| `members` | any[]  | members to remove from the set.                 |


### Returns

| Type              | Resolves with                                                                                                                             | Rejected when |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `Promise<number>` | On success, the promise resolves with the number of members that were remove from the set, not including non existing members. |          |

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
    .then((_) => redisClient.srem('myset', 'foo'))
    .then((_) => redisClient.smembers('myset'))
    .then((members) => {
      if (members.length !== 1) {
        throw new Error('sismember should have length 1');
      }
    });
}
```

</CodeGroup>