---
title: 'What is Data Retention?'
excerpt: 'What is k6 data retention and how does it work?'
---

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> ### Data Retention
>
> Data is retained on a rolling basis. Test result data older than what is specified in
> your plan is automatically deleted. If you need to save data, please be sure to export,
> set the test as baseline, or purchase a period of data retention that meets your
> requirements.

</div>

## What is Data Retention?

Generally speaking data retention is continued storage of an organization's data for various reasons. k6 differentiates between test result data and your user data (projects, profiles, etc.). In terms of data retention, we are referring only to test result data. Your specific user data and test configurations are saved indefinitely on your user profile.

## How do I save my baseline tests?

You can select a single test run per test as a baseline test. The purpose of this is to serve as a point of comparison for future tests. Baseline tests are exempt from data retention rules and are saved indefinitely. To mark a test as baseline, use the three dot menu in the top right corner of your test run and click `Set as Baseline`

![Set as baseline](images/02%data%retention/set-as-baseline.png)

## How long is my data retained?

Data is retained on a rolling basis, depending on your subscription. For plans with 1 month of data retention, we will retain data for 30 days from the test run. After that period the data is deleted. This rolling period only applies while you have an active subscription. If you cancel your subscription, data is retained for 7 days past subscription expiration.

> ### Buying Data Retention
>
> You can purchase a data retention plan during cancelation of your subscription. This allows you to retain your result data at a lower rate between testing periods.

## Can I export my data?

Yes, data can be exported. To export data from a specific test run, please click on the three dot menu in the top right corner of your test run -> export.

## When can I purchase Data Retention

A period data retention is automatically included in every subscription plan. The time your data is retained depends on specific plan you have purchased. For more info on specific plans and corresponding data retention periods please visit our [pricing](https://k6.io/pricing/) page.

> ### Longer Periods of Retention
>
> For periods of data retention longer than specified in our plans, please reach out to support for pricing information.
