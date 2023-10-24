---
title: 'Client.hlen(key)'
excerpt: 'Returns the number of fields in the hash stored at `key`.'
canonicalUrl: https://grafana.com/docs/k6
---

Returns the number of fields in the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the hash to get the fields of. |


### Returns

| Type              | Resolves with                                                           | Rejected when                                                      |
| :---------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the number of fields in the hash. | If the hash does not exist, the promise is rejected with an error. |

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
  await redisClient.hset('myhash', 'myfield', 10);
  await redisClient.hset('myhash', 'myotherfield', 20);
  await redisClient.hlen('myhash');
}
```

</CodeGroup>