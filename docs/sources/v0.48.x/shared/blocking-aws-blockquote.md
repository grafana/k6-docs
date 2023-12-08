---
title: jslib/aws module blocking admonition
---

{{% admonition type="caution" %}}

In some cases, using this library&apos;s operations might impact performance and skew your test results.
<br>
<br>
To ensure accurate results, consider executing these operations in the `setup` and `teardown` [lifecycle functions]({{< relref "../using-k6/test-lifecycle" >}}). These functions run before and after the test run and have no impact on the test results.

{{% /admonition %}}
