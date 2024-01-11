---
title: k6/ws module admonition
---

{{% admonition type="note" %}}

A module with a better and standard API exists.
<br>
<br>
The new [k6/experimental/websockets API]({{< relref "../javascript-api/k6-experimental/websockets" >}}) partially implements the [WebSockets API living standard](https://websockets.spec.whatwg.org/).
<br>
<br>
When possible, we recommend using the new API. It uses a global event loop for consistency with other k6 APIs and better performance.

{{% /admonition %}}
