---
title: 'Options'
description: 'Options allow you to fine-tune how a Redis client behaves and interacts with a Redis server or cluster.'
weight: 20
---

# Redis options

You can configure the [Redis Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis/client) by using a Redis connection URL as demonstrated in the [client documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis/client#usage), or by using an [Options](#options) object to access more advanced configuration.

## Options

The configuration for the overall Redis client, including authentication and connection settings.

| Option Name      | Type                                                | Description                                                                     |
| ---------------- | --------------------------------------------------- | ------------------------------------------------------------------------------- |
| socket           | [SocketOptions](#socket-connection-options)         | The configuration of the connection socket used to connect to the Redis server. |
| username         | String (optional)                                   | Username for client authentication.                                             |
| password         | String (optional)                                   | Password for client authentication.                                             |
| clientName       | String (optional)                                   | Name for the client connection.                                                 |
| database         | Number (optional)                                   | Database ID to select after connecting.                                         |
| masterName       | String (optional)                                   | Master instance name for Sentinel.                                              |
| sentinelUsername | String (optional)                                   | Username for Sentinel authentication.                                           |
| sentinelPassword | String (optional)                                   | Password for Sentinel authentication.                                           |
| cluster          | [ClusterOptions](#redis-cluster-options) (optional) | The configuration for Redis Cluster connections.                                |

### Socket Connection Options

Socket-level settings for connecting to a Redis server.

| Option Name        | Type                                                                           | Description                                                                           |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| host               | String                                                                         | IP address or hostname of the Redis server.                                           |
| port               | Number (optional)                                                              | Port number of the Redis server.                                                      |
| tls                | [TLSOptions](#tls-configuration-options) (optional)                            | The configuration for TLS/SSL.                                                        |
| dialTimeout        | Number (optional, default is _5_ (seconds))                                    | Timeout for establishing a connection, in seconds.                                    |
| readTimeout        | Number (optional, default is _3_ (seconds))                                    | Timeout for socket reads, in seconds. A value of `-1` disables the timeout.           |
| writeTimeout       | Number (optional, default is `readTimeout`)                                    | Timeout for socket writes, in seconds. A value of `-1` disables the timeout.          |
| poolSize           | Number (optional, default is _10_ (per CPU))                                   | Number of socket connections in the pool per CPU.                                     |
| minIdleConns       | Number (optional, default is _0_ (idle connections are not closed by default)) | Minimum number of idle connections in the pool.                                       |
| maxConnAge         | Number (optional, default is _0_ (no maximum idle time))                       | Maximum time before closing a connection.                                             |
| poolTimeout        | Number (optional, `readTimeout + 1`)                                           | Timeout for acquiring a connection from the pool.                                     |
| idleTimeout        | Number (optional, `readTimeout + 1`)                                           | Timeout for idle connections in the pool.                                             |
| idleCheckFrequency | Number (optional, default is _1_ (minute))                                     | Frequency of idle connection checks, in minutes. A value of `-1` disables the checks. |

#### TLS Configuration Options

Options for establishing a secure TLS connection.

| Option Name | Type                   | Description                                         |
| ----------- | ---------------------- | --------------------------------------------------- |
| ca          | ArrayBuffer[]          | Array of CA certificates.                           |
| cert        | ArrayBuffer (optional) | Client certificate for mutual TLS.                  |
| key         | ArrayBuffer (optional) | Private key associated with the client certificate. |

### Redis Cluster Options

Options for behavior in a Redis Cluster setup.

| Option Name    | Type                                                      | Description                                                                   |
| -------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| maxRedirects   | Number (optional, default is _3_ retries)                 | Maximum number of command redirects.                                          |
| readOnly       | Boolean (optional)                                        | Enables read-only mode for replicas.                                          |
| routeByLatency | Boolean (optional)                                        | Route read commands by latency.                                               |
| routeRandomly  | Boolean (optional)                                        | Random routing for read commands.                                             |
| nodes          | String[] or [SocketOptions](#socket-connection-options)[] | List of cluster nodes as URLs or [SocketOptions](#socket-connection-options). |
