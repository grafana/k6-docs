---
title: 'sha512_224( input, outputEncoding )'
description: 'Use SHA-512/224 to hash an input string.'
---

Use [sha512_224](https://golang.org/pkg/crypto/sha512/) to hash an input string.

| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| input          | string | The input string to hash.                                                            |
| outputEncoding | string | Describes what type of encoding to use for the hash value. Can be "base64" or "hex". |

### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| string | The string-encoded hash digest. |

### Example

<CodeGroup labels={[]}>

```js
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.sha512_224('hello world!', 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```shell
INFO[0000] bc4ed196f7ba1c20f6fb6be1f91edf8293a35b065d6e7d6fd368c890
```
