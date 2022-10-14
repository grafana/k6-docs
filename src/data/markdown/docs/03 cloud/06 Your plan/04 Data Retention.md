---
title: 'About data retention'
excerpt: 'What is k6 data retention and how does it work?'
---

<Blockquote mod="warning" title="k6 retains data on a rolling basis">

**Test-result data older than what is specified in your plan is automatically deleted**.

</Blockquote>

Your _data retention policy_ specifies how long the k6 Cloud service keeps your test-result data.

While test-result data is subject to your data retention policy, **your user data and test configurations are saved indefinitely**.
Keep in mind that the data referenced in the following sections of this page refers to only test-result data.

## Length of data retention

<Blockquote mod="Note" title="In the context of data retention, 1 month = 30 days">

In some informal communication, we might define a data-retention period in months instead of days.

To be clear: **a month of data retention is a unit equal to 30 days**.

</Blockquote>

k6 retains data from when the test runs until the length specified by your subscription.
For example, if your plan has 30 days of data retention, k6 saves the data for a test as soon as the test run starts
and retains this data for a period of 30 days.
After 30 days, the data is deleted.

k6 retains data on a rolling basis, depending on your subscription.
This rolling period applies only for active subscriptions.
If you cancel your subscription, k6 retains the data for seven days past the subscription expiration.

## Purchasing data retention

Every subscription plan automatically includes a data-retention period.
This period specifies how long k6 Cloud retains your test results.

For more info about each plan's data retention policy, visit the [pricing page](https://k6.io/pricing/). 

If you need a data retention policy longer than specified in our plans, please reach out to support for pricing information.

## Retaining data after cancellation

If you cancel your subscription, you can buy a Data Retention plan.
You can use this plan to retain your result data at a lower rate between testing periods.

## Saving tests without retention

Besides purchasing more data retention, you have a few other options to save test data:
- Set the results of a specific test run as baseline
- Add results from all runs of a test to your saved tests 
- Export the results and save them locally.
  
### Baseline tests are exempt

Baseline test results are exempt from data retention rules and are saved indefinitely.

You can select a single test run per test as a baseline test.
Baseline tests serve as a point of comparison for future tests.

To mark a test as a baseline, use the test's vertical three-dots icon.
Refer to [Compare tests](/cloud/analyzing-results/test-comparison).

![Set as baseline](./images/04-data-retention/set-as-baseline.png)

### Save all results for a test

Your subscription level determines how many tests you can save.
Unlike setting a baseline, saved tests can have more than one test run per test.

For instructions on saving a test, refer to [Save, share, delete tests](/cloud/analyzing-results/test-results-menu).


### Export test data

To save tests locally, [export your test results](/cloud/analyzing-results/result-export).


