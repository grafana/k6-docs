---
title: 'Response'
description: 'Browser module: Response Class'
weight: 12
---

# Response

Response represents a response received by the page.

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method                                                                                                                                                   | Description                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [response.allHeaders()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response/allheaders) {{< docs/bwipt id="965" >}} | Returns an object of headers associated to the response including headers added by the browser.                                                                                           |
| [response.body()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response/body)                                         | Returns the response body.                                                                                                                                                                |
| [response.frame()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response/frame)                                       | The [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/) that initiated the request which this response is associated to.                      |
| [response.headers()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response/headers)                                   | Returns an object of headers associated to the response.                                                                                                                                  |
| <a href="https://playwright.dev/docs/api/class-response#response-headers-array" target="_blank" >response.headersArray()</a>                             | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-header-value" target="_blank" >response.headerValue(name)</a>                           | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-header-values" target="_blank" >response.headerValues(name)</a>                         | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-json" target="_blank" >response.json()</a>                                              | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-ok" target="_blank" >response.ok()</a>                                                  | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-request" target="_blank" >response.request()</a>                                        | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-security-details" target="_blank" >response.securityDetails()</a>                       | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-server-addr" target="_blank" >response.serverAddr()</a>                                 | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-status" target="_blank" >response.status()</a>                                          | -                                                                                                                                                                                         |
| <a href="https://playwright.dev/docs/api/class-response#response-status-text" target="_blank" >response.statusText()</a>                                 | -                                                                                                                                                                                         |
| response.size()                                                                                                                                          | Similar to [`Request.size()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/size), this returns the size of response headers and body sections. |
| <a href="https://playwright.dev/docs/api/class-response#response-url" target="_blank" >response.url()</a>                                                | -                                                                                                                                                                                         |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

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
    // Response returned once goto resolves.
    const res = await page.goto('https://test.k6.io/');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
