---
title: 'on(event, handler)'
description: 'Browser module: page.on method'
---

# on(event, handler)

Registers a handler to be called whenever the specified event occurs.

| Parameter | Type     | Default | Description                                                                                 |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------- |
| event     | string   | `''`    | Event to attach the handler to. Currently, `'console'` and `'metric'` events are supported. |
| handler   | function | `null`  | A function to be called every time the specified event is emitted.                          |

### Events

| Event     | Description                                                                                                                                                                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `console` | Emitted every time the console API methods are called from within the page JavaScript context. The arguments passed into the handler are defined by the [`ConsoleMessage`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/consolemessage) class. |
| `metric`  | Emitted every time a metric is measured and emitted for the page. The arguments passed into the handler are defined by the [`MetricMessage`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/metricmessage) class.                                |

### Console event Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';
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
  const page = await browser.newPage();

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

    await page.evaluate(() => console.log('this is a console.log message', 42));
  } finally {
    await page.close(); // required so iteration can end
  }
}
```

{{< /code >}}

### Metric event Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
};

export default async function () {
  const page = await browser.newPage();

  // Here we call page.on('metric). It's possible to call page.on('metric') more
  // than once, and the callback function will be executed in the order page.on
  // was called.
  page.on('metric', (metric) => {
    // At the moment metric.tag is the only method on the metricMessage object.
    // It will find a match between the current metric url and name tags against
    // the supplied regular expression in `url`.
    metric.tag({
      // This is the new name value that will replace the existing value in the
      // url and name tags when a match is found.
      name: 'test',
      // You can provide multiple matches here.
      matches: [
        {
          url: /^https:\/\/test\.k6\.io\/\?q=[0-9a-z]+$/,
          // When a method is defined it will also need to match on that too. If a
          // method is not provided it will match on all method types.
          method: 'GET',
        },
      ],
    });
  });

  try {
    // This is only for illustrative purposes, the q query param doesn't affect
    // the website.
    await page.goto('https://test.k6.io/?q=abc123');
    await page.goto('https://test.k6.io/?q=def456');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
