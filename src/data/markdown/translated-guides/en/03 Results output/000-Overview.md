---
title: Overview
excerpt: All the ways you can look at k6 results. While the test runs, after the test runs, on an external platform, as summary statistics.
---

k6 emits [metrics](/using-k6/metrics) with timestamps at every point of the test.
You can output the metric results as either **aggregated statistics** or **individual data points**.

- For a top-level test overview, use the [end-of-test summary](../end-of-test).
- For granular output of all metrics (with timestamps), you can either
  - Write them to a file
  - [Stream them in real time](../real-time)

![A diagram of the two broad ways to handle results: aggregated and granular](./images/k6-results-diagram.png)

