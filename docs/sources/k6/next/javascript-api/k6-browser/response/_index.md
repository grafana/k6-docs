---
title: 'Response'
description: 'Browser module: Response Class'
weight: 12
---

# Response

Response represents a response received by the page.

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method                                                                                                                             | Description                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [allHeaders()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/allheaders) {{< docs/bwipt id="965" >}} | Returns an object of headers associated to the response including headers added by the browser.                                                         |
| [body()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/body)                                         | Returns the response body.                                                                                                                              |
| [frame()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/frame)                                       | The [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/) that initiated the request which this response is associated to. |
| [headers()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/headers)                                   | Returns an object of headers associated to the response.                                                                                                |
| [headersArray()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/headersarray)                         | An array with all the response HTTP headers.                                                                                                            |
| [headerValue(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/headervalue)                       | Returns the value of the header matching the name. The name is case insensitive.                                                                        |
| [headerValues(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/headervalues)                     | Returns all values of the headers matching the name, for example `set-cookie`. The name is case insensitive.                                            |
| [json()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/json)                                         | Returns the JSON representation of response body.                                                                                                       |
| [ok()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/ok)                                             | Returns a `boolean` stating whether the response was successful or not.                                                                                 |
| [request()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/request)                                   | Returns the matching [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request) object.                                      |
| [securityDetails()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/securitydetails)                   | Returns SSL and other security information.                                                                                                             |
| [serverAddr()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/serveraddr)                             | Returns the IP address and port of the server for this response.                                                                                        |
| [status()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/status)                                     | Contains the status code of the response (e.g., 200 for a success).                                                                                     |
| [statusText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/statustext)                             | Contains the status text of the response (e.g. usually an "OK" for a success).                                                                          |
| [size()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/size)                                         | The size of the response body and the headers.                                                                                                          |
| [text()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/text)                                         | Returns the response body as a string.                                                                                                                  |
| [url()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/url)                                           | URL of the response.                                                                                                                                    |

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
    // Response returned once goto resolves.
    const res = await page.goto('https://test.k6.io/');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
