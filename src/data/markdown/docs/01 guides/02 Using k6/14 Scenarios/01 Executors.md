---
title: 'Executors'
---

## Executors

Executors are the workhorses of the k6 execution engine. Each one schedules VUs and
iterations differently, and you'll choose one depending on the type of traffic you
want to model to test your services.

Possible values for `executor` are the executor name separated by hyphens:

- [`shared-iterations`](/using-k6/scenarios/executors/shared-iterations)
- [`per-vu-iterations`](/using-k6/scenarios/executors/per-vu-iterations)
- [`constant-vus`](/using-k6/scenarios/executors/constant-vus)
- [`ramping-vus`](/using-k6/scenarios/executors/ramping-vus)
- [`constant-arrival-rate`](/using-k6/scenarios/executors/constant-arrival-rate)
- [`ramping-arrival-rate`](/using-k6/scenarios/executors/ramping-arrival-rate)
- [`externally-controlled`](/using-k6/scenarios/executors/externally-controlled)
