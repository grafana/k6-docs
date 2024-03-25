---
title: 'grantPermissions(permissions[, options])'
description: 'Grants specified permissions to the BrowserContext.'
---

# grantPermissions(permissions[, options])

Grants specified permissions to the `BrowserContext`. Only grants corresponding permissions to the given origin if specified.

<TableWithNestedRows>

| Parameter      | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| permissions    | array  | A string array of permissions to grant. A permission can be one of the following values: `'geolocation'`, `'midi'`, `'midi-sysex'` (system-exclusive midi), `'notifications'`, `'camera'`, `'microphone'`, `'background-sync'`, `'ambient-light-sensor'`, `'accelerometer'`, `'gyroscope'`, `'magnetometer'`, `'accessibility-events'`, `'clipboard-read'`, `'clipboard-write'`, `'payment-handler'`. |
| options        | object | Optional.                                                                                                                                                                                                                                                                                                                                                                                             |
| options.origin | string | The [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) to grant permissions to, e.g. `'https://example.com'`.                                                                                                                                                                                                                                                                         |

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
  context.grantPermissions(['clipboard-read', 'clipboard-write'], {
    origin: 'https://example.com/',
  });
}
```

{{< /code >}}
