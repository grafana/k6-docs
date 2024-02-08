---
title: 'cookies([urls])'
description: 'Retrieves context cookies.'
---

# cookies([urls])

Returns a list of [cookies](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/cookie) from the [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) filtered by the provided `urls`. If no `urls` are provided, all cookies are returned.

| Parameter | Type  | Description                                                                                                                                                                                                                                                                    |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| urls      | array | A string array of URLs to filter the [cookies](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/cookie) in the [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext). |

### Returns

| Type  | Description                                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------------------- |
| array | A list of [cookies](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/cookie). |

{{% admonition type="note" %}}

[Cookies](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/cookie) can be added with [BrowserContext.addCookies](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/addcookies/).

{{% /admonition %}}

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
  const context = browser.newContext();
  const page = context.newPage();

  try {
    // get cookies from the browser context
    let cookies = context.cookies();
    console.log('initial cookies length:', cookies.length); // prints 0

    // let's add more cookies to filter by urls
    context.addCookies([
      { name: 'foo', value: 'foovalue', sameSite: 'Strict', url: 'http://foo.com' },
      { name: 'bar', value: 'barvalue', sameSite: 'Lax', url: 'https://bar.com' },
      { name: 'baz', value: 'bazvalue', sameSite: 'Lax', url: 'https://baz.com' },
    ]);

    // get all cookies
    cookies = context.cookies();
    console.log('filtered cookies length:', cookies.length); // prints 3

    // get cookies filtered by urls
    cookies = context.cookies('http://foo.com', 'https://baz.com');
    console.log('filtered cookies length:', cookies.length); // prints 2

    // the first filtered cookie
    console.log("1st cookie's name :", cookies[0].name); // prints foo
    console.log("1st cookie's value:", cookies[0].value); // prints foovalue
    // the first filtered cookie
    console.log("2nd cookie's name :", cookies[1].name); // prints baz
    console.log("2nd cookie's value:", cookies[1].value); // prints bazvalue
  } finally {
    page.close();
  }
}
```

{{< /code >}}
