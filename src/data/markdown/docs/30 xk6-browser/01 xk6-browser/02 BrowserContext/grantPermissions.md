---
title: 'grantPermissions(permissions[, options])'
excerpt: 'Grants specified permissions to the BrowserContext.'
---

Grants specified permissions to the `BrowserContext`. Only grants corresponding permissions to the given origin if specified.


| Parameter      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                           |
|----------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| permissions    | array  | A string array of permissions to grant. A permission can be one of the following values: `'geolocation'`, `'midi'`, `'midi-sysex'` (system-exclusive midi), `'notifications'`, `'camera'`, `'microphone'`, `'background-sync'`, `'ambient-light-sensor'`, `'accelerometer'`, `'gyroscope'`, `'magnetometer'`, `'accessibility-events'`, `'clipboard-read'`, `'clipboard-write'`, `'payment-handler'`. |
| options        | object | Optional.                                                                                                                                                                                                                                                                                                                                                                                             |
| options.origin | string | The [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) to grant permissions to, e.g. `'https://example.com'`.                                                                                                                                                                                                                                                                         |


### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const context = browser.newContext();
context.grantPermissions(['clipboard-read', 'clipboard-write'], {
  origin: 'https://example.com/',
});
```

</CodeGroup>
