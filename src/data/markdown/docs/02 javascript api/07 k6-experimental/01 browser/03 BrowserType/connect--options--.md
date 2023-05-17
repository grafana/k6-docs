---
title: 'connect(wsURL, [options])'
excerpt: 'Browser module: BrowserType.connect method'
---

Connects to an existing browser instance.

| Parameter         | Type     | Default | Description                                                                                                                                                                                                                                                           |
|-------------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| debug             | boolean  | `false` | All CDP messages and internal fine grained logs will be logged if set to `true`.                                                                                                                                                                                      |
| slowMo            | string   | `null`  | Slow down input actions and navigation by the specified time e.g. `'500ms'`.                                                                                                                                                                                          |
| timeout           | string   | `'30s'` | Default timeout to use for various actions and navigation.                                                                                                                                                                                                            |


### Returns

| Type   | Description                                            |
|--------|--------------------------------------------------------|
| object | [Browser](/javascript-api/k6-browser/api/browser/) object |


## Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const wsURL = 'ws://localhost:9222/devtools/browser/a7ee4f2d-35cf-4478-a333-f597e1532ab0';
  const browser = chromium.connect(wsURL, {
    debug: true,
    slowMo: '500ms',
    timeout: '30s',
  });
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/');
    page.screenshot({ path: `example-chromium.png` });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>
