---
title: 'CryptoKeyPair'
description: 'CryptoKeyPair represents an asymmetric key pair with public and private keys.'
weight: 08
---

# CryptoKeyPair

The `CryptoKeyPair` object represents an asymmetric key pair with public and private keys.

The [`generateKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/subtlecrypto/generatekey/) method can be used to create `CryptoKeyPair` object for asymmetric algorithms such as `ECDH` or `ECDSA`.

## Properties

| Property   | Type                                                                                    | Description    |
| :--------- | :-------------------------------------------------------------------------------------- | :------------- |
| publicKey  | [`CryptoKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) | A public key.  |
| privateKey | [`CryptoKey`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/crypto/cryptokey) | A private key. |
