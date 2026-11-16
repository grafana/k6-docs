---
title: 'Calculate concurrent users for load tests'
description: 'Learn how to use Google Analytics data to determine the optimal number of concurrent users for your load tests.'
weight: 200
---

# Calculate concurrent users for load tests

When planning load tests, determining the right number of concurrent users is crucial for creating realistic test scenarios. This guide explains how to use Google Analytics data to calculate concurrent user numbers and design effective load tests.

{{< admonition type="note" >}}

You can use any analytics tool that provides the same metrics to help you calculate the concurrent users you need for load testing.

{{< /admonition >}}

## Understanding concurrent users

Google Analytics tracks visitors ("Users") and their activity periods ("Sessions") on your site. During a session, users generate traffic through page loads or AJAX requests that your servers must handle. To create realistic load tests, you need to determine how many users are actively generating traffic at any given time.

The recommended formula for calculating your baseline of hourly concurrent users is:

```
An hour in seconds = 3600
Concurrent users  = Hourly sessions * Average session duration (in seconds) / 3600
```

## Get the data from Google Analytics

To find the required metrics in Google Analytics:

- Log in to your Google Analytics account.
- Navigate to the **Reporting** tab.
- Click **Audience** on the sidebar menu.
- Click **Overview**.
- Set your desired time period.
- Click **Hourly** view in the line graph settings.

You should be able to view the session count and average session duration on the overview dashboard.

{{< admonition type="note" >}}

These instructions might vary depending on which version of Google Analytics you're using. If you're using Google Analytics 4, you can find these metrics by selecting **Explore** and creating a **Free form** report.

{{< /admonition >}}

## Designing load tests

With the data in hand, it's important to mention why you want to use the "Hourly" view.

Using hourly metrics rather than daily or monthly averages is crucial for accurate load testing. Daily averages can mask significant traffic variations that occur throughout the day. For example, an e-commerce site might see most of its traffic during business hours, with peaks during lunch breaks. Using daily averages would underestimate these crucial peak periods.

Additionally, hourly metrics help identify patterns in user behavior. A news site might see traffic spikes during morning commute hours and evening hours, while a restaurant booking service might peak during evening hours. Understanding these patterns through hourly data helps you design more realistic load tests that match your actual usage patterns.

### Calculate peak traffic

Instead of using average traffic levels, base your load tests on peak traffic periods:

1. Identify peak hours in Google Analytics.
1. Calculate concurrent users during these peaks.
1. Add a margin to ensure you can handle higher traffic levels.

For example, if your site averages 0.08 concurrent sessions monthly but peaks at 7.2 concurrent sessions during high-traffic hours, you should test for at least this peak level.

### Example calculation

As an example, for a website that has the following metrics:

- 2,591 monthly sessions
- 82 seconds per session

Applying the concurrent user formula, you can find the average concurrent users:

```
2,591 monthly sessions x 82 seconds per session / 3600 = 59.0172

// To convert monthly sessions to hourly sessions, you can divide the value by 720
59.0172 / 720 (30 days in November x 24h per day = 720) = 0.08 average concurrent users in November
```

But, if the same website has peak hours from 3 PM to 4 PM with different metrics:

- 990 sessions
- 92 seconds

In this case, applying the concurrent users formula leads to:

```
990 sessions x 92 seconds per session / 3600 = 25.3 average concurrent users
```

This example shows how peak traffic can reach a considerably higher value than the monthly average, in this case from 0.8 to 25.3 concurrent users, highlighting the importance of testing beyond average traffic levels.

## Additional testing considerations

There are multiple scenarios where a different kind of test might give you a better insights on your system reliability. Consider implementing these testing strategies:

- [Spike tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing/) before major events.
- Regular load tests at peak traffic levels.
- Tests that exceed your highest historical traffic by a safety margin.

These practices help ensure your system remains stable during unexpected traffic increases. Refer to [Testing guides](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides) for more details about all of the different performance testing strategies.
