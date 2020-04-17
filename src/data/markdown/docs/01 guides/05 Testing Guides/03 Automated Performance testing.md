---
title: "Automated performance testing"
excerpt: "The why and how of automated load testing"
---

Automation, a hot topic in the larger testing community and somewhat of a holy graal, is the end-goal for many organizations when it comes to understanding performance over time. However, where to start or how to get there from where you’re currently at is not always straightforward, especially if you don’t already have a lot of experience in performance engineering. This guide aims to lay down the steps and best practices for achieving your goal to automate load testing.

## Why you should automate load tests

Let’s start by examining why you would consider automating your performance tests. To do that we need to revisit why we run performance tests in the first place:

- **Avoid launch failures** leading to a missed opportunity window and wasted investments, eg. your app or site crashing during a high-profile product launch event.
- **Avoid bad user experiences** leading visitors and customers to go with the competition, and you ultimately losing revenue, eg. churning hard won customers due to non responsive app or website.
- **Avoid performance regressions** as new code changes get deployed to your production system and put infront of end users. This is what this guide is primarily aimed at.

From here the decision to go for test automation is hopefully straightforward:

- **Shifting performance testing left**, making sure it happens as close to development as possible, giving developers an early feedback loop for performance matters.
- **Adding performance regression checks** to your Continuous Integration and Delivery (CI/CD) pipelines.

Of course not [all types of performance tests](/test-types/introduction) are suitable for automation, A/B type performance tests is one such type of performance test where it probably doesn’t make much sense to automate, unless you're aiming to compare the performance over time of A and B of course.

## Create test cases

If you haven’t already created test cases for your system then that’s the first step. If you don’t know where to start, then we suggest having a read through one of our guides for creating tests for websites and APIs/microservices:

- [Website testing guide](/testing-guides/load-testing-websites)
- [API testing guide](/testing-guides/api-load-testing)

In general, when creating test cases the golden rule is to start small and then expanding from that initial starting point. Identify the most business critical transactions in your system and write test cases covering that part of the system.

**Tip**: Once you’ve gained enough experience with test creation we strongly advise you to [modularize your tests](/using-k6/modules) to make them common logic/patterns reusable across members of your team, or teams across the larger organization.


## Know your goals

Besides the step of creating a test case itself, the most important step to ensure a successful load testing automation project is to spell out your goals. What metrics, and values (in absolute terms; "response times should be less than 500ms", and not just "response times should not be slow"), are important to you, your team and the business.

If you have established [Service Level Agreements (SLAs)](https://en.wikipedia.org/wiki/Service-level_agreement) in place with your customers, or just [Service Level Objectives (SLOs)](https://en.wikipedia.org/wiki/Service-level_objective) and [Service Level Indicators (SLIs)](https://en.wikipedia.org/wiki/Service_level_indicator) defined internally, then that’s a great starting point. If not, then it’s a great opportunity to bring stakeholders together and discuss what goals you should have defined to drive a performance culture.

Starting with the results of a baseline test is another good way to find a starting point for your goals. A baseline test is a test run with a single or very few <abbr title="Virtual Users">VUs</abbr> that you know your system can handle without breaking a sweat. The idea being that you'll get some real numbers on where your system is at in terms of latency and response time. Important to make sure that your baseline test is not resulting in any unwanted errors and is functionally accurate.

From the perspective of human perceptive abilities, the following guidance points from [Nielsen Norman Group](https://www.nngroup.com/articles/response-times-3-important-limits/) might be of help when deciding on what latency and response time to aim for:

> - **0.1 second** is about the limit for having the user feel that the system is reacting instantaneously, meaning that no special feedback is necessary except to display the result.
> - **1.0 second** is about the limit for the user's flow of thought to stay uninterrupted, even though the user will notice the delay. Normally, no special feedback is necessary during delays of more than 0.1 but less than 1.0 second, but the user does lose the feeling of operating directly on the data.
> - **10 seconds** is about the limit for keeping the user's attention focused on the dialogue. For longer delays, users will want to perform other tasks while waiting for the computer to finish, so they should be given feedback indicating when the computer expects to be done. Feedback during the delay is especially important if the response time is likely to be highly variable, since users will then not know what to expect.

Once your goals are clear, you need to codify them as [thresholds](/using-k6/thresholds) which is the mechanism by which you specify pass/fail criteria in k6. More on that below.

## Integrate with CI

Once your goals are clear, you can start introducing load tests into your automation pipelines. Running load tests from a continuous integration (CI) system is very simple with k6. The set up can easily be generalized across the various CI tools into the following sequence of steps:

- **Installation**: Install k6 on the server/VM/container that will be running the CI jobs.
- **Version control test files**: Store your test files in version control, alongside application code.
- **Pass/fail criteria**: Codify pass/fail criteria as thresholds so that k6 can pass/fail your tests when run in CI.
- **Local vs Cloud execution**: Decide how to run tests.
- **Test frequency**: Decide how often to run tests.
- **Notifications**: Get notified in your team communication tool of choice when your tests fail.

We'll have a closer look at these general steps in more detail below. You'll find CI tool specific guides further down.


## Installation of k6

To run load tests in your CI tool of choice, the first step is to install k6. There are 3 ways to do this:

- Using one of the OS specific package managers
- Pulling the k6 Docker image
- Downloading the k6 binary for your OS

See the full [installation instructions](/getting-started/installation) for more information.

## Version control test files

One of the best practices that we advise users and customers to adopt is version controlling load tests, preferably alongside application code like other types of tests. In our experience this will lead to a higher likeliness of tests being maintained as the application evolves. It also affords you all the usual benefits of version controlling your code.

## Pass/fail criteria

Every step in an automation pipeline either passes or fails. As mentioned in [Know your goals](/testing-guides/automated-performance-testing#know-your-goals), the mechanism by which k6 decides whether a test has passed or failed is called [thresholds](/using-k6/thresholds). Without your goals codifed as thresholds there's no way for k6 to actually know if your test should be considered a success or failure.

A basic threshold on the 95th percentile of the response time metric looks like this:

```js
export let options = {
    thresholds: {
        // fail the test if 95th percentile response goes above 500ms
        "http_req_duration": ["p(95)<500"]
    }
};
```

You can setup thresholds on any metric in k6 and you can have multiple thresholds per metric. You can also optionally specify that a threshold should immediately abort a test if the threshold is reached. Adding that to the example above would look like this:

```js
export let options = {
    thresholds: {
        // fail and abort the test if 95th percentile response goes above 500ms
        // delay the threshold evaluation for 1 min to gather enought data
        "http_req_duration": [
            { threshold: "p(95)<500", abortOnFail: true, delayAbortEval: "1min" }
        ]
    }
};
```

If the test ends with one or more failed thresholds k6 will exit with a non-zero exit code signalling to the CI tool that the load test step failed, halting the build/pipeline from progressing further, and hopefully notifiying you so you can take corrective action, but more on notifications further down below.

## Local vs Cloud execution

k6 supports both local (`k6 run ...`) and cloud execution (`k6 cloud ...`) modes. In local execution mode k6 will generate all the traffic from the machine where it's being run. In CI this would be the build servers. When executing a test locally, you can optionally stream the results to k6 Cloud for storage and visualization (`k6 run -o cloud ...`). In cloud execution mode k6 will instead bundle up and send the main JS test file, and all dependent files, to k6 Cloud as an archive for execution on cloud infrastructure managed by our k6 Cloud service. The different modes of execution are appropriate for different use cases. Some general guidance follows:

| Use case | Execution mode |
| --------------------- | -------------- |
| Load test with <1000 VUs on a machine with consistent dedicated resources | Local execution |
| The target system is behind a firewall and not accessible from the public Internet | Local execution |
| Can't ensure consistent dedicated resources locally for load test, eg. your CI tool is running jobs on machines/containers with varying amounts of resources | Cloud execution |
| Need to run test from multiple geographic locations in a test | Cloud execution |

### Authenticating with k6 Cloud

If you decide to use the k6 Cloud service, either to stream results with local execution (`k6 run -o cloud ...`) or through cloud execution, you'll need to authenticate with k6 Cloud. The recommended way to do this is by setting the `K6_CLOUD_TOKEN` environment variable in your CI tool. Alternatively you can pass in your k6 Cloud token to `k6 login cloud` like so:

```bash
k6 login cloud -t <YOUR_K6_CLOUD_TOKEN>
```

Get your k6 Cloud token from the [account settings page](https://app.k6.io/account/token).

## How often to run tests

The boring, but true, answer to the question of how often you should run load tests is that "it depends". It depends on a number of parameters. How often is your application changing? Do you need many or few VUs to generate the necessary load? How long is one full cycle of a VU iteration? etc. Testing a full user journey or just a single API endpoint or website page has different implications on the answer as well.

There are three primary factors that will affect what solution is the best for you:

- VU iteration duration
- Your branching strategy
- Pre-production test environment

### VU iteration duration

A rule of thumb is that the shorter the "VU iteration duration" the more frequent you *can* run your tests without introducing long delays in the development cycle feedback loop, or blocking your team mates' deployments from access to shared pre-production environments.

A quick re-cap of the [test life cycle](/using-k6/test-life-cycle) article:

```js
export default function() {
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

As touched upon in the previous section, on branching strategy, the test environment is the third point to consider. We point out "pre-production" specifically as that is the best practices when it comes to load testing. If your team is at the maturity level of running chaos experiments in productionn then fine, run load test in production as well. If not, stick to pre-production.

Things to consider with your test environment:

- Make sure there's no other traffic hitting the same test environment as your test
- Make sure the system has an adequate amount of data in any database that is being accessed as a result of the test traffic
- Make sure databases only contains test data, and not real production data

### Guidance

Generalized, our recommendation is as follows, broken down by VU iteration duration:

| VU iteration duration | Test frequency | Trigger mechanism |
| --------------------- | -------------- | -------------- |
| <10s | On every commit | Commit push |
| <60s | Daily/Nightly | Scheduling, Pull/Merge Requests or when merging into main development branch |
| >60s | Couple of times a week | Scheduling, Pull/Merge Requests or when merging into main development branch |
| >5min | Once a week | Scheduling, Pull/Merge Requests or when merging into main development branch |

**Scheduling**

Besides triggering tests based on commit events, we also often see users and customers use [cron](https://k6.io/blog/performance-monitoring-with-cron-and-k6) or CI tool equivalent mechanisms for running tests on off-hours or at a particular cadence.

If you're using k6 Cloud you can use the built in [scheduling feature](/cloud/creating-and-running-a-test/scheduling-tests) to trigger tests at a frequency of your chosing.

**Load test suite**

Do you need to run your full load test suite on every commit? Probably not, but in any case should not be the initial ambition. Repeating the advice from earlier in the guide, start small and expand from there. Start by evaluating the most business critical transactions/journeys you have in your system and start by automating those.

## Notifications

Once you have your load tests integrated into a CI pipeline you should make sure you’re also getting notified whenever a build/pipeline fails. You might already get notification via email, Slack, Microsoft Teams or Webhook through your CI tool, but if not you can set it up as follows.

### For k6 OSS

There’s no builtin notification mechanism in k6 OSS, so you’d have to send a notification from the test script. One way to achieve this is by sending a notification event request to Slack or Microsoft Teams.

For Slack you need to first [setup an incoming webhook](https://slack.com/intl/en-se/help/articles/115005265063-Incoming-WebHooks-for-Slack). Once setup you get a webhook URL that you specify as the target of the POST request in the teardown function:

```js
import {sleep} from "k6";
import http from "k6/http";

export let options = {
    thresholds: {
        // fail the test if 95th percentile response goes above 500ms
        "http_req_duration": ["p(95)<500"]
    }
};

export default function() {
	http.get('https://test.k6.io/');
	sleep(5.0);
}

export function teardown(data) {
    // send notification request to Slack API
    let event = {
        text: 'My test just finished!',
	};
    let res = http.post('https://hooks.slack.com/services/...',
        JSON.stringify(event), { headers: { 'Content-Type': 'application/json' } });
}
```

For Microsoft Teams you need to first [setup an incoming webhook connector](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook). Once setup you get a webhook URL that you specify as the target of the POST request in the teardown function:

```js
import http from "k6/http";
import {sleep} from "k6";

export let options = {
    thresholds: {
        // fail the test if 95th percentile response goes above 500ms
        "http_req_duration": ["p(95)<500"]
    },
    // Increase teardown function timeout as MS Teams API seems to be slower than >10s
	teardownTimeout: '60s'
};

export default function() {
	http.get('https://test.k6.io/');
	sleep(5.0);
}

export function teardown(data) {
	// send notification request to Microsoft Teams API
    let event = {
        text: "My test just finished!"
	};
    let res = http.post('https://outlook.office.com/webhook/...',
        JSON.stringify(event), { headers: { 'Content-Type': 'application/json' } });
}
```

### For k6 cloud

If you’re running your tests from k6 Cloud then you can make use of our [Slack integration](/cloud/integrations/notifications#slack).


## CI integration guides

We have written CI tool specific guides following the steps mentioned above:

<ul class="row icons-container_lNxy1"><li class="col col-2 icon-wrapper_XD-a0"><a class="link_2K-pj" href="https://k6.io/blog/integrating-load-testing-with-jenkins"><svg viewBox="0 0 226 312" class="icon_HSr2I"><path d="M222.147 150.42c0 61.786-48.968 111.874-109.375 111.874-60.405 0-109.374-50.088-109.374-111.874 0-61.788 48.97-111.876 109.374-111.876 60.407 0 109.375 50.088 109.375 111.876" fill="#d33833" fill-rule="evenodd"></path><path d="M7.855 178.127s-7.918-116.666 99.583-120l-7.5-12.5-58.333 19.584L24.94 84.377l-14.584 27.918-8.334 32.5 2.5 21.666" fill="#ef3d3a"></path><path d="M37.86 74.101C18.67 93.736 6.795 120.846 6.795 150.838c0 29.985 11.875 57.098 31.065 76.73 19.2 19.63 45.659 31.745 74.911 31.745 29.253 0 55.714-12.114 74.912-31.746 19.188-19.631 31.066-46.745 31.066-76.73 0-29.99-11.878-57.1-31.066-76.736-19.198-19.627-45.66-31.741-74.912-31.743-29.252.002-55.711 12.116-74.91 31.743zm-4.857 158.215C12.608 211.46 0 182.634 0 150.838c0-31.802 12.608-60.624 33.003-81.483 20.39-20.863 48.614-33.794 79.768-33.79 31.154-.004 59.381 12.927 79.768 33.79 20.396 20.859 33.006 49.684 33.004 81.483.002 31.796-12.608 60.621-33.004 81.478-20.386 20.862-48.614 33.791-79.768 33.791-31.154 0-59.378-12.93-79.768-33.79" fill="#231f20"></path><path d="M158.814 151.04l-16.668 2.5-22.5 2.5-14.584.416-14.166-.416-10.834-3.334-9.583-10.416-7.5-21.25-1.667-4.584-10-3.332-5.833-9.584-4.167-13.75 4.584-12.084 10.833-3.75 8.75 4.168 4.167 9.166 5-.834 1.666-2.082-1.666-9.584-.417-12.084 2.5-16.666-.098-9.52 7.598-12.146 13.333-9.584 23.334-10 25.833 3.75 22.5 16.25 10.417 16.666 6.667 12.084 1.666 30-5 25.834-9.167 22.916-8.75 12.084" fill="#f0d6b7" fill-rule="evenodd"></path><path d="M144.646 223.123l-59.584 2.5v10l5 35-2.5 2.917-41.666-14.168-2.917-5-4.167-47.082-9.582-28.334-2.084-6.666 33.333-22.916 10.417-4.168 9.166 11.25 7.917 7.084 9.167 2.916 4.166 1.25 5 21.667 3.75 4.583 9.584-3.333-6.667 12.917 36.25 17.083-4.583 2.5" fill="#335061" fill-rule="evenodd"></path><path d="M45.896 77.706l10.832-3.75 8.75 4.168 4.168 9.166 5-.834 1.25-5-2.5-9.582 2.5-22.918-2.084-12.5 7.5-8.75 16.25-12.916-4.583-6.25-22.917 11.25-9.584 7.5-5.416 11.666-8.334 11.25-2.5 13.334 1.668 14.166" fill="#6d6b6d" fill-rule="evenodd"></path><path d="M62.979 38.5    4s6.25-15.416 31.25-22.916 1.25-5.418 1.25-5.418L68.395 20.624 57.978 31.04l-4.582 8.334 9.582-.834M50.479 74.79s-8.75-29.168 24.583-33.334l-1.25-5-22.916 5.418-6.667 21.666 1.667 14.166 4.582-2.916" fill="#dcd9d8" fill-rule="evenodd"></path><path d="M63.812 113.54l5.456-5.286s2.462.286 2.878 3.202c.416 2.918 1.666 29.168 19.582 43.335 1.635 1.293-13.332-2.085-13.332-2.085l-13.334-20.832M140.481 105.624s.972-12.63 4.373-11.659c3.401.971 3.401 4.373 3.401 4.373s-8.26 5.343-7.774 7.286" fill="#f7e4cd" fill-rule="evenodd"></path><path d="M175.063 59.374s-6.868 1.45-7.5 7.5c-.633 6.051 7.5 1.25 8.75.834M124.646 59.791s-9.167 1.25-9.167 7.083 10.417 5.417 13.334 2.917" fill="#f7e4cd"></path><path d="M67.978 86.874s-15.833-9.584-17.5-.416c-1.666 9.166-5.417 15.833 2.5 25.416l-5.416-1.666-5-12.917-1.666-12.5 9.582-10.001 10.834.834 6.25 5 .416 6.25M75.478 60.624s7.084-36.666 42.918-43.75c29.502-5.831 44.999 1.25 50.833 7.916 0 0-26.25-31.249-51.25-21.666-25 9.584-43.333 27.084-42.917 38.332.71 19.16.416 19.168.416 19.168M172.146 28.956s-12.082-.416-12.5 10.418c0 0-.001 1.666.833 3.332 0 0 9.585-10.833 15.417-5" fill="#f7e4cd" fill-rule="evenodd"></path><path d="M119.236 43.835s-2.08-16.629-16.258-6.961c-9.166 6.25-8.332 15-6.666 16.666 1.666 1.667 1.213 5.024 2.482 2.72 1.268-2.304.85-9.804 5.434-11.886 4.584-2.084 12.098-4.412 15.008-.539" fill="#f7e4cd" fill-rule="evenodd"></path><path d="M80.062 156.456l-39.166 17.5s16.25 64.584 7.916 84.584l-5.834-2.083-.416-24.583-10.832-46.666-4.584-12.918 40.832-27.499 12.084 11.665M84.09 192.178l5.556 6.78v25h-6.667s-.833-17.5-.833-19.584c0-2.084.833-9.584.833-9.584M84.228 227.708l-18.75.832 5.418 3.75 13.332 2.084" fill="#49728b" fill-rule="evenodd"></path><path d="M148.396 223.54l15.417-.416 3.75 38.333-15.834 2.083-3.333-40" fill="#335061" fill-rule="evenodd"></path><path d="M152.563 223.54l23.333-1.25s9.583-24.167 9.583-25.417 8.334-35 8.334-35l-18.75-19.582-3.75-3.334-10 10v38.75l-8.75 35.833" fill="#335061" fill-rule="evenodd"></path><path d="M162.979 220.623l-14.583 2.917 2.083 11.668c5.416 2.5 14.584-4.168 14.584-4.168M163.396 147.708l29.167 21.666.833-10-22.083-20.416-7.917 8.75" fill="#49728b" fill-rule="evenodd"></path><path d="M98.689 305.627l-8.627-35.005-4.29-25.828-.71-19.172 39.044-2.078 24.29-.004-2.208 43.754 3.75 33.75-.417 6.25-31.665 2.5-19.167-4.167" fill="#fff" fill-rule="evenodd"></path><path d="M142.979 223.123s-2.083 43.334 4.167 74.167c0 0-12.5 7.918-30.834 10l35-1.25 4.167-2.5-5-68.333-1.25-14.585" fill="#dcd9d8" fill-rule="evenodd"></path><path d="M168.272 258.127l16.25-4.583 30.833-1.666 4.584-14.167-8.334-24.584-9.582-1.25-13.334 4.167-12.793 6.246-6.791-1.246-5.293 2.08" fill="#fff" fill-rule="evenodd"></path><path d="M167.979 249.79s10.832-4.999 12.5-4.582l-4.583-22.918 5.417-2.083s3.75 21.666 3.75 24.166c0 0 23.332 1.25 25.416 1.25 0 0 5-9.583 3.75-19.583l4.583 13.333.417 7.5-6.667 10-7.5 1.667-12.5-.417-4.166-5.416-14.583 2.083-4.584 1.667" fill="#dcd9d8" fill-rule="evenodd"></path><path d="M151.605 220.211l-9.166-23.334-9.584-13.75s2.083-5.833 5-5.833h9.584l9.166 3.333-.832 15.417-4.168 24.167" fill="#fff"></path><path d="M153.396 212.29s-11.667-22.499-11.667-25.832c0 0 2.082-5 5-3.75 2.917 1.25 9.167 4.582 9.167 4.582v-7.916l-14.167-2.918-9.583 1.25 16.25 38.334 3.333.418" fill="#dcd9d8" fill-rule="evenodd"></path><path d="M102.439 157.295l-11.543-1.255-10.834-3.334v3.75l5.293 5.838 16.667 7.5" fill="#fff"></path><path d="M83.813 158.544s12.918 5.417 17.084 4.167l.415 4.995-11.665-2.495-7.084-5 1.25-1.667" fill="#dcd9d8" fill-rule="evenodd"></path><path d="M168.227 178.713c-7.07-.208-13.457-1.048-19.05-2.625.38-2.293-.33-4.543.24-6.194 1.56-1.123 4.172-1.105 6.528-1.369-2.037-1.001-4.9-1.398-7.251-.819-.055-1.591-.769-2.577-1.201-3.822 3.975-1.419 13.358-10.72 18.637-7.64 2.515 1.465 3.584 9.832 3.779 13.901.162 3.375-.306 6.78-1.681 8.568" fill="#d33833" fill-rule="evenodd"></path><path d="M168.227 178.713c-7.07-.208-13.457-1.048-19.05-2.625.38-2.293-.33-4.543.24-6.194 1.56-1.123 4.172-1.105 6.528-1.369-2.037-1.001-4.9-1.398-7.251-.819-.055-1.591-.769-2.577-1.201-3.822 3.975-1.419 13.358-10.72 18.637-7.64 2.515 1.465 3.584 9.832 3.779 13.901.162 3.375-.306 6.78-1.681 8.568z" fill="none" stroke="#d33833" stroke-width="2.5"></path><path d="M134.419 167.155c-.019.535-.042 1.074-.063 1.614-2.207 1.45-5.771 1.432-8.194 2.651 3.572.156 6.383 1.016 8.815 2.229l-.157 4.041c-4.046 2.77-7.742 6.895-12.507 9.493-2.252 1.228-10.157 4.39-12.554 3.83-1.356-.314-1.478-1.997-2.02-3.583-1.155-3.396-3.813-8.803-4.045-13.915-.296-6.457-.947-17.28 6.012-15.95 5.614 1.071 12.144 3.658 16.49 6.033 2.656 1.452 4.193 3.247 8.223 3.557" fill="#d33833" fill-rule="evenodd"></path><path d="M134.419 167.155c-.019.535-.042 1.074-.063 1.614-2.207 1.45-5.771 1.432-8.194 2.651 3.572.156 6.383 1.016 8.815 2.229l-.157 4.041c-4.046 2.77-7.742 6.895-12.507 9.493-2.252 1.228-10.157 4.39-12.554 3.83-1.356-.314-1.478-1.997-2.02-3.583-1.155-3.396-3.813-8.803-4.045-13.915-.296-6.457-.947-17.28 6.012-15.95 5.614 1.071 12.144 3.658 16.49 6.033 2.656 1.452 4.193 3.247 8.223 3.557z" fill="none" stroke="#d33833" stroke-width="2.5"></path><path d="M138.438 174.86c-.618-3.518-1.332-4.521-1.055-7.59 9.38-6.255 11.142 10.744 1.054 7.59" fill="#d33833" fill-rule="evenodd"></path><path d="M138.438 174.86c-.618-3.518-1.332-4.521-1.055-7.59 9.38-6.255 11.142 10.744 1.054 7.59z" fill="none" stroke="#d33833" stroke-width="2.5"></path><path d="M152.021 177.711s-2.917-4.167-.833-5.417c2.083-1.25 4.167.001 5.417-2.083s0-3.334.416-5.834c.416-2.5 2.501-2.917 4.584-3.333 2.083-.417 7.917-1.25 8.75.833l-2.5-7.5-5-1.666-15.834 9.166-.834 4.584v9.166M108.272 191.461c-.501-6.502-1.03-12.996-1.62-19.492-.882-9.7 2.33-8.008 10.738-8.008 1.284 0 7.908 1.531 8.381 2.5 2.273 4.641-3.8 3.61 2.618 7.11 5.417 2.954 14.987-1.793 12.799-8.36-1.225-1.46-6.383-.455-8.232-1.414l-9.765-5.062c-4.142-2.149-13.713-5.281-18.129-2.279-11.188 7.609.706 26.62 4.697 34.558" fill="#ef3d3a" fill-rule="evenodd"></path><path d="M119.236 43.835c-11.357-2.645-17 4.752-20.442 12.425-3.074-.745-1.85-4.925-1.074-7.055 2.032-5.59 10.224-13.031 16.918-12.023 2.88.434 6.778 3.068 4.598 6.653M174.569 56.767l.539.022c2.566 5.331 4.787 10.978 8.024 15.685-2.168 5.051-16.422 9.521-16.202.451 3.083-1.348 8.404-.275 11.136-1.996-1.58-4.337-3.86-8.028-3.497-14.162M125.05 56.906c2.435 4.464 3.228 9.154 6.689 12.528 1.559 1.519 4.59 3.37 3.087 7.594-.351.996-2.917 3.217-4.398 3.653-5.412 1.598-18.02.33-13.75-6.416 4.474.209 10.49 2.906 13.835-.343-2.57-4.106-7.149-12.23-5.463-17.016M172.537 102.274c-8.147 5.234-17.232 10.925-30.582 9.605-2.853-2.48-3.94-7.999-1.169-11.644 1.443 2.48.536 7.041 4.556 7.728 7.575 1.296 16.392-4.634 21.84-6.707 3.38-5.696-.29-7.791-3.334-11.457-6.232-7.511-14.59-16.821-14.287-28.066 2.519-1.827 2.736 2.787 3.098 3.627 3.254 7.615 11.442 17.354 17.419 23.871 1.467 1.605 3.883 3.145 4.152 4.207.775 3.086-2.016 6.783-1.693 8.836M65.127 96.764c-2.554-1.458-3.162-7.878-6.16-8.06-4.284-.26-3.503 8.329-3.486 13.351-2.95-2.677-3.468-10.921-1.301-15.155-2.47-1.212-3.572 1.338-4.942 2.236 1.76-12.787 18.706-5.931 15.889 7.628M177.725 107.599c-3.792 7.219-9.157 15.169-20.286 15.4-.226-2.331-.4-5.879.012-7.283 8.508-.817 13.76-5.147 20.274-8.117M124.408 112.279c7.098 3.732 20.143 4.134 29.79 3.851.518 2.114.506 4.725.526 7.302-12.401.62-27.064-2.45-30.316-11.153M123.06 119.239c4.907 12.323 21.777 10.905 36.004 10.565-.626 1.6-1.984 3.49-3.671 4.173-4.56 1.855-17.133 3.263-23.462-.098-4.014-2.134-6.592-6.955-8.791-9.781-1.062-1.366-6.35-4.852-.08-4.86" fill="#231f20" fill-rule="evenodd"></path><path d="M171.945 187.217c-5.76 9.865-11.271 19.998-18.105 28.7 2.865-8.424 4.091-22.523 4.524-33.272 5.994-2.805 11.126.631 13.581 4.572" fill="#81b0c4" fill-rule="evenodd"></path><path d="M202.94 222.674c-6.449 1.29-10.98 7.558-17.271 7.156 3.457-4.874 9.516-6.929 17.271-7.156M205.785 232.766c-5.256.555-11.43 1.406-16.761.968 2.523-3.855 12.247-2.525 16.761-.968M207.606 241.467c-5.907.128-13.25.01-18.865-.46 3.321-3.568 15.034-1.324 18.865.46" fill="#231f20" fill-rule="evenodd"></path><path d="M160.83 265.279c.847 7.419 3.789 14.936 3.42 23.06-3.266 1.102-5.143 2.066-9.519 2.06-.309-6.905-1.232-17.461-.956-24.044 2.152.143 5.326-1.538 7.055-1.076" fill="#dcd9d8" fill-rule="evenodd"></path><path d="M151.306 155.939c-2.966 1.936-5.492 4.354-8.341 6.421-6.318.312-9.765-.438-14.406-4.065.076-.291.542-.161.56-.519 6.762 3.014 15.359-1.227 22.187-1.837" fill="#f0d6b7" fill-rule="evenodd"></path><path d="M115.806 202.036c1.858-8.051 9.138-12.221 15.749-16.655 6.824 8.66 10.974 19.798 15.544 30.545-10.798-3.255-21.83-8.536-31.293-13.89" fill="#81b0c4" fill-rule="evenodd"></path><path d="M153.775 266.355c-.276 6.582.647 17.139.956 24.044 4.377.006 6.253-.958 9.519-2.06.369-8.124-2.572-15.641-3.42-23.06-1.729-.462-4.902 1.219-7.055 1.076zm-68.143-37.436c2.886 26.529 7.066 48.83 14.732 72.321 17.014 5.166 37.525 5.616 52.564.955-2.762-13.259-1.555-29.401-3.17-43.55-1.215-10.635-.595-21.335-2.263-32.185-18.222-3.791-43.98-.886-61.863 2.459zm66.172-2.292c-.154 11.393.51 22.632 1.38 34.04 4.375-.657 7.344-1.096 11.409-1.987-1.32-10.982-1.158-23.34-3.847-33.055-3.107.03-5.844-.036-8.942 1.002zm22.194-1.837c-2.077-.476-4.494-.018-6.478.02.932 9.288 3.195 19.536 3.991 29.285 3.122.097 4.789-1.375 7.357-1.87.137-8.557-.748-20.347-4.87-27.435zm33.605 30.704c6.506-1.58 10.597-9.55 8.777-17.733-1.221-5.5-3.396-15.856-5.724-19.375-1.72-2.602-6.383-6.01-10.107-3.625-6.058 3.88-16.729 5.005-21.146 9.7 2.215 7.375 2.902 17.505 3.816 26.85 7.567.472 16.879-2.082 23.172.628-4.393 1.423-10.095 1.435-13.891 3.509 3.103 1.498 10.366 1.196 15.103.046zm-60.504-39.568c-4.57-10.747-8.72-21.884-15.544-30.545-6.611 4.434-13.891 8.604-15.75 16.655 9.464 5.354 20.496 10.635 31.294 13.89zm11.265-33.281c-.433 10.748-1.659 24.848-4.524 33.272 6.834-8.702 12.345-18.834 18.105-28.7-2.455-3.94-7.587-7.377-13.581-4.572zm-12.77-4.537c-2.589-.28-4.786 2.976-8.153 1.568-.771.853-1.472 1.777-2.258 2.609 7.435 8.96 10.813 21.672 16.556 32.202 3.081-10.115 2.726-21.196 3.405-32.236-4.234.269-6.583-3.829-9.55-4.144zm-8.211-10.838c-.277 3.069.437 4.072 1.055 7.59 10.087 3.154 8.326-13.845-1.055-7.59zm-11.187-3.673c-4.346-2.375-10.876-4.96-16.49-6.032-6.96-1.331-6.307 9.492-6.012 15.95.232 5.112 2.89 10.519 4.045 13.915.542 1.586.664 3.269 2.02 3.584 2.397.558 10.302-2.603 12.555-3.831 4.764-2.598 8.46-6.723 12.506-9.493.053-1.348.104-2.694.158-4.041-2.433-1.213-5.244-2.073-8.815-2.229 2.422-1.219 5.986-1.201 8.193-2.651.022-.54.044-1.079.063-1.614-4.03-.31-5.566-2.105-8.223-3.558zm-41.517-7.54c-3.607 3.662 10.118 8.654 14.489 8.923-.025-2.317 1.32-4.502 1.05-6.165-5.191-.911-12.012-.31-15.539-2.759zm44.44 1.72c-.018.357-.484.227-.56.518 4.641 3.628 8.089 4.378 14.406 4.065 2.849-2.067 5.375-4.485 8.341-6.421-6.828.61-15.425 4.851-22.187 1.837zm40.79 12.368c-.195-4.069-1.264-12.436-3.779-13.901-5.279-3.081-14.662 6.221-18.637 7.64.432 1.245 1.146 2.231 1.2 3.822 2.352-.578 5.215-.182 7.252.819-2.356.264-4.969.246-6.527 1.369-.572 1.651.14 3.901-.24 6.194 5.592 1.577 11.98 2.417 19.05 2.625 1.375-1.788 1.843-5.193 1.68-8.568zm-91.303-10.546c-1.133-.808-8.796-10.779-9.846-10.365-13.867 5.469-26.834 14.925-38.42 23.869 11.047 23.705 15.506 52.747 16.294 80.74 12.656 5.918 23.771 14.451 40.944 15.342-1.987-14.06-3.801-26.604-4.93-39.841-4.314-1.82-10.504.082-14.542-.564-.035-4.866 6.167-2.131 6.683-5.403.39-2.476-3.412-2.663-2.174-6.56 3.157 1.147 4.814 3.681 8.18 4.633 3.077-6.73-.042-18.638.401-24.263.084-1.056.528-5.85 2.893-5.01 2.094.745-.12 12.753.11 18.077.21 4.905-.592 9.65 1.394 12.73 16.594-2.259 33.457-3.719 51.412-4.212-3.95-1.694-8.643-3.298-13.787-6.198-2.79-1.573-11.58-4.844-12.386-7.493-1.284-4.221 3.37-6.47 4.166-10.088-8.377 4.568-10.011-4.38-11.993-10.718-1.795-5.741-2.817-10.03-3.257-13.341-7.216-3.44-14.931-6.924-21.142-11.335zm83.974-9.159c11.554-5.602 13.636 20.939 9.108 29.489.7 2.55 3.107 3.526 4.09 5.819-6.448 11.55-13.61 22.33-20.188 33.745 4.894-3.047 11.884-.545 17.643-2.825 2.105-.833 3.628-5.652 5.222-9.507 4.384-10.606 8.986-23.977 11.034-34.098.462-2.307 1.722-7.332 1.44-9.384-.504-3.675-5.49-6.4-8.026-8.673-4.673-4.197-7.615-7.891-12.49-11.816-1.975 2.918-6.217 4.878-7.833 7.25zM52.183 47.98c-5.506 6.058-4.353 17.408-3.687 25.483 9.951-6.26 23.16.495 23.035 11.142 4.75-.126 1.775-5.934.915-9.675-2.808-12.22 4.732-25.496.342-36.671-8.523.646-15.525 4.127-20.605 9.721zm39.392-35.157C79.11 16.355 63.138 25.41 58.017 36.608c3.965-.577 6.718-2.577 10.63-2.824 1.479-.096 3.416.62 5.115.197 3.387-.84 6.244-8.432 8.799-11.257 2.49-2.759 5.483-3.938 7.532-6.453 1.316-.635 3.262-.591 3.336-2.567-.57-.61-1.17-1.075-1.854-.881zm64.879 3.322c-12.936-7.299-34.833-12.789-48.594-5.929-11.103 5.537-26.112 14.697-31.23 26.304 4.781 11.201-1.415 21.465-1.81 32.838-.21 6.05 2.849 11.333 3.083 17.92-1.636 2.7-6.633 3.032-10.093 2.847-1.164-5.827-3.203-12.377-9.204-13.035-8.491-.929-14.7 6.099-15.085 13.443-.457 8.636 6.633 22.95 16.682 21.956 3.882-.384 4.835-4.275 9.065-4.235 2.292 4.574-3.536 6.01-4.136 9.281-.156.845.483 4.148.855 5.696 1.826 7.542 5.894 17.302 9.9 23.043 5.082 7.282 15.069 8.38 25.812 9.094 1.92-4.134 8.988-3.794 13.594-2.713-5.52-2.186-10.652-7.486-14.905-12.178-4.885-5.382-9.834-11.156-10.084-18.19 9.232 12.807 16.86 23.992 33.646 29.625 12.703 4.26 27.538-1.952 37.298-8.806 4.05-2.849 6.467-7.369 9.346-11.506 10.771-15.494 15.797-37.609 14.692-59.044-.455-8.84-.435-17.65-3.401-23.597-3.1-6.219-13.585-11.783-19.722-6.158-1.138-6.047 5.103-9.787 12.435-7.611-5.228-6.746-10.714-14.852-18.144-19.045zm24.101 199.459c10.109-5.025 28.996-13.526 35.334.019 2.339 4.992 5.082 13.432 6.294 18.586 1.71 7.271-1.855 22.554-9.33 24.994-6.6 2.154-14.303 2.023-22.254.426-.936-.779-1.979-2.136-2.708-3.551-5.677-.22-10.994.304-15.479 2.638.425 4.199-2.415 4.873-5.077 5.738-1.974 7.826 3.949 18.046 2.531 25.182-1.011 5.084-7.266 5.87-11.864 6.821-.15 2.826.202 5.184.515 7.574-1.05 3.874-5.766 6.079-10.233 6.619-14.699 1.767-37.017 2.561-51.155-2.523-3.945-9.677-7.053-21.447-10.34-32.497-13.789 1.473-24.94-5.95-35.455-10.813-3.64-1.687-8.675-2.617-10.035-5.514-1.319-2.805-.779-8.182-1.106-13.26-.833-12.972-1.546-25.483-4.97-38.764-1.539-5.96-4.22-11.219-6.09-16.962-1.728-5.322-4.748-11.9-5.536-17.207-1.168-7.866 6.24-8.304 10.976-11.712 7.321-5.272 13.069-8.187 20.998-12.944 2.349-1.409 9.431-4.975 10.237-6.618 1.602-3.256-2.749-7.847-3.912-10.4-1.84-4.036-2.8-7.465-3.063-11.447-6.652-1.052-11.694-5.01-14.74-9.474-5.039-7.388-8.533-21.055-4.174-31.451.342-.819 2.047-2.429 2.299-3.686.496-2.477-.934-5.77-1.023-8.403-.458-13.513 2.286-25.155 11.383-29.23 3.693-14.711 16.91-19.603 29.363-26.914 4.655-2.732 9.786-4.479 15.085-6.429 19.01-6.996 48.178-5.678 63.955 6.254 6.69 5.06 17.384 15.744 21.209 23.479 10.102 20.421 9.385 54.55 2.319 79.391-.95 3.335-2.328 8.238-4.252 12.244-1.34 2.797-5.51 8.395-5.003 10.865.521 2.554 9.505 9.375 11.431 11.233 3.469 3.346 10.059 7.787 10.592 12.01.574 4.493-1.98 10.64-3.273 14.977-4.325 14.471-8.545 27.848-13.449 40.749" fill="#231f20" fill-rule="evenodd"></path><path d="M113.114 115.431c.548-.73 3.563-1.838 7.782.193 0 0-5 .834-4.584 9.17l-2.083-.418s-2.154-7.559-1.115-8.945" fill="#f7e4cd" fill-rule="evenodd"></path><path d="M149.646 187.083a2.292 2.292 0 11-4.583-.002 2.292 2.292 0 014.583.002M151.938 197.708a2.292 2.292 0 11-4.584-.002 2.292 2.292 0 014.583.002" fill="#1d1919" fill-rule="evenodd"></path></svg><p class="link">Jenkins</p></a></li><li class="col col-2 icon-wrapper_XD-a0"><a class="link_2K-pj" href="https://k6.io/blog/integrating-load-testing-with-circleci"><svg viewBox="0 0 103.8 105.2" class="icon_HSr2I"><path d="M38.6 52.6c0-6.9 5.6-12.5 12.5-12.5s12.5 5.6 12.5 12.5S58 65.1 51.1 65.1c-6.9.1-12.5-5.6-12.5-12.5zM51.1 0C26.5 0 5.9 16.8.1 39.6c0 .2-.1.3-.1.5 0 1.4 1.1 2.5 2.5 2.5h21.2c1 0 1.9-.6 2.3-1.5C30.4 31.6 39.9 25 51.1 25c15.2 0 27.6 12.4 27.6 27.6 0 15.2-12.4 27.6-27.6 27.6-11.1 0-20.7-6.6-25.1-16.1-.4-.9-1.3-1.5-2.3-1.5H2.5c-1.4 0-2.5 1.1-2.5 2.5 0 .2 0 .3.1.5 5.8 22.8 26.4 39.6 51 39.6 29.1 0 52.7-23.6 52.7-52.7 0-29-23.6-52.5-52.7-52.5z" fill="#343434"></path></svg><p class="link">CircleCI</p></a></li><li class="col col-2 icon-wrapper_XD-a0"><a class="link_2K-pj" href="https://k6.io/blog/integrating-load-testing-with-gitlab"><svg viewBox="0 0 338 311" fill="none" class="icon_HSr2I"><path d="M337.17 177.83l-18.91-58.12L280.84 4.43a6.471 6.471 0 00-12.27 0l-37.42 115.21H106.82L69.4 4.43a6.46 6.46 0 00-12.26 0L19.78 119.64.87 177.83a12.88 12.88 0 004.66 14.39L169 311l163.44-118.78a12.901 12.901 0 004.73-14.39" fill="#FC6D26"></path><path d="M169 310.91l62.16-191.28H106.87L169 310.91z" fill="#E24329"></path><path d="M169 310.91l-62.18-191.28h-87L169 310.91z" fill="#FC6D26"></path><path d="M19.75 119.69L.84 177.81A12.88 12.88 0 005.5 192.2L169 311 19.75 119.69z" fill="#FCA326"></path><path d="M19.78 119.69h87.11L69.4 4.49a6.47 6.47 0 00-12.27 0l-37.35 115.2z" fill="#E24329"></path><path d="M169 310.91l62.16-191.28h87.14L169 310.91z" fill="#FC6D26"></path><path d="M318.24 119.69l18.91 58.12a12.85 12.85 0 01-4.66 14.39L169 310.91l149.2-191.22h.04z" fill="#FCA326"></path><path d="M318.28 119.69h-87.1L268.6 4.49a6.462 6.462 0 019.909-3.2 6.456 6.456 0 012.351 3.2l37.42 115.2z" fill="#E24329"></path></svg><p class="link">Gitlab</p></a></li><li class="col col-2 icon-wrapper_XD-a0"><a class="link_2K-pj" href="https://k6.io/blog/integrating-load-testing-with-azure-pipelines"><svg viewBox="0 0 49 49" fill="none" class="icon_HSr2I"><path d="M17.167 41.959l6.492 6.492h10.536a2.317 2.317 0 002.316-2.316V21.799L17.167 41.155a.558.558 0 000 .804z" fill="#235DC1"></path><path d="M.645 14.902v10.536l6.492 6.492a.558.558 0 00.804 0l19.356-19.356H2.96a2.328 2.328 0 00-2.316 2.328z" fill="#3B6EC6"></path><path d="M25.004 3.104L9.38 27.008a2.05 2.05 0 00.264 2.568l10.008 10.008a2.052 2.052 0 002.568.264l23.904-15.636A5.394 5.394 0 0048.56 19.7V3.032A2.381 2.381 0 0046.184.656H29.528a5.426 5.426 0 00-4.524 2.448z" fill="#5D8DE4"></path><path d="M4.16 45.165v-8.448H.646V48.5h11.963v-3.336H4.162z" fill="#9FBBF0"></path><path d="M36.57 18.367a5.952 5.952 0 100-11.904 5.952 5.952 0 000 11.904z" fill="#ADC5F2"></path><path d="M25.915 20.39L13.188 33.116l2.935 2.936 12.728-12.728-2.936-2.936z" fill="#6C9AEE"></path><path d="M13.589 38.585l2.528-2.528-2.936-2.936-2.528 2.528 2.936 2.936z" fill="#88ACEF"></path></svg><p class="link">Azure Pipelines</p></a></li><li class="col col-2 icon-wrapper_XD-a0"><a class="link_2K-pj" href="https://k6.io/blog/load-testing-using-teamcity-and-k6"><svg viewBox="0 0 70 70" class="icon_HSr2I"><linearGradient id="teamcity_inline_svg__a" gradientUnits="userSpaceOnUse" x1="1.774" y1="31.273" x2="40.166" y2="31.273"><stop offset="0" stop-color="#905cfb"></stop><stop offset="0.068" stop-color="#776cf9"></stop><stop offset="0.173" stop-color="#5681f7"></stop><stop offset="0.286" stop-color="#3b92f5"></stop><stop offset="0.41" stop-color="#269ff4"></stop><stop offset="0.547" stop-color="#17a9f3"></stop><stop offset="0.711" stop-color="#0faef2"></stop><stop offset="0.968" stop-color="#0cb0f2"></stop></linearGradient><path d="M39.7 47.9l-6.1-34c-.4-2.4-1.2-4.8-2.7-7.1-2-3.2-5.2-5.4-8.8-6.3C7.9-2.9-2.6 11.3 3.6 23.9l14.8 31.7c.4 1 1 2 1.7 2.9 1.2 1.6 2.8 2.8 4.7 3.4 9.6 3 17.3-5.5 14.9-14z" fill="url(#teamcity_inline_svg__a)"></path><linearGradient id="teamcity_inline_svg__b" gradientUnits="userSpaceOnUse" x1="5.311" y1="9.669" x2="69.228" y2="43.866"><stop offset="0" stop-color="#905cfb"></stop><stop offset="0.068" stop-color="#776cf9"></stop><stop offset="0.173" stop-color="#5681f7"></stop><stop offset="0.286" stop-color="#3b92f5"></stop><stop offset="0.41" stop-color="#269ff4"></stop><stop offset="0.547" stop-color="#17a9f3"></stop><stop offset="0.711" stop-color="#0faef2"></stop><stop offset="0.968" stop-color="#0cb0f2"></stop></linearGradient><path d="M67.4 26.5c-1.4-2.2-3.4-3.9-5.7-4.9L25.5 1.7c-1-.5-2.1-1-3.3-1.3C6.7-3.2-4.4 13.8 5.5 27c1.5 2 3.6 3.6 6 4.5L48 47.9c.8.5 1.6.8 2.5 1.1 14 4.4 24.6-10.4 16.9-22.5z" fill="url(#teamcity_inline_svg__b)"></path><linearGradient id="teamcity_inline_svg__c" gradientUnits="userSpaceOnUse" x1="-19.284" y1="70.82" x2="55.983" y2="33.186"><stop offset="0" stop-color="#3bea62"></stop><stop offset="0.117" stop-color="#31de80"></stop><stop offset="0.302" stop-color="#24cea8"></stop><stop offset="0.484" stop-color="#1ac1c9"></stop><stop offset="0.659" stop-color="#12b7df"></stop><stop offset="0.824" stop-color="#0eb2ed"></stop><stop offset="0.968" stop-color="#0cb0f2"></stop></linearGradient><path d="M67.4 26.5c-1.8-2.8-4.6-4.8-7.9-5.6-3.5-.8-6.8-.5-9.6.7L11.4 36.1s-.2.1-.6.4C.9 40.4-4 53.3 4 64c1.8 2.4 4.3 4.2 7.1 5 5.3 1.6 10.1 1 14-1.1h.1l37.6-20.1.1-.1c6.6-3.8 9.7-13.1 4.5-21.2z" fill="url(#teamcity_inline_svg__c)"></path><linearGradient id="teamcity_inline_svg__d" gradientUnits="userSpaceOnUse" x1="38.944" y1="5.85" x2="5.423" y2="77.509"><stop offset="0" stop-color="#3bea62"></stop><stop offset="0.094" stop-color="#2fdb87"></stop><stop offset="0.196" stop-color="#24cea8"></stop><stop offset="0.306" stop-color="#1bc3c3"></stop><stop offset="0.426" stop-color="#14bad8"></stop><stop offset="0.56" stop-color="#10b5e7"></stop><stop offset="0.719" stop-color="#0db1ef"></stop><stop offset="0.968" stop-color="#0cb0f2"></stop></linearGradient><path d="M50.3 12.8c1.2-2.7 1.1-6-.9-9C48.3 2 46.5.8 44.5.3c-4.5-1.1-8.3 1-10.1 4.2L3.5 42v.1C-.9 47.9-1.6 56.5 4 64c1.8 2.4 4.3 4.2 7.1 5 10.5 3.3 19.3-2.5 22.1-10.8l17.1-45.4z" fill="url(#teamcity_inline_svg__d)"></path><g><path d="M13.4 13.4h43.2v43.2H13.4z"></path><path fill="#fff" d="M17.5 48.5h16.2v2.7H17.5zM22.9 22.7h-5.4v-3.6h14.8v3.6h-5.5V37h-3.9zM32.5 28.1c0-5.1 3.8-9.3 9.3-9.3 3.4 0 5.4 1.1 7.1 2.8l-2.5 2.9c-1.4-1.3-2.8-2-4.6-2-3 0-5.2 2.5-5.2 5.6V28c0 3.1 2.1 5.6 5.2 5.6 2 0 3.3-.8 4.7-2.1L49 34c-1.8 2-3.9 3.2-7.3 3.2-5.3.1-9.2-4-9.2-9.1"></path></g></svg><p class="link">TeamCity</p></a></li><li class="col col-2 icon-wrapper_XD-a0"><a class="link_2K-pj" href="https://k6.io/blog/load-testing-using-github-actions"><svg viewBox="0 0 366 357" fill="none" class="icon_HSr2I"><path fill-rule="evenodd" clip-rule="evenodd" d="M183 0C82.2 0 .5 81.7.5 182.5c0 80.6 52.3 149 124.8 173.2 9.1 1.7 12.5-4 12.5-8.8 0-4.4-.2-18.7-.2-34-50.8 11-61.5-21.5-61.5-21.5-8.3-21.1-20.3-26.7-20.3-26.7-16.6-11.3 1.2-11.1 1.2-11.1 18.3 1.3 28 18.8 28 18.8 16.3 27.9 42.7 19.8 53.1 15.2 1.6-11.8 6.4-19.8 11.6-24.4-40.5-4.6-83.2-20.3-83.2-90.2 0-19.9 7.1-36.2 18.8-49-1.9-4.6-8.1-23.2 1.8-48.3 0 0 15.3-4.9 50.2 18.7 14.6-4 30.2-6.1 45.7-6.1 15.5.1 31.1 2.1 45.7 6.1 34.8-23.6 50.1-18.7 50.1-18.7 9.9 25.1 3.7 43.7 1.8 48.3 11.7 12.8 18.8 29.1 18.8 49 0 70.1-42.7 85.5-83.3 90 6.5 5.7 12.4 16.8 12.4 33.8 0 24.4-.2 44.1-.2 50.1 0 4.9 3.3 10.5 12.5 8.8 72.5-24.2 124.7-92.5 124.7-173.2C365.5 81.7 283.8 0 183 0z" fill="#181616"></path><path d="M69.6 262c-.4.9-1.8 1.2-3.1.6s-2.1-1.8-1.6-2.7c.4-.9 1.8-1.2 3.1-.6s2.1 1.8 1.6 2.7zM77 270.3c-.9.8-2.6.4-3.7-.8-1.2-1.3-1.4-3-.5-3.8.9-.8 2.5-.4 3.7.8 1.2 1.3 1.4 3 .5 3.8zM84.2 280.8c-1.1.8-2.9.1-4.1-1.6-1.1-1.6-1.1-3.6 0-4.4 1.1-.8 2.9-.1 4.1 1.5 1.2 1.7 1.2 3.7 0 4.5zM94.1 290.9c-1 1.1-3.1.8-4.7-.7s-2-3.6-1-4.7 3.2-.8 4.7.7c1.6 1.6 2 3.7 1 4.7zM107.7 296.8c-.4 1.4-2.5 2.1-4.6 1.5-2.1-.6-3.4-2.3-3-3.7.4-1.4 2.5-2.1 4.6-1.5 2 .6 3.4 2.3 3 3.7zM122.6 297.9c.1 1.5-1.7 2.8-3.9 2.8-2.2.1-3.9-1.2-4-2.7 0-1.5 1.7-2.8 3.9-2.8s4 1.2 4 2.7zM136.5 295.6c.3 1.5-1.2 3-3.4 3.4-2.1.4-4.1-.5-4.3-2-.3-1.5 1.3-3 3.4-3.4 2.1-.4 4 .5 4.3 2z" fill="#181616"></path></svg><p class="link">GitHub Actions</p></a></li></ul>


## See also

- [Test life cycle](/using-k6/test-life-cycle)
- [Thresholds](/using-k6/thresholds)
- [Modules](/using-k6/modules)
- [Scheduling](/cloud/creating-and-running-a-test/scheduling-tests)
- [Slack integration](/cloud/integrations/notifications#slack)
