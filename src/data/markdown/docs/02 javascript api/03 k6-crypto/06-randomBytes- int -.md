---
title: 'randomBytes( int )'
description: 'randomBytes.'
excerpt: 'randomBytes.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-crypto/randombytes/
---

<CryptoBlockquote />

Return an ArrayBuffer object with a number of cryptographically random bytes. It will either return exactly the amount of bytes requested or will throw an exception if something went wrong.

| Parameter | Type    | Description                             |
| --------- | ------- | --------------------------------------- |
| int       | integer | The length of the returned ArrayBuffer. |

### Returns

| Type        | Description                                         |
| ----------- | --------------------------------------------------- |
| ArrayBuffer | An ArrayBuffer with cryptographically random bytes. |

### Example

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';

export default function () {
  const bytes = crypto.randomBytes(42);
  const view = new Uint8Array(bytes);
  console.log(view); // 156,71,245,191,56,...
}
```

</CodeGroup>
