---
title: Experimental timers module admonition
---

{{% admonition type="caution" %}}

Starting on k6 `v0.50`, the experimental module `k6/experimental/timers` has been graduated, and its functionality is now available in the [`k6/timers` module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-timers/). The `k6/experimental/timers` is deprecated and will be removed in `v0.52.0`.

To migrate your scripts, replace all `k6/experimental/timers` imports with `k6/timers`.

{{% /admonition %}}
