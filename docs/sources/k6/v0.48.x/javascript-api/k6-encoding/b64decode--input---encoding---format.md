---
title: 'b64decode( input, [encoding], [format] )'
description: 'Base64 decode a string.'
description: 'Base64 decode a string.'
slug: 'b64decode'
---

# b64decode( input, [encoding], [format] )

Decode the passed base64 encoded `input` string into the unencoded original input in either binary or string formats.

| Parameter           | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input               | string | The string to base64 decode.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| encoding (optional) | string | The base64 encoding to use.<br/>Available options are:<br/>- **"std"**: the standard encoding with `=` padding chars and `+` and `/` characters in encoding alphabet. This is the default.<br/>- **"rawstd"**: like `std` but without `=` padding characters.<br/>- **"url"**: URL safe version of `std`, encoding alphabet doesn't contain `+` and `/` characters, but rather `-` and `_` characters.<br/>- **"rawurl"**: like `url` but without `=` padding characters. |
| format (optional)   | string | If `"s"` return the data as a string, otherwise if unspecified an ArrayBuffer object is returned.                                                                                                                                                                                                                                                                                                                                                                         |

### Returns

| Type                 | Description                                                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| ArrayBuffer / string | The base64 decoded version of the `input` string in either string or ArrayBuffer format, depending on the `format` parameter. |

### Example

{{< code >}}

```javascript
import { check } from 'k6';
import encoding from 'k6/encoding';

export default function () {
  const str = 'hello world';
  const enc = 'aGVsbG8gd29ybGQ=';
  const expBin = new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]);
  check(null, {
    'is decoding to string correct': () => encoding.b64decode(enc, 'std', 's') === str,
    'is decoding to ArrayBuffer correct': () => {
      const decBin = new Uint8Array(encoding.b64decode(enc));
      if (decBin.length != expBin.length) return false;
      for (let i = 0; i < decBin.length; i++) {
        if (decBin[i] !== expBin[i]) return false;
      }
      return true;
    },
  });
}
```

{{< /code >}}
