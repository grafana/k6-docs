---
title: 'AesKeyGenParams'
excerpt: 'AesKeyGenParams represents the object that should be passed as the algorithm parameter into the generateKey operation, when generating an AES key.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/webcrypto/aeskeygenparams/
---

The `AesKeyGenParams` object represents the object that should be passed as the algorithm parameter into the [generateKey](/javascript-api/k6-experimental/webcrypto/subtlecrypto/generatekey) operation when generating an AES key.

## Properties

| Property | Type     | Description                                                                        |
| :------- | :------- | :--------------------------------------------------------------------------------- |
| name     | `string` | The name of the algorithm. Possible values are `AES-CBC`, `AES-CTR`, and `AES-GCM`.|
| length   | `number` | The length of the key in bits. Possible values are 128, 192 or 256.                |

## Example

<CodeGroup labels={["example-webcrypto-aeskeygenparams.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { crypto } from "k6/experimental/webcrypto";

export default async function () {
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: 256
    },
    true,
    [
      "encrypt",
      "decrypt",
    ]
  );
}
```

</CodeGroup>