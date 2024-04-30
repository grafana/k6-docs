---
title: 'setGeolocation(geolocation)'
description: "Sets the BrowserContext's geolocation."
---

# setGeolocation(geolocation)

{{% admonition type="caution" %}}

This feature has **known issues**. For details, refer to
[#435](https://github.com/grafana/xk6-browser/issues/435).

{{% /admonition %}}

Sets the context's geolocation.

<TableWithNestedRows>

| Parameter             | Type   | Default | Description                           |
| --------------------- | ------ | ------- | ------------------------------------- |
| geolocation           | object | `null`  |                                       |
| geolocation.latitude  | number | `0`     | Latitude between -90 and 90.          |
| geolocation.longitude | number | `0`     | Latitude between -180 and 180.        |
| geolocation.accuracy  | number | `0`     | Optional non-negative accuracy value. |

</TableWithNestedRows>

### Example

{{< code >}}

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
};

export default function () {
  const context = browser.newContext();
  context.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
}
```

{{< /code >}}
