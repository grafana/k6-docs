---
title: 'md4( input, outputEncoding )'
description: 'Use MD4 to hash an input string.'
---

Use [md4](https://godoc.org/golang.org/x/crypto/md4) to hash an input string.

| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| input          | string | The input string to hash.                                                            |
| outputEncoding | string | Describes what type of encoding to use for the hash value. Can be "base64" or "hex". |

### Returns

| Type   | Description                    |
| ------ | ------------------------------ |
| string | The string-encoded hash digest |

### Example

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';

export default function () {
  let hash = crypto.md4('hello world!', 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] 3363b72840acd5f49f922fef598ee85d
```
