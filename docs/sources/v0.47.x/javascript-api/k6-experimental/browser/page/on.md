---
title: 'on(event, handler)'
description: 'Browser module: page.on method'
---

# on(event, handler)

Registers a handler to be called whenever the specified event occurs.

| Parameter | Type     | Default | Description                                                                         |
| --------- | -------- | ------- | ----------------------------------------------------------------------------------- |
| event     | string   | `''`    | Event to attach the handler to. Currently, only the `'console'` event is supported. |
| handler   | function | `null`  | A function to be called every time the specified event is emitted.                  |

{{% admonition type="caution" %}}

When using the `page.on` method, the page has to be explicitly [closed](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/close/) for the iteration to be able to finish.

{{% /admonition %}}

### Events

| Event     | Description                                                                                                                                                                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `console` | Emitted every time the console API methods are called from within the page JavaScript context. The arguments passed into the handler are defined by the [`ConsoleMessage`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/consolemessage) class. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/x/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/');

    page.on('console', (msg) => {
      check(msg, {
        assertConsoleMessageType: (msg) => msg.type() == 'log',
        assertConsoleMessageText: (msg) => msg.text() == 'this is a console.log message 42',
        assertConsoleMessageArgs0: (msg) =>
          msg.args()[0].jsonValue() == 'this is a console.log message',
        assertConsoleMessageArgs1: (msg) => msg.args()[1].jsonValue() == 42,
      });
    });

    page.evaluate(() => console.log('this is a console.log message', 42));
  } finally {
    page.close(); // required so iteration can end
  }
}
```

{{< /code >}}
