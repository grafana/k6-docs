---
title: 'Automated performance testing'
head_title: 'How to Automate Performance Testing: The k6 Guide'
excerpt: 'Automation is a hot topic in the testing community. This guide answers the WHY and HOW of Performance Testing Automation and gives you 6 steps to automate your performance tests.'
---

import {IntegrationsCiIconBlock} from 'templates/docs/integrations'

Automation, a hot topic in the broader testing community and somewhat of a holy grail, is the end-goal for many organizations when it comes to understanding performance over time. However, where to start, which tool to choose, or how to get there, is not always as straightforward. Especially if you don’t already have a lot of experience in performance engineering.

This guide aims to lay down the steps and best practices for achieving your goal of performance testing automation.

## Why automate performance tests?

Let’s start by examining why you would consider automating your performance tests. To do that we need to revisit why we run performance tests in the first place:

- **Avoid launch failures** leading to a missed opportunity window and wasted investments, e.g. your app or site crashing during a high-profile product launch event.
- **Avoid bad user experience** leading visitors and customers to go with the competition, and you ultimately losing revenue, e.g. churning hard won customers due to a non responsive app or website.
- **Avoid performance regressions** as code changes get deployed to your production system and put in front of end users. This is what this guide is primarily aimed at.

From here, the decision to go for automated testing is hopefully clear:

- **Shifting performance testing left**, making sure it happens as close to development as possible, giving developers an early feedback loop for performance matters.
- **Adding performance regression checks** to your Continuous Integration and Delivery (CI/CD) pipelines.

Of course not [all types of performance tests](/test-types/introduction) are suitable for automation, A/B type performance tests is one such type of performance test where it probably doesn’t make much sense to automate, unless you're aiming to compare the performance of A and B over time.

## Know your goals

Besides creating a test case itself, the most important step to ensure a successful performance testing automation project is to document your goals. What metrics, and values (in absolute terms; "response times should be less than 500ms", and not "response times should not be slow"), are important to you, your team and the business.

If you have established [Service Level Agreements (SLAs)](https://en.wikipedia.org/wiki/Service-level_agreement) in place with your customers, or just [Service Level Objectives (SLOs)](https://en.wikipedia.org/wiki/Service-level_objective) and [Service Level Indicators (SLIs)](https://en.wikipedia.org/wiki/Service_level_indicator) defined internally, then that’s a great starting point. If not, then it’s a great opportunity to bring stakeholders together and discuss what goals you should have defined to drive a performance culture.

Starting with the results of a baseline test is another good way to find a starting point for your goals. A baseline test is a test run with a single or very few <abbr title="Virtual Users">VUs</abbr> that you know your system can handle without breaking a sweat. The idea being that you'll get some real numbers on where your system is at in terms of latency and response time. It's important to make sure that your baseline test is not resulting in any unwanted errors and is functionally accurate.

From the perspective of human perceptive abilities, the following guidance points from [Nielsen Norman Group](https://www.nngroup.com/articles/response-times-3-important-limits/) might be of help when deciding on what latency and response time to aim for:

> - **0.1 second** is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.
> - **1.0 second** is about the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data.
> - **10 seconds** is about the limit for keeping the user's attention focused on the dialogue. For longer delays, users will want to perform other tasks while waiting for the computer to finish, so they should be given feedback indicating when the computer expects to be done. Feedback during the delay is especially important if the response time is likely to be highly variable, since users will then not know what to expect.

Once your goals are clear, you need to codify them as [thresholds](/using-k6/thresholds) which is the mechanism by which you specify pass/fail criteria in k6. More on that below.

## How to automate performance testing

Once your goals are clear, you can start introducing load tests into your automation pipelines. Running load tests from a continuous integration (CI) system is easy with k6. The set up can easily be generalized across the various CI tools into the following sequence of steps:

- [Why automate performance tests?](#why-automate-performance-tests)
- [Know your goals](#know-your-goals)
- [How to automate performance testing](#how-to-automate-performance-testing)
- [1. Installation of k6](#installation-of-k6)
- [2. Create a test](#create-a-test)
- [3. Pass/fail criteria](#passfail-criteria)
- [4. Local vs Cloud execution](#local-vs-cloud-execution)
  - [Authenticating with k6 Cloud](#authenticating-with-k6-cloud)
- [5. Test frequency](#test-frequency)
  - [VU iteration duration](#vu-iteration-duration)
  - [Branching strategy](#branching-strategy)
  - [Pre-production test environment](#pre-production-test-environment)
  - [Guidance](#guidance)
- [6. Notifications](#notifications)
  - [For k6 OSS](#for-k6-oss)
  - [For k6 cloud](#for-k6-cloud)
- [See also](#see-also)

We'll have a closer look at these general steps in more detail below.

## 1. Installation of k6

The first step to integrating load testing in your CI is to find and install a performance testing tool.

We built k6 for automation. It's a CLI tool that can integrate easily into your tech stack.

Installing k6 can be done in three different ways:

- Using one of the OS specific package managers
- Pulling the Docker image
- Downloading the binary for your OS

See the full [installation instructions](/get-started/installation) for more information.

Additionally, we also have available [guides for installing k6 in specific CI tools](/integrations#continuous-integration-and-continuous-delivery).

## 2. Create a test

If you haven’t already created test cases for your system, then we suggest having a read through one of our guides for creating tests for websites and APIs/microservices:

- [Website testing guide](/testing-guides/load-testing-websites)
- [API testing guide](/testing-guides/api-load-testing)

In general, when creating test cases the golden rule is to start small and then expanding from that initial starting point. Identify the most business critical transactions in your system and write test cases covering that part of the system.

**Version control test files**

One of the best practices that we advise users and customers to adopt is version controlling load tests, preferably alongside application code like other types of tests. In our experience this will lead to a higher likeliness of tests being maintained as the application evolves. It also affords you all the usual benefits of version controlling your code.

**Modules**

Once you’ve gained enough experience with test creation, we strongly advise you to [modularize your tests](/using-k6/modules) to make them common logic/patterns reusable across members of your team and different performance tests.

## 3. Pass/fail criteria

Every step in an automation pipeline either passes or fails. As mentioned in [Know your goals](/testing-guides/automated-performance-testing#know-your-goals), the mechanism by which k6 decides whether a test has passed or failed is called [thresholds](/using-k6/thresholds). Without your goals codified as thresholds there's no way for k6 to actually know if your test should be considered a success or failure.

A basic threshold on the 95th percentile of the response time metric looks like this:

```javascript
export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
};
```

You can setup thresholds on any metric in k6 and you can have multiple thresholds per metric. You can also optionally specify that a threshold should immediately abort a test if the threshold is reached. Adding that to the example above would look like this:

```javascript
export const options = {
  thresholds: {
    // fail and abort the test if 95th percentile response goes above 500ms
    // delay the threshold evaluation for 1 min to gather enought data
    http_req_duration: [{ threshold: 'p(95)<500', abortOnFail: true, delayAbortEval: '1min' }],
  },
};
```

If the test ends with one or more failed thresholds k6 will exit with a non-zero exit code signalling to the CI tool that the load test step failed, halting the build/pipeline from progressing further, and hopefully notifying you so you can take corrective action, but more on notifications further down below.

## 4. Local vs Cloud execution

k6 supports both local (`k6 run ...`) and cloud execution (`k6 cloud ...`) modes. In local execution mode k6 will generate all the traffic from the machine where it's being run. In CI this would be the build servers. When executing a test locally, you can optionally stream the results to k6 Cloud for storage and visualization (`k6 run -o cloud ...`). In cloud execution mode k6 will instead bundle up and send the main JS test file, and all dependent files, to k6 Cloud as an archive for execution on cloud infrastructure managed by our k6 Cloud service. The different modes of execution are appropriate for different use cases. Some general guidance follows:

| Use case                                                                                                                                                      | Execution mode  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Load test with <1000 VUs on a machine with consistent dedicated resources                                                                                     | Local execution |
| The target system is behind a firewall and not accessible from the public Internet                                                                            | Local execution |
| Can't ensure consistent dedicated resources locally for load test, e.g. your CI tool is running jobs on machines/containers with varying amounts of resources | Cloud execution |
| Need to run test from multiple geographic locations in a test                                                                                                 | Cloud execution |

### Authenticating with k6 Cloud

If you decide to use the k6 Cloud service, either to stream results with local execution (`k6 run -o cloud ...`) or through cloud execution, you'll need to authenticate with k6 Cloud. The recommended way to do this is by setting the `K6_CLOUD_TOKEN` environment variable in your CI tool.

```bash
K6_CLOUD_TOKEN=$TOKEN k6 cloud script.js
```

Alternatively you can pass in your k6 Cloud token to `k6 login cloud` like so:

```bash
k6 login cloud -t <YOUR_K6_CLOUD_TOKEN>
```

Get your k6 Cloud token from the [account settings page](https://app.k6.io/account/token).

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
