---
title: 'Track transmitted data per URL'
slug: '/track-transmitted-data-per-url'
description: 'This example shows how to track data sent and received for a individual URL.'
weight: 20
---

# Track transmitted data per URL

By default, k6 collects automatically two [built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics#built-in-metrics) related to the transmitted data during the test execution:

- `data_received`: the amount of received data.
- `data_sent`: the amount of data sent.

However, the reported values of these metrics don't tag the particular request or URL. Therefore, you cannot know the amount of data transmitted for a specific request or URL.

This example shows how to track data sent and received for an individual URL.

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Two custom metrics to track data sent and received. We will tag data points added with the corresponding URL
// so we can filter these metrics down to see the data for individual URLs and set threshold across all or per-URL as well.
export const epDataSent = new Counter('endpoint_data_sent');
export const epDataRecv = new Counter('endpoint_data_recv');

export const options = {
  duration: '10s',
  vus: 10,
  thresholds: {
    // We can setup thresholds on these custom metrics, "count" means bytes in this case.
    'endpoint_data_sent': ['count < 2048'],

    // The above threshold would look at all data points added to the custom metric.
    // If we want to only consider data points for a particular URL/endpoint we can filter by URL.
    'endpoint_data_sent{url:https://test.k6.io/contacts.php}': ['count < 1024'],
    'endpoint_data_recv{url:https://test.k6.io/}': ['count < 2048'], // "count" means bytes in this case
  },
};

function sizeOfHeaders(hdrs) {
  return Object.keys(hdrs).reduce((sum, key) => sum + key.length + hdrs[key].length, 0);
}

function trackDataMetricsPerURL(res) {
  // Add data points for sent and received data
  epDataSent.add(sizeOfHeaders(res.request.headers) + res.request.body.length, {
    url: res.url,
  });
  epDataRecv.add(sizeOfHeaders(res.headers) + res.body.length, {
    url: res.url,
  });
}

export default function () {
  let res;

  res = http.get('https://test.k6.io/');
  trackDataMetricsPerURL(res);

  res = http.get('https://test.k6.io/contacts.php');
  trackDataMetricsPerURL(res);

  sleep(1);
}
```

{{< /code >}}
