---
title: "launcher"
excerpt: "xk6-browser: launcher Object"
---

This object can be used to launch or connect to Chromium, returning instances of [Browser](/javascript-api/k6-x-browser/browser/).

<CodeGroup labels={[]}>

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', { headless: false });
  const context = browser.newContext();
  const page = context.newPage();
  page.goto('http://whatsmyuseragent.org/');
  page.close();
  browser.close();
}
```

</CodeGroup>