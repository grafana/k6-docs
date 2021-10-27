---
title: Release notes
head_title: k6 Cloud Release notes
excerpt: 'On this page, you can find the k6 Cloud changelog.'
---

### v1.5.2

`2021-10-22`

- Fix: Monaco editor not auto-resizing unless the window is resized.
- Fix: "Add new metric" placeholder spanning the full width of the page.

### v1.5.1

`2021-10-21`

- Add text for `too-many-time-series` [performance insights](/cloud/analyzing-results/performance-insights/).
- Fix: doc links not opening on shared pages.

### v1.5.0

`2021-10-20`

- Don’t display tutorial messages when logged in as admin.
- Better visibility into subscriptions UI update.

### v1.4.0

`2021-10-6`

- Add ability to free text query on [logs tab](/cloud/analyzing-results/logs/).
- Fix: confusing placeholder for analysis comparison chart.
- Fix: ServiceWorker cleanup (no more cogs in the networks panel).

### v1.3.0

`2021-9-28`

- "Go to results" link in [PDF editor](/cloud/analyzing-results/result-export/#generate-pdf-report).
- [SAML SSO](/cloud/project-and-team-management/saml-sso/) default projects selector for newly provisioned users
- Show Notes instead of dates on test run selector.
- Fix: PDF editor crashes when test run is missing http metrics.
- Fix: refreshing chart in check/threshold breaks add to analysis button.

### v1.2.1

`2021-9-9`

- Fix: add documentation link to Cloud APM forms.
- Fix: Disable Cloud APM configuration for users without proper subscription.
- Fix: current project link highlighting issues.

### v1.2.0

`2021-9-8`

- [Cloud APM configuration](/cloud/integrations/cloud-apm/) via settings/testbuilder.
- Fix: persist dashboard order & search filters in url after browser refresh.
- Fix: "UTC" timezone no longer displays a deprecation message.