---
title: Scenarios
description: 'Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled. This makes it possible to model diverse traffic patterns in load tests.'
weight: 1500
---

# Scenarios

Scenarios configure how VUs and iteration schedules in granular detail.
With scenarios, you can model diverse _workloads_, or traffic patterns in load tests.

Benefits of using scenarios include:

- **Easier, more flexible test organization.** You can declare multiple scenarios in the same script,
  and each one can independently execute a different JavaScript function.
- **Simulate more realistic traffic.**
  Every scenario can use a distinct VU and iteration scheduling pattern,
  powered by a purpose-built [executor](#scenario-executors).
- **Parallel or sequential workloads.** Scenarios are independent from each other and run in parallel, though they can be made to appear sequential by setting the `startTime` property of each carefully.
- **Granular results analysis.** Different environment variables and metric tags can be set per scenario.

## Configure scenarios

To configure scenarios, use the `scenarios` key in the `options` object.
You can give the scenario any name, as long as each scenario name in the script is unique.

The scenario name appears in the result summary, tags, and so on.

{{< code >}}

<!-- md-k6:skip -->

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

{{< /code >}}

## Scenario executors

For each k6 scenario, the VU workload is scheduled by an _executor_.
Executors configure how long the test runs, whether traffic stays constant or changes, and whether the workload is modeled by VUs or by arrival rate (that is, [open or closed models](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/open-vs-closed)).

Your scenario object must define the `executor` property with one of the predefined executor names.
Your choice of executor determines how k6 models load.
Choices include:

- **By number of iterations.**

  - [`shared-iterations`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/shared-iterations) shares iterations between VUs.
  - [`per-vu-iterations`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/per-vu-iterations) has each VU run the configured iterations.

- **By number of VUs.**

  - [`constant-VUs`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/constant-vus) sends VUs at a constant number.
  - [`ramping-vus`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/ramping-vus) ramps the number of VUs according to your configured stages.

- **By iteration rate.**

  - [`constant-arrival-rate`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/constant-arrival-rate) starts iterations at a constant rate.
  - [`ramping-arrival-rate`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/ramping-arrival-rate) ramps the iteration rate according to your configured stages.

Along with the generic scenario options, each executor object has additional options specific to its workload.
For the full list, refer to [Executors](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors).

## Scenario options {#options}

| Option                          | Type   | Description                                                                                                                                                                                               | Default     |
| ------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| executor<sup>(required)</sup> ️ | string | Unique executor name. See the list of possible values in the [executors](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors) section.                                                  | -           |
| startTime                       | string | Time offset since the start of the test, at which point this scenario should begin execution.                                                                                                             | `"0s"`      |
| gracefulStop                    | string | Time to wait for iterations to finish executing before stopping them forcefully. To learn more, read [Graceful stop](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/graceful-stop). | `"30s"`     |
| exec                            | string | Name of exported JS function to execute.                                                                                                                                                                  | `"default"` |
| env                             | object | Environment variables specific to this scenario.                                                                                                                                                          | `{}`        |
| tags                            | object | [Tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) specific to this scenario.                                                                                                      | `{}`        |
| options                         | object | Additional options include [browser options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/options/).                                                                                         | `{}`        |

## Scenario example

This script combines two scenarios, with sequencing:

- The `shared_iter_scenario` starts immediately. Ten VUs try to use 100 iterations as quickly as possible (some VUs may use more iterations than others).
- The `per_vu_scenario` starts after 10s. In this case, ten VUs each run ten iterations.

Which scenario takes longer?
You can run to discover.
You can also add a `maxDuration` property to one or both scenarios.

```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    shared_iter_scenario: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 100,
      startTime: '0s',
    },
    per_vu_scenario: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10,
      startTime: '10s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/');
}
```

If you run a script with scenarios, k6 output includes high-level information about each one.
For example, if you run the preceding script, `k6 run scenario-example.js`,
then k6 reports the scenarios as follows:

{{< code >}}

```bash
  execution: local
     script: scenario-example.js
     output: -

  scenarios: (100.00%) 2 scenarios, 20 max VUs, 10m40s max duration (incl. grace
ful stop):
           * shared_iter_scenario: 100 iterations shared among 10 VUs (maxDurati
on: 10m0s, gracefulStop: 30s)
           * per_vu_scenario: 10 iterations for each of 10 VUs (maxDuration: 10m
0s, startTime: 10s, gracefulStop: 30s)
```

{{< /code >}}

The full output includes the summary metrics, like any default end-of-test summary:

{{< collapse title="full scenario-example.js output" >}}

```bash
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

  execution: local
     script: scenario-example.js
     output: -

  scenarios: (100.00%) 2 scenarios, 20 max VUs, 10m40s max duration (incl. grace
ful stop):
           * shared_iter_scenario: 100 iterations shared among 10 VUs (maxDurati
on: 10m0s, gracefulStop: 30s)
           * per_vu_scenario: 10 iterations for each of 10 VUs (maxDuration: 10m
0s, startTime: 10s, gracefulStop: 30s)

  █ TOTAL RESULTS

    HTTP
    http_req_blocked........................................................: avg=24.59ms  min=1µs      med=4µs      max=263.64ms p(90)=22.48ms  p(95)=245.04ms
    http_req_connecting.....................................................: avg=11.36ms  min=0s       med=0s       max=120.45ms p(90)=10.76ms  p(95)=115.19ms
    http_req_duration.......................................................: avg=115.25ms min=108.25ms med=115.66ms max=170.62ms p(90)=119.59ms p(95)=121.13ms
      { expected_response:true }............................................: avg=115.25ms min=108.25ms med=115.66ms max=170.62ms p(90)=119.59ms p(95)=121.13ms
    http_req_failed.........................................................: 0.00%  0 out of 200
    http_req_receiving......................................................: avg=214.61µs min=15µs     med=73.5µs   max=4.57ms   p(90)=253.4µs  p(95)=1.08ms
    http_req_sending........................................................: avg=17.79µs  min=3µs      med=12µs     max=669µs    p(90)=22µs     p(95)=25µs
    http_req_tls_handshaking................................................: avg=12.01ms  min=0s       med=0s       max=126.23ms p(90)=11.49ms  p(95)=120.04ms
    http_req_waiting........................................................: avg=115.02ms min=107.7ms  med=115.33ms max=170.59ms p(90)=119.54ms p(95)=121.04ms
    http_reqs...............................................................: 200    17.489795/s

    EXECUTION
    iteration_duration......................................................: avg=140.07ms min=108.3ms  med=116.14ms max=383.32ms p(90)=187.14ms p(95)=363.64ms
    iterations..............................................................: 200    17.489795/s
    vus.....................................................................: 10     min=0        max=10
    vus_max.................................................................: 20     min=20       max=20

    NETWORK
    data_received...........................................................: 2.4 MB 209 kB/s
    data_sent...............................................................: 26 kB  2.3 kB/s


  █ SCENARIO: per_vu_scenario

    HTTP
    http_req_blocked...................................: avg=23.52ms  min=1µs      med=4µs      max=244.87ms p(90)=22.39ms  p(95)=234.84ms
    http_req_connecting................................: avg=11.45ms  min=0s       med=0s       max=120.45ms p(90)=10.84ms  p(95)=115.81ms
    http_req_duration..................................: avg=114.86ms min=108.25ms med=115.74ms max=123.17ms p(90)=120.08ms p(95)=121.13ms
    http_req_failed....................................: 0.00%  0 out of 100
    http_req_receiving.................................: avg=195.59µs min=15µs     med=73.5µs   max=4.57ms   p(90)=247.5µs  p(95)=875.99µs
    http_req_sending...................................: avg=20.8µs   min=3µs      med=12µs     max=669µs    p(90)=22.1µs   p(95)=27.09µs
    http_req_tls_handshaking...........................: avg=12.06ms  min=0s       med=0s       max=126.23ms p(90)=11.49ms  p(95)=120.61ms
    http_req_waiting...................................: avg=114.64ms min=107.78ms med=115.38ms max=123.07ms p(90)=120.04ms p(95)=121.04ms
    http_reqs..........................................: 100    8.744897/s

    EXECUTION
    iteration_duration.................................: avg=138.53ms min=108.3ms  med=116.22ms max=363.71ms p(90)=144.44ms p(95)=353.48ms
    iterations.........................................: 100    8.744897/s

    NETWORK
    data_received......................................: 1.2 MB 104 kB/s
    data_sent..........................................: 13 kB  1.1 kB/s


  █ SCENARIO: shared_iter_scenario

    HTTP
    http_req_blocked...................................: avg=25.66ms  min=1µs      med=4µs      max=263.64ms p(90)=24.98ms  p(95)=256.16ms
    http_req_connecting................................: avg=11.27ms  min=0s       med=0s       max=115.37ms p(90)=10.76ms  p(95)=115.15ms
    http_req_duration..................................: avg=115.65ms min=108.38ms med=115.61ms max=170.62ms p(90)=119.11ms p(95)=120.91ms
    http_req_failed....................................: 0.00%  0 out of 100
    http_req_receiving.................................: avg=233.63µs min=22µs     med=73.5µs   max=4.22ms   p(90)=324.6µs  p(95)=1.11ms
    http_req_sending...................................: avg=14.77µs  min=3µs      med=12µs     max=128µs    p(90)=20µs     p(95)=22µs
    http_req_tls_handshaking...........................: avg=11.96ms  min=0s       med=0s       max=124.34ms p(90)=11.64ms  p(95)=118.98ms
    http_req_waiting...................................: avg=115.4ms  min=107.7ms  med=115.33ms max=170.59ms p(90)=118.94ms p(95)=120.85ms
    http_reqs..........................................: 100    8.744897/s

    EXECUTION
    iteration_duration.................................: avg=141.6ms  min=108.46ms med=116.09ms max=383.32ms p(90)=189.98ms p(95)=375.24ms
    iterations.........................................: 100    8.744897/s

    NETWORK
    data_received......................................: 1.2 MB 104 kB/s
    data_sent..........................................: 13 kB  1.1 kB/s

running (00m12.8s), 00/20 VUs, 200 complete and 0 interrupted iterations
shared_iter_scenario ✓ [ 100% ] 10 VUs  00m02.7s/10m0s  100/100 shared iters
per_vu_scenario      ✓ [ 100% ] 10 VUs  00m02.8s/10m0s  100/100 iters, 10 per V
```

{{< /collapse >}}
