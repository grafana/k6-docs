---
title: 'Client.getSet(key, value)'
excerpt: 'Atomically sets `key` to `value` and returns the old value stored at `key`.'
---

Atomically sets `key` to `value` and returns the value previously stored at `key`.

### Parameters

| Parameter | Type   | Description            |
| :-------- | :----- | :--------------------- |
| `key`     | string | the key to get and set |
| `value`   | any    | the value to set       |


### Returns

| Type              | Resolves with                                                        | Rejected when                                                                                    |
| :---------------- | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the old value stored at `key`. | If `key` does not exist, or does not hold a string value, the promise is rejected with an error. |

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