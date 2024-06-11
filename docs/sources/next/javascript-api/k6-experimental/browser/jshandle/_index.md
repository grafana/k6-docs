---
title: 'JSHandle'
slug: 'jshandle'
description: 'Browser module: JSHandle Class'
weight: 06
---

# JSHandle

JSHandle represents an in-page JavaScript object.

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method                                                                                                                                                  | Description                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [jsHandle.asElement()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/aselement)                              | Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/). |
| [jsHandle.dispose()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/dispose)                                  | Stops referencing the element handle.                                                                                                                                                                      |
| [jsHandle.evaluate(pageFunction[, arg])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/evaluate)             | Evaluates the `pageFunction` and returns its return value.                                                                                                                                                 |
| [jsHandle.evaluateHandle(pageFunction[, arg])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/evaluatehandle) | Evaluates the `pageFunction` and returns a `JSHandle`.                                                                                                                                                     |
| [jsHandle.getProperties()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/getproperties)                      | Fetches a map with own property names of of the `JSHandle` with their values as `JSHandle` instances.                                                                                                      |
| [jsHandle.jsonValue()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/jshandle/jsonvalue)                              | Fetches a JSON representation of the object.                                                                                                                                                               |

### Example

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
    const jsHandle = await page.evaluateHandle(() => document.head);
    // ...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
