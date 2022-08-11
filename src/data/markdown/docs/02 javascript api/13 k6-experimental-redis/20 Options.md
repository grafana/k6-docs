---
title: 'Options'
excerpt: 'Options allow to fine tune how a Redis client behaves and interacts with a Redis server or cluster.'
---

You can configure the [Redis Client](/javascript-api/k6-experimental-redis/client) at construction time with the [Options](#options) object.
We recommend passing the options to the constructor as an argument,  then passing the most common options, such as the `addrs` and `password`, to the constructor from the environment.

The following snippet provides an example:

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
  // do something with the redis client
}
```

## Options

| Option name          | type              | default           | description                                                                                                                                                                                                                                      |
| :------------------- | :---------------- | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addrs`              | string[]          |                   | Array of addresses in the 'host:port' defining which connect Redis to connect to. Supplying a single entry would connect the client to a single Redis instance. Supplying multiple entries would connect the client to a cluster/sentinel nodes. |
| `db`                 | number (optional) | 0                 | The id of the database to be selected after connecting to the server. Only used when connecting to a single-node use.                                                                                                                           |
| `username`           | string (optional) |                   | Username to authenticate the client connection with.                                                                                                                                                                                             |
| `password`           | string (optional) |                   | Password to authenticate the client connection with.                                                                                                                                                                                             |
| `sentinelUsername`   | string (optional) |                   | Username to authenticate the client connection with when connecting to a sentinel.                                                                                                                                                               |
| `sentinelPassword`   | string (optional) |                   | Password to authenticate the client connection with when connecting to a sentinel.                                                                                                                                                               |
| `masterName`         | string (optional) |                   | The name of the master to connect to when connecting to a Redis cluster.                                                                                                                                                                         |
| `maxRetries`         | number (optional) | 0                 | The maximum number of retries to attempt when connecting to a Redis server before giving up.                                                                                                                                                     |
| `minRetryBackoff`    | number (optional) | 8 (ms)            | The minimum amount of time to wait between retries when connecting to a Redis server.                                                                                                                                                            |
| `maxRetryBackoff`    | number (optional) | 512 (ms)          | The maximum amount of time to wait between retries when connecting to a Redis server.                                                                                                                                                            |
| `dialTimeout`        | number (optional) | 5 (seconds)       | The maximum amount of time to wait for a connection to a Redis server to be established.                                                                                                                                                         |
| `readTimeout`        | number (optional) | 3 (seconds)       | The maximum amount of time to wait for socket reads to succeed. Use `-1` for no timeout.                                                                                                                                                         |
| `writeTimeout`       | number (optional) | `readTimeout`     | The maximum amount of time to wait for a socket write to succeed. Use `-1` for no timeout.                                                                                                                                                       |
| `poolSize`           | number (optional) | 10 (per CPU)      | The maximum number of socket connections to keep open in the connection pool.                                                                                                                                                                    |
| `minIdleConns`       | number (optional) |                   | The minimum number of idle connections to keep open in the connection pool.                                                                                                                                                                      |
| `maxIdleConns`       | number (optional) |                   | The maximum number of idle connections to keep open in the connection pool.                                                                                                                                                                      |
| `maxConnAge`         | number (optional) | 0                 | The maximum amount of time a connection can be idle in the connection pool before being closed.                                                                                                                                                  |
| `poolTimeout`        | number (optional) | `readTimeout + 1` | The maximum amount of time to wait for a connection to the Redis server to be returned from the pool.                                                                                                                                            |
| `idleTimeout`        | number (optional) | `readTimeout + 1` | The maximum amount of time the client waits for a connection to become active before timing out.                                                                                                                                                 |
| `idleCheckFrequency` | number (optional) | 1 (minute)        | The frequency at which the client checks for idle connections in the connection pool. Use `-1` to disable the checks.                                                                                                                            |