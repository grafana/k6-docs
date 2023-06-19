---
title: 'CryptoKey'
excerpt: 'CryptoKey represents a cryptographic key used for encryption, decryption, signing, or verification.'
---

The `CryptoKey` object represents a cryptographic key used for [encryption](/javascript-api/k6-experimental/webcrypto/subtlecrypto/encrypt), [decryption](/javascript-api/k6-experimental/webcrypto/subtlecrypto/decrypt), [signing](/javascript-api/k6-experimental/webcrypto/subtlecrypto/sign), or [verification](/javascript-api/k6-experimental/webcrypto/subtlecrypto/verify) within the webcrypto module. The `CryptoKey` object is created using the SubtleCrypto.generateKey() or SubtleCrypto.importKey() methods.

## Properties

| Property    | Type       | Description                                                                                                                                                                                                  |
| :---------- | :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | `string`   | Indicates the type of the key material. Possible values are `public`, `private`, `secret`, `unspecified`, or `unknown`.                                                                            |
| extractable | `boolean`  | Indicates whether the raw key material can be exported.                                                                                                                                           |
| algorithm   | `object`   | An object containing the algorithm used to generate or import the key.                                                                                                                                       |
| usages      | `string[]` | An array of strings indicating the cryptographic operations that the key can be used for. Possible values are `encrypt`, `decrypt`, `sign`, `verify`, `deriveKey`, `deriveBits`, `wrapKey`, and `unwrapKey`. |
