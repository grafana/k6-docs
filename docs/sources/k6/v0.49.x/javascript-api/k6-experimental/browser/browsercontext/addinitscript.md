---
title: 'addInitScript()'
description: 'Adds an init script.'
---

# addInitScript()

Adds a script which will be evaluated in one of the following scenarios:

- Whenever a [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) is created in the [browserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) or is navigated.
- Whenever a child [frame](<[page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/)>) is attached or navigated in any [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) in the [browserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext). In this case, the script is evaluated in the context of the newly attached [frame](<[page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/)>).

The script is evaluated after the document is created but before any of its scripts are run. This is useful to amend the JavaScript environment, for example, to override `Math.random`.

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

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
};

export default async function () {
  const browserContext = browser.newContext();

  // This will execute and override the existing implementation of Math.random.
  browserContext.addInitScript('Math.random = function(){return 0}');

  const page = browserContext.newPage();

  // In this example we are going to set the content manually, so we first
  // navigate to about:blank which will execute the init script, before setting
  // the content on the page.
  await page.goto('about:blank');

  page.setContent(`
  <html>
    <head></head>
    <body>
      <div id="random">waiting...</div>
    </body>
    <script>
        document.getElementById('random').textContent = Math.random();
    </script>
  </html>`);

  check(page, {
    zero: (p) => p.locator('#random').textContent() == '0',
  });

  page.close();
}
```

{{< /code >}}
