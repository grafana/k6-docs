---
title: 'Client.srandmember(key)'
excerpt: 'Returns a random member of the set stored at `key`.'
---

Returns a random element from the set value stored at `key`.

### Parameters

| Parameter | Type   | Description                                    |
| :-------- | :----- | :--------------------------------------------- |
| `key`     | string | key holding the set to get a random member of. |


### Returns

| Type              | Resolves with                                                                | Rejected when                                                              |
| :---------------- | :------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the selected random member. | If the set does not exist, the promise is rejected with an error. |

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
    .then((_) => redisClient.spop('myset', 'foo'))
    .then((_) => redisClient.smembers('myset'))
    .then((members) => {
      if (members.length !== 1) {
        throw new Error('sismember should have length 1');
      }
    });
}
```

</CodeGroup>