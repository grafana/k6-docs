---
title: 'About data retention'
excerpt: 'What is k6 data retention and how does it work?'
slug: '/cloud/billing-user-menu/data-retention/'
---

The _Data retention policy_ specifies how long the k6 Cloud service keeps your test-result data.

k6 differentiates between test-result data and user data (projects, profiles, etc.).
Discussion about data retention refers to only test-result data.
Your *user data and test configurations are saved indefinitely* on your user profile.

<Blockquote mod="warning">

k6  retains data on a rolling basis.
**Test result data older than what is specified in your plan is automatically deleted**.

</Blockquote>

## Ways to save test data

If you need to save data, you can do one of the following:
- [Export](/cloud/analyzing-results/result-export/) the results you need.
- [Set the test as baseline](/cloud/analyzing-results/test-comparison/)
- Purchase a period of data retention that meets your requirements.
  
## How long is my data retained?

k6 retains data on a rolling basis, depending on your subscription.
For plans with one month of data retention, we retain data for 30 days from the test run.
After that period, the data is deleted.

This rolling period applies only for active subscriptions.
If you cancel your subscription, k6 retains the data for seven days past subscription expiration.


## How do I save my baseline test result?

**Baseline test results are exempt from data retention rules and are saved indefinitely.**

You can select a single test run per test as a baseline test.
Baseline tests serve as a point of comparison for future tests.

To mark a test as a baseline, use the three-dot menu in the top right corner of your test run and select **Save as Baseline**.

![Set as baseline](images/04-data-retention/set-as-baseline.png)

## Save test result

Your subscription level determines how many tests you can save.
For instructions on saving a test, refer to [Save, share, delete tests](../analyzing-results/test-results-menu).

Unlike setting a baseline, saved tests can have more than one test run per test.

![Save test result](images/04-data-retention/save-test-result.png)

## Can I export my data?

Yes, you can [export your test results](/cloud/analyzing-results/result-export).

## Purchase data retention

Every subscription plan automatically includes a data-retention period. This period specifies how long k6 Cloud retains your test results.
For more info about each plan's data retention policy,
read [How long is my data retained](#how-long-is-my-data-retained) and visit the [pricing page](https://k6.io/pricing/). 

If you need a data retention policy longer than specified in our plans, please reach out to support for pricing information.

## Buying a Data Retention plan after cancellation

If you cancel your subscription, you can buy a Data Retention plan.
You can use this plan to retain your result data at a lower rate between testing periods.

