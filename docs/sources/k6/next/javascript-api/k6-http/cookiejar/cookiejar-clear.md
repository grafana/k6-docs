---
title: 'CookieJar.clear(url)'
description: 'Delete all cookies for the given URL.'
---

# CookieJar.clear(url)

| Parameter | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| url       | string | The URL to delete all cookies for. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.post('http://quickpizza.grafana-dev.com:3333/api/cookies?one=1&two=2');

  // We'll use QuickPizza's cookie reflection to see what cookies we
  // are actually sending to the server after every change
  let qpResp;
  qpResp = http.get('http://quickpizza.grafana-dev.com:3333/api/cookies');
  console.log(JSON.stringify(qpResp.json().cookies));
  // Will print '{"one":"1","two":"2"}'

  const jar = http.cookieJar(); // get the VU specific jar
  jar.set('http://quickpizza.grafana-dev.com:3333/api/cookies', 'three', '3');
  qpResp = http.get('http://quickpizza.grafana-dev.com:3333/api/cookies');
  console.log(JSON.stringify(qpResp.json().cookies));
  // Will print '{"one":"1","three":"3","two":"2"}'

  jar.delete('http://quickpizza.grafana-dev.com:3333/api/cookies', 'one');
  qpResp = http.get('http://quickpizza.grafana-dev.com:3333/api/cookies');
  console.log(JSON.stringify(qpResp.json().cookies));
  // Will print '{"three":"3","two":"2"}'

  jar.clear('http://quickpizza.grafana-dev.com:3333/api/cookies');
  qpResp = http.get('http://quickpizza.grafana-dev.com:3333/api/cookies');
  console.log(JSON.stringify(qpResp.json().cookies));
  // Will print '{}'
}
```

{{< /code >}}
