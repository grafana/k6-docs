---
title: 'Client.lpush(key, values)'
excerpt: 'Adds the string `value` to the left of the list stored at `key`.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/client/client-lpush/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/client/client-lpush/
---

Inserts all the specified values at the head of the list stored at `key`. If `key` does not exist, it is created as empty list before performing the push operations.

### Parameters

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| `key`     | string | key holding the list to left push to. |
| `values`  | a variadic array of strings, numbers, or booleans  | values to push to the list.           |


### Returns

| Type              | Resolves with                                                                | Rejected when                                                                       |
| :---------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the length of the list after the push. | When `key` holds a value that is not a list, the promise is rejected with an error. |

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

export default async function () {
    await redisClient.lpush('mylist', 'first');
    await redisClient.rpush('mylist', 'second');

    let item = await redisClient.lpop('mylist');
    item = redisClient.rpush('mylist', item);
    item = redisClient.rpop('mylist');
}
```

</CodeGroup>