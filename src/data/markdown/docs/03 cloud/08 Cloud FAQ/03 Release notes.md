---
title: Release notes
head_title: k6 Cloud Release notes
excerpt: 'On this page, you can find the k6 Cloud changelog.'
---

### v1.5.2 `(2021-10-22)`

- Fix: the script editor did not auto resize unless the window was resized.
- Fix: "Add new metric" placeholder spanned the full width of the page.

### v1.5.1 `(2021-10-21)`

- Improve the content of the  [`Too Many Metrics` alert](/cloud/analyzing-results/performance-insights/).
- Fix: doc links not opening on shared pages.

### v1.5.0 `(2021-10-20)`

- Better visibility for updates on the [subscriptions UI](/cloud/billing-user-menu/subscription/).

### v1.4.0 `(2021-10-6)`

- Add ability to free text query on [logs tab](/cloud/analyzing-results/logs/).
- Fix: confusing placeholder for analysis comparison chart.
- Fix: ServiceWorker cleanup (no more cogs in the networks panel).

### v1.3.0 `(2021-9-28)`

- "Go to results" link in [PDF editor](/cloud/analyzing-results/result-export/#generate-pdf-report).
- [SAML SSO](/cloud/project-and-team-management/saml-sso/) default projects selector for newly provisioned users.
- Show [test run notes](/cloud/analyzing-results/test-results-menu/#create-note) instead of dates on test run selector.
- Fix: PDF editor crashes when the test results don't have HTTP metrics.
- Fix: refreshing the chart on the check and threshold tab breaks the `Add to analysis` button.

### v1.2.1 `(2021-9-9)`

- Add documentation link to Cloud APM forms.
- Fix: disable the [Cloud APM configuration](/cloud/integrations/cloud-apm/) for users without proper subscription.
- Fix: highlight the current project on the sidebar menu.

### v1.2.0 `(2021-9-8)`

- [Cloud APM configuration](/cloud/integrations/cloud-apm/) via settings and [TestBuilder](/test-authoring/test-builder).
- Fix: persist the dashboard order & search filters in the URL after a browser refresh.
- Fix: "UTC" timezone no longer displays a deprecation message.

### v1.1.2 `(2021-9-1)`

- The tooltip to announce the new Thresholds Dashboard won't be visible to new users.
- Fix: enabled aggregation for iterations chart.
- Fix: sudo mode checkbox not showing up on test runs table.
- Fix: the contributors column overflowing improperly.
- Fix: test run crashing when an invalid load generator zone is present.
- Fix: the order of statistics on the TestBuilder -> Thresholds.

### v1.1.0 `(2021-8-17)`

- Save [PDF summary](/cloud/analyzing-results/result-export/#generate-pdf-report) to local storage while editing.
- New [Thresholds dashboard](/cloud/manage/thresholds/).
- Visualize Ramping VUs on [TestBuilder](/test-authoring/test-builder/).
- Fix: improve validation of Ramping VUs on TestBuilder.
- Fix: disable comparing test results with a running test.

### v1.0.4 `(2021-7-27)`

- Improve error reporting when [uploading results to the k6 Cloud](/results-visualization/cloud/).
- Fix: password input field icon and state mismatch.

### v1.0.1 `(2021-7-15)`

- Fix: unable to import HAR file to the TestBuilder if the file contains GET request with request body.
- Fix: PDF summary editor gets stuck when the test result does not include HTTP metrics.

### v1.0.0 `(2021-7-13)`

- Renovated [Test Builder](/test-authoring/test-builder/).