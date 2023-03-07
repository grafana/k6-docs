---
title: Cloud options
description: Cloud execution has a few extra options, including to distribute load across different regions or to change projects.
weight: 301
---

# Cloud options

Cloud execution has a few extra options, including to distribute load across different regions or to change projects. These cloud options are **not required**.

> For all available options, refer to [Options](https://k6.io/docs/using-k6/options) in the k6 OSS docs.

## Example

Configure cloud options in the `options.ext.loadimpact` object:

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

## Options and syntax

| Name                          | Default                                                                                | Description                                                                                                                                                                                                           |
|-------------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name (string)                 | The name of the main script file, so something like `script.js`.                       | The name of the test in the k6 Cloud UI. Test runs with the same name will be grouped together.                                                                                                                       |
| projectID (number)            | It is empty by default.                                                                | The ID of the project to which the test is assigned in the k6 Cloud UI. That's in the default project of the user's default organization.                                                                             |
| distribution (object)         | The equivalent of `someDefaultLabel: { loadZone: "amazon:us:ashburn", percent: 100 }`. | How the traffic should be distributed across existing [cloud load zones]({{< relref "./cloud-load-zones" >}}). |
| staticIPs (boolean)           | `false` by default                                                                     | When set to `true` the cloud system will use dedicated IPs assigned to your organization to execute the test.                                                                                                         |
| note (string)                 | Empty by default.                                                                      | Notes regarding the test, changes made, or anything that may be worth noting about your test.                                                                                                                         |
| deleteSensitiveData (boolean) | False by default                                                                       | If set to `true`, k6 deletes sensitive data as soon as the test starts running or, if still queued, when the test aborts. Sensitive data includes scripts, HAR files, archives, and APM credentials.                  |
| drop_metrics (array)          | Empty by default                                                                       | Drops the metrics listed in the array during ingestion time. E.g. `["http_req_tls_handshaking"]`. This helps reduce the cardinality of time series.                                                                   |
| drop_tags (object)            | Empty by default                                                                       | Drops tags for a specified metric, where the metric is the key and the tags are an array. E.g. `{"http_req_duration": ["instance_id"]}`. This helps reduce the cardinality of time series.                            |



> The `deleteSensitiveData` option is unavailable in default subscriptions.
> If you want to activate it, [contact our CS team](https://grafana.com/help/).

### Options to reduce time series

The `Too many time series` alert aborts a test run.
Sometimes, though, a test might trigger the alert even if the script follows all recommended practices from the performance insight.
In these cases, you can consider the `drop_metrics` and `drop_tags` options.

Note that if you use these options, some graphs may appear empty for
the metrics deleted.

Certain important tags and metrics cannot be dropped:
- For metrics,  you can't drop `http_reqs` or `http_req_duration`.
- For tags, you can't drop `name` and `method` from `http_req_duration`.


