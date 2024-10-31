---
weight: 400
title: Results output
descriptiontion: All the ways you can look at k6 results. While the test runs, after the test runs, on an external platform, as summary statistics.
---

# Results output

k6 emits [metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) with timestamps at every point of the test.
You can output the metric results as either **aggregated statistics** or **individual data points**.

- For a top-level test overview, use the [end-of-test summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test).
- For granular output of all metrics (with timestamps), you [stream metrics in real time](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time).

If you stream your metrics, you can either write them to a file, like JSON, or stream them to a service, like InfluxDB.

![A diagram of the two broad ways to handle results: aggregated and granular](/media/docs/k6-oss/k6-results-diagram.png)

## Read more

- [End of test summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test)
- [Real time results](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time)
- [Web dashboard](https://grafana.com/docs/k6/<K6_VERSION>/results-output/web-dashboard)
- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/)
- [Build an output extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/output-extensions)
- [k6 data collection pipeline](https://grafana.com/blog/2023/08/10/understanding-grafana-k6-a-simple-guide-to-the-load-testing-tool/)
