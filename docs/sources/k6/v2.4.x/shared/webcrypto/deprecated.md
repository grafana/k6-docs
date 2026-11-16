---
title: Experimental webcrypto module admonition
---

{{< admonition type="caution" >}}

The experimental module `k6/experimental/webcrypto` has graduated, and its functionality is now available globally through the [`crypto` object](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto). The `k6/experimental/webcrypto` is deprecated and will be removed in the near future.

To migrate your scripts, remove the `k6/experimental/webcrypto` imports and use the `crypto` object instead.

{{< /admonition >}}
