---
title: 'Concepts'
description: High-level explanations about how your executor configuration can change the test execution and test results
weight: -10
---

# Concepts

These topics explain the essential concepts of how scenarios and their executors work.

Different scenario configurations can affect many different aspects of your system,
including the generated load, utilized resources, and emitted metrics.
If you know a bit about how scenarios work, you'll design better tests and interpret test results with more understanding.

| On this page                                                                                                                  | Read about                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Open and closed models](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/open-vs-closed)                 | Different ways k6 can schedule VUs, their affects on test results, and how k6 implements the open model in its arrival-rate executors |
| [Graceful Stop](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/graceful-stop)                           | A configurable period for iterations to finish or ramp down after the test reaches its scheduled duration                             |
| [Arrival-rate VU allocation](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/arrival-rate-vu-allocation) | How k6 allocates VUs in arrival-rate executors                                                                                        |
| [Dropped iterations](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/dropped-iterations)                 | Possible reasons k6 might drop a scheduled iteration                                                                                  |
