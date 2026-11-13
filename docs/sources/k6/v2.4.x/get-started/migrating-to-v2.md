---
title: 'Migrate to k6 v2'
description: 'A guide covering all breaking changes in k6 v2 and how to update your scripts, extensions, and configuration.'
weight: 06
---

# Migrate to k6 v2

This page covers all breaking changes introduced in k6 v2 and the steps to update your scripts, extensions, and configuration.

## Go module path changed to `go.k6.io/k6/v2`

The k6 Go module path has changed from `go.k6.io/k6` to `go.k6.io/k6/v2`.

If you maintain a k6 extension, update all import paths in your Go code:

```go
// Before
import "go.k6.io/k6/js/modules"

// After
import "go.k6.io/k6/v2/js/modules"
```

Update your `go.mod` file and run `go mod tidy` after changing the import paths.

## Removed CLI commands: `k6 pause`, `k6 resume`, `k6 scale`, `k6 status`

The `pause`, `resume`, `scale`, and `status` top-level CLI commands have been removed. There is no replacement — these commands relied on the `externally-controlled` executor, which has also been removed.

## Removed `externally-controlled` executor

The `externally-controlled` executor has been removed. There is no replacement. Any test script with `executor: externally-controlled` will fail to start. Migrate to a different [executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/) based on the desired load profile, for example `ramping-vus`, `constant-vus`, or `constant-arrival-rate`.

## Removed CLI command: `k6 login`

The top-level `k6 login` command and its subcommands have been removed:

- Replace `k6 login cloud` with `k6 cloud login`. Running it without arguments prompts you interactively for your token and stack:

  ```bash
  k6 cloud login
  ```

- `k6 login influxdb` has no replacement command. Configure the InfluxDB output directly using environment variables instead:

  ```bash
  K6_INFLUXDB_ADDR=http://localhost:8086 k6 run --out influxdb script.js
  ```

## Stack is now required for all `k6 cloud` commands

A Grafana Cloud stack must be provided for all `k6 cloud` commands. Run `k6 cloud login` once — it prompts interactively for your token and stack:

```bash
k6 cloud login
```

For non-interactive environments, pass the values via flags or the `K6_CLOUD_STACK_ID` environment variable, or set it in your script using the `stackID` option:

```bash
K6_CLOUD_TOKEN=<YOUR_API_TOKEN> K6_CLOUD_STACK_ID=<YOUR_STACK_ID> k6 cloud run script.js
```

## Cloud run non-threshold aborts now exit with code 97

Previously, Grafana Cloud k6 runs aborted for reasons other than threshold violations (user abort, system error, timeout, script error) returned exit code `0`. They now return exit code `97`.

| Scenario | Before | After |
| -------- | ------ | ----- |
| Finished | `0` | `0` |
| Aborted by threshold | `99` | `99` |
| Aborted by user, system, timeout, or script error | `0` | `97` |

Review any CI pipeline logic that treats exit code `0` as an unconditional success for `k6 cloud run` — those checks now need to handle `97` as a distinct failure state.

## `k6 cloud` positional argument removed

The old positional form `k6 cloud script.js` has been removed. Use the explicit subcommand instead:

```bash
k6 cloud run script.js
```

## Removed `--upload-only` flag

The `--upload-only` flag has been removed. Use the `k6 cloud upload` command instead:

```bash
k6 cloud upload script.js
```

## Removed `--no-summary` flag

The `--no-summary` flag has been removed. Use `--summary-mode=disabled` instead:

```bash
# Before
k6 run --no-summary script.js

# After
k6 run --summary-mode=disabled script.js
```

## Removed `--summary-mode=legacy`

The `legacy` value for `--summary-mode` has been removed. The available modes are now `compact` (default), `full`, and `disabled`.

## Removed `options.ext.loadimpact`

The `options.ext.loadimpact` configuration block has been removed. Use `options.cloud` instead:

<!-- md-k6:skip -->
```javascript
// Before
export const options = {
  ext: {
    loadimpact: {
      name: 'My test name',
    },
  },
};

// After
export const options = {
  cloud: {
    name: 'My test name',
  },
};
```

## Removed `k6/experimental/redis`

The `k6/experimental/redis` module has been removed. Use `k6/x/redis` instead:

<!-- md-k6:skip -->
```javascript
// Before
import { Client } from 'k6/experimental/redis';

// After
import { Client } from 'k6/x/redis';
```

With [automatic extension resolution](https://grafana.com/docs/k6/<K6_VERSION>/extensions/run/), k6 provisions the `xk6-redis` extension automatically when it sees the `k6/x/redis` import — no manual binary build required.

## OTel output: `K6_OTEL_EXPORTER_TYPE` renamed to `K6_OTEL_EXPORTER_PROTOCOL`

The accepted values are `grpc` and `http/protobuf`:

```bash
# Before
K6_OTEL_EXPORTER_TYPE=http k6 run --out opentelemetry script.js

# After
K6_OTEL_EXPORTER_PROTOCOL=http/protobuf k6 run --out opentelemetry script.js
```

## OTel output: `K6_OTEL_SINGLE_COUNTER_FOR_RATE` removed

The `K6_OTEL_SINGLE_COUNTER_FOR_RATE` environment variable has been removed. Rate metrics are now always exported as a single counter with a `condition` attribute (`zero`/`nonzero`). If you were using the old pair-of-counters format (`metric_name.occurred` / `metric_name.total`), update your dashboards and queries to filter on the `condition` attribute instead.

## Removed `K6_BINARY_PROVISIONING`

The `K6_BINARY_PROVISIONING` environment variable has been removed. Auto-extension resolution is enabled by default. Remove `K6_BINARY_PROVISIONING` from your environment. If you need to disable auto-extension resolution, use `K6_AUTO_EXTENSION_RESOLUTION=false` instead.

## Removed `K6_ENABLE_COMMUNITY_EXTENSIONS`

Community extensions no longer require an opt-in flag. Automatic extension resolution works for both official and community extensions by default. Remove any `K6_ENABLE_COMMUNITY_EXTENSIONS=true` from your environment.

## Legacy configuration file path no longer migrated

k6 no longer automatically migrates configuration files from the old `{USER_CONFIG_DIR}/loadimpact/config.json` path used before k6 v1.0.0. If you still have a config file at that location, move it manually:

```bash
# Linux / macOS
mv ~/.config/loadimpact/config.json ~/.config/k6/config.json

# Windows
move %APPDATA%\loadimpact\config.json %APPDATA%\k6\config.json
```

Alternatively, run `k6 cloud login` to regenerate the config at the correct path.

## Browser: `browser_web_vital_fid` metric removed

The `browser_web_vital_fid` metric has been removed as it's [no longer a Core Web Vital](https://web.dev/articles/fid). Use `browser_web_vital_inp` instead, which measures [Interaction to Next Paint](https://web.dev/inp/).

Update any thresholds that reference `browser_web_vital_fid`:

<!-- md-k6:skip -->
```javascript
// Before
export const options = {
  thresholds: {
    browser_web_vital_fid: ['p(75) < 100'],
  },
};

// After
export const options = {
  thresholds: {
    browser_web_vital_inp: ['p(75) < 200'],
  },
};
```
