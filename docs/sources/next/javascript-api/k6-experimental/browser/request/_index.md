---
title: "Request"
descriptiontiontiontion: "Browser module: Request Class"
weight: 11
weight: 11
---

# Request

The `request` that the browser performs can be retrieved from the [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/response) when a navigation occurs.

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method                                                                                                                                                 | Playwright Relevant Distinctions                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| [request.allHeaders()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/allheaders) {{< docs/bwipt id="965" >}} | Returns an object of headers associated to the request including headers added by the browser.                                 |
| [request.frame()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/frame)                                       | The [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/) that initiated the request |
| <a href="https://playwright.dev/docs/api/class-request#request-headers" target="_blank" >request.headers()</a>                                         | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-headers-array" target="_blank" >request.headersArray()</a>                              | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-header-value" target="_blank" >request.headerValue(name)</a>                            | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-is-navigation-request" target="_blank" >request.isNavigationRequest()</a>               | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-method" target="_blank" >request.method()</a>                                           | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-post-data" target="_blank" >request.postData()</a>                                      | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-post-data-buffer" target="_blank" >request.postDataBuffer()</a>                         | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-redirected-from" target="_blank" >request.redirectedFrom()</a>                          | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-redirected-to" target="_blank" >request.redirectedTo()</a>                              | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-resource-type" target="_blank" >request.resourceType()</a>                              | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-response" target="_blank" >request.response()</a>                                       | -                                                                                                                              |
| [request.size()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/size)                                         | Unlike Playwright, this method returns an object containing the sizes of request headers and body.                             |
| <a href="https://playwright.dev/docs/api/class-request#request-timing" target="_blank" >request.timing()</a>                                           | -                                                                                                                              |
| <a href="https://playwright.dev/docs/api/class-request#request-url" target="_blank" >request.url()</a>                                                 | -                                                                                                                              |

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
    const res = await page.goto('https://test.k6.io/');
    const req = res.request();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
