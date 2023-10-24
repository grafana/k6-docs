---
title: 'AesCtrParams'
excerpt: 'AesCtrParams represents the object that should be passed as the algorithm parameter into the encrypt and decrypt operation when using the AES-CTR algorithm.'
canonicalUrl: https://grafana.com/docs/k6
---

The `AesCtrParams` object represents the object that should be passed as the algorithm parameter into the [encrypt](/javascript-api/k6-experimental/webcrypto/subtlecrypto/encrypt) and [decrypt](/javascript-api/k6-experimental/webcrypto/subtlecrypto/decrypt) operation when using the AES-CTR algorithm.

For more details, head to the MDN Web Crypto API documentation on [AES-CTR](https://developer.mozilla.org/en-US/docs/Web/API/AesCtrParams).

## Properties

| Property | Type                                       | Description                                                         |
| :------- | :----------------------------------------- | :------------------------------------------------------------------ |
| name     | `string`                                   | Should be set to `AES-CTR`.                                         |
| counter  | `ArrayBuffer`, `TypedArray`, or `DataView` | The initial value of the counter block. This must be 16-bytes long, like the AES block size.                  |
| length   | `number`                                   | The number of bits in the counter block that are used for the actual counter. It is recommended to use 64 (half of the counter block). |

## Example

<CodeGroup labels={["example-webcrypto-aesctrparams.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { crypto } from "k6/experimental/webcrypto";

export default async function () {
  const plaintext = stringToArrayBuffer("Hello, World!");

  /**
   * Generate a symmetric key using the AES-CTR algorithm.
   */
  const key = await crypto.subtle.generateKey(
    {
      name: "AES-CTR",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  /**
   * Encrypt the plaintext using the AES-CTR key with
   * have generated.
   */
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-CTR",
      counter: crypto.getRandomValues(new Uint8Array(16)),
      length: 128,
    },
    key,
    plaintext
  );
}

function stringToArrayBuffer(str) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
```

</CodeGroup>