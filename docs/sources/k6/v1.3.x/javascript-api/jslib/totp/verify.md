---
title: 'TOTP.verify(code, [timeStep])'
description: 'Verify a TOTP code'
weight: 30
---

# TOTP.verify(code, [timeStep])

Verifies a TOTP code against the current time.

| Parameter           | Type   | Description                        |
| ------------------- | ------ | ---------------------------------- |
| code                | string | The TOTP code to verify            |
| timeStep (optional) | number | Time step in seconds (default: 30) |

### Returns

| Type             | Description                                    |
| ---------------- | ---------------------------------------------- |
| Promise<boolean> | `true` if the code is valid, `false` otherwise |

### Example

{{< code >}}

```javascript
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export default async function () {
  const totp = new TOTP('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', 6);

  // Generate and verify a code
  const code = await totp.gen();
  const isValid = await totp.verify(code);

  if (isValid) {
    console.log('Code is valid!');
  } else {
    console.log('Code is invalid!');
  }
}
```

{{< /code >}}
