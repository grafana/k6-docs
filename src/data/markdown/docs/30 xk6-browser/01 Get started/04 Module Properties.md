---
title: 'Module Properties'
excerpt: 'An overview of the different importable properties that you can import from xk6-browser.'
---

The table below lists the importable properties from the top level module (`'k6/x/browser'`).

| Property | Description                                                                                                                                                                          |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| chromium | A [BrowserType](/javascript-api/xk6-browser/browsertype) to launch tests in a Chromium-based browser.                                                                                |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |
| version  | Returns the version number of xk6-browser.                                                                                                                                           |

## Devices Example

To emulate the browser behaviour on a mobile device and approximately measure the browser performance, you can import `devices` from `k6/x/browser`.

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium, devices } from 'k6/x/browser';

  export default function () {
    const browser = chromium.launch({ headless: false });
    const iphoneX = devices['iPhone X'];
    const context = browser.newContext(iphoneX);
    const page = context.newPage();

    page.goto('https://test.k6.io/', {
      waitUntil: 'networkidle',
    });

    page.close();
    browser.close();
  }
  ```

  </CodeGroup>