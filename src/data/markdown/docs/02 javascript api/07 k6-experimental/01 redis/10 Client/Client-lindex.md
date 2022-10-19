---
title: 'Client.lindex(key)'
excerpt: 'Returns the element at index `index` of the list stored at `key`.'
---

Returns the specified element of the list stored at `key`. The index is zero-based. Negative indices can be used to designate elements starting at the tail of the list.

### Parameters

| Parameter | Type   | Description                                 |
| :-------- | :----- | :------------------------------------------ |
| `key`     | string | key holding the list to get the element of. |


### Returns

| Type              | Resolves with                                                | Rejected when                                                                                     |
| :---------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `Promise<string>` | On success, the promise resolves with the requested element. | If the list does not exist, or the index is out of bounds, the promise is rejected with an error. |

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
    .then((_) => redisClient.lindex('mylist', 0))
    .then((item) => {
      if (item !== 'first') {
        throw new Error('lindex operation should have returned first');
      }

      return redisClient.lrange('mylist', 1, 2);
    });
}
```

</CodeGroup>