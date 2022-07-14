---
title: 'Soak testing'
head_title: 'What is Soak Testing? How to create a Soak Test in k6'
excerpt: 'A Soak Test is a type of Performance Test that tells you about the reliability and performance of your system over an extended period of time. Let’s see an example.'
---

While [load testing](/test-types/load-testing) is primarily concerned with performance assessment, and
[stress testing](/test-types/stress-testing) is concerned with system stability under extreme conditions, soak testing is concerned with reliability over a longer period of time.

A soak test uncovers performance and reliability issues stemming from a system being under
pressure for an extended period.

Reliability issues typically relate to bugs, memory leaks, insufficient storage quotas,
incorrect configuration or infrastructure failures. Performance issues typically relate to
incorrect database tuning, memory leaks, resource leaks or a large amount of data.

With a soak test you can simulate days worth of traffic in only a few hours.

You typically run this test to:

- Verify that your system doesn't suffer from bugs or memory leaks, which result in a crash or
  restart after several hours of operation.
- Verify that expected application restarts don't lose requests.
- Find bugs related to race-conditions that appear sporadically.
- Make sure your database doesn't exhaust the allotted storage space and stops.
- Make sure your logs don't exhaust the allotted disk storage.
- Make sure the external services you depend on don't stop working after a certain amount of
  requests are executed.

You may discover that the performance of your application was much better at the beginning of the
test in comparison to the end. This typically happens if your database is not properly tuned.
Adding indexes or assigning additional memory may help.

## Soak testing in k6

We recommend you to configure your soak test at about 80% capacity of your system.
If your system can handle a maximum of 500 simultaneous users, you should configure your soak test to 400 VUs.

The duration of a soak test should be measured in hours. We recommend you to start with a 1 hour test,
and once that one is successful, extend it to several hours.
Some errors are related to time, and not to the total number of requests executed.

Here's a sample test configuration:

<CodeGroup labels={["sample-soak-test.js"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

const API_BASE_URL = 'https://test-api.k6.io';

export default function () {
  http.batch([
    ['GET', `${API_BASE_URL}/public/crocodiles/1/`],
    ['GET', `${API_BASE_URL}/public/crocodiles/2/`],
    ['GET', `${API_BASE_URL}/public/crocodiles/3/`],
    ['GET', `${API_BASE_URL}/public/crocodiles/4/`],
  ]);

  sleep(1);
}
```

</CodeGroup>

The VU chart of a Soak Test should look similar to this:
![Soak Test Configuration](./images/soak-test.png)

<Blockquote mod="warning">

#### Make a cost estimate before starting a soak test

Soak tests can simulate days or weeks worth of normal traffic within a few hours. This means that your infrastructure and vendor costs may be significant.

If you are testing a website, you should consider excluding your CDN from the test.

If your system makes use of external services, you may want to calculate the cost before you start the test.

</Blockquote>

## When to do soak testing?

Soak testing helps you uncover bugs and reliability issues that surface over an extended period. Many complex systems have bugs of this nature.

You should execute soak tests after your standard load tests are successful, and your system has been found stable when executing a stress test.

Soak testing is the last major step on the road to building reliable systems.

## Read more

- [Finding .NET Memory Leaks through Soak Testing](https://k6.io/blog/resolve-memory-leaks-with-soak-testing-and-k6/)
- [Running large tests](/testing-guides/running-large-tests)

<LdScript script='{
"@context": "https://schema.org",
"@type": "FAQPage",
"mainEntity": [{
"@type": "Question",
"name": "When to do soak testing?",
"acceptedAnswer": {
"@type": "Answer",
"text": "<p>Soak testing helps you uncover bugs and reliability issues that surface over an extended period. Many complex systems have bugs of this nature.</p><p>You should execute soak tests after your standard load tests are successful, and your system has been found stable when executing a stress test.</p><p>Soak testing is the last major step on the road to building reliable systems.</p>"}}]}' />
