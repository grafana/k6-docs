---
title: 'Online Certificate Status Protocol (OCSP)'
description: 'k6 supports OCSP stapling, receiving and parsing a stapled response as part of
the TLS connection setup.'
aliases:
  - ./online-certificate-status-protocol--ocsp/
---

## What is OCSP?

The Online Certificate Status Protocol (OCSP) lets web browsers and clients check the status of an issued TLS certificate with a Certificate Authority (CA), ensuring that the certificate has not been revoked.

It exists different ways to check whether the certificate has been revoked.
Each way places the burden on different parties:

- The browser/client: talk to the CA (or through a CA&ndash;entrusted OCSP responder) with OCSP. One downside
  with this approach is that the CA's servers need to be available.

- The browser vendor: maintain an up-to-date list of certificate revocations by talking to
  the CAs (or through a CA&ndash;entrusted OCSP responder) and distributing this list to the browsers
  running on users' machines.
- The server side: the server handles the interaction with the CA (or through a CA&ndash;entrusted OCSP
  responder), caching the results of the periodic updates and including a "stapled response"
  (referred to as OCSP stapling) in the TLS connection setup with the browser/client.

## OCSP with k6

k6 supports OCSP stapling.
The application can receive and parse a stapled response as part of the TLS connection setup.
The OCSP response information is available in the `ocsp.stapled_response` property of the response object.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://stackoverflow.com');
  check(res, {
    'is OCSP response good': (r) => r.ocsp.status === http.OCSP_STATUS_GOOD,
  });
}
```

{{< /code >}}

## Properties of an OCSP object

The OCSP `ocsp` object contains the following properties:

| Key                 | Type   | Description                                                                                                                                                                           |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`            | string | the status of the certificate, see possible values below                                                                                                                              |
| `revocation_reason` | string | the reason for revocation of the certificate (if that is the status), see possible values below                                                                                       |
| `produced_at`       | number | number of milliseconds elapsed since 1 January 1970 00:00:00 UTC, representing the time when this OCSP stapled response was signed by the CA (or CA&ndash;entrusted OCSP responder)   |
| `this_update`       | number | number of milliseconds elapsed since 1 January 1970 00:00:00 UTC, representing the time when the status being indicated was known to be correct                                       |
| `next_update`       | number | number of milliseconds elapsed since 1 January 1970 00:00:00 UTC, representing the time when this OCSP stapled response will be refreshed with CA (or by CA entrusted OCSP responder) |
| `revoked_at`        | number | number of milliseconds elapsed since 1 January 1970 00:00:00 UTC, representing the time when this certificate was revoked (if that is the status)                                     |

### Possible values for `status`:

- `http.OCSP_STATUS_GOOD`
- `http.OCSP_STATUS_REVOKED`
- `http.OCSP_STATUS_UNKNOWN`
- `http.OCSP_STATUS_SERVER_FAILED`

### Possible values for `revocation_reason`:

- `http.OCSP_REASON_UNSPECIFIED`
- `http.OCSP_REASON_KEY_COMPROMISE`
- `http.OCSP_REASON_CA_COMPROMISE`
- `http.OCSP_REASON_AFFILIATION_CHANGED`
- `http.OCSP_REASON_SUPERSEDED`
- `http.OCSP_REASON_CESSATION_OF_OPERATION`
- `http.OCSP_REASON_CERTIFICATE_HOLD`
- `http.OCSP_REASON_REMOVE_FROM_CRL`
- `http.OCSP_REASON_PRIVILEGE_WITHDRAWN`
- `http.OCSP_REASON_AA_COMPROMISE`
