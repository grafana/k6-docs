---
title: 'Feature flags'
description: 'Try experimental k6 capabilities before they become the default.'
weight: 110
---

# Feature flags

Feature flags let you try k6 capabilities before they're on by default. When a feature reaches general availability, it becomes the default and k6 removes the flag.

Unlike operational configuration like `K6_WEB_DASHBOARD`, flags are temporary. Operational config stays user-controllable indefinitely; flags get removed once their behavior is the default.

## Discover available flags

The set of flags changes across k6 releases: some get promoted to defaults and disappear, new ones are added. Check which flags your k6 version supports before enabling one.

```bash
k6 features
```

Add `--json` to get machine-readable output, useful for scripting — for example, checking in CI whether a specific flag is available before enabling it:

```bash
k6 features --json
```

## Enabling flags

k6 supports three ways to enable flags. Pick the one that fits your workflow.

### CLI flag

Use `--features` to enable a flag for a single run, without touching your config or environment:

```bash
k6 run --features <FEATURE_NAME> script.js
```

Separate multiple flags with commas:

```bash
k6 run --features <FEATURE_ONE>,<FEATURE_TWO> script.js
```

### Environment variable

Use `K6_FEATURES` when your CI pipeline or shell environment controls which features are active, without changing your script or config file:

{{< code >}}

```bash
K6_FEATURES=<FEATURE_NAME> k6 run script.js
```

```windows
set "K6_FEATURES=<FEATURE_NAME>" && k6 run script.js
```

```powershell
$env:K6_FEATURES="<FEATURE_NAME>"; k6 run script.js
```

{{< /code >}}

Separate multiple flags with commas: `K6_FEATURES=<FEATURE_ONE>,<FEATURE_TWO>`.

### JSON config file

Put flags in a config file to version-control them alongside your test suite and share them with your team:

```json
{
  "features": ["<FEATURE_NAME>"]
}
```

```bash
k6 run --config config.json script.js
```

## Precedence

If you set flags in more than one place, CLI wins over the environment variable, which wins over the config file. The winning source is used as-is; k6 ignores the others entirely. For example, if you pass `--features`, k6 ignores `K6_FEATURES` for that run.

## Lifecycle stages

A flag's lifecycle stage tells you how stable it is and when to clean it up. Check the stage before relying on a flag in production or long-running CI.

| Stage | Behavior |
| ----- | -------- |
| `Experimental` | Off by default. Enable to try it. May change or be removed. |
| `GA` | On by default. Passing the flag logs a reminder to remove it from your config. |
| `Deprecated` | Off by default. Removed in a future release. |

{{< admonition type="note" >}}
If you pass a flag k6 doesn't recognize (a typo or a flag removed after its grace period), k6 logs an `ERROR` and the run continues. Watch your logs — the flag is not applied.
{{< /admonition >}}

## Observability

If you're comparing test results across runs (for example, checking whether a feature improved tail latency), you need to know which features were active. k6 tags every metric sample with the active flags so you can filter and compare in your output.

While a flag is active, every metric sample carries a tag `k6_feature_<name>="true"`. Hyphens in the feature name become underscores.

k6 also includes active flags in [usage telemetry](https://grafana.com/docs/k6/<K6_VERSION>/set-up/usage-collection/).

## Running on Grafana Cloud

Feature flags work the same when you run tests through [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/). Set them with `--features`, `K6_FEATURES`, or a config file. Your test runs on the cloud with the same features active as locally.

## Read more

- [k6 options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/)
- [Usage collection](https://grafana.com/docs/k6/<K6_VERSION>/set-up/usage-collection/)
