---
title: 'sha1( input, outputEncoding )'
description: 'Use SHA-1 to hash an input string.'
---

Use [sha1](https://golang.org/pkg/crypto/sha1/) to hash an input string.

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

```javascript
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.sha1('hello world!', 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] 430ce34d020724ed75a196dfc2ad67c77772d169
```
