---
title: 'context()'
excerpt: 'Browser module: context method'
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

  const page = browser.newPage();
  const context = browser.context();
  console.log(context); // {"base_event_emitter":{}}

  page.close();
  context.close();
}
```
