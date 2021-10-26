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
-  Encode the [`blacklistIPs` option](https://k6.io/docs/using-k6/options/#blacklist-ips) using the CIDR notation in JSON. [#2083](https://github.com/grafana/k6/pull/2083)
-  `ext.loadimpact` option has the same precedence as the script configuration during the consolidation process. [#2099](https://github.com/grafana/k6/pull/2099)
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

## v0.32.0

`2021-5-12`

**Features and enhancements**
- Move out of Bintray.
- Move all outputs to new Output interface introduced in v0.31.0 and other related changes.
- Full stack traces for init context and setup/teardown exceptions ([#1971](https://github.com/k6io/k6/pull/1971)).
- Considerable performance improvements for arrival rate executors ([#1955](https://github.com/k6io/k6/pull/1955)).
- Updating the majority of our dependencies and sunsetting some.
- `ArrayBuffer` is now supported in all JS APIs dealing with binary data, including in WebSocket messages ([#1841](https://github.com/k6io/k6/pull/1841)).
- Official arm64 releases for macOS and Linux ([#2000](https://github.com/k6io/k6/pull/2000))

**Breaking changes**
- Support for `ArrayBuffer` in all k6 JS APIs ([#1841](https://github.com/k6io/k6/pull/1841))
- Deprecating official 32-bit binary releases ([#2000](https://github.com/k6io/k6/pull/2000))
- Moved repo and renamed k6 Go module paths to `go.k6.io/k6` ([#2010](https://github.com/k6io/k6/pull/2010))
- New `.deb` and `.rpm` repositories, now located at [dl.k6.io](https://dl.k6.io/), use the updated [installation instructions](https://k6.io/docs/getting-started/installation/) to transition to them.

**Bug fixes**
- Arrival-rate executors could in some cases report twice as many used VUs than what was actually true. ([#1954](https://github.com/k6io/k6/issues/1954) fixed by [#1955](https://github.com/k6io/k6/pull/1955)).
- In cases of an error while reading the response body, the newly added `responseCallback` in v0.31.0 would be evaluated with the returned status code, while the reported one would be `0`, as the response errored out and k6 does not return incomplete responses. Now `responseCallback` will also receive a `0` status ([#1962](https://github.com/k6io/k6/pull/1962)).
- Fix Kafka output not being usable with the InfluxDB format after v0.31.0 changes ([#1914](https://github.com/k6io/k6/pull/1914)).
- Error out with a user friendly message if `ramping-vus` executor would've not run a single iteration instead of just doing nothing ([#1942](https://github.com/k6io/k6/pull/1942)).


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
- Execution: Aborting a test during VU initialization (e.g. with `^C`) will now properly propagate to any used outputs ([#1869](https://github.com/loadimpact/k6/pull/1869)).
- Execution: A race condition between the Engine and the outputs' finalization code was fixed, ensuring that all metrics are properly emitted before exiting ([#1869](https://github.com/loadimpact/k6/pull/1869)).
- Execution: Another race condition in the Engine was fixed, which may have resulted in the end-of-test summary missing some of the last test metric data ([#1888](https://github.com/loadimpact/k6/pull/1888)).
- Cloud: the test name is now properly validated and will raise an error if not set via the `ext.loadimpact.name` JS option or config, or the `K6_CLOUD_NAME` environment variable ([#1870](https://github.com/loadimpact/k6/pull/1870)).
- JS: Babel is now also run on compilation errors, which improves support of some obscure language features ([#1861](https://github.com/loadimpact/k6/pull/1861)).
- JS: `SharedArray` introduced in v0.30.0 can now be iterated with [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) ([#1848](https://github.com/loadimpact/k6/pull/1848)).

## v0.30.0

`2021-9-9`

**Features and enhancements**

**Breaking changes**

**Bug fixes**

## v0.29.0

`2021-9-9`

**Features and enhancements**

**Breaking changes**

**Bug fixes**

## v0.28.0

`2021-9-9`

**Features and enhancements**

**Breaking changes**

**Bug fixes**


## v0.27.1

`2021-9-9`

**Features and enhancements**

**Breaking changes**

**Bug fixes**

## v0.27.0

`2021-9-9`

**Features and enhancements**

**Breaking changes**

**Bug fixes**


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