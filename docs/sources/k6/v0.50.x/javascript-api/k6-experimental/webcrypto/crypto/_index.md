---
title: 'Crypto'
description: 'Crypto offers basic cryptography features.'
weight: 01
weight: 01
---

# Crypto

`Crypto` allows access to a cryptographically strong random number generator and to cryptographic primitives.

## Properties

| Name            | Type                                                                                                           | Description                                                                                                                         |
| :-------------- | :------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `Crypto.subtle` | [SubtleCrypto](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto) | The SubtleCrypto interface provides access to common cryptographic primitives, such as hashing, signing, encryption, or decryption. |

## Methods

| Name                                                                                           | Type                                                        | Description |
| :--------------------------------------------------------------------------------------------- | :---------------------------------------------------------- | :---------- |
| `Crypto.getRandomValues()`                                                                     | [ArrayBuffer]                                               |
| (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | Returns an array of cryptographically secure random values. |
| `Crypto.randomUUID()`                                                                          | [ArrayBuffer]                                               |
| (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | Returns a randomly generated, 36 character long v4 UUID.    |
