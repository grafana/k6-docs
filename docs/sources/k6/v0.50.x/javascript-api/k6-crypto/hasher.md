---
title: 'Hasher'
description: 'Object returned by crypto.createHash(). It allows adding more data to be hashed and to extract digests along the way.'
description: 'Object returned by crypto.createHash(). It allows adding more data to be hashed and to extract digests along the way.'
weight: 80
---

# Hasher

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

This object is returned by [crypto.createHash()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/createhash)
and allows the user to successively add more string data to be hashed, and to extract digests along the way.

| Name                  | Type     | Description                                                                                                                                                                                                                                                             |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hasher.update(string) | function | Add more data to the string we want to create a hash of. Takes one string argument, which is the new data we want to add.                                                                                                                                               |
| Hasher.digest(string) | function | Return a digest from the data added (using `update()`) to the Hasher object so far. Takes one string argument, which is the encoding format to return. This can be either "base64", "base64url", "base64rawurl", "hex" or "binary". See the examples below for details. |

### Example

{{< code >}}

```javascript
import crypto from 'k6/crypto';

export default function () {
  console.log(crypto.sha256('hello world!', 'hex'));
  const hasher = crypto.createHash('sha256');
  hasher.update('hello ');
  hasher.update('world!');
  console.log(hasher.digest('hex'));

  // Other encodings
  console.log('base64:', hasher.digest('base64'));
  console.log('base64url:', hasher.digest('base64url'));
  console.log('base64rawurl:', hasher.digest('base64rawurl'));
  console.log('binary:', new Uint8Array(hasher.digest('binary')));
}
```

{{< /code >}}

The above code sample should produce this in its output:

```bash
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
INFO[0000] base64: dQnlvaDHYtK6x/kNdYtbImP6Acy8VCq1498WO+CObKk=
INFO[0000] base64url: dQnlvaDHYtK6x_kNdYtbImP6Acy8VCq1498WO-CObKk=
INFO[0000] base64rawurl: dQnlvaDHYtK6x_kNdYtbImP6Acy8VCq1498WO-CObKk
INFO[0000] binary: 117,9,229,189,160,199,98,210,186,199,249,13,117,139,91,34,99,250,1,204,188,84,42,181,227,223,22,59,224,142,108,169
```
