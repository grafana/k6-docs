---
title: 'Client.persist(key)'
excerpt: 'Remove the expiration from a key.'
---

Removes the existing timeout on `key`.

### Parameters

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `key`     | string | the key to remove the timeout of. |


### Returns

| Type               | Resolves with                                                                               | Rejected when |
| :----------------- | :------------------------------------------------------------------------------------------ | :------------ |
| `Promise<boolean>` | On success, the promise resolves with `true` if the timeout was removed, `false` otherwise. |               |

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
    .set('mykey', 'myvalue', 10)
    .then((_) => redisClient.expire('mykey', 100))
    .then((_) => redisClient.ttl('mykey'))
    .then((ttl) => {
      if (ttl <= 10) {
        throw new Error('mykey should have a ttl of 10 <= x < 100');
      }

      return redisClient.persist('mykey', 100);
    });
}
```

</CodeGroup>