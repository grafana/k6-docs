---
title: 'EcdhKeyDeriveParams'
description: 'EcdhKeyDeriveParams is a parameter used for derive bits operation.'
weight: 10
---

# EcdhKeyDeriveParams

The `EcdhKeyDeriveParams` represents the object that should be passed as the algorithm parameter into [`deriveBits`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto/derivebits/), when using the ECDH algorithm.

ECDH is a secure communication method. Parties exchange public keys and use them with their private keys to generate a unique shared secret key.

## Properties

| Property  | Type                                                                                    | Description                          |
| :-------- | :-------------------------------------------------------------------------------------- | :----------------------------------- |
| name      | `string`                                                                                | An algorithm name. Should be `ECDH`. |
| publicKey | [`CryptoKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) | Another party's public key.          |
