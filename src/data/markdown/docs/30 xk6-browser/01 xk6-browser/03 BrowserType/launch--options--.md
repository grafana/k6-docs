---
title: 'launch([options])'
excerpt: 'Launches a browser application.'
---

Launches a browser application and returns a new [Browser](/javascript-api/xk6-browser/browser/).

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |


### Returns

| Type   | Description                                               |
| ------ | --------------------------------------------------------- |
| object | [Browser](/javascript-api/xk6-browser/browser/) instance. |

### options

You can customize launching of a Browser using the following options.

| Option               | Type    | Description                                                                                                                                                      |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| args                 | Array   | A string array. Extra commandline arguments to include when launching a browser process.                                                                         |
| ❌ debug             | boolean | Whether to log all CDP messages to the k6 logging subsystem. Defaults to `false`.                                                                                |
| ❌ devtools          | boolean | Whether to open up the developer tools in the browser application. Defaults to `false`.                                                                          |
| env                  | object  | Environment variables to set before launching the browser application, where the keys are environment variable names and values are environment variable values. |
| executablePath       | string  | The browser application executable to use when launching a new browser application.                                                                              |
| headless             | boolean | Whether to display the browser application. Defaults to `true`.                                                                                                  |
| ❌ ignoreDefaultArgs | Array   | A string array. Ignores any of the default arguments included when launching browser process.                                                                    |
| logCategoryFilter    | string  | Filters log based on a regular expression. Default to not to filter.                                                                                             |
| ❌ proxy             | object  | Specify to set browser's proxy config.                                                                                                                           |
| slowMo               | string  | Slows down input actions and navigations by the specified amount of time (e.g. `1s`).                                                                            |
| timeout              | string  | Maximum time to wait in milliseconds. Defaults to `30000` (30s). Pass `0` to disable timeout.                                                                    |

### Example

An example of using BrowserType to launch a Chromium [Browser](/javascript-api/xk6-browser/browser):

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    debug: true,
    devtools: true,
    headless: false,
    slowMo: '500ms',
    timeout: '10s',
  });
  browser.close();
}
```
