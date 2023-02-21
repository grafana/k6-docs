---
title: 'Stress testing'
head_title: 'What is Stress Testing? How to create a Stress Test in k6'
excerpt: 'Stress and Spike Tests are types of performance tests that are concerned with assessing the limits of your system and stability under extreme conditions. Let’s see two examples.'
---

Stress testing is one of the many different types of load testing.

While [load testing](/test-types/load-testing) is primarily concerned with assessing the systems performance,
the purpose of stress testing is to assess the availability and stability of the system under heavy load.

## What is stress testing?

Stress Testing is a type of load testing used to determine the limits of the system.
The purpose of this test is to verify the stability and reliability of the system under **extreme conditions**.

To execute a proper stress test, you need a tool to push the system over its normal operations, to its limits, and _beyond the breaking point_.

You typically want to stress test an API or website to determine:

- How your system behaves under extreme conditions.
- What the maximum capacity of your system is in terms of users or throughput.
- What is the breaking point of your system and its failure mode.
- Whether  your system will recover without manual intervention after the stress test is over.

When stress testing, configure the test to include more concurrent users or generate higher throughput than:

* Your application typically sees.
* You think your application can handle.

Note that a stress test doesn't overwhelm the system
immediately—that's a [spike test](#spike-testing), which is covered in the next section.

A stress test should be configured in many gradual steps, each step increasing the concurrent load of the system.

Classic examples of a need for stress testing are _Black Friday_ or _Cyber Monday_,
two days each year that generate multiple times the normal traffic for many websites.

A stress test can be only a couple of steps, or it can be many, as you see in the following example.
No matter how many steps you include, remember this type of test is about finding out what
happens when pushing the performance limits of your system — so don’t worry about being too aggressive.

With this said, you probably don't want to run this test against your production environment.
We recommend running a stress test in a UAT or staging environment.

## API stress test in k6

You can create a stress test in k6 by properly configuring the `options` object.
For stress tests, `ramping-arrival-rate` makes a suitable executor, as you can set raw throughput as a value in iterations per second.

Remember, the point of this test is to gradually push your APIs beyond its breaking point,
for example:

<CodeGroup labels={["API stress test k6 example"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  scenarios: {
    stress: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 500,
      timeUnit: "1s",
      stages: [
        { duration: "2m", target: 10 }, // below normal load
        { duration: "5m", target: 10 },
        { duration: "2m", target: 20 }, // normal load
        { duration: "5m", target: 20 },
        { duration: "2m", target: 30 }, // around the breaking point
        { duration: "5m", target: 30 },
        { duration: "2m", target: 40 }, // beyond the breaking point
        { duration: "5m", target: 40 },
        { duration: "10m", target: 0 }, // scale down. Recovery stage.
      ],
    },
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io"; // make sure this is not production
  const responses = http.batch([
    ["GET", `${BASE_URL}/public/crocodiles/1/`],
    ["GET", `${BASE_URL}/public/crocodiles/2/`],
    ["GET", `${BASE_URL}/public/crocodiles/3/`],
    ["GET", `${BASE_URL}/public/crocodiles/4/`],
  ]);
}

```

</CodeGroup>

The VU chart of a stress test should look similar to this:
![Virtual user chart of an API stress test](./images/stress-test.png)

This configuration increases the load by 100 users every 2 minutes and stays at this level for 5 minutes. We have also included a recovery stage at the end, where the system is gradually decreasing the load to 0.

If your infrastructure is configured to auto-scale, this test will help you to determine:

- How quickly the auto-scaling mechanisms react to increased load.
- Whether any failures happen during scaling events.

The point of the recovery stage is to determine if the system can serve requests once the load
decreases to a normal level. If you are testing auto-scaling, you may want to scale down in steps
as well to determine if down-scaling is working as you expect it to.

## Spike testing

Spike testing is a type of stress testing that immediately overwhelms the system with an extreme surge of load.

Spike testing is a variation of a stress testing, but it does not gradually increase the load.
Instead it spikes to extreme load over a very short period of time.
While a stress test allows the SUT (System Under Test) to gradually scale up its
infrastructure, a spike test does not.

Execute spike tests to determine:

- How your system will perform under a sudden surge of traffic.
- Whether your system will recover once the traffic has subsided.

A classic need for a spike testing is if you've bought advertising on a big television event,
such as the Super Bowl or a popular singing competition,
which will cause a large number of people to see your advertisement and immediately visit your website.
If you haven't tested for this scenario and made performance optimizations in advance,
the extra traffic can end up being a marketing disaster instead of a great success.

Another typical example is a "HackerNews hug of death": someone links to your website on one
of the popular internet forums, like Reddit or HackerNews, which brings thousands of people to your system at once.

Success or failure of a spike test depends on your expectations. Systems generally react in 4 different ways:

- Excellent: system performance is stable during the surge of traffic.
   Response time is similar during low traffic and high traffic.
- Good: Response time is slower, but the system does not produce any errors.
   All requests are handled.
- Poor: The system produces errors during the surge of traffic, but recovers to normal after the
   traffic subsides.
- Bad: System crashes, and does not recover after the traffic subsides.

## API spike test in k6

Here's an example script configuration for a spike test.
As with stress testing, `ramping-arrival-rate` is a good executor for a spike test.

<CodeGroup labels={["Spike test k6 example"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from "k6/http";
import { sleep } from "k6";

export const options = {
  scenarios: {
    spike: {
      executor: "ramping-arrival-rate",
      preAllocatedVUs: 1000,
      timeUnit: "1s",
      stages: [
        { duration: "10s", target: 10 }, // below normal load
        { duration: "1m", target: 10 },
        { duration: "10s", target: 140 }, // spike to 140 iterations
        { duration: "3m", target: 140 }, // stay at 140 for 3 minutes
        { duration: "10s", target: 10 }, // scale down. Recovery stage.
        { duration: "3m", target: 10 },
        { duration: "10s", target: 0 },
      ],
      gracefulStop: "2m",
    },
  },
};

export default function () {
  const BASE_URL = "https://test-api.k6.io"; // make sure this is not production

  const responses = http.batch([
    [
      "GET",
      `${BASE_URL}/public/crocodiles/1/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/2/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/3/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
    [
      "GET",
      `${BASE_URL}/public/crocodiles/4/`,
      null,
      { tags: { name: "PublicCrocs" } },
    ],
  ]);
}
```

</CodeGroup>

The VU chart of a spike test should look similar to this:

![Virtual user chart of a spike test](./images/spike-test.png)

Note, the test starts with a period of 1 minute of low load, a quick spike to very high load, followed by a recovery period of low load.

Remember that the point of this test is to suddenly overwhelm the system. Don't be afraid to increase the number of VUs beyond your worst-case prediction.
Depending on your needs, you may want to extend the recovery stage to 10 or more minutes to see when the system finally recovers.

## Conclusions

Stress and spike testing help you prepare for the extreme conditions your system will
inevitably encounter in production.

Preparing for the inevitable is a sign of maturity in a technical organization.
Stress testing not only makes your system more reliable but also decreases the stress level of your Ops and Dev teams.

Once your system is stress-proof, you may want to run a [soak test](/test-types/soak-testing) to see if other reliability issues don't surface over an extended period.

## Read more

- [Running large tests](/testing-guides/running-large-tests)

<LdScript script='{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "What is stress testing?", "acceptedAnswer": { "@type": "Answer", "text": "Stress Testing is a type of load testing used to determine the limits of the system. The purpose of this test is to verify the stability and reliability of the system under <b>extreme conditions</b>." } }, { "@type": "Question", "name": "What is spike testing?", "acceptedAnswer": { "@type": "Answer", "text": "Spike testing is a type of stress testing that immediately overwhelms the system with an extreme surge of load." } }] }'/>
