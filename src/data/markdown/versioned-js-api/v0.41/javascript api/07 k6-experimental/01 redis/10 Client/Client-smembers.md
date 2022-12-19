---
title: 'Client.smembers(key)'
excerpt: 'Returns all the members of the set stored at `key`.'
---

Returns all the members of the set values stored at `keys`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the set to get the members of. |


### Returns

| Type                | Resolves with                                                                                       | Rejected when |
| :------------------ | :----------------------------------------------------------------------------------------------- | :------- |
| `Promise<string[]>` | On success, the promise resolves with an array containing the values present in the set. |          |

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
    .then((_) => redisClient.sadd('myset', 'foo'))
    .then((_) => redisClient.smembers('myset'))
    .then((members) => {
      if (members.length !== 2) {
        throw new Error('sismember should have length 2');
      }
    });
}
```

</CodeGroup>