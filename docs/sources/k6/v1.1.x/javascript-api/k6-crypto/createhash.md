---
title: 'createHash( algorithm )'
description: 'Create a Hasher object, allowing the user to add data to hash multiple times, and extract hash digests along the way.'
description: 'Create a Hasher object, allowing the user to add data to hash multiple times, and extract hash digests along the way.'
weight: 01
---

# createHash( algorithm )

{{< docs/shared source="k6" lookup="crypto-module.md" version="<K6_VERSION>" >}}

Creates a hashing object that can then be fed with data repeatedly, and from which you can extract a hash digest whenever you want.

| Parameter | Type   | Description                                                                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| algorithm | string | The name of the hashing algorithm you want to use. Can be any one of "md4", "md5", "sha1", "sha256", "sha384", "sha512", "sha512_224", "sha512_256", "ripemd160". |

### Returns

| Type   | Description                                                                                  |
| ------ | -------------------------------------------------------------------------------------------- |
| object | A [Hasher](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-crypto/hasher) object. |

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
}
```

{{< /code >}}

The above script should result in the following being printed during execution:

```bash
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
INFO[0000] 7509e5bda0c762d2bac7f90d758b5b2263fa01ccbc542ab5e3df163be08e6ca9
```
