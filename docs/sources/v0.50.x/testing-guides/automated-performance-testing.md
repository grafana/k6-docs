---
title: 'Automated performance testing'
head_title: 'How to Automate Performance Testing: The k6 Guide'
description: 'Performance testing automation is about establishing a repeatable and consistent process that checks reliability issues at different stages of the development and release cycle.'
weight: 02
---

# Automated performance testing

Performance testing automation is about establishing **a repeatable and consistent process that checks reliability issues** at different stages of the development and release cycle. For instance, you could run performance tests from CI/CD pipelines and nightly jobs, or manually trigger load tests and monitor their impact in real-time.

In performance testing, automation does not remove the need to run tests manually. It’s about planning performance tests as part of your Software Development Life Cycle (SDLC) for **continuous performance testing**.

This guide provides general recommendations to help you plan and define a strategy for running automated performance tests:

- Which tests to automate?
- Which environment to test?
- What frequency and how to run tests?
- How to analyze performance results?

Please note that this guide assumes you are familiar with k6 and already have performance tests. If you are new to performance testing or k6, we recommend looking at our [get-started resources](https://grafana.com/docs/k6/<K6_VERSION>/get-started/resources#learning).

Before we dive in, let's consider the "why" behind automation and how it unlocks the full benefits of your performance testing efforts.

## Why automate performance tests

Whether it’s a website loading in under a second, API responses in milliseconds, or instantaneous fault responses, performance is critical as it directly impacts the end-user experience. However, an organizational challenge is that performance may often not receive the recognition of a feature or requirement.

Performance is still intangible in many organizations, which react only when bad things happen. Automation changes this approach - **from reactive to proactive**.

In performance testing, it's crucial to establish routines to be consistent in our practices. Automation is necessary to create a performance testing habit, and boost some of its [benefits](https://k6.io/why-your-organization-should-perform-load-testing/), including:

- **Improve testing coverage, confidence, and maintenance**: Automation creates a constant and iterative process for various types of testing. This continuous effort in performance testing leads to expanded test coverage, enhanced test maintenance, and increased confidence in testing outcomes.
- **Detect issues earlier**: Automating performance tests as part of the software delivery process can ensure applications meet reliability goals while catching issues earlier in the SDLC.
- **Collaborate across teams**: Automation prompts teams to outline a strategy and plan across the SDLC and departments. It fosters engineering leaders to advocate for reliability and implement shared practices.

Without automation, the lack of a shared framework often leads to isolated and sporadic activities. Automation helps drive continuous performance and reliability testing, introducing a **more efficient and effective testing process**.

### More than CI/CD

Automation often refers to running tests with pass/fail conditions as part of the release process within CI/CD pipelines. However, not all performance tests are suited for CI/CD workflows, nor are they solely about providing a Pass/Fail (green/red) status and acting as a release gatekeeper.

[Automation into CI/CD pipelines](/integrations/#continuous-integration-and-continuous-delivery) is an option, but it's not the only method to schedule the execution of performance tests. When creating a performance testing plan, it’s important to remember that there are different ways to run performance tests in a frequent basis:

- Cron and cron job runners.
- Cloud testing tools, such as [scheduling in Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/author-run/schedule-a-test/).
- Test management tools with automation capabilities.
- Trigger manual tests. Include this as a step in your release checklist process.

Running tests only from CI/CD tools on software changes limits the objectives of our performance tests. A complete performance testing strategy can include CI/CD tests, cron-based tests, or even manual tests to address various testing purposes:

## Determine the purpose of the tests

The first step in the process is reviewing your existing or planned tests and understanding each test's purpose. Can the test serve additional purposes if executed regularly? Some common goals are:

- Comparing current performance against an existing performance baseline.
- Understanding variances over time in key performance metrics. Observing flat or changing trends.
- Detecting regressions of new releases.
- Testing Service Level Objectives (SLOs) on a regular basis.
- Testing critical areas during the release process.
- Setting quality gates in the CI/CD pipelines.

When considering a consistent and ongoing purpose for each test, you discover which tests to automate, any lacking functionality, and missing tests in your test suite. It also guides you in determining the best time to run each test and how.

## Choose which tests to automate

Performance tests can generally be divided into two aspects:

- Test scenario (test case): What is the test verifying?
- Test workload (test load): How much traffic and which traffic pattern?

Your test suite should incorporate a diverse range of tests that can verify critical areas of your system using distinct [load test types](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/).

Any existing test that you wish to run on a frequent basis is a candidate for automation. Fundamentally, automation is about running tests frequently and consistently, whether that's daily, weekly, or annually.

When designing your performance test suite for automation, consider two key points: start simple and modularize your tests.

- **Start simple and iterate**: Your test suite, and consequently test coverage, will expand as the team learns and encounters reliability issues to investigate.
- **Modularize your test suite**: In k6, you can separate the scenario and workload logic and reuse them across different tests. That simplifies the process of creating tests with various traffic patterns for different purposes. Modularization also allows reusing common logic across multiple tests.

When planning test coverage or automation, consider starting with tests that:

- Verify the core functionality crucial to the product and business.
- Evaluate the performance in scenarios with high traffic.
- Track key performance metrics to observe their trends and compare against their baselines.
- Validate reliability goals or SLOs with Pass/Fail criteria.

## Model the scenarios and workload

Once one or multiple tests have been selected, you should determine the various types of traffic that need to be tested.

Let’s illustrate an example with two simple tests: one test to assess the performance of a GET endpoint and one test to verify a checkout process.

The next step is to identify the traffic the system under test (SUT) handles for these tests. In this case, we could utilize our analytics and monitoring tools to find the typical traffic patterns for the GET endpoint and checkout flow.

Depending on the type of traffic, we can create different kinds of tests:

- [Smoke](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/smoke-testing): Test for script errors and verify SUT with minimal traffic.
- [Average-Load](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/load-testing): Test for regular/normal traffic.
- [Stress](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing): Test for maximum expected traffic.
- [Spike](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing): Test for a surge of traffic.
- [Soak](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing): Test for a prolonged period of traffic.

In our example, we decided on the following workload for the two scenarios:

| Test scenario    | Smoke        | Average         | Stress           | Spike        | Soak |
| ---------------- | ------------ | --------------- | ---------------- | ------------ | ---- |
| GET endpoint     | 1 iteration  | 100 reqs/s - 3m | 1500 reqs/s - 5m |              |      |
| Checkout process | 3 iterations | 50 VUs - 5m     |                  | 200 VUs - 1m |      |

> We recommend always creating average-load tests for baseline comparisons and smoke tests to validate test script errors before executing larger tests.

In our example, we have tests that use the same test scenario with distinct workloads. This pattern is extremely common. In this case, the ability to reuse the scenario logic across tests simplifies both test creation and maintenance. A common pattern for organizing tests is prefixing them with the type of workload:

- `smoke-get-api.js`:&nbsp;&nbsp; imports the common scenario and set 1 iteration.
- `load-get-api.js`:&nbsp;&nbsp;&nbsp;&nbsp; imports the common scenario and set 100 reqs/s during 3m.
- `stress-get-api.js`: imports the common scenario and set 1500 reqs/s during 3m.

_To learn more about configuring workloads in k6, check out [Scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios#scenario-executors)._

## Decide the testing frequency for each environment

The next step is to decide which environment to test and its frequency. Each organization has different environments, and their purpose might also vary from one organization to another.

Here are some common environments found at organizations, and general guidelines of what kind of testing to use them for.

### Development environment

This environment, whether the personal machine or its dedicated environment, might not include all the components of the system. It is commonly used for preliminary testing before deploying the application to a more comprehensive environment.

This environment is great for verifying the basic functionality of our tests by running smoke tests.

In this type of environment, debugging and building our performance tests is more common than any type of automation. However, if your project structure permits, you can also schedule the execution of smoke tests on project changes.

### QA environment

This environment often deploys the entire application but with minimal infrastructure resources. It’s like a low-scale staging environment that all teams can use to test functional aspects and find regressions for new features.

Given the infrastructure does not closely match the production environment, this type of QA environment is unsuitable for assessing the performance and scalability of the application.

However, validating the functional aspects of our testing with smoke tests can help to catch errors earlier in this environment. Additionally, it verifies that the same script can run in larger load tests later.

Run all the available smoke tests: end-to-end, integration, and unit test types. Schedule these tests as part of the suite of automated tests executed in the CI flow.

### Pre-release and ephemeral environments

These environments are available to test upcoming releases, with each organization using them differently as part of their unique release process.

As a general rule on pre-release environments, we should run our larger tests with quality gates, Pass/Fail criteria that validate SLOs or reliability goals. In k6, you can do that by using [Thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) in `options` as follows:

```javascript
export const options = {
  thresholds: {
    // http errors should be less than 1%
    'http_req_failed': ['rate<0.01'],
    // 90% of requests should be below 600ms
    'http_req_duration': ['p(90)<600'],
    // 95% of requests tagged as static content should be below 200ms
    'http_req_duration{type:staticContent}': ['p(99)<250'],
    // the error rate of my custom metric should be below 5%
    'my_custom_metric': ['rate<0.05'],
  },
};
```

However, it can be challenging to effectively assess all reliability goals. Frequently, you’ll encounter “false positives” and “true negatives” when testing with distinct types of load.

For larger tests, verifying the release based “only” on a Pass/Fail status can create a false sense of security in your performance testing and release process.

We recommend keeping the pre-release environment available for a few hours or days to thoroughly test the entire system. Our recommendations include:

- Allocating a period of one to several days for validating the release.
- Executing all the existing average-load, stress, and spike tests.
- Executing each test at least twice consecutively.
- Scheduling all tests to run periodically, for instance, every 4 hours or 8 hours.

### Staging/pre-production

In some cases, the staging environment acts like the “Pre-release” environment. If so, follow the strategy mentioned in the previous section.

The staging environment is always available and consistently updated with the latest changes. It’s generally suitable for assessing performance changes like performance trends, regressions, or improvements.

In this case, we should choose the tests that assess key performance indicators and schedule them for consistent execution to collect metrics over a period. Start by selecting a few tests and scheduling their runs two to three times per week.

Like in the pre-release environment, we suggest executing each test at least twice consecutively, allowing us to ignore unreliable tests.

As we aim to find performance changes, consider scaling the workload of the test according to the staging infrastructure, which often does not match the scale of the production environment.

### Production

Typically, the previous testing environments do not perfectly mirror the production environment, with differences in test data, infrastructure resources, and scalability policies.

Testing in production provides real-world insights that cannot be achieved in other environments. However, production testing requires a careful approach to handling and storing test data in production and avoiding impacting real users.

A low-risk common practice is to utilize smoke tests for synthetic testing, also called [synthetic monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/). Testing production with minimal load is safe. Schedule smoke tests every five minutes, establishing Pass/Fail test conditions and an effective alerting mechanism. For instance, if six consecutive test runs fail, send an alert.

If release strategies like Blue/Green or Canary deployments are in place, run load tests against the Green or new version to validate the release. It's an ideal moment to see how SLOs behave in production.

Also, consider scheduling nightly tests or when the system handles less traffic. The goal is not to stress the system, but to consistently gather performance results to compare changes and analyze performance trends. For instance, schedule tests with half of the average traffic level on a weekly basis.

### Example plan

| Test             | Deployment Env. | Type     | Workload         | Automation                             | Frequency                                 |
| ---------------- | --------------- | -------- | ---------------- | -------------------------------------- | ----------------------------------------- |
| Checkout process | QA              | Smoke    | 1 iteration      | CI flow                                | Branch changes                            |
| Checkout process | Pre-release     | Average  | 50 VUs - 5m      | Scheduled during QA/Pre-release period | 3 times per day during pre-release period |
| Checkout process | Pre-release     | Spike    | 200 VUs - 1m     | Scheduled during QA/Pre-release period | 3 times per day during pre-release period |
| Checkout process | Staging         | Average  | 50 VUs - 5m      | Schedule                               | 2 times per week                          |
|                  |                 |          |                  |                                        |                                           |
| GET endpoint     | QA              | Smoke    | 1 iteration      | CI flow                                | Branch changes                            |
| GET endpoint     | Pre-release     | Average  | 100 reqs/s - 3m  | Scheduled during QA/Pre-release period | 3 times per day during pre-release period |
| GET endpoint     | Pre-release     | Stress   | 1500 reqs/s - 5m | Scheduled during QA/Pre-release period | 3 times per day during pre-release period |
| GET endpoint     | Staging         | Average  | 100 reqs/s - 3m  | Schedule                               | 2 times per week                          |
| GET endpoint     | Production      | 50% Avg. | 50 reqs/s - 3m   | Schedule on minimal traffic            | Weekly                                    |

## Plan the result analysis process

Following the previous steps, you should now have an initial performance testing plan. Now, let’s see how we can analyze and interpret performance results.

The first step is learning what options you have for outputting performance results. If you’re using k6, there are a few [options you can choose from](https://grafana.com/docs/k6/<K6_VERSION>/results-output/). You can review those options and the [k6 metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) to decide on a long-term solution to analyze the results of your test automation plan.

Here are some questions to consider when creating your result analysis process.

### How to store your performance results

In k6, you can get the [aggregated results](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test) at the end of a test, or [time series metrics in real-time](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time). Both options allow you to customize the output.

The process we recommend is:

- Select a storage backend.
- Understand how it stores your test data and its particular capabilities.
- Learn how to query and visualize results and any limitations.
- Establish a policy for deleting old test results, and make sure to retain key performance results for future comparisons like baseline performance data.
- Test the solution and decide on a long-term storage choice to avoid frequent changes to this critical component.

### Which key performance metrics will be your focus

Think about the goal of each particular test, and make sure you track the metrics that depend on your test goals.

k6 provides [built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference) that aggregate all the interactions against the SUT. You can also utilize [tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#user-defined-tags) and custom metrics to categorize and filter results for one interaction or particular types.

Consider defining your own performance criteria and their visualization. For instance, set different colors for what is good, acceptable, slightly concerning, or wrong so you can quickly visualize if a particular set of performance results are ok.

Think about performance changes. Is there any particular metric to compare changes or track its trend over time? Most of the test visualization choices focus on the results of individual test runs. Consider implementing a way to visualize the result of a critical performance metric over time so you can identify any changes and trends.

### How often will you analyze results

Consider creating dashboards and custom notifications that can quickly provide an overview of the latest results of any automated tests. These dashboards are the first line to indicate issues requiring investigation.

Additionally, we recommend setting up alerts for important issues. Think about priority and non-priority levels and follow-up actions. Consider these [tips to design alerts](https://grafana.com/docs/grafana/latest/alerting/#design-your-alerting-system).

### Correlate testing and observability data

Last but not least, set up proper instrumentation of the SUT and understand the monitoring and observability in place for system and application data.

Performance testing results can highlight poor performance, such as slow responses. However, it does not show what happens internally on the SUT, such as a slow SQL query or CPU and memory saturation.

To bridge the gap, work out a way to correlate testing results with how you instrument your infrastructure and application code. For instance, connecting or building custom dashboards with test results or using [trace data from your tests](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing).

Continuous testing helps detect issues and performance degradations, whether from test results or system data. Proper observability will help to find the root cause.

### Example plan

As we finalize our planning, we can organize our test plan considering how often tests are run, the options to analyze their results, and follow-up actions. For example:

| Deployment Env. | Test type                                | Frequency                                           | Alerts                           | Test overview                       | Action                                                   |
| --------------- | ---------------------------------------- | --------------------------------------------------- | -------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| QA              | Smoke tests                              | CI on Branch changes                                | CI                               |                                     | Fix broken tests                                         |
| Pre-release     | All performance tests except smoke tests | 2 or 3 times daily during the QA/pre-release period |                                  |                                     | Validate the release after assessing performance results |
| Staging         | Baseline performance tests               | Schedule 2 times per week                           | Only for critical issues         | Custom dashboard                    | Oversee test results                                     |
| Production      | Baseline performance tests               | Weekly schedule                                     | Priority and Non-priority issues | Custom dashboards and notifications | Oversee test results                                     |
| Production      | Synthetic tests                          | Hourly schedule                                     | Custom alerts                    |                                     | Respond to alerts                                        |

## Considerations

### Start simple and then iterate

When starting your performance test plan or automation, it is common to think about having a few dozen scenarios to test. Start small to avoid planning paralysis.

We recommend beginning with a few distinct tests across testing environments.

Over time, you can add more tests, and your performance test suite will gradually increase its test coverage.

Focus on proving your test automation plan and solution across the software release process. A successful implementation will pave the way for collaborating with other teams and promoting the value of continuous performance testing.

### Test consistency is critical

One of the primary objectives of continuous performance testing is assessing changes in the key metrics that define reliability and performance goals. To achieve this, we need to compare the value of these metrics between test runs over a period.

It’s critical to compare test run results of the same test. Otherwise, you’re comparing apples with oranges. Compare identical test runs, the same workload, running the same scenario with the same test data against the same environment.

Make sure not to introduce variance between test runs. If changes are necessary, rename or create a new test and start comparing test results from scratch.

Additionally, we recommend scheduling the execution of the same test twice and almost consecutively. This collects one extra test run result for better comparison and allows us to ignore a potentially unreliable test.

### Establish how to stop automated and manual tests

Certain performance tests, especially those involving heavy-load tests, might cause outages. Automating the execution of risky tests without supervision may not be desirable, but that doesn't mean you should avoid them.

These tests require controlled test execution and real-time analysis of test results, allowing them to be stopped before the system becomes unresponsive.

Similarly, you might want to stop a test when the system begins to produce a flood of errors. When a system becomes completely overloaded, continuing the test execution often doesn't provide more meaningful insights and merely consumes resources.

To stop a k6 test, learn how to use the [`abortOnFail` threshold option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds#abort) or integrate with the k6 CLI or Grafana Cloud k6.

### Complement automation with a repeatable QA process

We mentioned this at the beginning of the guide: automation in performance testing is about establishing a repeatable and consistent testing process.

You should also plan the frequency of tests that are manually triggered and require supervision of the system during their execution. To ensure these different cases are consistently tested, set reminders and document them as part of the QA process and release checklists. Common examples are:

- Running soak tests quarterly.
- Running heavy-stress tests 2 months before an important seasonal event.
- Running heavy-load tests for major releases in a pre-release environment.

### Quality gates in CI/CD may result in false assurance

Quality gates in performance tests are often defined as [Pass/Fail criteria](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) that verify the release meets its reliability goals.

However, setting up reliable quality gates is challenging when testing thousands or millions of interactions. The test script, the SLO for that particular environment, and the Pass/Fail criteria could easily be wrong.

Assume reliability checks may have false negatives (and vice versa); ensure performance tests don't block releases wrongly.

Unless your verification process is mature, do not rely entirely on Pass/Fail results to guarantee the reliability of releases. If unsure, start utilizing Pass/Fail results to warn about possible issues for deeper investigation, and continuously tweak the criteria until becoming confident.

Moreover, note that the load test duration often takes between 3 to 15 minutes or more; thus, introducing performance testing into CI/CD significantly increases the time of the release process. This is another reason we advise not to run larger tests in pipelines meant for automatic deployment. Instead, plan one or more days for performance testing pre-releases in a dedicated environment.
