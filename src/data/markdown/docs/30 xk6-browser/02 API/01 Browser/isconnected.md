---
title: 'isConnected()'
excerpt: 'xk6-browser: Browser.isConnected method'
---

<Blockquote mod="warning">

See [issue #453](https://github.com/grafana/xk6-browser/issues/453) for details of a known issue.

</Blockquote>

Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.

### Returns

| Type    | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| boolean | Returns `true` if [Browser](/javascript-api/xk6-browser/api/browser/) is connected to the browser application. Otherwise, returns `false`. |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch();
  const isConnected = browser.isConnected();
  console.log(isConnected); // true

  browser.close();
}
```

</CodeGroup>