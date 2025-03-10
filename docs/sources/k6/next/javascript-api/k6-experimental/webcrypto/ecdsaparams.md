---
title: 'EcdsaParams'
description: 'EcdsaParams is a parameter used for sign or verify operations.'
weight: 11
---

# EcdsaParams

{{< docs/shared source="k6" lookup="webcrypto/deprecated.md" version="<K6_VERSION>" >}}

The `EcdsaParams` represents the object that should be passed as the algorithm parameter into [`sign`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/sign/) or [`verify`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto/subtlecrypto/verify/) when using the ECDSA algorithm.

## Properties

| Property | Type     | Description                                                                                           |
| :------- | :------- | :---------------------------------------------------------------------------------------------------- |
| name     | `string` | An algorithm name. Should be `ECDSA`.                                                                 |
| hash     | `string` | An identifier for the digest algorithm to use. Possible values are `SHA-256`, `SHA-384` or `SHA-512`. |
