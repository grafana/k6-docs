---
title: 'screenshot([options])'
description: 'Browser module: elementHandle.screenshot method'
---

# screenshot([options])

Takes a screenshot of the element.

<TableWithNestedRows>

| Parameter              | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.path           | string  | `''`    | The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.                                                                                      |
| options.format         | string  | `png`   | Specify screenshot type. Acceptable values are `jpeg` and `png`.                                                                                                                                                                                                                                                                              |
| options.omitBackground | boolean | `false` | Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.                                                                                                                                                                                                                           |
| options.quality        | number  | `100`   | The quality of the image, between 0-100; Only applicable to `jpeg` only.                                                                                                                                                                                                                                                                      |
| options.timeout        | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type                           | Description                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `Promise<ArrayBuffer \| null>` | The [ArrayBuffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) with the captured screenshot. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/browser.php');

  const element = await page.$(".header");
  const screenshot = await element.screenshot({
    path: 'header.png'
  });

  await page.close();
}
```

{{< /code >}}
