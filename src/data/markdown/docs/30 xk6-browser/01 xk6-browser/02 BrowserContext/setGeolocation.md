---
title: 'setGeolocation(geolocation)'
excerpt: "Sets the BrowserContext's geolocation."
---

<Blockquote mod="warning">

There is a known issue with this feature. See [issue #435](https://github.com/grafana/xk6-browser/issues/435) for details.

</Blockquote>

Sets the context's geolocation.

| Parameter             | Type   | Description                                          |
| --------------------- | ------ | ---------------------------------------------------- |
| geolocation           | object |                                                      |
| geolocation.latitude  | number | Latitude between -90 and 90.                         |
| geolocation.longitude | number | Latitude between -180 and 180.                       |
| geolocation.accuracy  | number | Optional non-negative accuracy value. Defaults to 0. |


### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const context = browser.newContext();
context.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

</CodeGroup>
