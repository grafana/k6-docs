---
title: 'hmac( algorithm, secret, data, outputEncoding )'
description: 'Use HMAC to sign input data.'
description: 'Use HMAC to sign input data.'
weight: 03
---

# hmac( algorithm, secret, data, outputEncoding )

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

Use [HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) to sign a piece of data using a shared secret.

| Parameter      | Type                 | Description                                                                                                                         |
| -------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| algorithm      | string               | The hashing algorithm to use. One of `md4`, `md5`, `sha1`, `sha256`, `sha384`, `sha512`, `sha512_224`, `sha512_256` or `ripemd160`. |
| secret         | string / ArrayBuffer | A shared secret used to sign the data.                                                                                              |
| data           | string / ArrayBuffer | The data to sign.                                                                                                                   |
| outputEncoding | string               | Describes the type of encoding to use for the hash value. Can be "base64", "base64url", "base64rawurl", "hex" or "binary".          |

### Returns

| Type           | Description                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string / Array | The hash digest as string (for "base64", "base64url", "base64rawurl", "hex" `outputEncoding`) or raw array of integers (for "binary" `outputEncoding`). |

### Example

{{< code >}}

```javascript
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.hmac('sha256', 'mysecret', 'hello world!', 'hex');
  console.log(hash);
  const binArray = [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 33];
  hash = crypto.hmac('sha256', 'mysecret', new Uint8Array(binArray).buffer, 'hex');
  console.log(hash);
}
```

{{< /code >}}

The above script should result in the following being printed during execution:

{{< code >}}

```bash
INFO[0000] 893a72d8cab129e5ba85aea4599fd53f59bfe652cff4098a3780313228d8c20f
INFO[0000] 893a72d8cab129e5ba85aea4599fd53f59bfe652cff4098a3780313228d8c20f
```

{{< /code >}}
