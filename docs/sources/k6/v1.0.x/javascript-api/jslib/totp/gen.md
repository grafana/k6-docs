---
title: 'TOTP.gen([timeStep], [bias])'
description: 'Generate a TOTP code'
weight: 20
---

# TOTP.gen([timeStep], [bias])

Generates a TOTP code for the current time.

| Parameter           | Type   | Description                                                  |
| ------------------- | ------ | ------------------------------------------------------------ |
| timeStep (optional) | number | Time step in seconds (default: 30)                           |
| bias (optional)     | number | Time bias in seconds to offset the current time (default: 0) |

### Returns

| Type            | Description             |
| --------------- | ----------------------- |
| Promise<string> | The generated TOTP code |

### Example

{{< code >}}

```javascript
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export default async function () {
  const totp = new TOTP('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', 6);

  // Generate code with default 30-second time step
  const code = await totp.gen();
  console.log(`TOTP code: ${code}`);

  // Generate code with 60-second time step
  const code60 = await totp.gen(60);
  console.log(`TOTP code (60s step): ${code60}`);
}
```

{{< /code >}}
