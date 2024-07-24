---
title: 'Client.rpop(key)'
excerpt: 'Removes and returns the last element of the list stored at `key`.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/client/client-rpop/
---

Removes and returns the last element of the list stored at `key`.

### Parameters

| Parameter | Type   | Description                             |
| :-------- | :----- | :-------------------------------------- |
| `key`     | string | key holding the list to right pop from. |


### Returns

| Type              | Resolves with                                                         | Rejected when                                                      |
| :---------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value of the first element. | If the list does not exist, the promise is rejected with an error. |

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
  await redisClient.lpush('mylist', 'first')
  await redisClient.rpush('mylist', 'second');
  
  const item = await redisClient.lpop('mylist');
  await redisClient.rpush('mylist', item);
  await redisClient.rpop('mylist');
}
```

</CodeGroup>