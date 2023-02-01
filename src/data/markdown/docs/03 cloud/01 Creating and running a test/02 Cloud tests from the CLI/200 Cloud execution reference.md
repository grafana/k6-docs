---
title: Cloud execution reference
excerpt: A few test options can run only on k6 Cloud.
---
k6 aims to run the same script in different execution modes without making any script modifications.
So, all [k6 Options](/using-k6/k6-options) are the same between the `k6 run` and `k6 cloud` commands.

However, k6 Cloud tests have few enhancements in its execution configuration and available data:
- Cloud-specific options
- Configurable load zones
- Extra tags for load zones
- Built-in Cloud environment variables

## k6 Cloud options {#k6-cloud-options}

When you run cloud tests, you can choose to use a few extra cloud-specific options.
These cloud options are **not required**.

```javascript
export const options = {
  ext: {
    loadimpact: {
      name: 'Hello k6 cloud!',
      projectID: 123456,
      staticIPs: true,
      distribution: {
        distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
      note: 'Anything that may be worth noting about your test.',
    },
  },
};
```

| Name                          | Default                                                                                | Description                                                                                                                                                                                                           |
|-------------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name (string)                 | The name of the main script file, so something like `script.js`.                       | The name of the test in the k6 Cloud UI. Test runs with the same name will be grouped together.                                                                                                                       |
| projectID (number)            | It is empty by default.                                                                | The ID of the project to which the test is assigned in the k6 Cloud UI. That's in the default project of the user's default organization.                                                                             |
| distribution (object)         | The equivalent of `someDefaultLabel: { loadZone: "amazon:us:ashburn", percent: 100 }`. | How the traffic should be distributed across existing [Load Zones](#load-zones). The keys are string labels that will be injected as [environment variables](#injected-environment-variables-on-the-cloud-execution). |
| staticIPs (boolean)           | `false` by default                                                                     | When set to `true` the cloud system will use dedicated IPs assigned to your organization to execute the test.                                                                                                         |
| note (string)                 | Empty by default.                                                                      | Notes regarding the test, changes made, or anything that may be worth noting about your test.                                                                                                                         |
| deleteSensitiveData (boolean) | False by default                                                                       | If set to `true`, k6 deletes sensitive data as soon as the test starts running or, if still queued, when the test aborts. Sensitive data includes scripts, HAR files, archives, and APM credentials.                  |
| drop_metrics (array)          | Empty by default                                                                       | Drops the metrics listed in the array during ingestion time. E.g. `["http_req_tls_handshaking"]`. This helps reduce the cardinality of time series.                                                                   |
| drop_tags (object)            | Empty by default                                                                       | Drops tags for a specified metric, where the metric is the key and the tags are an array. E.g. `{"http_req_duration": ["instance_id"]}`. This helps reduce the cardinality of time series.                            |


<Blockquote mod="note" title="">

The `deleteSensitiveData` option is unavailable in default subscriptions.
If you want to activate it, contact our CS team at support@k6.io.

</Blockquote>

### Options to reduce time series

The `Too many time series` alert aborts a test run.
Sometimes, though, a test might trigger the alert even if the script follows all recommended practices from the performance insight.
In these cases, you can consider the `drop_metrics` and `drop_tags` options.

Note that if you use these options, some graphs may appear empty for
the metrics deleted.

Certain important tags and metrics cannot be dropped:
- For metrics,  you can't drop `http_reqs` or `http_req_duration`.
- For tags, you can't drop `name` and `method` from `http_req_duration`.


## Load zones {#load-zones}

<div id="list-of-supported-load-zones">This is the list of supported AWS cloud regions: </div>

<Glossary>

- US East (Ohio) - **DEFAULT** `amazon:us:columbus`
- Africa (Cape Town) `amazon:sa:cape town`
- Asia Pacific (Hong Kong) `amazon:cn:hong kong`
- Asia Pacific (Mumbai) `amazon:in:mumbai`
- Asia Pacific (Osaka) `amazon:jp:osaka`
- Asia Pacific (Seoul) `amazon:kr:seoul`
- Asia Pacific (Singapore) `amazon:sg:singapore`
- Asia Pacific (Sydney) `amazon:au:sydney`
- Asia Pacific (Tokyo) `amazon:jp:tokyo`
- Canada (Montreal) `amazon:ca:montreal`
- Europe (Frankfurt) `amazon:de:frankfurt`
- Europe (Ireland)  `amazon:ie:dublin`
- Europe (London) `amazon:gb:london`
- Europe (Milan) `amazon:it:milan`
- Europe (Paris)  `amazon:fr:paris`
- Europe (Stockholm) `amazon:se:stockholm`
- Middle East (Bahrain) `amazon:bh:bahrain`
- South America (São Paulo) `amazon:br:sao paulo`
- US West (N. California) `amazon:us:palo alto`
- US West (Oregon) `amazon:us:portland`
- US East (N. Virginia) `amazon:us:ashburn`

</Glossary>

## Cloud execution tags {#tags}

[Tags](/using-k6/tags-and-groups) provide great flexibility to filter test results.

When a test runs in k6 Cloud, k6 adds two tags to all metrics:

| Tag name      | Type   | Description                                                                                          |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `load_zone`   | string | The load zone from where the metric was collected. Values are in the form: `amazon:us :ashburn`. |
| `instance_id` | number | A unique number that represents the ID of a load-generator server taking part in the test.              |

The cloud tags are automatically added when collecting test metrics.

They work as regular tags do.
For example, you can filter the results for a particular load zone in the k6 Cloud Results view.

![filter tags](../images/Running-a-test-from-the-CLI/analysis-tab-cloud-tags.png 'Cloud execution tags')

Or define a [Threshold](/using-k6/thresholds#thresholds-on-sub-metrics-tagged-metrics) based on the results of a load zone.

<CodeGroup labels={["Threshold based on a cloud execution tag"]}>

```javascript
import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '30s',
  thresholds: {
    'http_req_duration{load_zone:amazon:us:ashburn}': ['p(95)<500'],
    'http_req_duration{load_zone:amazon:ie:dublin}': ['p(95)<800'],
  },
  ext: {
    loadimpact: {
      distribution: {
        ashburnDistribution: { loadZone: 'amazon:us:ashburn', percent: 50 },
        dublinDistribution: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
export default function () {
  http.get('https://test.k6.io/');
}
```

</CodeGroup>


## Cloud environment variables {#env-vars}

When you run tests in k6 Cloud, you can use three additional environment variables to find out in which load zone, server instance, and distribution label the script is currently running.

<Blockquote mod="note" title="You can also set your own environment variables">

To use custom Cloud environment variables, refer to [Cloud environment variables](/cloud/manage/environment-variables/).

</Blockquote>

| Name              | Value  | Description                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUDRUN_LOAD_ZONE`    | string | The load zone from where the metric was collected. Values will be of the form: amazon:us :ashburn (see list above).                                      |
| `K6_CLOUDRUN_INSTANCE_ID`  | number | A sequential number representing the unique ID of a load generator server taking part in the test, starts at 0.                                          |
| `K6_CLOUDRUN_DISTRIBUTION` | string | The value of the "distribution label" that you used in `ext.loadimpact.distribution` corresponding to the load zone the script is currently executed in. |

You can read the values of these variables in your k6 script as usual.

<CodeGroup labels={["Reading injected environment variables"]}>

```javascript
export const options = {
  vus: 50,
  duration: '30s',
  ext: {
    loadimpact: {
      distribution: {
        ashburnDistribution: { loadZone: 'amazon:us:ashburn', percent: 50 },
        dublinDistribution: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
export default function () {
  if (__ENV.K6_CLOUDRUN_DISTRIBUTION === 'ashburnDistribution') {
    // do something
  } else if (__ENV.K6_CLOUDRUN_DISTRIBUTION == 'dublinDistribution') {
    // do something
  }
}
```

</CodeGroup>

<Blockquote mod="Attention" title="The LI_ prefix is deprecated">

Previously, cloud environment variables were prefixed with `LI_` (for example, `LI_LOAD_ZONE`).
These names are deprecated and may be removed in future versions of k6 Cloud.

</Blockquote>

