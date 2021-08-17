---
title: 'New Relic'
excerpt: 'How to export metrics from k6 Cloud to New Relic'
---

TODO

For sending custom metrics from your test run to New Relic's Prometheus remote write integration, follow the [instructions](https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/) on their documentation.

The `prometheus_server` parameter should be included in the `remoteWriteURL` configuration parameter. The bearer token can be included either as `credentials.token` (APM configuration parameter) or as part of the `remoteWriteURL` using the `X-License-Key` parameter, as mentioned in their documentation.

So an example configuration for New Relic might look like this, with `X-License-Key` used as `token` in `credentials` would be:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "prometheus",
          remoteWriteURL: "https://metric-api.newrelic.com/prometheus/v1/write?prometheus_server=<YOUR_DATA_SOURCE_NAME>",
          credentials: {
            token: "<YOUR_LICENSE_KEY>"
          },
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```