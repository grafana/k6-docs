---
title: "b64decode( input, [encoding] )"
description: "Base64 decode a string."
---
Decode the passed base64 encoded `input` string into the unencoded original string.

| Parameter           | Type   | Description                  |
|---------------------|--------|------------------------------|
| input               | string | The string to base64 decode. |
| encoding (optional) | string | The base64 encoding to use.<br>Available options are:<br>- **"std"**: the standard encoding with `=` padding chars and `+` and `/` characters in encoding alphabet. This is the default.<br>- **"rawstd"**: like `std` but without `=` padding characters.<br>- **"url"**: URL safe version of `std`, encoding alphabet doesn't contain `+` and `/` characters, but rather `-` and `_` characters.<br>- **"rawurl"**: like `url` but without `=` padding characters. |


### Returns

| Type   | Description                                       |
|--------|---------------------------------------------------|
| string | The base64 decoded version of the `input` string. |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import { check } from "k6";
import encoding from "k6/encoding";

export default function() {
    let str = "hello world";
    let enc = "aGVsbG8gd29ybGQ=";
    check(null, {
        "is encoding correct": () => encoding.b64encode(str) === enc,
        "is decoding correct": () => encoding.b64decode(enc) === str
    });
}
```

</div>
