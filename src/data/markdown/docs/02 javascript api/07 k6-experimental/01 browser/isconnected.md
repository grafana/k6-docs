---
title: 'isConnected()'
excerpt: 'Browser module: isConnected method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/isconnected/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/isconnected/
---

<Blockquote mod="attention">

This feature has **known issues**.
For details, refer to [#453](https://github.com/grafana/xk6-browser/issues/453).

</Blockquote>

Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.

### Returns

| Type    | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| boolean | Returns `true` if the [browser module](/javascript-api/k6-experimental/browser) is connected to the browser application. Otherwise, returns `false`. |


### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default function () {
  const isConnected = browser.isConnected();
  console.log(isConnected); // true
}
```

</CodeGroup>
