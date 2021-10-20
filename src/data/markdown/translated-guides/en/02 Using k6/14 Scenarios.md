---
title: Scenarios
excerpt: 'Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled. This makes it possible to model diverse traffic patterns in load tests.'
hideFromSidebar: false
---

> ### 🎉 New in v0.27.0
>
> This feature is new as of version 0.27.0. Usage of this feature is optional and for the vast majority of users,
> existing scripts and configurations will continue to work as before. For a list of breaking changes,
> see the [k6 v0.27.0 release notes](https://github.com/k6io/k6/releases/tag/v0.27.0).

Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled. This makes it possible to model diverse traffic patterns in load tests. Benefits of using scenarios include:

- Multiple scenarios can be declared in the same script, and each one can
  independently execute a different JavaScript function, which makes organizing tests easier
  and more flexible.
- Every scenario can use a distinct VU and iteration scheduling pattern,
  powered by a purpose-built [executor](#executors). This enables modeling
  of advanced execution patterns which can better simulate real-world traffic.
- They can be configured to run in sequence or parallel, or in any mix of the two.
- Different environment variables and metric tags can be set per scenario.

## Configuration

Execution scenarios are primarily configured via the `scenarios` key of the exported `options` object
in your test scripts. The key for each scenario can be an arbitrary, but unique, scenario name. It will
appear in the result summary, tags, etc.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'shared-iterations',

      // common scenario configuration
      startTime: '10s',
      gracefulStop: '5s',
      env: { EXAMPLEVAR: 'testing' },
      tags: { example_tag: 'testing' },

      // executor-specific configuration
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
    another_scenario: {
      /*...*/
    },
  },
};
```

</CodeGroup>

## Executors

[Executors](/using-k6/scenarios/executors) are the workhorses of the k6 execution engine. Each one schedules VUs and iterations differently, and you'll choose one depending on the type
of traffic you want to model to test your services.

Possible values for `executor` are the executor name separated by hyphens.

| Name                                                                         | Value                   | Description                                                                                                                                        |
| ---------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Shared iterations](/using-k6/scenarios/executors/shared-iterations)         | `shared-iterations`     | A fixed amount of iterations are<br/> "shared" between a number of VUs.                                                                            |
| [Per VU iterations](/using-k6/scenarios/executors/per-vu-iterations)         | `per-vu-iterations`     | Each VU executes an exact number of iterations.                                                                                                    |
| [Constant VUs](/using-k6/scenarios/executors/constant-vus)                   | `constant-vus`          | A fixed number of VUs execute as many<br/> iterations as possible for a specified amount of time.                                                  |
| [Ramping VUs](/using-k6/scenarios/executors/ramping-vus)                     | `ramping-vus`           | A variable number of VUs execute as many<br/> iterations as possible for a specified amount of time.                                               |
| [Constant Arrival Rate](/using-k6/scenarios/executors/constant-arrival-rate) | `constant-arrival-rate` | A fixed number of iterations are executed<br/> in a specified period of time.                                                                      |
| [Ramping Arrival Rate](/using-k6/scenarios/executors/ramping-arrival-rate)   | `ramping-arrival-rate`  | A variable number of iterations are <br/> executed in a specified period of time.                                                                  |
| [Externally Controlled](/using-k6/scenarios/executors/externally-controlled) | `externally-controlled` | Control and scale execution at runtime<br/> via [k6's REST API](/misc/k6-rest-api) or the [CLI](https://k6.io/blog/how-to-control-a-live-k6-test). |

## Common options

| Option         | Type   | Description                                                                                                                                    | Default     |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| executor<sup>(required)</sup> ️  | string | Unique executor name. See the list of possible values in the [executors](#executors) section.                                                  | -           |
| startTime    | string | Time offset since the start of the test, at which point this scenario should begin execution.                                                  | `"0s"`      |
| gracefulStop | string | Time to wait for iterations to finish executing before stopping them forcefully. See the [gracefulStop](#graceful-stop-and-ramp-down) section. | `"30s"`     |
| exec         | string | Name of exported JS function to execute.                                                                                                       | `"default"` |
| env          | object | Environment variables specific to this scenario.                                                                                               | `{}`        |
| tags         | object | [Tags](/using-k6/tags-and-groups) specific to this scenario.                                                                                   | `{}`        |
