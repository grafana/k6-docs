---
title: 'JSHandle'
slug: 'jshandle'
description: 'Browser module: JSHandle Class'
weight: 06
---

# JSHandle

Represents a reference to a JavaScript object within the context of a webpage. This allows you to interact with JavaScript objects directly from your script.

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method                                                                                                                            | Description                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [asElement()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/aselement)                              | Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/elementhandle/). |
| [dispose()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/dispose)                                  | Stops referencing the element handle.                                                                                                                                                         |
| [evaluate(pageFunction[, arg])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/evaluate)             | Evaluates the `pageFunction` and returns its return value.                                                                                                                                    |
| [evaluateHandle(pageFunction[, arg])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/evaluatehandle) | Evaluates the `pageFunction` and returns a `JSHandle`.                                                                                                                                        |
| [getProperties()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/getproperties)                      | Fetches a map with own property names of of the `JSHandle` with their values as `JSHandle` instances.                                                                                         |
| [jsonValue()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/jshandle/jsonvalue)                              | Fetches a JSON representation of the object.                                                                                                                                                  |

### Example

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/browser';

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
