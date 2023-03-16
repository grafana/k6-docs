---
title: 'Share test results'
description: 'After you analyze your test results, you might want to share them with other users involved in the testing'
weight: 504
aliases:
  - /docs/k6/analyze-results/share-test-results
---

# Share test results

After you analyze your test results, you might want to share them with other users involved in the testing.

[Project members]({{< relref "../projects-and-users/manage-project-members" >}}) can access the project test results. For non-project members, you have a few options to share test results:

- **Generate a PDF report**. A executive summary of the test results. Read about the [PDF report](https://k6.io/docs/cloud/analyzing-results/result-export/#generate-a-pdf-report).
- **Export data** to CSV format to query them with other program. Read about [CSV format](https://k6.io/docs/cloud/analyzing-results/result-export/#export-as-csv).
- **Share a public link** that does not require authentication. This option could expose sensitive test information.

To do any of these actions, click the **Kebab menu** (three dots) to open the *Test Result menu*.

![Test Results Menu](/media/docs/k6/test-results-menu.png)

Also, in this menu, you can select to write a note about the test result to share with project members.

> The shareable link and PDF report features are currently not available in Grafana Cloud. We are working on it.
>
> Meanwhile, the link with the public results is available at [https://app.k6.io/ (k6 Cloud)](https://app.k6.io/), and users are redirected to **k6 Cloud** to generate the PDF report.
