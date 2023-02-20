---
title: 'Client.rpush(key, values)'
excerpt: 'Adds the string `value` to the right of the list stored at `key`.'
---

Inserts all the specified values at the tail of the list stored at `key`. If `key` does not exist, it is created as empty list before performing the push operation.

### Parameters

| Parameter | Type   | Description                            |
| :-------- | :----- | :------------------------------------- |
| `key`     | string | key holding the list to right push to. |
| `values`  | any[]  | values to push to the list.            |


### Returns

| Type              | Resolves with                                                                          | Rejected when                                                                       |
| :---------------- | :------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the length of the list after the push operation. | When `key` holds a value that is not a list, the promise is rejected with an error. |

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
    .lpush('mylist', 'first')
    .then((_) => redisClient.rpush('mylist', 'second'))
    .then((_) => redisClient.lpop('mylist'))
    .then((item) => redisClient.rpush('mylist', item))
    .then((_) => redisClient.rpop('mylist'));
}
```

</CodeGroup>