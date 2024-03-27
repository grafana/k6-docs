---
title: JavaScript API
weight: 600
---

# JavaScript API

The list of k6 modules natively supported in your k6 scripts.

## Init context

Before the k6 starts the test logic, code in the _init context_ prepares the script.
A few functions are available only in init context.
For details about the runtime, refer to the [Test lifecycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

| Function                                                                                              | Description                                          |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [open( filePath, [mode] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/init-context/open) | Opens a file and reads all the contents into memory. |

## k6

The k6 module contains k6-specific functionality.

| Function                                                                                     | Description                                                                                                                                  |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [check(val, sets, [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) | Runs one or more checks on a value and generates a pass/fail result but does not throw errors or otherwise interrupt execution upon failure. |
| [fail([err])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/fail)               | Throws an error, failing and aborting the current VU script iteration immediately.                                                           |
| [group(name, fn)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group)          | Runs code inside a group. Used to organize results in a test.                                                                                |
| [randomSeed(int)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/random-seed)    | Set seed to get a reproducible pseudo-random number using `Math.random`.                                                                     |
| [sleep(t)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/sleep)                 | Suspends VU execution for the specified duration.                                                                                            |

## k6/crypto

The k6/crypto `module` provides common hashing functionality available in the GoLang [crypto](https://golang.org/pkg/crypto/) package.

| Function                                                                                                                | Description                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [createHash(algorithm)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhash)                   | Create a Hasher object, allowing the user to add data to hash multiple times, and extract hash digests along the way.        |
| [createHMAC(algorithm, secret)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhmac)           | Create an HMAC hashing object, allowing the user to add data to hash multiple times, and extract hash digests along the way. |
| [hmac(algorithm, secret, data, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/hmac) | Use HMAC to sign an input string.                                                                                            |
| [md4(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/md4)                     | Use MD4 to hash an input string.                                                                                             |
| [md5(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/md5)                     | Use MD5 to hash an input string.                                                                                             |
| [randomBytes(int)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/randombytes)                       | Return an array with a number of cryptographically random bytes.                                                             |
| [ripemd160(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/ripemd160)         | Use RIPEMD-160 to hash an input string.                                                                                      |
| [sha1(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha1)                   | Use SHA-1 to hash an input string.                                                                                           |
| [sha256(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha256)               | Use SHA-256 to hash an input string.                                                                                         |
| [sha384(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha384)               | Use SHA-384 to hash an input string.                                                                                         |
| [sha512(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha512)               | Use SHA-512 to hash an input string.                                                                                         |
| [sha512_224(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha512_224)       | Use SHA-512/224 to hash an input string.                                                                                     |
| [sha512_256(input, outputEncoding)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/sha512_256)       | Use SHA-512/256 to hash an input string.                                                                                     |

| Class                                                                              | Description                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Hasher](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/hasher) | Object returned by [crypto.createHash()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhash). It allows adding more data to be hashed and to extract digests along the way. |

## k6/data

The data module provides helpers to work with data.

| Class/Method                                                                               | Description                                                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) | read-only array like structure that shares memory between VUs |

## k6/encoding

The encoding module provides [base64](https://en.wikipedia.org/wiki/Base64)
encoding/decoding as defined by [RFC4648](https://tools.ietf.org/html/rfc4648).

| Function                                                                                                                | Description             |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [b64decode(input, [encoding], [format])](http://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-encoding/b64decode/) | Base64 decode a string. |
| [b64encode(input, [encoding])](http://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-encoding/b64encode/)           | Base64 encode a string. |

## k6/execution

`k6/execution` provides the capability to get information about the current test execution state inside the test script. You can read in your script the execution state during the test execution and change your script logic based on the current state.

The `k6/execution` module provides the test execution information with the following properties:

- [instance](#instance)
- [scenario](#scenario)
- [test](#test)
- [vu](#vu)

#### instance

The instance object provides information associated with the load generator instance. You can think of it as the current running k6 process, which will likely be a single process if you are running k6 on your local machine. When running a cloud/distributed test with multiple load generator instances, the values of the following properties can differ across instances.

| Property               | Type    | Description                                                               |
| ---------------------- | ------- | ------------------------------------------------------------------------- |
| iterationsInterrupted  | integer | The number of prematurely interrupted iterations in the current instance. |
| iterationsCompleted    | integer | The number of completed iterations in the current instance.               |
| vusActive              | integer | The number of active VUs.                                                 |
| vusInitialized         | integer | The number of currently initialized VUs.                                  |
| currentTestRunDuration | float   | The time passed from the start of the current test run in milliseconds.   |

#### scenario

Meta information and execution details about the current running [scenario](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios).

| Property            | Type    | Description                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                | string  | The assigned name of the running scenario.                                                                                                                                                                                                                                                                                                                                           |
| executor            | string  | The name of the running [Executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios#executors) type.                                                                                                                                                                                                                                                                      |
| startTime           | integer | The Unix timestamp in milliseconds when the scenario started.                                                                                                                                                                                                                                                                                                                        |
| progress            | float   | Percentage in a 0 to 1 interval of the scenario progress.                                                                                                                                                                                                                                                                                                                            |
| iterationInInstance | integer | The unique and zero-based sequential number of the current iteration in the scenario, across the current instance.                                                                                                                                                                                                                                                                   |
| iterationInTest     | integer | The unique and zero-based sequential number of the current iteration in the scenario. It is unique in all k6 execution modes - in local, cloud and distributed/segmented test runs. However, while every instance will get non-overlapping index values in cloud/distributed tests, they might iterate over them at different speeds, so the values won't be sequential across them. |

#### test

Control the test execution.

| Property        | Type     | Description                                                                                                                                                                                                                                                                                                                                              |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| abort([String]) | function | It aborts the test run with the exit code `108`, and an optional string parameter can provide an error message. Aborting the test will not prevent the `teardown()` execution.                                                                                                                                                                           |
| options         | Object   | It returns an object with all the test options as properties. The options' values are consolidated following the [order of precedence](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to#order-of-precedence) and derived if shortcuts have been used. It returns `null` for properties where the relative option hasn't been defined. |

#### vu

Meta information and execution details about the current vu.

| Property            | Type    | Description                                                                                                                                                                                                                        |
| ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iterationInInstance | integer | The identifier of the iteration in the current instance for this VU. This is only unique for current VU and this instance (if multiple instances). This keeps being aggregated if a given VU is reused between multiple scenarios. |
| iterationInScenario | integer | The identifier of the iteration in the current scenario for this VU. This is only unique for current VU and scenario it is currently executing.                                                                                    |
| idInInstance        | integer | The identifier of the VU across the instance. Not unique across multiple instances.                                                                                                                                                |
| idInTest            | integer | The globally unique (across the whole test run) identifier of the VU.                                                                                                                                                              |

## k6/experimental

| Modules                                                                                          | Description                                                                                                              |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| [browser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser)       | Provides browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests. |
| [redis](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis)           | Functionality to interact with [Redis](https://redis.io/).                                                               |
| [timers](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/timers)         | `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`                                                             |
| [tracing](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing)       | Support for instrumenting HTTP requests with tracing information.                                                        |
| [webcrypto](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto)   | Implements the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).                         |
| [websockets](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets) | Implements the browser's [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).                    |
| [grpc](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc)             | Extends `k6/net/grpc` with the streaming capabilities.                                                                   |
| [fs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs)                 | Provides a memory-efficient way to handle file interactions within your test scripts.                                    |

## k6/html

The k6/html module contains functionality for HTML parsing.

| Function                                                                                    | Description                                                                                                                        |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [parseHTML(src)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/parsehtml) | Parse an HTML string and populate a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) object. |

| Class                                                                                  | Description                                                                                                                        |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Element](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/element)     | An HTML DOM element as returned by the [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) API. |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | A jQuery-like API for accessing HTML DOM elements.                                                                                 |

## k6/http

The k6/http module contains functionality for performing HTTP transactions.

| Function                                                                                                                       | Description                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [batch( requests )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/batch)                                     | Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).                                                                 |
| [cookieJar()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar)                                       | Get active HTTP Cookie jar.                                                                                                               |
| [del( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/del)                            | Issue an HTTP DELETE request.                                                                                                             |
| [file( data, [filename], [contentType] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/file)                | Create a file object that is used for building multi-part requests.                                                                       |
| [get( url, [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/get)                                    | Issue an HTTP GET request.                                                                                                                |
| [head( url, [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head)                                  | Issue an HTTP HEAD request.                                                                                                               |
| [options( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/options)                    | Issue an HTTP OPTIONS request.                                                                                                            |
| [patch( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/patch)                        | Issue an HTTP PATCH request.                                                                                                              |
| [post( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post)                          | Issue an HTTP POST request.                                                                                                               |
| [put( url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/put)                            | Issue an HTTP PUT request.                                                                                                                |
| [request( method, url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/request)            | Issue any type of HTTP request.                                                                                                           |
| [asyncRequest( method, url, [body], [params] )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/asyncrequest)  | Issue any type of HTTP request asynchronously.                                                                                            |
| [setResponseCallback(expectedStatuses)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/set-response-callback) | Sets a response callback to mark responses as expected.                                                                                   |
| [url\`url\`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url)                                              | Creates a URL with a name tag. Read more on [URL Grouping](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests#url-grouping). |
| [expectedStatuses( statusCodes )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/expected-statuses)           | Create a callback for setResponseCallback that checks status codes.                                                                       |

| Class                                                                                  | Description                                                                              |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [CookieJar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) | Used for storing cookies, set by the server and/or added by the client.                  |
| [FileData](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/filedata)   | Used for wrapping data representing a file when doing multipart requests (file uploads). |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params)       | Used for setting various HTTP request-specific parameters such as headers, cookies, etc. |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response)   | Returned by the http.\* methods that generate HTTP requests.                             |

## k6/metrics

The metrics module provides functionality to [create custom metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics) of various types.
All metrics (both the [built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference) and the custom ones) have a type.

You can optionally [tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) all values added to a custom metric, which can be useful when analysing the test results.

| Metric type                                                                           | Description                                                                                   |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [Counter](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/counter) | A metric that cumulatively sums added values.                                                 |
| [Gauge](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/gauge)     | A metric that stores the min, max and last values added to it.                                |
| [Rate](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/rate)       | A metric that tracks the percentage of added values that are non-zero.                        |
| [Trend](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/trend)     | A metric that calculates statistics on the added values (min, max, average, and percentiles). |

## k6/net/grpc

The `k6/net/grpc` module provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2.

| Class/Method                                                                                                                      | Description                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client)                                              | gRPC client used for making RPC calls to a gRPC Server.                                                                                                 |
| [Client.load(importPaths, ...protoFiles)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-load) | Loads and parses the given protocol buffer definitions to be made available for RPC requests.                                                           |
| [Client.connect(address [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-connect)    | Connects to a given gRPC service.                                                                                                                       |
| [Client.invoke(url, request [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-invoke) | Makes an unary RPC for the given service/method and returns a [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response). |
| [Client.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-close)                         | Close the connection to the gRPC service.                                                                                                               |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/params)                                              | RPC Request specific options.                                                                                                                           |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response)                                          | Returned by RPC requests.                                                                                                                               |
| [Constants](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/constants)                                        | Define constants to distinguish between [gRPC Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response) statuses.         |

## k6/ws

The ws module provides a [WebSocket](https://en.wikipedia.org/wiki/WebSocket) client implementing the [WebSocket protocol](http://www.rfc-editor.org/rfc/rfc6455.txt).

| Function                                                                                                  | Description                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [connect( url, params, callback )](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/connect) | Create a WebSocket connection, and provides a [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket) client to interact with the service. The method blocks the test finalization until the connection is closed. |

| Class/Method                                                                                                                      | Description                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/params)                                                    | Used for setting various WebSocket connection parameters such as headers, cookie jar, compression, etc.                                                                        |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket)                                                    | WebSocket client used to interact with a WS connection.                                                                                                                        |
| [Socket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-close)                               | Close the WebSocket connection.                                                                                                                                                |
| [Socket.on(event, callback)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-on)                      | Set up an event listener on the connection for any of the following events:<br />- open<br />- binaryMessage<br />- message<br />- ping<br />- pong<br />- close<br />- error. |
| [Socket.ping()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-ping)                                 | Send a ping.                                                                                                                                                                   |
| [Socket.send(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-send)                             | Send string data.                                                                                                                                                              |
| [Socket.sendBinary(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-sendbinary)                 | Send binary data.                                                                                                                                                              |
| [Socket.setInterval(callback, interval)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-setinterval) | Call a function repeatedly at certain intervals, while the connection is open.                                                                                                 |
| [Socket.setTimeout(callback, period)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-settimeout)     | Call a function with a delay, if the connection is open.                                                                                                                       |

## Error codes

The following specific error codes are currently defined:

- 1000: A generic error that isn't any of the ones listed below.
- 1010: A non-TCP network error - this is a place holder there is no error currently known to trigger it.
- 1020: An invalid URL was specified.
- 1050: The HTTP request has timed out.
- 1100: A generic DNS error that isn't any of the ones listed below.
- 1101: No IP for the provided host was found.
- 1110: Blacklisted IP was resolved or a connection to such was tried to be established.
- 1111: Blacklisted hostname using The [Block Hostnames](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#block-hostnames) option.
- 1200: A generic TCP error that isn't any of the ones listed below.
- 1201: A "broken pipe" on write - the other side has likely closed the connection.
- 1202: An unknown TCP error - We got an error that we don't recognize but it is from the operating system and has `errno` set on it. The message in `error` includes the operation(write,read) and the errno, the OS, and the original message of the error.
- 1210: General TCP dial error.
- 1211: Dial timeout error - the timeout for the dial was reached.
- 1212: Dial connection refused - the connection was refused by the other party on dial.
- 1213: Dial unknown error.
- 1220: Reset by peer - the connection was reset by the other party, most likely a server.
- 1300: General TLS error
- 1310: Unknown authority - the certificate issuer is unknown.
- 1311: The certificate doesn't match the hostname.
- 1400 to 1499: error codes that correspond to the [HTTP 4xx status codes for client errors](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_client_errors)
- 1500 to 1599: error codes that correspond to the [HTTP 5xx status codes for server errors](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_server_errors)
- 1600: A generic HTTP/2 error that isn't any of the ones listed below.
- 1610: A general HTTP/2 GoAway error.
- 1611 to 1629: HTTP/2 GoAway errors with the value of the specific [HTTP/2 error code](https://tools.ietf.org/html/rfc7540#section-7) added to 1611.
- 1630: A general HTTP/2 stream error.
- 1631 to 1649: HTTP/2 stream errors with the value of the specific [HTTP/2 error code](https://tools.ietf.org/html/rfc7540#section-7) added to 1631.
- 1650: A general HTTP/2 connection error.
- 1651 to 1669: HTTP/2 connection errors with the value of the specific [HTTP/2 error code](https://tools.ietf.org/html/rfc7540#section-7) added to 1651.
- 1701: Decompression error.

Read more about [Error codes](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/error-codes).
