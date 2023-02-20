---
title: 'Client.getDel(key)'
excerpt: 'Get the value of `key` and delete the key.'
---

Get the value of `key` and delete the key. This functionality is similar to `get`, except for the fact that it also deletes the key on success.

### Parameters

| Parameter | Type   | Description               |
| :-------- | :----- | :------------------------ |
| `key`     | string | the key to get and delete |


### Returns

| Type              | Resolves with                                             | Rejected when                                                     |
| :---------------- | :-------------------------------------------------------- | :---------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value of `key`. | If the key does not exist, the promise is rejected with an error. |

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
    .set('mykey', 'oldvalue', 0)
    .then((_) => redisClient.getSet('mykey', 'newvalue'))
    .then((_) => redisClient.getDel('mykey'));
}
```

</CodeGroup>