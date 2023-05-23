---
title: 'Executors'
excerpt: 'Executors control how k6 schedules VUs and iterations. Choose the executor to model traffic you want to model to test your services'
---

**Executors** control how k6 schedules VUs and iterations.
The executor that you choose depends on the goals of your test and the type of traffic you want to model.

Define the executor in `executor` key of the scenario object.
Possible values for `executor` are the executor name separated by hyphens.


```javascript
export const options = {
  scenarios: {
    arbitrary_scenario_name: {
      //Name of executor
      executor: 'ramping-vus',
      // more configuration here
    },
  },
};
```


<Blockquote mod="note" title="VUs might not distribute uniformely over iterations">

For any given scenario, you can't guarantee that a specific VU can run a specific iteration.

With [`SharedArray`](/javascript-api/k6-data/sharedarray/) and [execution context variables](/using-k6/execution-context-variables/), you can map a specific VU to a specific value in your test data.
So the tenth VU could use the tenth item in your array (or the sixth iteration to the sixth item).

But, you _cannot_ reliably map, for example, the tenth VU to the tenth iteration.

</Blockquote>



| Name                                                                         | Value                   | Description                                                                                                                                        |
| ---------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Shared iterations](/using-k6/scenarios/executors/shared-iterations)         | `shared-iterations`     | A fixed amount of iterations are<br/> shared between a number of VUs.                                                                            |
| [Per VU iterations](/using-k6/scenarios/executors/per-vu-iterations)         | `per-vu-iterations`     | Each VU executes an exact number of iterations.                                                                                                    |
| [Constant VUs](/using-k6/scenarios/executors/constant-vus)                   | `constant-vus`          | A fixed number of VUs execute as many<br/> iterations as possible for a specified amount of time.                                                  |
| [Ramping VUs](/using-k6/scenarios/executors/ramping-vus)                     | `ramping-vus`           | A variable number of VUs execute as many<br/> iterations as possible for a specified amount of time.                                               |
| [Constant Arrival Rate](/using-k6/scenarios/executors/constant-arrival-rate) | `constant-arrival-rate` | A fixed number of iterations are executed<br/> in a specified period of time.                                                                      |
| [Ramping Arrival Rate](/using-k6/scenarios/executors/ramping-arrival-rate)   | `ramping-arrival-rate`  | A variable number of iterations are <br/> executed in a specified period of time.                                                                  |
| [Externally Controlled](/using-k6/scenarios/executors/externally-controlled) | `externally-controlled` | Control and scale execution at runtime<br/> via [k6's REST API](/misc/k6-rest-api) or the [CLI](https://k6.io/blog/how-to-control-a-live-k6-test). |
