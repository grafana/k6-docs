---
title: 'Client.hvals(key)'
excerpt: 'Returns all values of the hash stored at `key`.'
---

Returns all values of the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the hash to get the fields of. |


### Returns

| Type                | Resolves with                                                         | Rejected when                                                      |
| :------------------ | :-------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<string[]>` | On success, the promise resolves with the list of values in the hash. | If the hash does not exist, the promise is rejected with an error. |

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
    .hset('myhash', 'myfield', 'myvalue')
    .then((_) => redisClient.hset('myhash', 'myotherfield', 'myothervalue'))
    .then((_) => redisClient.hvals('myhash'))
    .then((values) => {
      if (values.length !== 2) {
        throw new Error('myhash should have 2 values');
      }

      console.log(`myhash has values ${values}`);
    });
}
```

</CodeGroup>