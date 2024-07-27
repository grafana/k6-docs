---
title: 'context()'
excerpt: 'Browser module: context method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/context/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/context/
---

Returns the current [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).

<Blockquote mod="note" title="">

A 1-to-1 mapping between [Browser](/javascript-api/k6-experimental/browser) and `BrowserContext` means you cannot run `BrowserContexts` concurrently. If you wish to create a new `BrowserContext` while one already exists, you will need to [close](/javascript-api/k6-experimental/browser/browsercontext/close) the current one, and create a new one with either [newContext](/javascript-api/k6-experimental/browser/newcontext/) or [newPage](/javascript-api/k6-experimental/browser/newpage). All resources associated to the closed `BrowserContext` will also be closed and cleaned up (such as [Page](/javascript-api/k6-experimental/browser/page/)s).

</Blockquote>

### Returns

| Type           | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| object \| null | The current [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) if one has been created, otherwise `null`. |


### Example

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
  console.log(browser.context()); // null

  const page1 = browser.newPage(); // implicitly creates a new browserContext
  const context = browser.context(); // underlying live browserContext associated with browser
  const page2 = context.newPage(); // shares the browserContext with page1

  page1.close();
  page2.close();
  context.close();
}
```
