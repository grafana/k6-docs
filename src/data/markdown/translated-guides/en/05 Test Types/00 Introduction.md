---
title: 'Introduction'
excerpt: 'Guide to test types'
---

Load creates poses risks to system performance.
Many things can go wrong when a system runs numerous operations simultaneously and responds to varied requests from a variable number of users.

Load testing helps teams to tune their system and prepare for those risks. But a good load testing strategy requires more than just executing a single script. We must test each application risk differently, a process that requires different _test types._
Each test type serves a different goal,  addressing different profiles of risk and traffic.

![Overview of load test shapes](./chart-load-test-types-overview.png)

- **[Smoke tests](../smoke-testing).** Use minimal load and duration to validate the health of your scripts and that the system performs adequately under minimal loads

- **[Average-load test](../load-testing).** Use average load to assess how your system performs under expected normal conditions.

- **[Stress tests](../stress-testing).**
  Use above-average load to assess how a system performs at its limits, when load exceeds what’s expected on average. 

- **[Soak tests](../soak-testing).**
  Run for a longer duration to assess the reliability and performance of your system over an extended periods.

- **[Breakpoint tests](../breakpoint-testing).**
  Gradually increase load to identify the capacity limits of the system

- **[Spike tests](../spike-testing).**
  Validate the behavior and survival of your system in cases of sudden, short, and massive increases in activity 
 
Start with a [Smoke test](https://k6.io/docs/test-types/smoke-testing).
After all, before beginning larger tests, you should validate that your scripts work as expected and that your system performs well with a few users.

After you know that the script works and the system responds correctly to minimal load, you can move on to other test types. However, as you should run smoke tests before running tests with larger load, you should also run test types with basic load—average-load and soak—before running tests with more complex load patterns.


## Test-type cheat sheet 

Use this matrix to quickly find and compare test types.
You can identify the differences and purposes for each type at a glance.

| Type       | VUs/Throughput        | Duration                   | When?                                                                                                            |
|------------|-----------------------|----------------------------|------------------------------------------------------------------------------------------------------------------|
| Smoke      | Low                   | Quick (seconds or minutes) | Every time new code or a change is done. It checks scripts, baseline system metrics, and deviations from changes |
| Load       | Average production    | Mid (15-60 mins)           | Often to check system maintains performance with average use                                                     |
| Stress     | High (above average)  | Mid (15-60 mins)           | When system may receive above-average loads to check how it manages                                              |
| Soak       | Average               | Long (hours)               | After changes to check system under prolonged continuous use                                                     |
| Breakpoint | Increases until break | As long as necessary       | A few times to find the upper limits of the system                                                               |
| Spike      | Very high             | Quick (secs to mins)       | Rarely, when system risks sudden rush                                                                            |

## General considerations

As you choose your test type and progress to increasingly heavier tests, consider the following.

- **Open and closed models.**

  k6 has an outstanding capability to define load patterns based on virtual users or on throughput ([open and closed models](https://k6.io/docs/using-k6/scenarios/concepts/open-vs-closed/)). Most of the time, teams should use closed models, but if you depend on throughput (like in Breakpoint testing), teams can use k6 executors: [constant-arrival-rate](https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/) and [ramping-arrival-rate](https://k6.io/docs/using-k6/scenarios/executors/ramping-arrival-rate/).

- **No single test type removes all performance risks..**

  Focus test efforts and test types depending on the risk or test goal. Make your life easier by testing for one goal or risk at a time.

- **Test type categories can be complicated..**

  Some types share characteristics, , and others can turn into  become the next type just by changing a few settings.

- **The industry hasn’t reached a consensus about naming for each type..**

  Some types appear online under different names and even different descriptions than what we list. We try to use the naming conventions we consider most descriptive. Our descriptions include the possible names you may find out there.

- **Keep load patterns at a maximum of three variations per test.**

  Increase the load, keep, and decrease (graphed as a trapezoid.) Adding more variations, for example, in a rollercoaster shape, may be wasteful and make it considerably trickier to pinpoint problems, risks, and action paths.
  In the same way, avoid multiple load variations unless you strictly need them. IE: Increase load to a point, decrease it to another point, increase it again, hold it, increase after a while, etc. A complex load pattern makes it very difficult to pinpoint problems.

- **The load patterns of each load test type aren’t bound.**

  Not to the system under test, the nature of the automation, test cases, or the position of the test in the [test automation pyramid](https://martinfowler.com/articles/practical-test-pyramid.html).


## Define load in scenarios

k6 defines the load test patterns in the [Scenarios](/using-k6/scenarios) property of the `options` object, outside of the test logic in `default`. 

Besides exporting options from the same test file, you can also separate test logic from options across different files.
This strategy makes the test design more _modular_:  write the script in one file, pull the options in as needed to change the load patterns or share load patterns across scripts.

<CodeGroup labels={["spike-pattern.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
export const options = {
  // Key configurations for Spike in this section
  stages: [
    //quick ramp up
    { duration: "2m", target: 2000 },
    // No plateau
    { duration: "1m", target: 0 }, // quick ramp-down to 0 users
  ],
};
```

</CodeGroup>


<CodeGroup labels={["my-test.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { options } from "./SpikePattern.js";
import http from "k6/http";

export default function () {
  const urlRes = http.req("https://k6.io");
  // MORE STEPS
  // Step1
  // Step2
  // etc.
}
```

</CodeGroup>

