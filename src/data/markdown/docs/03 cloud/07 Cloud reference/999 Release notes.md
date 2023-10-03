---
title: Release notes
head_title: k6 Cloud Release Notes
excerpt: 'On this page, you can find the product release notes of k6 Cloud.'
---

### v3.17.2 `(2023-2-14)`
- Fix selected sort component
- Fix inconsistencies of test runs showing in the trend bar chart

### v3.17.0 `(2023-1-30)`
- Add support for Grafana authentication mechanism
- Fix `Failed by threshold` status instead of `Test failed`

### v3.16.0 `(2022-12-15)`
- Update the tag filter to allow custom input for tags values
- Customizable [test trends](https://k6.io/docs/cloud/analyzing-results/test-comparison/#explore-test-trends)
- Fix saving the filter otions in the insights panel

### v3.15.3 `(2022-12-5)`
- Fix long test runs are not aborted when having too many metrics

### v3.15.2 `(2022-11-22)`
- Fix show password visibility toggle in account registration form
- Fix display actual API error on password reset page
- Avoid fetching logs twice
- Fix `checks` count displayed as `(/)` when test had no checks

### v3.15.0 `(2022-11-2)`
- Add teams dropdown to [SAML SSO](/cloud/project-and-team-management/saml-sso/)
- Fix pdf crashes when fetching urls

### v3.14.0 `(2022-11-1)`
- Cloud REST API

### v3.13.4 `(2022-10-19)`
- Protect billing receipt download link

### v3.13.0 `(2022-10-12)`
- Drag-and-drop metrics between charts in analysis panel

### v3.12.0 `(2022-10-11)`
- Improved UX of metric analysis controls
- HTTP tab showing NaN/0 while metric_summaries are being loaded
- Add automatic sorting and filtering to [audit trail](/cloud/manage/audit-trail/)

### v3.11.0 `(2022-9-26)`
- Apply global time filter to [analysis panel](/cloud/analyzing-results/analysis-tab/)
- [Environment variables](/cloud/manage/environment-variables/)

### v3.10.5 `(2022-9-13)`
- Fix wrong checks data in pdf reports

### v3.10.4 `(2022-9-5)`
- Add tooltip to threshold names in the test result page
- Restrict audit trail view based on new subscription rule
- Add expiry date on subscription status overview for enterprise subscriptions

### v4.2.1 `(2022-8-19)`
- Fix time series when resolution changed while streaming data.
- Fix time series not animated correctly while streaming data.
- Fix first new data point not added to time series while streaming data.

### v4.2.0 `(2022-8-17)`
- New Analysis Panel.
- Display warning when script options cannot be validated.
- Fill user name and user email on the support widget.
- Fix misaligned load zone flags

### v4.1.0 `(2022-8-15)`
- [Audit Trail](/cloud/manage/audit-trail/): audit the activity within your organization.
- [Teams](/cloud/project-and-team-management/teams/): a new unit between organizations and projects.
- Fix crashes in Member table, PDF summary, and Scenarios input filter.

### v0.4.0 [Grafana k6 Cloud App](https://grafana.com/grafana/plugins/grafana-k6-app/) `(2022-8-10)`
- Add ability to edit and create tests.
- Add support for dynamic dashboard variables.
- Display load zone info in Runs view.
- Improve number and date formatting.

### v3.8.2 `(2022-7-14)`
- Integrate in-app support with the Zendesk widget.

### v3.8.1 `(2022-7-7)`
- Fix: Update API token pages copy.
- Fix: Disable toast error for unsubscribed APM.
- Fix: NaN and wrong colors in PDF tables.

### v3.8.0 `(2022-7-5)`
- Support for [organization-level tokens](/cloud/integrations/token/).

### v3.7.0 `(2022-6-14)`
- New `deleteSensitiveData` option to enable deleting sensitive data as soon as the test starts.


### v3.6.0 `(2022-6-7)`
- Support for script scenarios in [TestBuilder](/test-authoring/test-builder/).

### v3.5.0 `(2022-5-31)`
- Grafana Single Sign On.
- Add more descriptive messages to performance insights header.
- Sort status code on insights filter.

### v3.4.4 `(2022-5-17)`
- Disable create and run test runs when cloud execution is disabled.
- Fix: add support for private load zones on the PDF report.
- Fix: create new org does not leave the user with read-only permission.

### v3.4.3.internal `(2022-4-26)`
- Internal: improve cloud service stability and reliability.
- Fix: private load zones(/cloud/creating-and-running-a-test/private-load-zones/) authentication.

### `v0.3.0` [Grafana k6 Cloud App](https://grafana.com/grafana/plugins/grafana-k6-app/) `(2022-4-25)`

- Simplify the Plugin Setup.
- Fix: include private load zones.
- Fix: show correct flag for South Africa load zones.
- Fix: show small trending chart bar for runs without response times.

### v3.4.3 `(2022-4-19)`
- Edit note icon.

### v3.4.2.internal `(2022-4-12)`
- Internal: improve cloud service stability and reliability.

### v3.4.2 `(2022-4-5)`
- Better alignment of project buttons.

### v3.4.1.internal `(2022-4-5)`
- Internal: improve cloud service stability and reliability.

### v3.4.1 `(2022-3-23)`
- Fix: subscription view includes now values from addons.

### v3.3.2 `(2022-3-16)`
- Fix: error when loading project with many team members.
- Fix: error when Scenarios configuration is `null`.
- Fix: Scenarios not shown when default scenario is present.

### v3.3.1.internal `(2022-3-14)`
- [SAML SSO](/cloud/project-and-team-management/saml-sso/#auto-assigning-your-internal-teams-to-k6-projects) can automatically assign team members to one or multiple projects.

### v3.3.1 `(2022-3-2)`
- Fix: allow creating tests using [TestBuilder](/test-authoring/test-builder/) without an active subscription.

### v3.3.0 `(2022-3-1)`
- New UI to invite multiple users simultaneously.
- Show the VUh counter on subscriptions view.
- Fix: use the 95th percentile in test summary.
- Fix:  ramping arrival rate validation on the [TestBuilder](/test-authoring/test-builder/).

### `v0.2.0` [Grafana k6 Cloud App](https://grafana.com/grafana/plugins/grafana-k6-app/) `(2022-2-24)`
- Cache fetched data and refresh it in background.
- Add error handling and loading indicators.
- Add additional meta bar info.

### v3.2.1 `(2022-2-24)`
- When recording a session, preserve `postData.decoded` data to handle form values with `%` symbols.

### v3.2.0 `(2022-2-22)`
- Add the ability to preselect your default project on user settings.
- Display CLI discoverability message in a snackbar UI instead of a tooltip.

### v3.1.2 `(2022-2-17)`
- Better alignment of items in comparison legend.
- Fix: misaligned filter labels in expanded url row when using `Firefox`.
- Fix: wrong series color in performance overview chart when comparing.

### v3.1.0 `(2022-2-9)`
- Add visual distinction between the private and public load zones used in the test.

### v3.0.1 `(2022-1-31)`
- Fix: performance chart tooltip getting cropped in comparison mode.
- Fix: PostDataNode would throw on “missing” data rather than to handle it.

### v3.0.0 `(2022-1-27)`
- Support for defining [k6 Scenarios](/using-k6/scenarios/) on the [TestBuilder](/test-authoring/test-builder/).
- Improve the UI component to invite multiple users.
- `alt/cmd` and click on a doc link opens in a new tab and not in in-app viewer.
- Fix: labeling `static` assets on the test result view.

### v2.2.1 `(2022-1-21)`
- Move position of the `Add to analysis` button for better visibility.
- Fix: crash on schedules page after scheduling a new test.

### v2.2.0 `(2022-1-20)`
- The saved tests and scheduled tests pages provides a link to the test project.
- Fix: changing aggregation method or load zone on test result analysis view.
- Fix: the time range filter was not cleared properly.

### v2.1.2 `(2022-1-18)`
- New [load zone regions](/cloud/creating-and-running-a-test/cloud-scripting-extras/load-zones): Bahrain, Cape Town, Milan, and Osaka.

### v2.1.0 `(2022-1-12)`
- Add support for new user role - [project read only](/cloud/project-and-team-management/members/#project-member).

### v2.0.0 `(2022-1-10)`
- New Scenario UI.
- New gRPC analysis panel on test result view.
- Include Rome to timezone select component.
- Reference the p95 response time on the `load_time` label.
- Update integrations page.
- Fix: Hide "Aborted by script error Edit Script button" for k6 to ingest tests.

### `v0.1.0` [Grafana k6 Cloud App](https://grafana.com/grafana/plugins/grafana-k6-app/) `(2021-12-23)`
- Release launch

### v1.7.0 `(2021-11-23)`
- Improve the script editor input and move it to breadcrumb.
- Start email notification in simple mode, and add sensible defaults.
- Show user-friendly error message when VU limit is exceeded.
- Fix: redirect SAML SSO user to SAML SSO login.

### v1.6.0 `(2021-11-17)`
- General availability of [v0.35.0](https://github.com/grafana/k6/releases/tag/v0.35.0).

### v1.6.0 `(2021-11-9)`

- The [exported CSV file](/cloud/analyzing-results/result-export/#export-as-csv) includes now all the test result data.
- On the test result view, add the ability to download the script when it's too large to preview.
- Add a button to tail logs in cloud logs view.
- Change project member select dropdown to autocomplete component.
- If a user is registered through the invitation of an organization, the user's default organization will be the invited organization.


### v1.5.2 `(2021-10-22)`

- Fix: the script editor did not auto resize unless the window was resized.
- Fix: "Add new metric" placeholder spanned the full width of the page.

### v1.5.1 `(2021-10-21)`

- Improve the content of the  [`Too Many Metrics` alert](/cloud/analyzing-results/performance-insights/).
- Fix: doc links not opening on shared pages.

### v1.5.0 `(2021-10-20)`

- Better visibility for updates on the [subscriptions UI](/cloud/your-plan/manage-subscription/).

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

- Improve error reporting when [uploading results to the k6 Cloud](/results-output/real-time/cloud/).
- Fix: password input field icon and state mismatch.

### v1.0.1 `(2021-7-15)`

- Fix: unable to import HAR file to the TestBuilder if the file contains GET request with request body.
- Fix: PDF summary editor gets stuck when the test result does not include HTTP metrics.

### v1.0.0 `(2021-7-13)`

- Renovated [Test Builder](/test-authoring/test-builder/).
