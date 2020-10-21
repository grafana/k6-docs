---
title: 'Hasher'
description: 'Object returned by crypto.createHash(). It allows adding more data to be hashed and to extract digests along the way.'
---

This object is returned by [crypto.createHash()](/javascript-api/k6-crypto/createhash-algorithm)
and allows the user to successively add more string data to be hashed, and to extract digests along the way.

| Name                  | Type     | Description                                                                                                                                                                                |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hasher.update(string) | function | Add more data to the string we want to create a hash of. Takes one string argument, which is the new data we want to add.                                                                  |
| Hasher.digest(string) | function | Return a digest from the data added (using update()) to the Hasher object so far. Takes one string argument, which is the encoding format to return. This can be either "hex" or "base64". |

### Example

<CodeGroup labels={[]}>

```javascript
import crypto from 'k6/crypto';

export default function () {
  console.log(crypto.sha256('hello world!', 'hex'));
  let hasher = crypto.createHash('sha256');
  hasher.update('hello ');
  hasher.update('world!');
  console.log(hasher.digest('hex'));
}
```

</CodeGroup>

The above code sample should produce this in its output:

```bash
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
```
