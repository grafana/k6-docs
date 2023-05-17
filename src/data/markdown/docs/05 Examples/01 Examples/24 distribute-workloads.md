---
title: Distribute workloads across VUs
excerpt: How to configure k6 so that some VUs do one action, and other VUs do another action
---

You can configure your k6 test scripts so that different sets of VUs execute different functions.
This helps simulate traffic to real-world applications, where user behavior is rarely uniform.
t
For example, the majority of traffic to an e-commerce site might come from readers who only search items and read reviews. A small percentage might actively shop, performing actions that involve writes to the database and calls to different APIs.

To account for these different behaviors, testers often want to distribute their VUs into different logical behaviors.
k6 supports multiple ways to do this.
The following sections provide different ways to split logic across VUs, along with some strategies to granularly filter results.

<Blockquote mod="note" title="Aim for simplicity">

These techniques could be used to create very complex configurations.
However, more complexity creates more ambiguity for results interpretation

</Blockquote>


## Split logic across scenarios

<Blockquote mod="note" title="">

In this context, _workload_ refers to the traffic pattern simulated by a scenario.

</Blockquote>


One way to distribute traffic is to use scenarios to schedule different workloads for different functions.
1. Define multiple scenarios in your `options.scenarios` object.
1. Use the scenario `exec` property to execute different VU functions with a workload.

For example, imagine a social media site that typically receives 100 concurrent users.
Of those, 80 might visit their contacts page, and 20 might view the news.
To configure such a distribution, make two scenarios with different throughput or VUs:

```javascript
import http from "k6/http";

export const options = {
  //scenario to view contacts
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      exec: "contacts",
      vus: 80,
      iterations: 100,
    },
    //scenario to view news
    news: {
      executor: "shared-iterations",
      exec: "news",
      vus: 20,
      iterations: 100,
    },
  },
};

//use the exec property to run different scenarios for different functions

export function contacts() {
  http.get("https://test.k6.io/contacts.php");
}

export function news() {
  http.get("https://test.k6.io/news.php");
}
```

### Tip: reduce scenario boilerplate with `new`

If your script uses multiple scenarios, consider making a function to construct a scenario object.

For example, the following script makes the same test as the preceding section.
But instead of a new scenario each time, it uses the `new` operator to construct new workloads based on arguments for the number of VUs and `exec` name.

<Collapsible title="workload constructor" isOpen="" tag="">

<CodeGroup labels={["workload-constructor.js"]} lineNumbers={[true]} showCopyButton={[true]}>


```javascript
import http from "k6/http";

// workload constructor
function Scenario(vus, exec) {
  this.executor = "shared-iterations";
  this.vus = vus;
  this.exec = exec;
  this.iterations = 100;
}

//create scenario object
const contactWorkload = new Scenario(80, "contacts");
const newsWorkload = new Scenario(20, "news");

export const options = {
  //scenario to view contacts
  scenarios: {
    contactWorkload,
    newsWorkload,
  },
};

//use the exec property to run different scenarios for different functions

export function contacts() {
  http.get("https://test.k6.io/contacts.php");
}

export function news() {
  http.get("https://test.k6.io/news.php");
}

```
</CodeGroup>

</Collapsible>




## Configuring VUs based on VU id

In some cases, it might be inconvenient or impractical to write a scenario for each behavior.
As an alternative, you can distribute logic across a range of VUs with the [execution context variables](/using-k6/execution-context-variables) from the [`k6/execution`](https://k6.io/docs/javascript-api/k6-execution/) module.
With the `exec` object, you can scope logic to a specific instance, scenario, or across all VUs.

For example, this statement assigns behavior to the first 25 VUs in a test.

```bash
if (exec.vu.idInTest <= 25) {
   //do something;
  }
```


For more flexibility, you can use modulo expressions distribute VUs according to percentages.
For example, the following script distributes logic according to different user profiles:
- 40 percent of users check the news.
- 60 percent play a coinflip game.
   - Half bet `heads` and half bet `tails`.

<CodeGroup labels={["behavior-based-on-exec-context.js"]} lineNumbers={[true]} showCopyButton={[true]}>

```javascript
import http from "k6/http";
import exec from "k6/execution";

export const options = {
  scenarios: {
    quickRamp: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 100,
      stages: [
        { target: 10, duration: "10s" },
        { target: 10, duration: "15s" },
        { target: 0, duration: "5s" },
      ],
    },
  },
};

export default function () {
  if (exec.vu.idInTest % 10 < 4) {
    // 0-3 range, read the news
    http.get("http://test.k6.io/news");
  }
  else if (exec.vu.idInTest % 10 < 7) {
      // 4-6 range, bet heads
    http.get("http://test.k6.io/flip_coin.php?bet=heads");
  } else {
    // 7-9 range, bet tails"
    http.get("http://test.k6.io/flip_coin.php?bet=tails");
  }
}

```

</CodeGroup>

## Random behavior

To add a degree of random behavior, consider one of the randomizing functions from the [k6 utils](https://k6.io/docs/javascript-api/jslib/utils/).

For example, this script randomly assigns one behavior to happen one third of the time, and another behavior to happen all other times.

<CodeGroup labels={["random-behavior.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { sleep } from "k6";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

export default function () {
  if (randomIntBetween(1, 3) % 3 > 1) {
    console.log("1 in 3 times");
  } else {
    console.log("2 in 3 times");
  }
}

```

</CodeGroup>

For a more sophisticated example of randomizing, read this [forum post](https://community.k6.io/t/how-to-distribute-vus-across-different-scenarios-with-k6/49/17).

## Inspect results by behavior

If you want to inspect the results for a certain behavior, you have the following options:

- [Create a custom metric](/using-k6/metrics/create-custom-metrics).
  These would also appear in the end-of-test summary.
- Use [Tags and groups](/using-k6/tags-and-groups)


To view granular results for a specific scenario, you can filter results by the built in scenario [tag](/using-k6/tags-and-groups).
For example, this command uses `jq` to filter only data points for the  scenario with the name "news".

```bash
jq '. | select( .data.tags.scenario == "news")' results.json
```

Otherwise, you can assign tags to a request or block and filter accordingly.
