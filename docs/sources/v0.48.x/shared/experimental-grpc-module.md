---
title: Experimental grpc module admonition
---

{{% admonition type="caution" %}}

Starting on k6 `v0.49`, the experimental module `k6/experimental/grpc` has been graduated, and its functionality is now available in the [`k6/net/grpc` module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/). The `k6/experimental/grpc` is deprecated and will be removed in `v0.51.0`.

To migrate your scripts, replace all `k6/experimental/grpc` imports with `k6/net/grpc`.

{{% /admonition %}}
