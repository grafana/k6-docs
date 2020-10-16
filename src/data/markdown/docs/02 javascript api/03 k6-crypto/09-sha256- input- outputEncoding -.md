---
title: 'sha256( input, outputEncoding )'
description: 'Use SHA-256 to hash an input string.'
---

Use [sha256](https://golang.org/pkg/crypto/sha256/) to hash an input string.

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
  let hash = crypto.sha256('hello world!', 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```shell
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
```
