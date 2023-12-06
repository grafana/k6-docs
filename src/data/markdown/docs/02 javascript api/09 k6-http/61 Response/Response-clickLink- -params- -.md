---
title: 'Response.clickLink( [params] )'
excerpt: 'Create and make a request corresponding to a link, found in the HTML of response, being clicked.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-http/response/response-clicklink/
---

Create and make a request corresponding to a link, found in the HTML of response, being clicked. By default it will look for the first `a` tag with a `href` attribute in the HTML, but this can be overridden using the `selector` option.

This method takes an object argument where the following properties can be set:

| Param    | Type   | Description                                                                                                                                                                    |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selector | string | A selector string passed to [Selection.find(selector)](/javascript-api/k6-html/selection/selection-find) to locate the link to click. By default this is `"a[href]"`. |
| params   | object | A [Params](/javascript-api/k6-http/params) object that will be forwarded to the link click request. Can be used to set headers, cookies etc.                                   |

### Returns

| Type                                         | Description             |
| -------------------------------------------- | ----------------------- |
| [Response](/javascript-api/k6-http/response) | The link click response |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default function () {
  // Request page with links
  let res = http.get('https://httpbin.test.k6.io/links/10/0');

  // Now, click the 4th link on the page
  res = res.clickLink({ selector: 'a:nth-child(4)' });
}
```

</CodeGroup>
