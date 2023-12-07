---
title: 'Crypto'
excerpt: 'Crypto offers basic cryptography features.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/webcrypto/crypto/
---

`Crypto` allows access to a cryptographically strong random number generator and to cryptographic primitives.

## Properties

| Name            | Type                                                                   | Description                                                                                                                         |
| :-------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `Crypto.subtle` | [SubtleCrypto](/javascript-api/k6-experimental/webcrypto/subtlecrypto) | The SubtleCrypto interface provides access to common cryptographic primitives, such as hashing, signing, encryption, or decryption. |

## Methods

| Name | Type | Description |
| :--- | :--- | :---------- |
| `Crypto.getRandomValues()` | [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | Returns an array of cryptographically secure random values. |
| `Crypto.randomUUID()` | [ArrayBuffer]() | Returns a randomly generated, 36 character long v4 UUID. |