---
title: 'fulfill(options)'
description: 'Browser module: Route.fulfill method'
---

# fulfill(options)

Fulfills the request with the given response.

| Parameter           | Type             | Default | Description                                                          |
| ------------------- | ---------------- | ------- | -------------------------------------------------------------------- |
| options             | object           | null    |                                                                      |
| options.body        | string or Buffer | `''`    | Response body.                                                       |
| options.contentType | string           | `''`    | Same as setting `Content-Type` response header.                      |
| options.headers     | object           | null    | Response headers.                                                    |
| options.status      | number           | `200`   | Response status code.                                                |

### Returns

| Type            | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the request is fulfilled.                          |


### Example

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

  try {
    await page.route(
      "https://jsonplaceholder.typicode.com/todos/1",
      async function (route) {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({
            "id": 1,
            "title": "Test Todo",
            "completed": false
          }),
          contentType: "application/json",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        });
      }
    );

    await page.goto('https://quickpizza.grafana.com/browser.php');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
