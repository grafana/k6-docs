---
title: 'Usage Reports'
excerpt: 'Discover valuable information about your company testing'
---


Usage report helps you keep track of everything happening in your team’s project and quickly follow the activity of your performance testing projects.

> ⭐️ Usage reports are available on annual Pro and Enterprise plans.

The page can be found in the left menu under the **Manage** section.

![Full UI](images/05-Usage-Reports/menu.png)

On this page you will be presented with both organization and project statistics, lets break down what we are looking at.

**Section highlighted in green**<br/>
This is the filtering section, here is where you narrow down the result by fields `projects`, `contributors` and `time interval`.

**Section highlighted in blue**<br/>
This section presents overview statistics for your organization.

**Section highlighted in yellow**<br/>
Here are statistics for each individual project.

![Full UI](images/05-Usage-Reports/full-ui.jpg)

| Column                       | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| **Project**                  | The project for which the stats to the right are collected from.                      |
| **Total test runs**          | Total count of test runs started.                                                     |
| **Test fail rate**           | The rate of failed tests in the project. <br/><small>\*What is a failed test?</small> |
| **Total test runs duration** | Cumulative sum of time spent running tests.                                           |
| **Most recent test run**     | Link to the most recent test run in the project.                                      |
| **Contributors**             | All members that have started tests in the project                                    |

> \***Which tests add to the fail rate statistic?**
>
> - The test was aborted by any of the following statuses (Aborted system, Aborted limit, Aborted user, Aborted threshold or Aborted script error)
> - The test ran to completion but there were failing thresholds (specified by the user).<br/>[Read how to add thresholds to your tests](/using-k6/thresholds).
> - The test timed out.
