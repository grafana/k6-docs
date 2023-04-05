---
title: 'Save, share, delete a test run'
menuTitle: 'Save, share, delete'
description: 'After you analyze your test results, you might want to share them with other users involved in the testing'
weight: 504
aliases:
  - /docs/k6/analyze-results/share-test-results/
---

# Save, share, delete a test run

After you analyze your test, you might want to mark it for further analysis.
To do this, you have a few options:
- Save the test, keeping it beyond normal data retention periods.
- Make notes on the test, preserving contextual details.
- Export it to another format, so you can query it with the program of your choice.
- Make a shareable link, so you can show the results to others.
- Delete irrelevant tests, de-cluttering your UI.

To do any of these actions, use the vertical-dots icon to open the *Test Result menu*.
![Test Results Menu](/media/docs/k6/test-results-menu.png)

## Share a test result

[Project members]({{< relref "../projects-and-users/manage-project-members" >}}) can access the project test results. For non-project members, you have a few options to share test results:

- **Generate a PDF report**. A executive summary of the test results. Read about the [PDF report](https://k6.io/docs/cloud/analyzing-results/result-export/#generate-a-pdf-report).
- **Export data** to CSV format to query them with other program. Read about [CSV format](https://k6.io/docs/cloud/analyzing-results/result-export/#export-as-csv).
- **Share a public link** that does not require authentication. This option could expose sensitive test information.

## Create a note

The **Create Note** option launches a modal window with a text box.

You can write comments about the test, mark changes, or add any context worth noting.

## Delete test results

> ⚠
>
> Test deletion is **irreversible**.

Deletes the current test result.

