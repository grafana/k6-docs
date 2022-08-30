---
title: 'CookieJar.delete(url)'
excerpt: 'Delete the `name` cookie for the given URL.'
---

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| url     | string | The URL to delete cookies for. |
| name     | string | The name of the cookie you want to delete. |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://httpbin.test.k6.io/cookies/set?one=1&two=2');

  // We'll use httpbin's reflection to see what cookies we
  // are actually sending to the server after every change
  let httpbinResp;
  httpbinResp = http.get('https://httpbin.test.k6.io/cookies');
  console.log(JSON.stringify(httpbinResp.json().cookies));
  // Will print '{"one":"1","two":"2"}'

  const jar = http.cookieJar(); // get the VU specific jar
  jar.set('https://httpbin.test.k6.io/cookies', 'three', '3');
  httpbinResp = http.get('https://httpbin.test.k6.io/cookies');
  console.log(JSON.stringify(httpbinResp.json().cookies));
  // Will print '{"one":"1","three":"3","two":"2"}'

  jar.delete('https://httpbin.test.k6.io/cookies', 'one');
  httpbinResp = http.get('https://httpbin.test.k6.io/cookies');
  console.log(JSON.stringify(httpbinResp.json().cookies));
  // Will print '{"three":"3","two":"2"}'

  jar.clear('https://httpbin.test.k6.io/cookies');
  httpbinResp = http.get('https://httpbin.test.k6.io/cookies');
  console.log(JSON.stringify(httpbinResp.json().cookies));
  // Will print '{}'
}
```

</CodeGroup>
