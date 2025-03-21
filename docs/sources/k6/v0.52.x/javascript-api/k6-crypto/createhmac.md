---
title: 'createHMAC( algorithm, secret )'
description: 'Create an HMAC hashing object, allowing the user to add data to hash multiple times, and extract hash digests along the way.'
description: 'Create an HMAC hashing object, allowing the user to add data to hash multiple times, and extract hash digests along the way.'
weight: 02
---

# createHMAC( algorithm, secret )

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

Creates a HMAC hashing object that can then be fed with data repeatedly, and from which you can extract a signed hash digest whenever you want.

| Parameter |         Type         | Description                                                                                                                         |
| --------- | :------------------: | :---------------------------------------------------------------------------------------------------------------------------------- |
| algorithm |        string        | The hashing algorithm to use. One of `md4`, `md5`, `sha1`, `sha256`, `sha384`, `sha512`, `sha512_224`, `sha512_256` or `ripemd160`. |
| secret    | string / ArrayBuffer | A shared secret used to sign the data.                                                                                              |

### Returns

| Type   | Description                                                                                  |
| ------ | :------------------------------------------------------------------------------------------- |
| object | A [Hasher](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/hasher) object. |

### Example

{{< code >}}

```javascript
import crypto from 'k6/crypto';

export default function () {
  console.log(crypto.hmac('sha256', 'a secret', 'my data', 'hex'));
  const hasher = crypto.createHMAC('sha256', 'a secret');
  hasher.update('my ');
  hasher.update('data');
  console.log(hasher.digest('hex'));
}
```

{{< /code >}}

The above script should result in the following being printed during execution:

```bash
INFO[0000] 82f669c8fde13aef6d6977257588dc4953dfac505428f8fd6b52e19cd96d7ea5
INFO[0000] 82f669c8fde13aef6d6977257588dc4953dfac505428f8fd6b52e19cd96d7ea5
```
