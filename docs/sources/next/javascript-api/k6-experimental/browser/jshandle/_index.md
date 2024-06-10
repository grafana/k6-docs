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

| Method                                                                                                                                               | Playwright Relevant Distinctions |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-as-element" target="_blank" >jsHandle.asElement()</a>                              | -                                |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-dispose" target="_blank" >jsHandle.dispose()</a>                                   | -                                |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-evaluate" target="_blank" >jsHandle.evaluate(pageFunction[, arg])</a>              | -                                |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-evaluate-handle" target="_blank" >jsHandle.evaluateHandle(pageFunction[, arg])</a> | -                                |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-get-properties" target="_blank" >jsHandle.getProperties()</a>                      | -                                |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-get-property" target="_blank" >jsHandle.getProperty(propertyName)</a>              | -                                |
| <a href="https://playwright.dev/docs/api/class-jshandle#js-handle-json-value" target="_blank" >jsHandle.jsonValue()</a>                              | -                                |

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
