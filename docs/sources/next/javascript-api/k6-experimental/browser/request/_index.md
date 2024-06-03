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
| [request.headers()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/headers)                                   | Returns an object of headers associated to the request.                                                                        |
| [request.headersArray()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/headersarray)                         | An array with all the request HTTP headers                                                                                     |
| [request.headerValue(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/headervalue)                       | Returns the value of the header matching the name. The name is case insensitive.                                               |
| [request.isNavigationRequest()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/isnavigationrequest)           | Returns a boolean stating whether the request is for a navigation.                                                             |
| [request.method()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request/method)                                     | Request's method (GET, POST, etc.).                                                                                            |
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
