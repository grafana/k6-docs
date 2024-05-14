---
title: 'screenshot([options])'
description: 'Browser module: page.screenshot([options]) method'
---

# screenshot([options])

Returns the buffer with the captured screenshot from the browser.

<TableWithNestedRows>

| Parameter              | Type    | Default | Description                                                                                                                                                                                                                                              |
| ---------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                | object  | `null`  |                                                                                                                                                                                                                                                          |
| options.clip           | object  | `null`  | An object which specifies clipping of the resulting image.                                                                                                                                                                                               |
| options.clip.x         | number  | `0`     | x-coordinate of top-left corner of clip area.                                                                                                                                                                                                            |
| options.clip.y         | number  | `0`     | y-coordinate of top-left corner of clip area.                                                                                                                                                                                                            |
| options.clip.width     | number  | `0`     | Width of clipping area.                                                                                                                                                                                                                                  |
| options.clip.height    | number  | `0`     | Height of clipping area.                                                                                                                                                                                                                                 |
| options.fullPage       | boolean | `false` | When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport.                                                                                                                                                    |
| options.omitBackground | boolean | `false` | Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.                                                                                                                                      |
| options.path           | string  | `''`    | The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk. |
| options.quality        | number  | `0`     | The quality of the image, between 0-100; Only applicable to `jpeg` only.                                                                                                                                                                                 |
| options.type           | string  | `png`   | Specify screenshot type. Acceptable values are `jpeg` and `png`.                                                                                                                                                                                         |

</TableWithNestedRows>

### Returns

| Type                                                             | Description                              |
| ---------------------------------------------------------------- | ---------------------------------------- |
| [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) | The buffer with the captured screenshot. |

### Example

{{< code >}}

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
};

export default async function () {
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  page.screenshot({ path: 'screenshots/browser.png' });
}
```

{{< /code >}}
