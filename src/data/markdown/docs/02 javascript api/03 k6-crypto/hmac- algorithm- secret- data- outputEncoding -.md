---
title: 'hmac( algorithm, secret, data, outputEncoding )'
description: 'Use HMAC to sign an input string.'
---

Use [HMAC](https://en.wikipedia.org/wiki/Hash-based_message_authentication_code) to sign a piece of data using a shared secret.

| Parameter      |  Type  | Description                                                                                                                         |
| -------------- | :----: | :---------------------------------------------------------------------------------------------------------------------------------- |
| algorithm      | string | The hashing algorithm to use. One of `md4`, `md5`, `sha1`, `sha256`, `sha384`, `sha512`, `sha512_224`, `sha512_256` or `ripemd160`. |
| secret         | string | A shared secret used to sign the data.                                                                                              |
| data           | string | The data to sign.                                                                                                                   |
| outputEncoding | string | Describes what type of encoding to use for the hash value. Can be "base64" or "hex".                                                |

### Returns

| Type   | Description                    |
| ------ | ------------------------------ |
| string | The string-encoded hash digest |

### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import crypto from 'k6/crypto';

export default function() {
  let hash = crypto.hmac('sha256', 'mysecret', 'hello world!', 'hex');
  console.log(hash);
}
```

</div>

The above script should result in the following being printed during execution:

<div class="code-group" data-props='{"labels": []}'>

```bash
INFO[0000] 893a72d8cab129e5ba85aea4599fd53f59bfe652cff4098a3780313228d8c20f
```

</div>
