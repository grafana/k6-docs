---
title: "sha512_256( input, outputEncoding )"
description: "Use SHA-512/256 to hash an input string."
---

Use [sha512_256](https://golang.org/pkg/crypto/sha512/) to hash an input string.

| Parameter      | Type   | Description                                                                           |
| -------------- | ------ | ------------------------------------------------------------------------------------- |
| input          | string | The input string to hash.                                           |
| outputEncoding | string | Describes what type of encoding to use for the hash value. Can be "base64" or "hex". |

### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| string | The string-encoded hash digest. |

### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import crypto from 'k6/crypto';

export default function() {
  let hash = crypto.sha512_256('hello world!', 'hex');
  console.log(hash);
}
```

</div>

The above script should result in the following being printed during execution:

```shell
INFO[0000] 595b5926068b4828fb1c27db21281e31118b8475cb6c3ceeb09be7b685414d5f
```
