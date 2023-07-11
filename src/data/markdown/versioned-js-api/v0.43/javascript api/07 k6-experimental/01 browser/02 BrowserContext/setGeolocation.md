---
title: 'setGeolocation(geolocation)'
excerpt: "Sets the BrowserContext's geolocation."
---

<Blockquote mod="attention">

This feature has **known issues**. For details, refer to
[#435](https://github.com/grafana/xk6-browser/issues/435).

</Blockquote>

Sets the context's geolocation.

<TableWithNestedRows>

| Parameter             | Type   | Default | Description                           |
|-----------------------|--------|---------|---------------------------------------|
| geolocation           | object | `null`      |                                       |
| geolocation.latitude  | number | `0`     | Latitude between -90 and 90.          |
| geolocation.longitude | number | `0`     | Latitude between -180 and 180.        |
| geolocation.accuracy  | number | `0`     | Optional non-negative accuracy value. |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  context.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
}
```

</CodeGroup>
