---
title: 'Automated performance testing'
head_title: 'How to Automate Performance Testing: The k6 Guide'
excerpt: 'Automated performance testing enables teams to efficiently execute tests and gather performance metrics throughout the software development lifecycle. This guide answers the WHY and the HOW and provides an overview of recommended practices for conducting automated performance testing.'
---

import {IntegrationsCiIconBlock} from 'templates/docs/integrations'

While automation has been a hot topic in the broader testing community, it is not a silver bullet for all your performance testing problems. It can help set up all the mundane tasks, but analyzing the performance metrics requires human intervention. However, where to start, which tool to choose, or how to get there is not always as straightforward, especially if you don’t already have a lot of experience in performance engineering.

This guide aims to lay down the steps and recommended practices for achieving your goal of automated performance testing.

## Why automate performance tests?

Let’s start by examining first why you would consider automating your performance tests.

- Automated performance testing can quickly scale up the number of virtual users or load levels to simulate realistic user scenarios (**scalability**). Performing this manually would be time-consuming and impractical for large-scale tests involving hundreds or thousands of concurrent users.
- **Saving time and money**, especially when running the performance tests. Automated performance tests can be executed repeatedly and are faster to run which can significantly reduce the test duration. In addition, computers are great at doing all the boring and repetitive tasks, which opens up your time to explore the application effectively.
- **Shifting performance testing left**, making sure it happens as close to development as possible, giving developers an early feedback loop for performance matters.
- **Reduce performance regression and promote continuous testing** by integrating performance tests to your continuous integration and continuous delivery (CI/CD) pipelines. Performance tests can be triggered automatically during build deployments, ensuring that performance issues are identified early in the development process and reducing the risk of performance-related regressions. Automated performance tests are also easier to monitor and incrementally improved when it's conducted throughout the development lifecycle.

## Know your goals

Before jumping in on writing your automated performance test, the most critical step to ensure a successful performance testing automation project is to document your goals. These goals should define what metrics and values (in absolute terms, "response times should be less than 500ms" and not "response times should not be slow") are important to you, your team, and the business.

If you have established [Service Level Agreements (SLAs)](https://en.wikipedia.org/wiki/Service-level_agreement) in place with your customers, or just [Service Level Objectives (SLOs)](https://en.wikipedia.org/wiki/Service-level_objective) and [Service Level Indicators (SLIs)](https://en.wikipedia.org/wiki/Service_level_indicator) defined internally, then that’s a great starting point. If not, then it’s a great opportunity to bring stakeholders together and discuss what goals you should have defined to drive a performance culture. 

<Blockquote mod="note" title="">

To find out more information on how to calculate your SLOs, check out [SLO math demystified](https://medium.com/@sazipkin/slo-math-demystified-a1f5360f4d77).

</Blockquote>

Starting with the results of a baseline test is another good way to find a starting point for your goals. A baseline test is a test run with a single or very few <abbr title="Virtual Users">VUs</abbr> that you know your system can handle without breaking a sweat. The idea is that you’ll get some real numbers on where your system is in terms of latency and response time. It's important to make sure that your baseline test is not resulting in any unwanted errors and is functionally accurate.

From the perspective of human perceptive abilities, the following guidance points from [Nielsen Norman Group](https://www.nngroup.com/articles/response-times-3-important-limits/) might be of help when deciding on what latency and response time to aim for:

> - **0.1 second** is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.
> - **1.0 second** is about the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data.
> - **10 seconds** is about the limit for keeping the user's attention focused on the dialogue. For longer delays, users will want to perform other tasks while waiting for the computer to finish, so they should be given feedback indicating when the computer expects to be done. Feedback during the delay is especially important if the response time is likely to be highly variable, since users will then not know what to expect.

Once your goals are clear, you need to codify them as [thresholds](/using-k6/thresholds) which is the mechanism by which you specify [pass/fail criteria](#pass-fail-criteria) in k6.

## Plan your performance tests

Once you have identified your performance goals, you can start to plan the following with your teams:

- a set of tests you need to automate
- the environment you're running the tests from
- the workload and data requirements for a realistic performance simulation

If you haven’t already created test cases for your system, then we suggest having a read through one of our guides for creating tests for websites and APIs/microservices:

- [Load testing websites guide](/testing-guides/load-testing-websites)
- [API load testing guide](/testing-guides/api-load-testing)

Depending on your goals, k6 now also supports other types of tests. Try checking out the following guides to familiarize yourself with browser and fault injection testing.

- [Browser testing guide](https://k6.io/blog/get-started-with-k6-browser/)
- [Fault injection testing guide](https://k6.io/blog/fault-injection-testing-microservices-with-xk6-disruptor/)

## How to automate performance testing

Once you have identified your performance goals and have a rough plan, you can introduce automated performance tests into your pipelines. Running different types of performance tests from a CI/CD pipeline is easy with k6. The setup can easily be generalized across the various CI/CD tools into the following sequence of steps:

1. [Installation of k6](#installation-of-k6)
2. [Writing a test](#writing-a-test)
3. [Adding checks](#adding-checks)
4. [Setting test criteria with thresholds](#setting-test-criteria-with-thresholds)
5. [Local vs Cloud execution](#local-vs-cloud-execution)
6. [Test frequency](#test-frequency)
7. [Notifications](#notifications)

Let's have a closer look at these general steps in more detail below.

## 1. Installation of k6

The first step to integrating automated performance tests in your CI pipeline is to find and install a performance testing tool.

k6 is a tool built for automation. Using k6, you can test the reliability and performance of your systems and catch performance regressions and problems earlier. One of its key features is its CLI tool which can integrate easily into your tech stack.

Installing k6 can be done in three different ways:

- Using one of the OS specific package managers
- Pulling the Docker image
- Downloading the binary for your OS

See the full [installation instructions](/get-started/installation) for more information.

Additionally, we also have available [guides for installing k6 in specific CI tools](/integrations#continuous-integration-and-continuous-delivery).

## 2. Writing a test

Generally, when creating test scripts, the golden rule is to start small and expand from that initial starting point. Identify the high-risk areas and most business-critical transactions in your system and write test scripts covering that part of the system. The most important thing is to continuously make improvements on the structure of your tests, instead of not having any automated performance tests at all.

**Version control test files**

One recommended practice that we advise users and customers to adopt is version control of performance tests, preferably alongside application code like other automated tests. In our experience, this will lead to a higher likeliness of tests being maintained as the application evolves. Developers also get more invested if the tests are colocated in the application code. It also affords you all the usual benefits of version-controlling your code.

**Modules**

Once you’ve gained enough experience with test creation, we strongly advise you to [modularize your tests](/using-k6/modules) to reuse common logic/patterns across members of your team and different performance tests. 

Another approach to group your tests is to use the [resource object model pattern](https://k6.io/blog/load-testing-made-simpler-with-resource-object-model/).

**Scenarios and Groups**

To organize and manage multiple user scenarios effectively, we also advise you to use [scenarios](/using-k6/scenarios) and [groups](/using-k6/groups). Scenarios allow you to model diverse workloads and can be powerful if you also consider a [hybrid approach to performance testing](/testing-guides/load-testing-websites/#hybrid-load-testing). Groups allow you to organize multiple requests by page loads or user actions as a single transaction. k6 shows the response time of grouped requests separately and as a group.

## 3. Adding checks

To validate responses returned by your performance test, k6 provides [checks](/using-k6/checks/) similar to what many testing frameworks call an `assert.` 

A basic check looks like this:


```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const response = http.post('https://httpbin.test.k6.io/post', 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Bonjour!')
  });
}
```

This checks if the response body contains the expected word. You can specify multiple checks on a single request, but any failed checks do not cause the performance test to fail because they don't return a failed exit status, so combining checks with [thresholds](/using-k6/thresholds) is recommended.
## 4. Setting test criteria with thresholds

Every step in an automation pipeline either passes or fails. As mentioned in [Know your goals](#know-your-goals), the mechanism by which k6 decides whether a test has passed or failed is called [thresholds](/using-k6/thresholds). Without your goals codified as thresholds, there's no way for k6 to know if your test should be considered a success or failure. Thresholds can be used to assert that the system performs within your SLOs while the test runs.

You can add thresholds to a k6 script in the `options` object. A basic threshold looks like this:

```javascript
export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
};
```

From the above threshold example, when the statement evaluate to true, the threshold is met and the test passes with an exit code of 0.

You can set up thresholds on any [metric](/using-k6/metrics/) in k6 and have multiple thresholds per metric. We recommend setting the following thresholds for your test:
- [Response time](#response-time)
- [Error rate](#error-rate)
- [Checks](#checks)

### Response time

To add a threshold for the response time, use the metric `http_req_duration` and start with the 95th percentile. Performance testing results will always be skewed by the presence of outliers so setting a pass/fail criteria on the 95th percentile is your best starting point.

### Error rate

```javascript
export const options = {
  thresholds: {
    http_req_failed: ['rate<=0.05'],
  },
};
```

To add a threshold for the error rate, use the metric `http_req_failed` and enter the error rate that you expect the test to fall within. By default, `http_req_failed` counts any HTTP 4xx and HTTP 5xx errors as a failure. 

Choosing a good error rate depends on your test, script, test data, application, and end users' tolerance for error. Here are a few of our recommendations:

- For mission-critical applications, consider a lower error rate such as 1%.
- For auxiliary or non-critical applications, consider a higher error rate of 5%.
- For testing disaster recovery situations, where you're purposely terminating or restarting server nodes, an error rate of 10-15% may be acceptable.

### Checks

As mentioned in [Adding checks](#adding-checks), failed checks are reported but they don't fail the test. If you want to fail your test when a certain error rate is reached, use a combinations of checks and thresholds.

```javascript
export const options = {
  thresholds: {
    checks: ['rate>=0.5'],
  },
};
```

The threshold above states that 50% or more of all checks in the test should be successful. Otherwise, the test will fail.
### Aborting test on fail

You can also optionally specify that a threshold should immediately abort a test if the threshold is reached:

```javascript
export const options = {
  thresholds: {
    // fail and abort the test if 95th percentile response goes above 500ms
    // delay the threshold evaluation for 1 min to gather enough data
    http_req_duration: [{ threshold: 'p(95)<500', abortOnFail: true, delayAbortEval: '1min' }],
  },
};
```

If the test ends with one or more failed thresholds, k6 will exit with a non-zero exit code, signaling to the CI/CD tool that the performance test step failed. This will stop the build/pipeline from progressing and notify you so you can take corrective action. [Notifications](#notifications) require additional setup, so we’ve provided further instructions on putting this in place in one of the sections down below.

## 5. Local vs. Cloud execution

When running your tests, k6 supports the following options:
- **Local execution**: run locally and view results locally (`k6 run ...`)
- **Cloud execution**: run on the cloud and view results on the cloud  (`k6 cloud ...`)
- **Stream results with local execution**: run locally and send results on the cloud (`k6 run -o cloud ...`)

In local execution mode, k6 will generate all the traffic from the machine where it's being run. In a CI pipeline, this would be the build servers. When executing a test locally, you can optionally stream the results to Grafana Cloud k6 for storage and visualization. In cloud execution mode, k6 will instead bundle up and send the main JS test file, and all dependent files, to Grafana Cloud k6 as an archive for execution on cloud infrastructure managed by our cloud service. 

The different modes of execution are appropriate for different use cases. Some general guidance follows:

| Use case                                                                                                                                                      | Execution mode  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Load test with <1000 VUs on a machine with consistent dedicated resources                                                                                     | Local execution |
| The target system is behind a firewall and not accessible from the public Internet                                                                            | Local execution |
| If your CI/CD tool is running jobs on machines/containers with varying amounts of resources                                                                   | Cloud execution |
| Need to run test from multiple geographic locations in a test                                                                                                 | Cloud execution |

### Authenticating with Grafana Cloud k6

If you decide to use the Grafana Cloud k6 service, either to stream results with local execution or through cloud execution, you'll need to authenticate with Grafana Cloud k6. The recommended way to do this is by setting the `K6_CLOUD_TOKEN` environment variable in your CI tool.

```bash
K6_CLOUD_TOKEN=$TOKEN k6 cloud script.js
```

Alternatively you can pass in your k6 Cloud token to `k6 login cloud` like so:

```bash
k6 login cloud -t <YOUR_K6_CLOUD_TOKEN>
```

To get your personal Grafana k6 Cloud API token, check out [Authenticate on the CLI](https://grafana.com/docs/grafana-cloud/k6/author-run/tokens-and-cli-authentication/).

## 5. Test frequency

The boring, but true, answer to the question of how often you should run load tests is that "it depends". It depends on a number of parameters. How often is your application changing? Do you need many or few VUs to generate the necessary load? How long is one full cycle of a VU iteration? etc. Testing a full user journey or just a single API endpoint or website page has different implications on the answer as well.

Consider these three factors when picking the best solution for you:

- VU iteration duration
- Your branching strategy
- Pre-production test environment

### VU iteration duration

A rule of thumb is that the shorter the "VU iteration duration" the more frequent you _can_ run your tests without introducing long delays in the development cycle feedback loop, or blocking your team mates' deployments from access to shared pre-production environments.

A quick re-cap of the [test life cycle](/using-k6/test-lifecycle) article:

```javascript
export default function () {
  // k6 will execute this default function in a loop for every VU
  // for the duration of the test run.
  // The duration it takes for a VU to complete one loop, or iteration,
  // of this function is what we refer to as "VU iteration duration".
}
```

You can find the VU iteration duration in the k6 terminal output:

![VI uteration duration in k6 terminal output](images/vu-iteration-duration-k6-cli.png)

### Branching strategy

Another important aspect to consider is your team's version control branching policy. If you are strict with keeping feature branches separate from you main team-wide development branch, and you have per-feature test environments, then you can also generally run load tests with a higher frequency than if your builds are competing for exclusive access to a shared pre-production environment.

It's also important to consider that load test might not need to run at the same frequency as unit or functional tests. Running load tests could just as well be run as part of Pull/Merge Request creation or when a feature branch gets merged into the main team-wide development branch. Both of these setup variants can be achieved with most CI tools.

### Pre-production test environment

As touched upon in the previous section, on branching strategy, the test environment is the third point to consider. We point out "pre-production" specifically as that is the best practices when it comes to load testing. If your team is at the maturity level of running chaos experiments in production then fine, run load test in production as well. If not, stick to pre-production.

Things to consider with your test environment:

- Make sure there's no other traffic hitting the same test environment as your test
- Make sure the system has an adequate amount of data in any database that is being accessed as a result of the test traffic
- Make sure databases only contains test data, and not real production data

### Guidance

Generalized, our recommendation is as follows, broken down by VU iteration duration:

| VU iteration duration | Test frequency         | Trigger mechanism                                                            |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| <10s                  | On every commit        | Commit push                                                                  |
| <60s                  | Daily/Nightly          | Scheduling, Pull/Merge Requests or when merging into main development branch |
| >60s                  | Couple of times a week | Scheduling, Pull/Merge Requests or when merging into main development branch |
| >5min                 | Once a week            | Scheduling, Pull/Merge Requests or when merging into main development branch |

**Scheduling**

Besides triggering tests based on commit events, we also often see users and customers use [cron](https://k6.io/blog/performance-monitoring-with-cron-and-k6) or CI tool equivalent mechanisms for running tests on off-hours or at a particular cadence.

If you're using k6 Cloud you can use the built in [scheduling feature](/cloud/manage/scheduled-tests) to trigger tests at a frequency of your choosing.

**Load test suite**

Do you need to run your full load test suite on every commit? Probably not, but in any case should not be the initial ambition. Repeating the advice from earlier in the guide, start small and expand from there. Start by evaluating the most business critical transactions/journeys you have in your system and start by automating those.

## 6. Notifications

Once you have your load tests integrated into a CI pipeline you should make sure you’re also getting notified whenever a build/pipeline fails. You might already get notification via email, Slack, Microsoft Teams or Webhook through your CI tool, but if not you can set it up as follows.

### For k6 OSS

There’s no builtin notification mechanism in k6 OSS, so you’d have to send a notification from the test script. One way to achieve this is by sending a notification event request to Slack or Microsoft Teams.

For Slack you need to first [setup an incoming webhook](https://slack.com/intl/en-se/help/articles/115005265063-Incoming-WebHooks-for-Slack). Once setup you get a webhook URL that you specify as the target of the POST request in the teardown function:

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(5.0);
}

export function teardown(data) {
  // send notification request to Slack API
  const event = {
    text: 'My test just finished!',
  };
  const res = http.post('https://hooks.slack.com/services/...', JSON.stringify(event), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

For Microsoft Teams you need to first [setup an incoming webhook connector](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook). Once setup you get a webhook URL that you specify as the target of the POST request in the teardown function:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
  // Increase teardown function timeout as MS Teams API seems to be slower than >10s
  teardownTimeout: '60s',
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(5.0);
}

export function teardown(data) {
  // send notification request to Microsoft Teams API
  const event = {
    text: 'My test just finished!',
  };
  const res = http.post('https://outlook.office.com/webhook/...', JSON.stringify(event), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

### For k6 cloud

If you are running cloud tests you can also configure custom email- and webhook [notifications in the k6.io cloud GUI](/cloud/manage/notifications). It includes several pre-made templates, such as for Slack and Microsoft Teams.


## Read more

We have written CI tool specific guides following the steps mentioned above:

<IntegrationsCiIconBlock />

<LdScript script='{"@context": "http://schema.org", "@type": "HowTo", "name": "How to automate performance testing", "description": "Automation is the end-goal for many organizations when it comes to understanding performance over time. This guide aims to lay down the steps and best practices for achieving your goal of performance testing automation.", "step": [{ "@type": "HowToStep", "url": "https://k6.io/docs/testing-guides/automated-performance-testing#installation-of-k6", "name": "Installation of k6", "text": "Install k6 on the machine running the CI jobs." }, { "@type": "HowToStep", "url": "https://k6.io/docs/testing-guides/automated-performance-testing#create-a-test", "name": "Create a test", "text": "Create and store the test files in version control, alongside application code." }, { "@type": "HowToStep", "url": "https://k6.io/docs/testing-guides/automated-performance-testing#pass-fail-criteria", "name": "Pass/fail criteria", "text": "Codify pass/fail criteria that can fail your tests when run in CI." }, { "@type": "HowToStep", "url": "https://k6.io/docs/testing-guides/automated-performance-testing#local-vs-cloud-execution", "name": "Local vs Cloud execution", "text": "Decide what type of tests to run." }, { "@type": "HowToStep", "url": "https://k6.io/docs/testing-guides/automated-performance-testing#test-frequency", "name": "Test frequency", "text": "Decide how often to run tests." }, { "@type": "HowToStep", "url": "https://k6.io/docs/testing-guides/automated-performance-testing#notifications", "name": "Notifications", "text": "Get notified when your tests fail." }]}'/>
