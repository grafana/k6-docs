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


## CLI Icons

| Icon         |Description                                                                                                                                   | 
| -------------- | ------------------------------------------------------------------------------------------- |
| ↓ ️  |  End of regular execution as the graceful stop stage is reached.                                                 | 
| ✓   |  Successful execution of scenario     | 
| ✗ |  Interruption signal during graceful stop stage | 
| •    |   Appears when scenario needs to wait before starting     

## Example

The following script defines two minimal scenarios:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
import http from 'k6/http';

export const options = {
  scenarios: {
    example_scenario: {
      executor: 'shared-iterations',
      startTime: '0s'
    },
    another_scenario: {
      executor: 'shared-iterations',
      startTime: '5s'
    },
  },
};

export default function () {
  http.get('https://google.com/');
}
```

</CodeGroup>

Running the above script with `k6 run script.js`, additional information is added to the output as follows:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: .\scenario_example.js
     output: -

  scenarios: (100.00%) 2 scenarios, 2 max VUs, 10m35s max duration (incl. graceful stop):
           * example_scenario: 1 iterations shared among 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)
           * another_scenario: 1 iterations shared among 1 VUs (maxDuration: 10m0s, startTime: 5s, gracefulStop: 30s)


running (00m05.2s), 0/2 VUs, 2 complete and 0 interrupted iterations
example_scenario ✓ [======================================] 1 VUs  00m00.2s/10m0s  1/1 shared iters
another_scenario ✓ [======================================] 1 VUs  00m00.2s/10m0s  1/1 shared iters

     data_received..................: 54 kB  11 kB/s
     data_sent......................: 2.5 kB 486 B/s
     http_req_blocked...............: avg=53.45ms  min=46.56ms  med=48.42ms  max=70.4ms   p(90)=64.25ms  p(95)=67.32ms
     http_req_connecting............: avg=19.95ms  min=18.62ms  med=19.93ms  max=21.3ms   p(90)=21.26ms  p(95)=21.28ms
     http_req_duration..............: avg=46.16ms  min=25.82ms  med=45.6ms   max=67.6ms   p(90)=65.63ms  p(95)=66.61ms
       { expected_response:true }...: avg=46.16ms  min=25.82ms  med=45.6ms   max=67.6ms   p(90)=65.63ms  p(95)=66.61ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 4
     http_req_receiving.............: avg=3.56ms   min=305.8µs  med=3.05ms   max=7.84ms   p(90)=7.01ms   p(95)=7.43ms
     http_req_sending...............: avg=132.85µs min=0s       med=0s       max=531.4µs  p(90)=371.98µs p(95)=451.68µs
     http_req_tls_handshaking.......: avg=32.68ms  min=27.63ms  med=27.99ms  max=47.09ms  p(90)=41.43ms  p(95)=44.26ms
     http_req_waiting...............: avg=42.46ms  min=24.78ms  med=42.64ms  max=59.75ms  p(90)=58.45ms  p(95)=59.1ms
     http_reqs......................: 4      0.771306/s
     iteration_duration.............: avg=199.23ms min=182.79ms med=199.23ms max=215.67ms p(90)=212.38ms p(95)=214.03ms
     iterations.....................: 2      0.385653/s
     vus............................: 0      min=0      max=0
     vus_max........................: 2      min=2      max=2
```

</CodeGroup>
