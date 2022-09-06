---
title: 'launch([options])'
excerpt: 'xk6-browser: BrowserType.launch method'
---

Launches a new browser process.

<TableWithNestedRows>

| Parameter                 | Type     | Default | Description                                                                                                                                                                                                                                                           |
|---------------------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options                   | object   | `null`  |                                                                                                                                                                                                                                                                       |
| options.args              | string[] | `null`  | Extra command line arguments to include when launching browser process. See [this link](https://peter.sh/experiments/chromium-command-line-switches/) for a list of Chromium arguments. Note that arguments should not start with `--` (see the [example](#example)). |
| options.debug             | boolean  | `false` | All CDP messages and internal fine grained logs will be logged if set to `true`.                                                                                                                                                                                      |
| options.devtools          | boolean  | `false` | Open up developer tools in the browser by default.                                                                                                                                                                                                                    |
| options.env               | string[] | `null`  | Environment variables to set before launching browser process.                                                                                                                                                                                                        |
| options.executablePath    | string   | `null`  | Override search for browser executable in favor of specified absolute path.                                                                                                                                                                                           |
| options.headless          | boolean  | `true`  | Show browser GUI or not.                                                                                                                                                                                                                                              |
| options.ignoreDefaultArgs | string[] | `null`  | Ignore any of the default arguments included when launching browser process.                                                                                                                                                                                          |
| options.proxy             | string   | `null`  | Specify to set browser's proxy configuration.                                                                                                                                                                                                                         |
| options.slowMo            | string   | `null`  | Slow down input actions and navigation by the specified time e.g. `'500ms'`.                                                                                                                                                                                          |
| options.timeout           | string   | `'30s'` | Default timeout to use for various actions and navigation.                                                                                                                                                                                                            |

</TableWithNestedRows>


### Returns

| Type   | Description                                            |
|--------|--------------------------------------------------------|
| object | [Browser](/javascript-api/xk6-browser/browser/) object |


## Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({
    args: ['show-property-changed-rects'],
    debug: true,
    devtools: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    slowMo: '500ms',
    timeout: '30s',
  });
  const context = browser.newContext();
  const page = context.newPage();

  page.goto('http://whatsmyuseragent.org/');
  page.screenshot({ path: `example-chromium.png` });

  page.close();
  browser.close();
}
```

</CodeGroup>