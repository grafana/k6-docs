---
title: 'EcdhKeyDeriveParams'
description: 'EcdhKeyDeriveParams is a parameter used for derive bits operation.'
weight: 03
---

# EcdhKeyDeriveParams

The `EcdhKeyDeriveParams` represents the object that should be passed as the algorithm parameter into [`deriveBits`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/derivebits/), when using the ECDH algorithm.

ECDH is a secure communication method. Parties exchange public keys and use them with their private keys to generate a unique shared secret key.

## Properties

| Property  | Type                                                                                                       | Description                          |
| :-------- | :--------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| name      | `string`                                                                                                   | An algorithm name. Should be `ECDH`. |
| publicKey | [`CryptoKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/cryptokey) | Another party's public key.          |
