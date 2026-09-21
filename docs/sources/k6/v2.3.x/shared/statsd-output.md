---
title: StatsD module admonition
---

{{< admonition type="note" >}}

The built-in StatsD output has been deprecated on k6 v0.47.0 and removed in v0.55.0. You can continue to stream metrics to StatsD by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd), or using the [OpenTelemetry output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/opentelemetry/) depending on your use case.

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

{{< /admonition >}}
