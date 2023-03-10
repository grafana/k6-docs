---
title: Schedule a test
description: How to schedule your cloud tests to run in the future and at regular intervals. 
weight: 502
---

# Schedule a test

> **IMPORTANT** 
> 
> The test scheduling view is currently not available in Grafana Cloud. We are working on it.
> 
> Meanwhile, you can schedule your Grafana Cloud tests by logging in to [k6 Cloud](https://app.k6.io/) and scheduling them from there.

At times, it might be impossible for you to manually run a cloud test at the time you want to.

You can schedule tests to run at fixed times and regular intervals.
The particular reasons to schedule a test depend on use cases, but the broad motivations are usually as follows:

- **To test at inconvenient hours**

  For example, you might need to test a production system in the middle of the night, when traffic is lowest and all your developers are asleep.

- **To schedule once and run many times**

  For example, you might want regularly monitor for regressions (without integrating the test into your CI pipeline).

## How to schedule a test

First, you need to select or create a test to schedule.
Then, schedule it from the **Scheduled tests** page or from the page of the test itself.

### Valid tests to schedule

If you have already authored the test, you can schedule it if it meets these criteria:

- It exists in your cloud account
- It has run on the cloud service
  (you can not schedule a locally run test through the web UI).

You can also use the web UI to create a test to schedule.
Make sure you save your configuration.

After you have the test you want to schedule, you can schedule it in two ways.

### Schedules overview page

In the sidebar menu, go to **Manage > Scheduled tests**.

On this page, you can create new schedules, and find and edit all test schedules your organization has created.

![Schedules page](/media/docs/k6/screenshoot-k6-cloud-schedule-list.png)

To schedule a test, select **Add schedule** on the top right, then follow these steps:

1. Select a project and test.
1. Set a `start date` and `time`.
1. Toggle whether the test should repeat or run multiple times.
1. After you configure everything, select save **Save schedule**.

   You should see your newly created test schedule in the list of schedules.

### Test overview page

You can also schedule a test from the test overview page.

1. Navigate to your project and select the test.

1. On the test page, select **Set up schedule**.

  This brings up the schedule configuration.


> **Tip**: [trigger a cloud test from the CLI]({{< relref "../get-started/run-cloud-tests-from-the-cli" >}}), then set up a schedule from the cloud app to re-run the test on a regular interval.


## Scheduling options

However you schedule your test, k6 provides the following options:

- When to run the test: `now` or at a `later date`.
- How frequently to repeat the test: `Hourly`, `Daily`, `Weekly`, or `Monthly`.
- How many times the test will run: either __a set number_, or _stopping after a set date_.

  You can schedule tests with a high degree of granularity.
  So explore the options to find what works best for your case.

  ![Schedule configuration](/media/docs/k6/screenshoot-k6-cloud-scheduling-configuration.png)

## Next steps

After you schedule a test, you can automate further.

We recommend setting up [notifications]({{< relref "send-notifications" >}}) and [thresholds](https://k6.io/docs/using-k6/thresholds).

With these, you can complete an automated loop&mdash;schedule your test to run automatically, then get automatically notified whenever it passes or fails.

