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

## v0.32.0

## v0.31.1

## v0.31.0

## v0.30.0

## v0.29.0

## v0.28.0

## v0.27.1

## v0.27.0

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