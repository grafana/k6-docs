---
title: 'Thresholds'
excerpt: 'Your entire organization’s thresholds in one place'
---

You can track and manage all your organization’s thresholds.
You can easily find tests with failing thresholds, check which project they belong to, their current status and history, and whether patterns need your attention.

To manage thresholds, under **Manage** in the sidebar, select **Thresholds**.

![Full UI](images/Thresholds/full-ui.png)

The **Thresholds** page has a few sections:

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
| **Project**   | The project that the threshold test belongs to to.                                                                                                                                                                               |
| **Test**      | The name of the test of the threshold with a link to its most recent run.                                                                                                                                                         |
| **Last run**  | The time the test last ran run.                                                                                                                                                                                                  |
| **Fail rate** | Number of threshold failures against the total number of times the threshold was used.                                                                                                                                  |
| **History**   | Chart that visualizes the threshold results for the last 10 test runs.                                                                                                                                                    |

## See Also

[Thresholds documentation](/using-k6/thresholds/)
