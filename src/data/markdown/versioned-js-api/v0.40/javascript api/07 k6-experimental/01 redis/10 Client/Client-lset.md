---
title: 'Client.lset(key, index, element)'
excerpt: 'Sets the list element at index `index` of the list stored at `key` to `value`.'
---

Sets the list element at `index` to `element`.

### Parameters

| Parameter | Type   | Description                                 |
| :-------- | :----- | :------------------------------------------ |
| `key`     | string | key holding the list to set the element of. |
| `index`   | number | index of the element to set.                |
| `element` | string | value to set the element to.                |


### Returns

| Type              | Resolves with                               | Rejected when                                                                                     |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `Promise<string>` | On success, the promise resolves with `OK`. | If the list does not exist, or the index is out of bounds, the promise is rejected with an error. |

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
    .rpush('mylist', 'first')
    .then((_) => redisClient.rpush('mylist', 'second'))
    .then((_) => redisClient.rpush('mylist', 'third'))
    .then((_) => redisClient.lset('mylist', 0, 1))
    .then((_) => redisClient.lset('mylist', 1, 2));
}
```

</CodeGroup>