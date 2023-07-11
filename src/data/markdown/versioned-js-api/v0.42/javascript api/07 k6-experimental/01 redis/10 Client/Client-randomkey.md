---
title: 'Client.randomKey()'
excerpt: 'Returns a random key from the keyspace.'
---

Returns a random key.

### Returns

| Type              | Resolves with                                              | Rejected when                                                    |
| :---------------- | :--------------------------------------------------------- | :--------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the random key name. | If the database is empty, the promise is rejected with an error. |

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
    .set('first', 1, 0)
    .then((_) => redisClient.set('second', 2, 0))
    .then((_) => redisClient.set('third', 3, 0))
    .then((_) => redisClient.randomKey())
    .then((key) => console.log(`picked random key is: ${key}`));
}
```

</CodeGroup>