---
title: "BrowserType"
excerpt: "xk6-browser: BrowserType Class"
---

The `BrowserType` is the entry point into launching a browser process; `chromium` is currently the only supported `BrowserType`. To use it, import `chromium` from the top level module `k6/x/browser`.

| Method                                                                                  | Description                                                                  |
|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------|
| browserType.connect([options]) <BWIPT id="17"/>                                         | Connect attaches k6 browser to an existing browser instance.                 |
| [browserType.executablePath()](/javascript-api/xk6-browser/api/browsertype/executablepath/) | Returns the path where the extension expects to find the browser executable. |
| [browserType.launch([options])](/javascript-api/xk6-browser/api/browsertype/launch/)        | Launches a new browser process.                                              |
| browserType.launchPersistentContext(userDataDir, [options]) <BWIPT id="16"/>            | Launches the browser with persistent storage.                                |
| [browserType.name()](/javascript-api/xk6-browser/api/browsertype/name/)                     | Returns the name of the `BrowserType`; currently it will return `chromium`.  |


## Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  const page = context.newPage();

  page
    .goto('https://test.k6.io/', { 
      waitUntil: 'networkidle',
    })
    .then(() => {
      page.screenshot({ path: `example-chromium.png` });
    })
    .finally(() => {
      page.close();
      browser.close();
    });
}
```

</CodeGroup>

