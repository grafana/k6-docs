---
title: End of test
description: When a test finishes, k6 prints a summary of results, with aggregated metrics and meta-data about the test. You can customize this, or configure the test to write granular metrics to a file.
weight: 100
weight: 100
---

# End of test

When a test finishes, k6 prints a top-level overview of the aggregated results to `stdout`.

```bash
checks.........................: 50.00% ✓ 45       ✗ 45
data_received..................: 1.3 MB 31 kB/s
data_sent......................: 81 kB  2.0 kB/s
group_duration.................: avg=6.45s    min=4.01s    med=6.78s    max=10.15s   p(90)=9.29s    p(95)=9.32s
http_req_blocked...............: avg=57.62ms  min=7µs      med=12.25µs  max=1.35s    p(90)=209.41ms p(95)=763.61ms
http_req_connecting............: avg=20.51ms  min=0s       med=0s       max=1.1s     p(90)=100.76ms p(95)=173.41ms
http_req_duration..............: avg=144.56ms min=104.11ms med=110.47ms max=1.14s    p(90)=203.54ms p(95)=215.95ms
  { expected_response:true }...: avg=144.56ms min=104.11ms med=110.47ms max=1.14s    p(90)=203.54ms p(95)=215.95ms
http_req_failed................: 0.00%  ✓ 0        ✗ 180
http_req_receiving.............: avg=663.96µs min=128.46µs med=759.82µs max=1.66ms   p(90)=1.3ms    p(95)=1.46ms
http_req_sending...............: avg=88.01µs  min=43.07µs  med=78.03µs  max=318.81µs p(90)=133.15µs p(95)=158.3µs
http_req_tls_handshaking.......: avg=29.25ms  min=0s       med=0s       max=458.71ms p(90)=108.31ms p(95)=222.46ms
http_req_waiting...............: avg=143.8ms  min=103.5ms  med=109.5ms  max=1.14s    p(90)=203.19ms p(95)=215.56ms
http_reqs......................: 180    4.36938/s
iteration_duration.............: avg=12.91s   min=12.53s   med=12.77s   max=14.35s   p(90)=13.36s   p(95)=13.37s
iterations.....................: 45     1.092345/s
vus............................: 1      min=1      max=19
vus_max........................: 20     min=20     max=20
```

<br/>

Besides this default summary, k6 can output the results in other formats at the end of the test:

| On this page                                                                                         | Result format            | Read about...                                                 |
| ---------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------- |
| [Custom summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test/custom-summary) | Aggregated               | Using the `handleSummary()` to make completely custom reports |
| [CSV](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/csv)                         | Time-stamped data points | Writing results as a CSV file, and the structure of the data  |
| [JSON](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/json)                       | Time-stamped data points | Writing results as a JSON file, and the structure of the data |

## The default summary

The end-of-test summary reports details and aggregated statistics for the primary aspects of the test:

- Summary statistics about each built-in and custom [metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics#built-in-metrics) (e.g. mean, median, p95, etc).
- A list of the test's [groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#groups) and [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios)
- The pass/fail results of the test's [thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) and [checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks).

{{< code >}}

```bash
Ramp_Up ✓ [======================================] 00/20 VUs  30s
     █ GET home - https://example.com/

       ✓ status equals 200

     █ Create resource - https://example.com/create

       ✗ status equals 201
        ↳  0% — ✓ 0 / ✗ 45

     checks.........................: 50.00% ✓ 45       ✗ 45
     data_received..................: 1.3 MB 31 kB/s
     data_sent......................: 81 kB  2.0 kB/s
     group_duration.................: avg=6.45s    min=4.01s    med=6.78s    max=10.15s   p(90)=9.29s    p(95)=9.32s
     http_req_blocked...............: avg=57.62ms  min=7µs      med=12.25µs  max=1.35s    p(90)=209.41ms p(95)=763.61ms
     http_req_connecting............: avg=20.51ms  min=0s       med=0s       max=1.1s     p(90)=100.76ms p(95)=173.41ms
   ✗ http_req_duration..............: avg=144.56ms min=104.11ms med=110.47ms max=1.14s    p(90)=203.54ms p(95)=215.95ms
       { expected_response:true }...: avg=144.56ms min=104.11ms med=110.47ms max=1.14s    p(90)=203.54ms p(95)=215.95ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 180
     http_req_receiving.............: avg=663.96µs min=128.46µs med=759.82µs max=1.66ms   p(90)=1.3ms    p(95)=1.46ms
     http_req_sending...............: avg=88.01µs  min=43.07µs  med=78.03µs  max=318.81µs p(90)=133.15µs p(95)=158.3µs
     http_req_tls_handshaking.......: avg=29.25ms  min=0s       med=0s       max=458.71ms p(90)=108.31ms p(95)=222.46ms
     http_req_waiting...............: avg=143.8ms  min=103.5ms  med=109.5ms  max=1.14s    p(90)=203.19ms p(95)=215.56ms
     http_reqs......................: 180    4.36938/s
     iteration_duration.............: avg=12.91s   min=12.53s   med=12.77s   max=14.35s   p(90)=13.36s   p(95)=13.37s
     iterations.....................: 45     1.092345/s
     vus............................: 1      min=1      max=19
     vus_max........................: 20     min=20     max=20

ERRO[0044] some thresholds have failed
```

{{< /code >}}

Above's an example of a report that k6 generated after a test run.

- It has a scenario, `Ramp_Up`
- The requests are split into two groups:
  - `GET home`, which has a check that responses are `200` (all passed)
  - `Create resource`, which has a check that responses are `201` (all failed)
- The test has one threshold, requiring that 95% of requests have a duration under 200ms (failed)

## Summary options

k6 provides some options to filter or silence summary output:

- The [`--summary-trend-stats` option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-trend-stats) defines which [Trend metric](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/trend) statistics to calculate and show.
- The [`--summary-time-unit` option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-time-unit) forces k6 to use a fixed-time unit for all time values in the summary.
- The [`--no-summary` option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#no-summary) completely disables report generation, including `--summary-export` and `handleSummary()`.

{{< collapse title="Summary export to a JSON file (Discouraged)" >}}

### Summary export to a JSON file

k6 also has the [`--summary-export=path/to/file.json` option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-export), which exports some summary report data to a JSON file.

The format of `--summary-export` is similar to the `data` parameter of the `handleSummary()` function.
Unfortunately, the `--summary-export` format is limited and has a few confusing peculiarities.
For example, groups and checks are unordered,
and threshold values are unintuitive: `true` indicates the threshold failed, and `false` that it succeeded.

We couldn't change the `--summary-export` data format, because it would have broken backward compatibility in a feature that people depended on in CI pipelines.
But, the recommended approach to export to a JSON file is to use the `handleSummary()` function].
The `--summary-export` option will likely be deprecated in the future.

{{< /collapse >}}
