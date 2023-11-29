---
title: 'setGeolocation(geolocation)'
excerpt: "Sets the BrowserContext's geolocation."
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/browsercontext/setgeolocation/
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
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default function () {
  const context = browser.newContext();
  context.setGeolocation({latitude: 59.95, longitude: 30.31667});
}
```

</CodeGroup>
