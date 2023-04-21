---
title: "BrowserType"
excerpt: "Browser module: BrowserType Class"
---

The `BrowserType` is the entry point into launching a browser process; `chromium` is currently the only supported `BrowserType`. To use it, import `chromium` from the top level module `k6/experimental/browser`.

| Method                                                                                  | Description                                                                  |
|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| browserType.connect([options]) <BWIPT id="17"/>                                         | Connect attaches k6 browser to an existing browser instance.                 |
| [browserType.executablePath()](/javascript-api/k6-experimental/browser/browsertype/executablepath/) | Returns the path where the extension expects to find the browser executable. |
| [browserType.launch([options])](/javascript-api/k6-experimental/browser/browsertype/launch/)        | Launches a new browser process.                                              |
| browserType.launchPersistentContext(userDataDir, [options]) <BWIPT id="16"/>            | Launches the browser with persistent storage.                                |
| [browserType.name()](/javascript-api/k6-experimental/browser/browsertype/name/)                     | Returns the name of the `BrowserType`; currently it will return `chromium`.  |


## Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
    page.screenshot({ path: `example-chromium.png` });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>

