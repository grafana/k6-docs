---
title: End of test
description: When a test finishes, k6 prints a summary of results, with aggregated metrics and meta-data about the test. You can customize this, or configure the test to write granular metrics to a file.
weight: 100
---

# End of test

When a test finishes, k6 prints a summary of the aggregated results to `stdout`. By default, k6 uses a "compact" summary mode that focuses on the most important metrics, but you can also use a "full" mode that shows all available information.

## Summary modes

k6 provides three different ways to display test results through the [`--summary-mode` option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-mode):

- **compact** (default): Displays the most relevant test results in a concise format.
- **full**: Includes everything from the compact format, plus additional k6 metrics and detailed results for each group and scenario.
- **legacy**: Uses the pre-v1.0.0 summary format for backward compatibility.

### Compact mode (default)

The compact mode provides a concise overview focusing on three key aspects:

- Thresholds results
- Checks results
- Aggregated metrics results by category

```bash
  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<1500' p(95)=148.21ms
    ✓ 'p(90)<2000' p(90)=146.88ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......................: 90      13.122179/s
    checks_succeeded...................: 100.00% 90 out of 90
    checks_failed......................: 0.00%   0 out of 90

    ✓ test-api.k6.io is up
    ✓ status is 200

    CUSTOM
    custom_waiting_time................: avg=152.355556 min=120      med=141      max=684      p(90)=147.2    p(95)=148.8

    HTTP
    http_req_duration..................: avg=140.36ms   min=119.08ms med=140.96ms max=154.63ms p(90)=146.88ms p(95)=148.21ms
      { expected_response:true }.......: avg=140.36ms   min=119.08ms med=140.96ms max=154.63ms p(90)=146.88ms p(95)=148.21ms
    http_req_failed....................: 0.00%  0 out of 45
    http_reqs..........................: 45     6.56109/s

    EXECUTION
    iteration_duration.................: avg=152.38ms   min=119.37ms med=141.27ms max=684.62ms p(90)=147.11ms p(95)=148.39ms
    iterations.........................: 45     6.56109/s
    vus................................: 1      min=1       max=1
    vus_max............................: 1      min=1       max=1

    NETWORK
    data_received......................: 519 kB 76 kB/s
    data_sent..........................: 4.9 kB 718 B/s
```

### Full mode

The full mode provides comprehensive test results, including:

- All information from compact mode
- Group-specific results
- Scenario-specific results

For example:

```bash
  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<1500' p(95)=145.17ms
    ✓ 'p(90)<2000' p(90)=132.76ms

    http_req_failed
    ✓ 'rate<0.01' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......................: 110     19.569305/s
    checks_succeeded...................: 100.00% 110 out of 110
    checks_failed......................: 0.00%   0 out of 110

    ✓ grafana.com is up
    ✓ status is 200
    ✓ test-api.k6.io is up
    ✓ crocodile exists

    CUSTOM
    custom_waiting_time................: avg=92.444444 min=56      med=63       max=365      p(90)=120      p(95)=121

    HTTP
    http_req_blocked...................: avg=4.36ms    min=0s      med=5µs      max=245.04ms p(90)=13µs     p(95)=14.59µs
    http_req_connecting................: avg=1.99ms    min=0s      med=0s       max=115.51ms p(90)=0s       p(95)=0s
    http_req_duration..................: avg=105.72ms  min=56.31ms med=117.44ms max=328.62ms p(90)=132.76ms p(95)=145.17ms
      { expected_response:true }.......: avg=105.72ms  min=56.31ms med=117.44ms max=328.62ms p(90)=132.76ms p(95)=145.17ms
    http_req_failed....................: 0.00%  0 out of 65
    http_req_receiving.................: avg=11.83ms   min=39µs    med=168µs    max=54.2ms   p(90)=30.73ms  p(95)=31.49ms
    http_req_sending...................: avg=43.32µs   min=11µs    med=27µs     max=485µs    p(90)=74.2µs   p(95)=81.59µs
    http_req_tls_handshaking...........: avg=2.3ms     min=0s      med=0s       max=127.41ms p(90)=0s       p(95)=0s
    http_req_waiting...................: avg=93.85ms   min=26.54ms med=117.12ms max=328.38ms p(90)=132.61ms p(95)=145.11ms
    http_reqs..........................: 65     11.56368/s

    EXECUTION
    iteration_duration.................: avg=159.31ms  min=56.45ms med=62.65ms  max=570.47ms p(90)=258.2ms  p(95)=350.51ms
    iterations.........................: 45     8.005625/s
    vus................................: 1      min=1       max=2
    vus_max............................: 2      min=2       max=2

    NETWORK
    data_received......................: 7.1 MB 1.3 MB/s
    data_sent..........................: 32 kB  5.6 kB/s


  █ SCENARIO: left

    checks_total.......................: 60      10.674166/s
    checks_succeeded...................: 100.00% 60 out of 60
    checks_failed......................: 0.00%   0 out of 60

    ✓ test-api.k6.io is up
    ✓ status is 200
    ✓ crocodile exists

    CUSTOM
    custom_waiting_time................: avg=130.6    min=116      med=118      max=365      p(90)=121      p(95)=133.2

    HTTP
    http_req_blocked...................: avg=6.13ms   min=2µs      med=6µs      max=245.04ms p(90)=13µs     p(95)=15.99µs
    http_req_connecting................: avg=2.88ms   min=0s       med=0s       max=115.51ms p(90)=0s       p(95)=0s
    http_req_duration..................: avg=134.17ms min=116.42ms med=122.02ms max=328.62ms p(90)=140.36ms p(95)=207.85ms
    http_req_failed....................: 0.00%  0 out of 40
    http_req_receiving.................: avg=128.64µs min=39µs     med=88µs     max=630µs    p(90)=207µs    p(95)=234.04µs
    http_req_sending...................: avg=21.82µs  min=11µs     med=20µs     max=44µs     p(90)=29.3µs   p(95)=34.05µs
    http_req_tls_handshaking...........: avg=3.18ms   min=0s       med=0s       max=127.41ms p(90)=0s       p(95)=0s
    http_req_waiting...................: avg=134.02ms min=116.32ms med=121.93ms max=328.38ms p(90)=140.29ms p(95)=207.73ms
    http_reqs..........................: 40     7.116111/s

    EXECUTION
    iteration_duration.................: avg=281.02ms min=239.75ms med=249.02ms max=570.47ms p(90)=379.3ms  p(95)=455.72ms
    iterations.........................: 20     3.558055/s

    NETWORK
    data_received......................: 239 kB 43 kB/s
    data_sent..........................: 4.8 kB 857 B/s

    ↳ GROUP: crocodiles results

      checks_total.....................: 20      3.558055/s
      checks_succeeded.................: 100.00% 20 out of 20
      checks_failed....................: 0.00%   0 out of 20

      ✓ crocodile exists

      HTTP
      http_req_blocked.................: avg=7.75µs   min=4µs      med=6µs      max=35µs     p(90)=9.4µs    p(95)=14.09µs
      http_req_connecting..............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
      http_req_duration................: avg=150.15ms min=122.84ms med=130.79ms max=328.62ms p(90)=210.14ms p(95)=255.24ms
      http_req_failed..................: 0.00% 0 out of 20
      http_req_receiving...............: avg=130.99µs min=43µs     med=95.5µs   max=558µs    p(90)=207µs    p(95)=233.09µs
      http_req_sending.................: avg=19.95µs  min=13µs     med=19µs     max=35µs     p(90)=23.2µs   p(95)=25.49µs
      http_req_tls_handshaking.........: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
      http_req_waiting.................: avg=150ms    min=122.78ms med=130.46ms max=328.38ms p(90)=210.01ms p(95)=255.02ms
      http_reqs........................: 20    3.558055/s
```

## Understanding the summary components

The summary report organizes information into several key sections:

### Metrics by category

The summary displays metrics based on their source:

- **Protocol-specific metrics**: Results from modules like `k6/http`, `k6/net/grpc`, or `k6/browser`
- **Execution metrics**: Test execution details like iterations and virtual users (VUs)
- **Network metrics**: Data transfer statistics

Note: Categories appear only when relevant. For example, browser metrics appear only when using the `k6/browser` module.

### Checks and thresholds

- [**Thresholds**](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds/): Pass/fail results of performance requirements defined in your test options

  - Example: Response time limits or error rate limits
  - Always displayed at the top of the results
  - Clear indication of success (✓) or failure (✗)

- [**Checks**](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks/): Results of test assertions that verify specific behaviors
  - Example: Response status codes or response body content
  - Shows pass/fail ratio for each check
  - In full mode, checks appear under their respective groups or scenarios

### Groups and scenarios (full mode only)

When using full mode, you'll see additional sections:

- [**Groups**](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups/): Results for logical groupings of related requests
- [**Scenarios**](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/): Results for each test scenario configuration

## Summary options

Customize the summary output with these options:

- [`--summary-mode`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-mode): Choose between compact, full, or legacy display
- [`--no-summary`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#no-summary): Disable the end-of-test report
- [`--summary-trend-stats`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-trend-stats): Select which statistics to show for Trend metrics
- [`--summary-time-unit`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-time-unit): Set a consistent time unit for all values

## Going further

k6 offers additional ways to process and analyze test results:

- [**Custom summaries**](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test/custom-summary): Create your own summary format with complete control over the output
- [**Real-time outputs**](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/): Stream metrics during the test run:
  - [CSV output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/csv): For spreadsheet analysis
  - [JSON output](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/json): For programmatic processing
  - Head to the [real-time outputs section](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/) for more.
