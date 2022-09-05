---
title: "BrowserType"
excerpt: "xk6-browser: BrowserType Class"
---

The `BrowserType` is the entry point into launching a browser process; `chromium` is currently the only supported `BrowserType`. To use it, import `chromium` from the top level module `/k6/x/browser`.

| Method            | Description                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------|
| launch([options]) | Launches a new browser process. You can see a list of all possible `options` in [the options heading](#options). |

### Options

| Method            | Type     | Default | Description                                                                                                                                                                                                                                                           |
|-------------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| args              | string[] | `null`  | Extra command line arguments to include when launching browser process. See [this link](https://peter.sh/experiments/chromium-command-line-switches/) for a list of Chromium arguments. Note that arguments should not start with `--` (see the [example](#example)). |
| debug             | boolean  | `false` | All CDP messages and internal fine grained logs will be logged if set to `true`.                                                                                                                                                                                      |
| devtools          | boolean  | `false` | Open up developer tools in the browser by default.                                                                                                                                                                                                                    |
| env               | string[] | `null`  | Environment variables to set before launching browser process.                                                                                                                                                                                                        |
| executablePath    | string   | `null`  | Override search for browser executable in favor of specified absolute path.                                                                                                                                                                                           |
| headless          | boolean  | `true`  | Show browser GUI or not.                                                                                                                                                                                                                                              |
| ignoreDefaultArgs | string[] | `null`  | Ignore any of the default arguments included when launching browser process.                                                                                                                                                                                          |
| proxy             | string   | `null`  | Specify to set browser's proxy config.                                                                                                                                                                                                                                |
| slowMo            | string   | `null`  | Slow down input actions and navigation by the specified time e.g. `'500ms'`.                                                                                                                                                                                          |
| timeout           | string   | `'30s'` | Default timeout to use for various actions and navigation.                                                                                                                                                                                                            |

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

