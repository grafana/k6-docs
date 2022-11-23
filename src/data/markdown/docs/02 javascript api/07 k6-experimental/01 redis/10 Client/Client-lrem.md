---
title: 'Client.lrem(key, count, value)'
excerpt: 'Removes the first count occurrences of elements equal to value from the list stored at `key`.'
---

Removes the first `count` occurrences of `value` from the list stored at `key`. If `count` is positive, elements are removed from the beginning of the list. If `count` is negative, elements are removed from the end of the list. If `count` is zero, all elements matching `value` are removed.

### Parameters

| Parameter | Type   | Description                                     |
| :-------- | :----- | :---------------------------------------------- |
| `key`     | string | key holding the list to remove the elements of. |
| `count`   | number | number of elements to remove.                   |
| `value`   | string | value to remove from the list.                  |


### Returns

| Type              | Resolves with                                                         | Rejected when                                                      |
| :---------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the number of removed elements. | If the list does not exist, the promise is rejected with an error. |

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
    .then((_) => redisClient.rpush('mylist', 'first'))
    .then((_) => redisClient.rpush('mylist', 'second'))
    .then((_) => redisClient.lrem('mylist', 0, 'second'))
    .then((_) => redisClient.lrem('mylist', 1, 'first'))
    .then((length) => {
      if (length !== 1) {
        throw new Error('lrem operations should have left 1 item behind');
      }

      return redisClient.lpop('mylist');
    });
}
```

</CodeGroup>