---
title: 'totp'
description: 'TOTP library for generating and verifying time-based one-time passwords.'
weight: 50
---

# totp

{{< admonition type="note" >}}

The source code for this library can be found in the [grafana/k6-jslib-totp](https://github.com/grafana/k6-jslib-totp) GitHub repository.

{{< /admonition >}}

The `totp` module provides TOTP (Time-based One-Time Password) generation and verification as defined in [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238).

| Class/Method                                                                                               | Description                           |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [TOTP(secret, [digits])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/totp/totp)          | Create a new TOTP instance            |
| [TOTP.gen([timeStep], [bias])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/totp/gen)     | Generate a TOTP code                  |
| [TOTP.verify(code, [timeStep])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/totp/verify) | Verify a TOTP code                    |

## Example

{{< code >}}

```javascript
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export default async function () {
  const totp = new TOTP('GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ', 6);
  const code = await totp.gen();
  console.log(`TOTP code: ${code}`);

  const isValid = await totp.verify(code);
  console.log(`Valid: ${isValid}`);
}
```

{{< /code >}}

## With k6 Secrets

{{< code >}}

```javascript
import secrets from 'k6/secrets';
import { TOTP } from 'https://jslib.k6.io/totp/1.0.0/index.js';

export default async function () {
  const secret = await secrets.get('totp_secret');
  const totp = new TOTP(secret, 6);
  const code = await totp.gen();
  console.log(`TOTP code: ${code}`);
}
```

{{< /code >}}
