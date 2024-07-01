---
title: Scenarios
description: 'Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled. This makes it possible to model diverse traffic patterns in load tests.'
weight: 13
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
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: scenario-example.js
     output: -

  scenarios: (100.00%) 2 scenarios, 20 max VUs, 10m40s max duration (incl. grace
ful stop):
           * shared_iter_scenario: 100 iterations shared among 10 VUs (maxDurati
on: 10m0s, gracefulStop: 30s)
           * per_vu_scenario: 10 iterations for each of 10 VUs (maxDuration: 10m
0s, startTime: 10s, gracefulStop: 30s)


running (00m12.8s), 00/20 VUs, 200 complete and 0 interrupted iterations
shared_iter_scenario ✓ [ 100% ] 10 VUs  00m02.7s/10m0s  100/100 shared iters
per_vu_scenario      ✓ [ 100% ] 10 VUs  00m02.8s/10m0s  100/100 iters, 10 per V

     data_received..................: 2.4 MB 188 kB/s
     data_sent......................: 26 kB  2.1 kB/s
     http_req_blocked...............: avg=64.26ms  min=1.56µs   med=8.28µs   max
=710.86ms p(90)=57.63ms  p(95)=582.36ms
     http_req_connecting............: avg=28.6ms   min=0s       med=0s       max
=365.92ms p(90)=20.38ms  p(95)=224.44ms
     http_req_duration..............: avg=204.25ms min=169.55ms med=204.36ms max
=407.95ms p(90)=205.96ms p(95)=239.32ms
       { expected_response:true }...: avg=204.25ms min=169.55ms med=204.36ms max
=407.95ms p(90)=205.96ms p(95)=239.32ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 200
     http_req_receiving.............: avg=195.54µs min=53.87µs  med=162.55µs max
=1.52ms   p(90)=260.6µs  p(95)=317.89µs
     http_req_sending...............: avg=38.16µs  min=7.61µs   med=37.99µs  max
=167.54µs p(90)=50.16µs  p(95)=60.18µs
     http_req_tls_handshaking.......: avg=24.03ms  min=0s       med=0s       max
=274.05ms p(90)=20.81ms  p(95)=212.74ms
     http_req_waiting...............: avg=204.01ms min=169.32ms med=204.11ms max
=407.82ms p(90)=205.74ms p(95)=239.01ms
     http_reqs......................: 200    15.593759/s
     iteration_duration.............: avg=268.83ms min=169.78ms med=204.67ms max
=952.85ms p(90)=444.97ms p(95)=786.52ms
     iterations.....................: 200    15.593759/s
     vus............................: 10     min=0       max=10
     vus_max........................: 20     min=20      max=20
```

{{< /collapse >}}
