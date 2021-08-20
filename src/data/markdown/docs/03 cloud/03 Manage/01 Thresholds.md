---
title: 'Thresholds'
excerpt: 'Your entire organization’s thresholds in one place'
---

The Thresholds page helps you track and manage all your organization’s thresholds.
You can easily find the tests with failing thresholds, which project they belong to, what the thresholds current status and history is, and if there are patterns that need your attention.

The Thresholds page can be found in the **Manage** section of the left menu.

![Full UI](images/Thresholds/full-ui.png)

It can be broken down into:

**Filtering section (highlighted in green)**<br/>
This is where you can narrow down the results by filtering by: `Projects`, `Status` and `Period`.

**Overview section (highlighted in blue)**<br/>
In this section you see the overview numbers of all your organization's thresholds.

**Threshold listing (highlighted yellow)**<br/>
Here are the thresholds and their accompanying data.

| Column        | Description                                                                                                                                                                                                                       |
| --------------| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**    | Current status of the threshold as per its last test run indicated by a checkmark <span style="color:green; font-weight:bold">✓</span> or cross <span style="color:red; font-weight:bold">✗</span> for pass or fail respectively. |
| **Threshold** | Threshold metric name and criteria.                                                                                                                                                                                               |
| **Project**   | The project to which the threshold test belongs to.                                                                                                                                                                               |
| **Test**      | The name of the test of the threshold with a link to its most recent run.                                                                                                                                                         |
| **Last run**  | The time the test was last run.                                                                                                                                                                                                  |
| **Fail rate** | The number of threshold failures vs. the number of times the test of the threshold has been run.                                                                                                                                  |
| **History**   | History chart that visualizes the threshold results for the last 10 test runs.                                                                                                                                                    |

## See Also

For more information about thresholds and how to use them in your tests, please refer to our documentation - [What are thresholds?](/using-k6/thresholds/#what-are-thresholdss)
