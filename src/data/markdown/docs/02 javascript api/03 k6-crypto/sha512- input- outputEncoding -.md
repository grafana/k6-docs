---
title: 'sha512( input, outputEncoding )'
description: "Use SHA-512 to hash an input string."
---

Use [sha512](https://golang.org/pkg/crypto/sha512/) to hash an input string.

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
  let hash = crypto.sha512('hello world!', 'hex');
  console.log(hash);
}
```

</div>

The above script should result in the following being printed during execution:

```shell
INFO[0000] db9b1cd3262dee37756a09b9064973589847caa8e53d31a9d142ea2701b1b28abd97838bb9a27068ba305dc8d04a45a1fcf079de54d607666996b3cc54f6b67c
```
