---
title: 'Client.set(key, value, expiration)'
excerpt: 'Set `key` to hold `value`, with a time to live equal to `expiration`.'
---

Set the value of a key, with a time to live equal to the expiration time parameter (in seconds). If the key already holds a value, it is overwritten.

### Parameters

| Parameter    | Type    | Description                                                         |
| :----------- | :------ | :------------------------------------------------------------------ |
| `key`        | string  | the key to set                                                      |
| `value`      | any     | the value to set                                                    |
| `expiration` | integer | the time to live in seconds. the `0` value indicates no expiration. |


### Returns

| Type              | Resolves with                               | Rejected when                                                                              |
| :---------------- | :------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with 'OK'. | If the provided `value` is not of a supported type, the promise is rejected with an error. |

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
    .set('mykey', 'myvalue', 0)
    .then((_) => redisClient.exists('mykey'))
    .then((exists) => {
      if (exists === false) {
        throw new Error('mykey should exist');
      }

      return redisClient.get('mykey');
    })
    .then((value) => console.log(`set key 'mykey' to value: ${value}`))
    .then(() => redisClient.del('mykey'));
}
```

</CodeGroup>