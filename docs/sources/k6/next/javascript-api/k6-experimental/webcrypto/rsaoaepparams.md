---
title: 'RsaOaepParams'
description: 'RsaOaepParams represents the object that should be passed as the algorithm parameter into the encrypt and decrypt operation when using the RSA-OAEP algorithm.'
weight: 06
---

# RsaOaepParams

The `RsaOaepParams` object represents the object that should be passed as the algorithm parameter into the [encrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/encrypt) and [decrypt](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/decrypt) operation when using the RSA-OAEP algorithm.

For more details, head to the [MDN Web Crypto API documentation on RSA-OAEP](https://developer.mozilla.org/en-US/docs/Web/API/RsaOaepParams).

## Properties

| Property                  | Type                                       | Description                                                                                                                                                                                                                                                                                              |
| :------------------------ | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                      | `string`                                   | Should be set to `RSA-OAEP`.                                                                                                                                                                                                                                                                              |
| label (optional)                        | `ArrayBuffer`, `TypedArray`, or `DataView` | It's an array of bytes that does not itself need to be encrypted but which should be bound to the ciphertext. A digest of the label is part of the input to the encryption operation. Unless your application calls for a label, you can just omit this argument, and it will not affect the security of the encryption operation. |
                        |
