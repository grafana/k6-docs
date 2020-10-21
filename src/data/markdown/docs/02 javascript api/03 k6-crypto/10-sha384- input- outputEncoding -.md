---
title: 'sha384( input, outputEncoding )'
description: 'Use SHA-384 to hash an input string.'
---

Use sha384 to hash an input string.

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
  let hash = crypto.sha384('hello world!', 'hex');
  console.log(hash);
}
```

</CodeGroup>

The above script should result in the following being printed during execution:

```bash
INFO[0000] d33d40f7010ce34aa86efd353630309ed5c3d7ffac66d988825cf699f4803ccdf3f033230612f0945332fb580d8af805
```
