---
title: 'TOTP(secret, [digits])'
description: 'Create a new TOTP instance'
weight: 10
---

# TOTP(secret, [digits])

Creates a new TOTP (Time-based One-Time Password) instance with the given secret.

| Parameter         | Type   | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| secret            | string | Base32 encoded secret key                           |
| digits (optional) | number | Number of digits in the generated code (default: 6) |

### Returns

| Type | Description       |
| ---- | ----------------- |
| TOTP | A new TOTP object |

### Example

{{< code >}}

```javascript
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export default async function () {
  // Create a TOTP instance with 6 digits (default)
  const totp6 = new TOTP('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ');

  // Create a TOTP instance with 8 digits
  const totp8 = new TOTP('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', 8);

  const code = await totp6.gen();
  console.log(`6-digit TOTP: ${code}`);
}
```

{{< /code >}}
