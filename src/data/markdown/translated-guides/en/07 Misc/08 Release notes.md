---
title: Release notes
excerpt: 'On this page, you can find detailed notes that list everything included in every k6 release.'
---


## v0.34.1

`2021-9-16`

**Bug fixes**

- Some [`k6/execution`](/javascript-api/k6-execution/) properties weren't usable with the externally-controlled executor. [#2132](https://github.com/grafana/k6/pull/2132)
- Rest parameters were undefined when the functions also had an internal lambda. [#2131](https://github.com/grafana/k6/issues/2131)
- `Response.json()` to not have a `length` property when the response was a JSON array. [#2133](https://github.com/grafana/k6/issues/2133)

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.34.1) for details.

## v0.34.0

`2021-9-9`

**Features and enhancements**

- Add [`k6/execution`](/javascre) API to get test execution information in your k6 scripts.
- Warn Windows users on importing dependencies or opening files as absolute paths. [#2078](https://github.com/grafana/k6/pull/2078)
- Pass setup data object into `handleSummary` callback. [#2103](https://github.com/grafana/k6/pull/2103)

**Breaking changes**

- The deprecated outputs Datadog and Kafka have been removed. [#2081](https://github.com/grafana/k6/pull/2081)

**Bug fixes**

- Use the `POST` HTTP request method instead of `GET` for pushing logs to Loki. [#2100](https://github.com/grafana/k6/pull/2100)
- Encode the [`blacklistIPs` option](https://k6.io/docs/using-k6/options/#blacklist-ips) using the CIDR notation in JSON. [#2083](https://github.com/grafana/k6/pull/2083)
- `ext.loadimpact` option has the same precedence as the script configuration during the consolidation process. [#2099](https://github.com/grafana/k6/pull/2099)
- The WebSocket connection used for tailing logs from the k6 Cloud is reestablished in the case of an unexpected error. [#2090](https://github.com/grafana/k6/pull/2090).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.34.0) for details.

## v0.33.0

`2021-6-29`

**Features and enhancements**
- The `--verbose` help message and the statsd warning message were improved ([#2005](https://github.com/k6io/k6/pull/2005)).
- The `noColor` k6 option and the current UI state are now propagated to the [`handleSummary()` function](https://k6.io/docs/results-visualization/end-of-test-summary/#handlesummary-callback). The `state` object has the `isStdErrTTY`, `isStdOutTTY` and `testRunDurationMs` keys ([#1975](https://github.com/k6io/k6/pull/1975)).
- The error message when an HTTP request times out was improved (previously it was `context deadline exceeded`) and it now has an `error_code` value of `1050` ([#2008](https://github.com/k6io/k6/pull/2008)). 
- Script errors will no longer have the confusing `GoError` prefix in their error messages ([#1775](https://github.com/k6io/k6/pull/1775)).
- All [custom metric objects](https://k6.io/docs/javascript-api/k6-metrics/) now have a `name` property ([#2058](https://github.com/k6io/k6/pull/2058) and [#2076](https://github.com/k6io/k6/pull/2076)). 
- Top-level JS arrays will now be properly encoded when sent in the body of a `application/x-www-form-urlencoded` request ([#2060](https://github.com/k6io/k6/pull/2060)). 

**Breaking changes**
- The `k6 cloud` exit code for a failed cloud test was changed from `99` to `97` ([#2046](https://github.com/k6io/k6/pull/2046)).
- The default value of `K6_STATSD_TAG_BLOCKLIST` and `K6_DATADOG_TAG_BLACKLIST` is now `vu,iter,url` ([#2063](https://github.com/k6io/k6/pull/2063)).
- The `__ITER` execution context variable is no longer set in `setup()` and `teardown()` due to [#1863](https://github.com/k6io/k6/pull/1863). This might be better classified as removing a previously undefined behavior instead of a breaking change, but it's still worth mentioning.

**Bug fixes**
- The [`minIterationDuration`](https://k6.io/docs/using-k6/options/#minimum-iteration-duration) option was uninterruptible and could delay the stopping of a scenario even after `gracefulStop` had expired. ([#2035](https://github.com/k6io/k6/pull/2035)).
- The `error_code` detection for HTTP/2, x509 and TLS (and potentially others) was unreliable ([#2025](https://github.com/k6io/k6/pull/2025)).
- k6 used to panic when `responseType` was `binary`, but there was no response body actually returned, e.g. when there was an HTTP error ([#2041](https://github.com/k6io/k6/pull/2041)).
- The [`throw` option](https://k6.io/docs/using-k6/options/#throw) was not respected when there was an invalid URL ([#2045](https://github.com/k6io/k6/pull/2045)).
- k6 would return an exit code of `103` instead of `107` for script errors when initializing non-service VUs ([#2046](https://github.com/k6io/k6/pull/2046)).
- Deleted library versions from cdnjs could previously cause a panic ([#2047](https://github.com/k6io/k6/pull/2047)).
- The correct error message for missing files was not shown when the filename contained spaces ([#1973](https://github.com/k6io/k6/pull/1973)).
- The regular expressions for the `github` and `cdnjs` "magic" loaders were slightly wrong ([#2066](https://github.com/k6io/k6/pull/2066)).
- A potential (harmless) data race could have been caused by an unintentional copying of a data struct ([#2067](https://github.com/k6io/k6/pull/2067)).
- The segmentation of small `ramping-arrival-rate` scenarios was not optimal ([#1863](https://github.com/k6io/k6/pull/1863#discussion_r655352623)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.33.0) for details.

## v0.32.0

`2021-5-12`

**Features and enhancements**
- Move out of Bintray.
- Move all outputs to new Output interface introduced in v0.31.0 and other related changes.
- Full stack traces for init context and setup/teardown exceptions ([#1971](https://github.com/k6io/k6/pull/1971)).
- Considerable performance improvements for arrival rate executors ([#1955](https://github.com/k6io/k6/pull/1955)).
- Updating the majority of our dependencies and sunsetting some.
- `ArrayBuffer` is now supported in all JS APIs dealing with binary data, including in WebSocket messages ([#1841](https://github.com/k6io/k6/pull/1841)).
- Official arm64 releases for macOS and Linux ([#2000](https://github.com/k6io/k6/pull/2000)).

**Breaking changes**
- Support for `ArrayBuffer` in all k6 JS APIs ([#1841](https://github.com/k6io/k6/pull/1841)).
- Deprecating official 32-bit binary releases ([#2000](https://github.com/k6io/k6/pull/2000)).
- Moved repo and renamed k6 Go module paths to `go.k6.io/k6` ([#2010](https://github.com/k6io/k6/pull/2010)).
- New `.deb` and `.rpm` repositories, now located at [dl.k6.io](https://dl.k6.io/), use the updated [installation instructions](https://k6.io/docs/getting-started/installation/) to transition to them.

**Bug fixes**
- Arrival-rate executors could in some cases report twice as many used VUs than what was actually true. ([#1954](https://github.com/k6io/k6/issues/1954) fixed by [#1955](https://github.com/k6io/k6/pull/1955)).
- In cases of an error while reading the response body, the newly added `responseCallback` in v0.31.0 would be evaluated with the returned status code, while the reported one would be `0`, as the response errored out and k6 does not return incomplete responses. Now `responseCallback` will also receive a `0` status ([#1962](https://github.com/k6io/k6/pull/1962)).
- Fix Kafka output not being usable with the InfluxDB format after v0.31.0 changes ([#1914](https://github.com/k6io/k6/pull/1914)).
- Error out with a user friendly message if `ramping-vus` executor would've not run a single iteration instead of just doing nothing ([#1942](https://github.com/k6io/k6/pull/1942)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.32.0) for details.

## v0.31.1

`2021-3-17`

**Bug fixes**
- Due to additional state being used for its transport to the k6 cloud, and a misunderstanding of what a functional call from a library dependency does, the `http_req_failed` values were always set to `1`. This did not affect any other output or the end of test summary. ([#1908](https://github.com/loadimpact/k6/issues/1908))

## v0.31.0

`2021-3-11`

**Features and enhancements**
- Output cleanup and extensions ([#1874](https://github.com/loadimpact/k6/pull/1874))
- Marking requests as failed ([#1856](https://github.com/loadimpact/k6/pull/1856))

**Bug fixes**
- Aborting a test during VU initialization (e.g. with `^C`) will now properly propagate to any used outputs ([#1869](https://github.com/loadimpact/k6/pull/1869)).
- A race condition between the Engine and the outputs' finalization code was fixed, ensuring that all metrics are properly emitted before exiting ([#1869](https://github.com/loadimpact/k6/pull/1869)).
- Another race condition in the Engine was fixed, which may have resulted in the end-of-test summary missing some of the last test metric data ([#1888](https://github.com/loadimpact/k6/pull/1888)).
- The test name is now properly validated and will raise an error if not set via the `ext.loadimpact.name` JS option or config, or the `K6_CLOUD_NAME` environment variable ([#1870](https://github.com/loadimpact/k6/pull/1870)).
- Babel is now also run on compilation errors, which improves support of some obscure language features ([#1861](https://github.com/loadimpact/k6/pull/1861)).
- `SharedArray` introduced in v0.30.0 can now be iterated with [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) ([#1848](https://github.com/loadimpact/k6/pull/1848)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.31.0) for details.

## v0.30.0

`2021-1-20`

**Features and enhancements**
- Share memory between VUs using read-only arrays ([#1739](https://github.com/loadimpact/k6/pull/1739)).
- Support a `handleSummary()` callback at the end of the test ([#1768](https://github.com/loadimpact/k6/pull/1768)).
- 

**Breaking changes**
- `--no-summary` now also disables `--summary-export` ([#1768](https://github.com/loadimpact/k6/pull/1768)). You can recreate the previous behavior of `k6 run --no-summary --summary-export=summary.json script.js` by having an empty exported `handleSummary()` function in your script (so that the default text summary is not shown by k6) and executing only `k6 run --summary-export=summary.json script.js`. Or omitting `--summary-export` as well and using `handleSummary()` as shown above.
- Integer values for `duration` and similar time values in the exported script `options` and environment variables are now treated as milliseconds. This was previously undefined behavior, but instead of k6 erroring out, it silently accepted and treated such values as nanoseconds ([#1738](https://github.com/loadimpact/k6/pull/1738)).
- Added `WORKDIR /home/k6` to our official `Dockerfile` ([#1794](https://github.com/loadimpact/k6/pull/1794)).

**Bug fixes**
- Updated the `golang.org/x/crypto` and `golang.org/x/net` dependencies, which should have resolved some corner case issues with HTTP/2 connections, since k6 depends on `golang.org/x/net/http2` ([#1734](https://github.com/loadimpact/k6/pull/1734)).
- Fixed issues with `blockHostnames` that prevented zero-length matches for wildcards, as well as the explicit blocking of a domain and its sub-domain at the same time ([#1723](https://github.com/loadimpact/k6/pull/1723)).
- If logs are streamed to a loki instance, k6 will now wait for them to finish being pushed before it exits - this will specifically mean that logs and errors in the init context will be propagated ([#1694](https://github.com/loadimpact/k6/pull/1694)).
- Fixed the missing `host` value from [`http.Response.request.headers`](https://k6.io/docs/javascript-api/k6-http/response) when it was explicitly set in the HTTP request params ([#1744](https://github.com/loadimpact/k6/pull/1744)).
- Fixed the lack of newline after `k6 login` password inputs ([#1749](https://github.com/loadimpact/k6/pull/1749)).
- Fixed a panic in the [`html.Selection.slice()`](https://k6.io/docs/javascript-api/k6-html/selection/selection-slice-start-end) method ([#1756](https://github.com/loadimpact/k6/pull/1756)).
- Fixed random ordering of groups and checks in the end-of-test summary, they should now be shown in the order of their occurrence ([#1788](https://github.com/loadimpact/k6/pull/1788)).
- The value for `Rate` metrics in the `--summary-export` JSON file was was always `0`, regardless of the `pass/(pass+fail)` ratio ([#1768](https://github.com/loadimpact/k6/pull/1768)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.30.0) for details.

## v0.29.0

`2020-11-11`

**Features and enhancements**
- Initial support for gRPC ([#1623](https://github.com/loadimpact/k6/pull/1623)).
- New options for configuring DNS resolution ([#1612](https://github.com/loadimpact/k6/pull/1612)).
- Support for Go extensions ([#1688](https://github.com/loadimpact/k6/pull/1688)).
- Support for setting local IPs, potentially from multiple NICs ([#1682](https://github.com/loadimpact/k6/pull/1682)).
- New option for blocking hostnames ([#1666](https://github.com/loadimpact/k6/pull/1666)).

**Breaking changes**
-  DNS resolution defaults were changed. If you want to use the old k6 behavior of always picking the first IP, no IPv4 preference, and caching DNS responses indefinitely, run k6 with `--dns="ttl=inf,select=first,policy=any"`.

**Bug fixes**
- [goja](https://github.com/dop251/goja), the JS runtime k6 uses, was updated to its latest version, to fix some issues with regular expressions after its previous update ([#1707](https://github.com/loadimpact/k6/pull/1707)).
- Prevent loops with `--compatibility-mode=extended` when Babel can transpile the code but goja can't parse it ([#1651](https://github.com/loadimpact/k6/pull/1651)).
- Fixed a bug that rarely caused a `context canceled` error message to be shown ([#1677](https://github.com/loadimpact/k6/pull/1677)).
- Setting an empty `userAgent` option caused k6 to revert to the default Go `User-Agent` header value of `Go-http-client`. Now something like `--user-agent=''` will cause k6 to not send the `User-Agent` header at all ([#1695](https://github.com/loadimpact/k6/pull/1695)).
- `k6 cloud -q` is now fixed to be similar to the `k6 run -q` behavior, but if the old behavior was wanted, something close to it can be recreated by using `k6 cloud --exit-on-running` ([#1702](https://github.com/loadimpact/k6/pull/1702)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.29.0) for details.

## v0.28.0

`2020-9-21`

**Features and enhancements**
- Cloud execution logs ([#1599](https://github.com/loadimpact/k6/pull/1599)).
- Pushing k6 logs to loki ([#1576](https://github.com/loadimpact/k6/pull/1576)).
- Optional port to host mappings ([#1489](https://github.com/loadimpact/k6/pull/1489)).
- Support for specifying data types to InfluxDB fields ([#1395](https://github.com/loadimpact/k6/pull/1395)).
-  Support for automatic gzip-ing of the CSV output result ([#1566](https://github.com/loadimpact/k6/pull/1566)).

**Breaking changes**
- `k6 cloud` will now proxy execution logs back to the client machine. To disable this behavior, use `k6 cloud --show-logs=false`.
- `--http-debug` request and response dumps are now emitted through the logging sub-system, to facilitate the cloud log proxying ([#1577](https://github.com/loadimpact/k6/pull/1577)).

**Bug fixes**
Network: IPv6 support was fixed as a part of the new `hosts` port mapping ([#1489](https://github.com/loadimpact/k6/pull/1489)).
- Metrics: Fixed the wrong `name` metric tag for redirected requests ([#1474](https://github.com/loadimpact/k6/issues/1474)).
- UI: Fixed a `divide by zero` panic caused by some unusual execution environments that present a TTY, but return `0` for the terminal size ([#1581](https://github.com/loadimpact/k6/pull/1581)).
- Config: Fixed the parsing of `K6_DATADOG_TAG_BLACKLIST` ([#1602](https://github.com/loadimpact/k6/issues/1602)).
- Config: Fixed marshaling of `tlsCipherSuites` and `tlsVersion` ([#1603](https://github.com/loadimpact/k6/pull/1603)).
- WebSockets: Fixed a `ws.SetTimeout()` and `ws.SetInterval()` panic when float values were passed ([#1608](https://github.com/loadimpact/k6/pull/1608)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.28.0) for details.

## v0.27.1

`2020-7-30`

**Bug fixes**
- Resolving a panic (and some `k6 login` errors) when k6 was ran through git bash / Mintty on Windows ([#1559](https://github.com/loadimpact/k6/issues/1559)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.27.1) for details.

## v0.27.0

`2020-7-14`

**Features and enhancements**
- New execution engine ([#1007](https://github.com/loadimpact/k6/pull/1007)).

**Breaking changes**
- Execution config options (`scenarios`, `stages`, `iterations`, `duration`) from "upper" config layers overwrite execution options from "lower" (i.e. CLI flags > environment variables > JS options > JSON options) config layers. 
- Previously, if the `iterations` and `vus` script options were specified, but `duration` was not, the script could have ran practically indefinitely. From k6 v0.27.0, by default, if the specified iterations haven't finished, these scripts will abort after 10 minutes. 
- Previously, all iterations were interruptible. Now all executors besides the `externally-controlled` one have a `gracefulStop` period of `30s` by default ([#898](https://github.com/loadimpact/k6/issues/898)). Additionally, the `ramping-vus` executor has a `gracefulRampDown` parameter that configures the ramp-down grace period.
- Using different execution config options on the same level is now a configuration conflict error and will abort the script.([#812](https://github.com/loadimpact/k6/issues/812) & [#1058](https://github.com/loadimpact/k6/issues/1058)).
- The k6 REST API for controlling script execution (i.e. the `k6 pause`, `k6 scale` commands) now only works when a `externally-controlled` executor is configured in the `scenarios` config. 
- Previously, running a script with `k6 run --paused script.js` would have still executed the script's `setup()` function (if it was present and wasn't explicitly disabled with `--no-setup`) and paused immediately after. Now, k6 will pause before it executes `setup()`.
- Previously, if you ramped down and ramped up VUs via `stages`, the `__VU` global variables would have been incremented on the ramp-ups. Now the max value of `__VU` across a test run will never exceed the number of initialized VUs.
- The `vusMax` / `K6_VUS_MAX` / ` -m` / `--max` option is deprecated.
- Tests with infinite duration are now only possible via the `externally-controlled` executor.
- k6 will now exit with an error if `--address` is specified but the API server is unable to start. Previously this would've resulted in a warning message.
- The format returned by `Date.prototype.toUTCString()` was changed from `Thu Jan 01 1970 00:00:00 GMT+0000 (UTC)` to `Thu, 01 Jan 1970 00:00:00 GMT`, aligned with the ECMAScript spec.
- The default `setupTimeout` and `teardownTimeout` values were changed from 10s to 60s ([#1356](https://github.com/loadimpact/k6/pull/1356)).

**Bug fixes**
- Stop `--http-debug` from exiting k6 on request dump error ([#1402](https://github.com/loadimpact/k6/issues/1402)).
- JSON output is now less noisy ([#1469](https://github.com/loadimpact/k6/issues/1469)).
- k6 doesn't exit when using `iterations` with `stages` ([#812](https://github.com/loadimpact/k6/issues/812)).
- Mismatch in check counts in the end-of-test summary ([#1033](https://github.com/loadimpact/k6/issues/1033)).
- Better validation of `stages` ([#875](https://github.com/loadimpact/k6/issues/875)).
- Rare panics in goja ([#867](https://github.com/loadimpact/k6/issues/867),[#1552](https://github.com/loadimpact/k6/issues/1552)).
- Fix request timeout and wrong context used for pushing metrics ([#1260](https://github.com/loadimpact/k6/issues/1260)).
- Fix sometimes skipping iterations with a `context cancelled` error when rapidly ramping up and down ([#1283](https://github.com/loadimpact/k6/issues/1283)).
- Fix possible connection hanging when the main context is cancelled ([#1260](https://github.com/loadimpact/k6/issues/1542)).
- Avoid leaking goroutines ([#1513](https://github.com/loadimpact/k6/issues/1513)).
- Emit WS metrics as soon as possible instead of when the connection is closed ([#885](https://github.com/loadimpact/k6/issues/885)).

See the [full GitHub release notes](https://github.com/grafana/k6/releases/tag/v0.27.0) for details.

## Older releases

<Glossary>

- [v0.26.2](https://github.com/grafana/k6/releases/tag/v0.26.2)
- [v0.26.1](https://github.com/grafana/k6/releases/tag/v0.26.1) 
- [v0.26.0](https://github.com/grafana/k6/releases/tag/v0.26.0)
- [v0.25.1](https://github.com/grafana/k6/releases/tag/v0.25.1)
- [v0.25.0](https://github.com/grafana/k6/releases/tag/v0.25.0)
- [v0.24.0](https://github.com/grafana/k6/releases/tag/v0.24.0)
- [v0.23.1](https://github.com/grafana/k6/releases/tag/v0.23.1)
- [v0.23.0](https://github.com/grafana/k6/releases/tag/v0.23.0)
- [v0.22.1](https://github.com/grafana/k6/releases/tag/v0.22.1)
- [v0.22.0](https://github.com/grafana/k6/releases/tag/v0.22.0)
- [v0.21.1](https://github.com/grafana/k6/releases/tag/v0.21.1)
- [v0.21.0](https://github.com/grafana/k6/releases/tag/v0.21.0)
- [v0.20.0](https://github.com/grafana/k6/releases/tag/v0.20.0)
- [v0.19.0](https://github.com/grafana/k6/releases/tag/v0.19.0)
- [v0.18.2](https://github.com/grafana/k6/releases/tag/v0.18.2)
- [v0.18.0](https://github.com/grafana/k6/releases/tag/v0.18.0)
- [v0.17.2](https://github.com/grafana/k6/releases/tag/v0.17.2)
- [v0.17.1](https://github.com/grafana/k6/releases/tag/v0.17.1)
- [v0.17.0](https://github.com/grafana/k6/releases/tag/v0.17.0)
- [v0.16.0](https://github.com/grafana/k6/releases/tag/v0.16.0)
- [v0.15.0](https://github.com/grafana/k6/releases/tag/v0.15.0)
- [v0.14.0](https://github.com/grafana/k6/releases/tag/v0.14.0)
- [v0.13.0](https://github.com/grafana/k6/releases/tag/v0.13.0)
- [v0.12.2](https://github.com/grafana/k6/releases/tag/v0.12.2)
- [v0.11.0](https://github.com/grafana/k6/releases/tag/v0.11.0)
- [v0.6.0](https://github.com/grafana/k6/releases/tag/v0.6.0)

</Glossary>