---
title: Scenarios
excerpt: 'Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled. This makes it possible to model diverse traffic patterns in load tests.'
hideFromSidebar: false
---

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

## Scenario executors

For each k6 scenario, the VU workload is scheduled by an _executor_.
For example, executors configure:
- Whether VU traffic stays constant or changes
- Whether to model traffic by iteration number or by VU arrival rate.

Your scenario object must define the `executor` property with one of the predefined executors names.
Along with the generic scenario options, each executor object has additional options specific to its workload.
For the list of the executors, refer to the [Executor guide](/using-k6/scenarios/executors/).

## Scenario options {#options}

| Option         | Type   | Description                                                                                                                                    | Default     |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| executor<sup>(required)</sup> ️  | string | Unique executor name. See the list of possible values in the [executors](/using-k6/scenarios/executors/) section.                                                  | -           |
| startTime    | string | Time offset since the start of the test, at which point this scenario should begin execution.                                                  | `"0s"`      |
| gracefulStop | string | Time to wait for iterations to finish executing before stopping them forcefully. Read more about gracefully stopping a test run [here](/using-k6/scenarios/graceful-stop/). | `"30s"`     |
| exec         | string | Name of exported JS function to execute.                                                                                                       | `"default"` |
| env          | object | Environment variables specific to this scenario.                                                                                               | `{}`        |
| tags         | object | [Tags](/using-k6/tags-and-groups) specific to this scenario.                                                                                   | `{}`        |

## Scenario example

The following script defines two minimal scenarios:

<CodeGroup labels={["scenario-example.js"]} lineNumbers={[true]}>

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
  http.get('https://test.k6.io/');
}
```

</CodeGroup>

If you run a script with scenarios, k6 output includes high-level information about each one.
For example, if you run the preceding script, `k6 run scenario-example.js`,
then k6 reports the scenarios as follows:

<CodeGroup labels={["scenario example output"]} lineNumbers={[false]}>

```bash
  execution: local
     script: scenario-example.js
     output: -

  scenarios: (100.00%) 2 scenarios, 30 max VUs, 10m40s max duration (incl. graceful stop):
           * shared_iter_scenario: 100 iterations shared among 20 VUs
             (maxDuration: 10s, gracefulStop: 30s)
           * per_vu_scenario: 20 iterations for each of 10 VUs
             (maxDuration: 10m0s, startTime: 10s, gracefulStop: 30s)


running (00m15.1s), 00/30 VUs, 300 complete and 0 interrupted iterations
shared_iter_scenario ✓ [======================================] 20 VUs  03.0s/10s       100/100 shared iters
per_vu_scenario      ✓ [======================================] 10 VUs  00m05.1s/10m0s  200/200 iters, 20 per VU

```

</CodeGroup>

The full output includes the summary metrics, like any default end-of-test summary:

<Collapsible title="full example-scenario.js output" isOpen="" tag="">

<CodeGroup>

```bash
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: scenario-example.js
     output: -

  scenarios: (100.00%) 2 scenarios, 30 max VUs, 10m40s max duration (incl. graceful stop):
           * shared_iter_scenario: 100 iterations shared among 20 VUs (maxDuration: 10s, gracefulStop: 30s)
           * per_vu_scenario: 20 iterations for each of 10 VUs (maxDuration: 10m0s, startTime: 10s, gracefulStop: 30s)


running (00m15.1s), 00/30 VUs, 300 complete and 0 interrupted iterations
shared_iter_scenario ✓ [======================================] 20 VUs  03.0s/10s       100/100 shared iters
per_vu_scenario      ✓ [======================================] 10 VUs  00m05.1s/10m0s  200/200 iters, 20 per VU

     data_received..................: 3.6 MB 240 kB/s
     data_sent......................: 40 kB  2.6 kB/s
     http_req_blocked...............: avg=54.48ms  min=4.1µs    med=8.23µs   max=747.12ms p(90)=47.99ms  p(95)=567.6ms 
     http_req_connecting............: avg=27.62ms  min=0s       med=0s       max=281.12ms p(90)=26.86ms  p(95)=279.32ms
     http_req_duration..............: avg=210.21ms min=172.25ms med=204.01ms max=1.87s    p(90)=206.18ms p(95)=306.99ms
       { expected_response:true }...: avg=210.21ms min=172.25ms med=204.01ms max=1.87s    p(90)=206.18ms p(95)=306.99ms
     http_req_failed................: 0.00%  ✓ 0         ✗ 300 
     http_req_receiving.............: avg=1.77ms   min=82.11µs  med=149.11µs max=186.39ms p(90)=233.56µs p(95)=304.91µs
     http_req_sending...............: avg=42.26µs  min=10.68µs  med=37.88µs  max=220.62µs p(90)=47.68µs  p(95)=70.59µs 
     http_req_tls_handshaking.......: avg=23.02ms  min=0s       med=0s       max=410.87ms p(90)=20.91ms  p(95)=230.64ms
     http_req_waiting...............: avg=208.39ms min=172.02ms med=203.78ms max=1.69s    p(90)=205.97ms p(95)=233.38ms
     http_reqs......................: 300    19.886852/s
     iteration_duration.............: avg=264.92ms min=172.48ms med=204.54ms max=1.87s    p(90)=680.75ms p(95)=751.6ms 
     iterations.....................: 300    19.886852/s
     vus............................: 1      min=0       max=20
     vus_max........................: 30     min=30      max=30

```

</CodeGroup>

</Collapsible>
