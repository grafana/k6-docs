---
title: 'addInitScript()'
description: 'Adds an init script.'
---

# addInitScript()

Adds a script which will be evaluated in one of the following scenarios:

- Whenever a [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) is created in the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) or is navigated.
- Whenever a child [frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/) is attached or navigated in any [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) in the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext). In this case, the script is evaluated in the context of the newly attached [frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/).

The script is evaluated after the document is created but before any of its scripts are run. This is useful to amend the JavaScript environment, for example, to override `Math.random`.

### Returns

| Type            | Description                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the script has been added to the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext). |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';
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
  const browserContext = await browser.newContext();

  // This will execute and override the existing implementation of Math.random.
  await browserContext.addInitScript('Math.random = function(){return 0}');

  const page = await browserContext.newPage();

  // In this example we are going to set the content manually, so we first
  // navigate to about:blank which will execute the init script, before setting
  // the content on the page.
  await page.goto('about:blank');

  await page.setContent(`
  <html>
    <head></head>
    <body>
      <div id="random">waiting...</div>
    </body>
    <script>
        document.getElementById('random').textContent = Math.random();
    </script>
  </html>`);

  const text = await p.locator('#random').textContent();
  check(page, {
    zero: () => text == '0',
  });

  await page.close();
}
```

{{< /code >}}
