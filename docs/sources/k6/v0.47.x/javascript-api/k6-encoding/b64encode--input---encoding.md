---
title: 'b64encode( input, [encoding] )'
description: 'Encode data in base64.'
description: 'Encode data in base64.'
slug: 'b64encode'
---

# b64encode( input, [encoding] )

| Parameter           | Type                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| input               | string / ArrayBuffer | The input string or `ArrayBuffer` object to base64 encode.                                                                                                                                                                                                                                                                                                                                                                                                                |
| encoding (optional) | string               | The base64 encoding to use.<br/>Available options are:<br/>- **"std"**: the standard encoding with `=` padding chars and `+` and `/` characters in encoding alphabet. This is the default.<br/>- **"rawstd"**: like `std` but without `=` padding characters.<br/>- **"url"**: URL safe version of `std`, encoding alphabet doesn't contain `+` and `/` characters, but rather `-` and `_` characters.<br/>- **"rawurl"**: like `url` but without `=` padding characters. |

### Returns

| Type   | Description                              |
| ------ | ---------------------------------------- |
| string | The base64 encoding of the `input` data. |

### Example

{{< code >}}

```javascript
import { check } from 'k6';
import encoding from 'k6/encoding';

export default function () {
  const str = 'hello world';
  const enc = 'aGVsbG8gd29ybGQ=';
  const buf = new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]).buffer;
  check(null, {
    'is encoding string correct': () => encoding.b64encode(str) === enc,
    'is encoding ArrayBuffer correct': () => encoding.b64encode(buf) === enc,
  });
}
```

{{< /code >}}
