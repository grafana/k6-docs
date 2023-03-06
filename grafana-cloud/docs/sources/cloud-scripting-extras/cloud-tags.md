---
title: Cloud tags
description: Cloud execution has a extra tags to filter for load zones and instance ids
weight: 303
---

# Cloud tags

[Tags](https://k6.io/using-k6/tags-and-groups) provide great flexibility to filter test results.

When a test runs in k6 Cloud, k6 adds two tags to all metrics:

| Tag name      | Type   | Description                                                                                          |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `load_zone`   | string | The load zone from where the metric was collected. Values are in the form: `amazon:us :ashburn`. |
| `instance_id` | number | A unique number that represents the ID of a load-generator server taking part in the test.              |

The cloud tags are automatically added when collecting test metrics.

They work as regular tags do.
For example, you can filter the results for a particular load zone,
or define a [Threshold](https://k6.io/using-k6/thresholds#thresholds-on-sub-metrics-tagged-metrics) based on the results of a load zone.


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


