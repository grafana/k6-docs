---
title: 'Client.hdel(key, fields)'
excerpt: 'Deletes fields from the hash stored at `key`.'
---

Deletes the specified fields from the hash stored at `key`. The number of fields that were removed from the hash is returned on resolution (non including non existing fields). 

### Parameters

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `key`     | string   | key holding the hash to delete the fields of. |
| `fields`  | string[] | fields to delete from the hash.               |


### Returns

| Type              | Resolves with                                                                                                                                  | Rejected when |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the number of fields that were removed from the hash, not including specified, but non existing, fields. |               |

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
    .then((_) => redisClient.hget('myhash', 'myfield'))
    .then((_) => redisClient.hdel('myhash', 'myfield'));
}
```

</CodeGroup>