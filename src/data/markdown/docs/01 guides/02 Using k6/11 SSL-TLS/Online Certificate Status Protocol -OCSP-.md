---
title: "Online Certificate Status Protocol (OCSP)"
excerpt: ""
---

## What is OCSP?

Online Certificate Status Protocol (OCSP) is a protocol that web browsers and clients can use
to check the status of an issued TLS certificate with a Certificate Authority (CA), making sure
it has not been revoked for whatever purpose.

There are different ways in which this can be done, by putting the burden on different parties:

- The browser/client: talk to the CA (or by CA entrusted OCSP responder) with OCSP. One downside
  with this approach is that the CA's servers need to be available which might not always be the case.

- The browser vendor: maintain a regularly updated list of certificate revocations by talking to
  the CAs (or by CA entrusted OCSP responder) and then distributing this list to the browsers
  running on users' machines.
- The server side: the server handles the interaction with the CA (or by CA entrusted OCSP
  responder), caching the results of the periodic updates and including a "stapled response"
  (referred to as OCSP stapling) in the TLS connection setup with the browser/client.

## OCSP with k6

At the moment k6 supports OCSP stapling, receiving and parsing a stapled response as part of
the TLS connection setup. The OCSP response information is available on the `ocsp.stapled_response`
property of the response object.

<div class="code-group" data-props='{"labels": ["OCSP stapled response properties example"], "lineNumbers": [true]}'>

```javascript
import http from "k6/http";
import { check } from "k6";

export default function() {
  let res = http.get("https://stackoverflow.com");
  check(res, {
    "is OCSP response good": r => r.ocsp.status === http.OCSP_STATUS_GOOD
  });
}
```

</div>

## Properties of an OCSP object

The OCSP `ocsp` object contains the following properties:

| Key                 | Type   | Description                                                                                                                                                                           |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`            | string | the status of the certificate, see possible values below                                                                                                                              |
| `revocation_reason` | string | the reason for revocation of the certificate (if that is the status), see possible values below                                                                                       |
| `produced_at`       | number | number of milliseconds elapsed since 1 January 1970 00:00:00 UTC, representing the time when this OCSP stapled response was signed by CA (or by CA entrusted OCSP responder)          |
| `this_update`       | number | number of milliseconds elapsed since 1 January 1970 00:00:00 UTC, representing the time at which the status being indicated was known to be correct                                   |
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
