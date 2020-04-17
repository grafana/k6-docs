---
title: "md5( input, outputEncoding )"
description: "Use MD5 to hash an input string."
---
Use [md5](https://golang.org/pkg/crypto/md5/) to hash an input string.

| Parameter | Type | Description |
| --------- |------|-------------|
| input | string | The input string to hash. |
| outputEncoding | string | Describes what type of encoding to use for the hash value. Can be "base64" or "hex". |


### Returns

| Type | Description |
|------|-------------|
| string | The string-encoded hash digest. |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import crypto from "k6/crypto";

export default function() {
  let hash = crypto.md5("hello world!", "hex");
  console.log(hash);
}
```

</div>

The above script should result in the following being printed during execution:

```shell
INFO[0000] fc3ff98e8c6a0d3087d515c0473f8677
```
