---
title: 'Crypto'
description: 'Crypto offers basic cryptography features.'
weight: 01
---

# Crypto

{{< docs/shared source="k6" lookup="webcrypto/deprecated.md" version="<K6_VERSION>" >}}

`Crypto` allows access to a cryptographically strong random number generator and to cryptographic primitives.

## Properties

| Name                                                                                                     | Description                                                                                                                                                                                                                           |
| :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [subtle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto) | The [SubtleCrypto](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto) interface provides access to common cryptographic primitives, such as hashing, signing, encryption, or decryption. |

## Methods

| Name                                                                                                                           | Description                                                 |
| :----------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| [getRandomValues()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/crypto/getrandomvalues/) | Returns an array of cryptographically secure random values. |
| [randomUUID()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/crypto/randomuuid/)           | Returns a randomly generated, 36 character long v4 UUID.    |
