---
title: 'batch( requests )'
head_title: 'httpx.batch(requests)'
description: 'Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).'
description: 'Issue multiple HTTP requests in parallel (like e.g. browsers tend to do).'
weight: 19
---

# batch( requests )

Batch multiple HTTP requests together, to issue them in parallel over multiple TCP connections.

| Parameter         | Type   | Description                                            |
| ----------------- | ------ | ------------------------------------------------------ |
| requests          | array  | An array containing requests, in string or object form |
| params (optional) | object | Additional parameters for all requests in the batch    |

### Returns

| Type  | Description                                                                                                       |
| ----- | ----------------------------------------------------------------------------------------------------------------- |
| array | An array containing [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) objects. |

### Example

{{< code >}}

```javascript
import { Httpx, Get } from 'https://jslib.k6.io/httpx/0.1.0/index.js';
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';

const session = new Httpx({ baseURL: 'https://quickpizza.grafana.com' });

session.addHeader('Authorization', 'token abcdef0123456789');

export default function () {
  describe('01. Fetch public ratings all at once', (t) => {
    const responses = session.batch(
      [new Get('/api/ratings/1'), new Get('/api/ratings/2'), new Get('/api/ratings/3')],
      {
        tags: { name: 'PublicRatings' },
      }
    );

    responses.forEach((response) => {
      t.expect(response.status)
        .as('response status')
        .toEqual(200)
        .and(response)
        .toHaveValidJson()
        .and(response.json('stars'))
        .as('rating stars')
        .toBeGreaterThan(0);
    });
  });
}
```

{{< /code >}}
