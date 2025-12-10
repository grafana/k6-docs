---
title: 'k6/x/tls'
description: 'A k6 extension for TLS certificates validation and inspection'
weight: 13
---

# k6/x/tls

{{< docs/shared source="k6" lookup="extension.md" version="<K6_VERSION>" >}}

The `k6/x/tls` module provides functionality for TLS certificate validation and inspection, allowing you to fetch certificate details and validate their properties directly from your k6 tests.

### Use cases

- Fetch TLS certificate information from any host
- Validate certificate expiration and properties
- Access certificate details (for example subject, issuer, fingerprint)

## API

#### getCertificate( hostname )

Fetches TLS certificate information from a specified host.

The `tls.getCertificate` function retrieves TLS certificate details from a given hostname and returns a promise that resolves to a certificate object containing various properties such as expiration date, subject, issuer, and fingerprint information.

#### Parameters

| Parameter | Type | Description |
| --- | :--- | --- |
| hostname | string | The hostname to fetch the TLS certificate from. For example, "example.com" or "k6.io". |

##### Returns

A promise resolving to a certificate object containing the following properties:

| Property | Type | Description |
| --- | --- | --- |
| subject | object | The certificate subject information (pkixName object) |
| issuer | object | The certificate issuer information (pkixName object) |
| issued | number | The certificate issued timestamp in milliseconds since Unix epoch |
| expires | number | The certificate expiration timestamp in milliseconds since Unix epoch |
| fingerprint | string | The certificate fingerprint |

## Examples

<!-- md-k6:skipall -->

### Check if a certificate is expired

```javascript
import tls from "k6/x/tls";
import { check } from "k6";

export default async function () {
  const cert = await tls.getCertificate("example.com");

  check(cert, {
    "certificate is not expired": (c) => c.expires > Date.now(),
  });

  console.log(`Certificate expires: ${new Date(cert.expires)}`);
}
```
