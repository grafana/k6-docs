---
title: 'SSL/TLS version and ciphers'
excerpt: 'To support testing specific client configurations k6 allows you to set a specific version or range
of versions of SSL/TLS that should be allowed for a connection.'
---

To support testing specific client configurations k6 allows you to set a specific version or range
of versions of SSL/TLS that should be allowed for a connection, as well as which cipher suites are
allowed to be used on that connection.

## Limiting SSL/TLS version

Limiting the SSL/TLS versions that k6 will be allowed to use during a test is a global
[configuration option](/using-k6/options). You can choose to limit to a specific version:

<CodeGroup labels={["Limiting to a specific SSL/TLS version"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  tlsVersion: http.TLS_1_2,
};

export default function () {
  http.get('https://badssl.com');
}
```

</CodeGroup>
      
or choose to accept a range of SSL/TLS versions:

<CodeGroup labels={["Limiting to a range of SSL/TLS versions"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  tlsVersion: {
    min: http.SSL_3_0,
    max: http.TLS_1_2,
  },
};

export default function () {
  http.get('https://badssl.com');
}
```

</CodeGroup>

## Versions available to choose from

Below is the list of available SSL/TLS version that you can choose from. They are listed in
order from lowest/oldest version to highest/newest version.

- `http.SSL_3_0`
- `http.TLS_1_0`
- `http.TLS_1_1`
- `http.TLS_1_2`

## Limiting cipher suites

Limiting the cipher suites that k6 is allowed to use during a test is a global
[configuration option](/using-k6/options). You choose a list of allowed ciphers:

<CodeGroup labels={["Limiting cipher suites"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  tlsCipherSuites: [
    'TLS_RSA_WITH_RC4_128_SHA',
    'TLS_RSA_WITH_AES_128_GCM_SHA256',
  ],
};

export default function () {
  http.get('https://badssl.com');
}
```

</CodeGroup>

## Checking SSL/TLS version and cipher suite used in request

You can also check which SSL/TLS version and ciphers were used to make a request by looking at the `tls_version` and `tls_cipher_suite` response object properties.

<CodeGroup labels={["Check SSL/TLS version and cipher suite"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://sha256.badssl.com');
  check(res, {
    'is TLSv1.2': (r) => r.tls_version === http.TLS_1_2,
    'is sha256 cipher suite': (r) =>
      r.tls_cipher_suite === 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
  });
}
```

</CodeGroup>

## Cipher suites available to choose from

Below is a list of available SSL/TLS cipher suites to choose from.

- `TLS_RSA_WITH_RC4_128_SHA`
- `TLS_RSA_WITH_3DES_EDE_CBC_SHA`
- `TLS_RSA_WITH_AES_128_CBC_SHA`
- `TLS_RSA_WITH_AES_256_CBC_SHA`
- `TLS_RSA_WITH_AES_128_GCM_SHA256`
- `TLS_RSA_WITH_AES_256_GCM_SHA384`
- `TLS_ECDHE_ECDSA_WITH_RC4_128_SHA`
- `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`
- `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`
- `TLS_ECDHE_RSA_WITH_RC4_128_SHA`
- `TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA`
- `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`
- `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`
- `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
- `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`
- `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`
- `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`

> ### ⚠️ Differences depending on k6 build
>
> Note that there could be differences from the above list of available cipher suites depending on which k6 build your running.
>
> The list above will reflect the available cipher suites in the latest official build. If you are using a custom-built k6 then the cipher suites available will be dependent on the Go version you compiled it with, see [https://golang.org/pkg/crypto/tls/#pkg-constants](https://golang.org/pkg/crypto/tls/#pkg-constants).
