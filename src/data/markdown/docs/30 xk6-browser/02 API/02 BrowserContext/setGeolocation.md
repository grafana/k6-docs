---
title: 'setGeolocation(geolocation)'
excerpt: "Sets the BrowserContext's geolocation."
---

<Blockquote mod="warning">

See [issue #435](https://github.com/grafana/xk6-browser/issues/435) for details of a known issue.

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

{/* eslint-skip */}

```javascript
const context = browser.newContext();
context.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

</CodeGroup>
