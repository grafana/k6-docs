---
title: javascript-api/crypto
---

The [`crypto` module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto) provides a WebCrypto API implementation.

| Class/Method                                                                                      | Description                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [getRandomValues](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/getrandomvalues) | Fills the passed `TypedArray` with cryptographically sound random values.                                                                                                                                          |
| [randomUUID](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/randomuuid)           | Returns a randomly generated, 36 character long v4 UUID.                                                                                                                                                           |
| [subtle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto)             | The [SubtleCrypto](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto) interface provides access to common cryptographic primitives, such as hashing, signing, encryption, or decryption. |

{{< admonition type="note" >}}

The crypto object is available globally, so you can use it in your script without including an import statement.

{{< /admonition >}}
