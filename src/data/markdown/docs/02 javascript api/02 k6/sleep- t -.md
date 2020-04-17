---
title: "sleep( t )"
description: "Suspends VU execution for the specified duration."
---
Suspend VU execution for the specified duration.

| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| t         | number | Duration, in seconds. |


### Example

Fetching two different pages with a 0-30 second random sleep in between:

<div class="code-group" data-props='{"labels": []}'>

```js
import { sleep } from "k6";
import http from "k6/http";

export default function() {
  http.get("https://k6.io");
  sleep(Math.random() * 30);
  http.get("https://k6.io/features");
};
```

</div>
