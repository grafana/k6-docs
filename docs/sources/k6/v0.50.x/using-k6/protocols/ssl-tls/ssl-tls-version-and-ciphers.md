---
title: 'SSL/TLS version and ciphers'
description: 'To support testing specific client configurations, you can set a specific version or range
of versions of SSL/TLS that should be allowed for a connection.'
---

# SSL/TLS version and ciphers

To support testing specific client configurations, you can specify a version or range of versions of SSL/TLS that are allowed for a connection.
You can as also specify which cipher suites are allowed for that connection.

> #### ⚠️ Reg. ciphers and TLS 1.3
>
> Due to limitations in the underlying [go implementation](https://github.com/golang/go/issues/29349), changing the ciphers for TLS 1.3 is _not_ supported and will do nothing.

## Limiting SSL/TLS version

To limit the k6 to a specific SSL/TLS version, use a global
[configuration option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options):

{{< code >}}

```javascript
import http from 'k6/http';

export const options = {
  tlsVersion: http.TLS_1_2,
};

export default function () {
  http.get('https://badssl.com');
}
```

{{< /code >}}

You can also accept a range of SSL/TLS versions:

{{< code >}}

```javascript
import http from 'k6/http';

export const options = {
  tlsVersion: {
    min: http.SSL_3_0,
    max: http.TLS_1_2,
  },
};

export default function () {
  http.get('https://badssl.com');
}
```

{{< /code >}}

## Versions available to choose from

Here's the list of available SSL/TLS versions that you can choose from, ordered from oldest version to latest.

- `http.SSL_3_0`
- `http.TLS_1_0`
- `http.TLS_1_1`
- `http.TLS_1_2`
- `http.TLS_1_3`

## Limiting cipher suites

To limit the cipher suites that k6 is allowed to use, there's a global
[configuration option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options).
You choose a list of allowed ciphers:

{{< code >}}

```javascript
import http from 'k6/http';

export const options = {
  tlsCipherSuites: ['TLS_RSA_WITH_RC4_128_SHA', 'TLS_RSA_WITH_AES_128_GCM_SHA256'],
};

export default function () {
  http.get('https://badssl.com');
}
```

{{< /code >}}

## Checking SSL/TLS version and cipher suite used in requests

You can also check which SSL/TLS version and ciphers were used.
To do so, look at the `tls_version` and `tls_cipher_suite` response object properties.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://sha256.badssl.com');
  check(res, {
    'is TLSv1.2': (r) => r.tls_version === http.TLS_1_2,
    'is sha256 cipher suite': (r) => r.tls_cipher_suite === 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256',
  });
}
```

{{< /code >}}

## Cipher suites available to choose from

Here's a list of available SSL/TLS cipher suites:

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
> This list reflects the available cipher suites in the latest official build.
> If you are using a custom-built k6, the available cipher suites will depend on the Go version you compiled it with, see [https://golang.org/pkg/crypto/tls/#pkg-constants](https://golang.org/pkg/crypto/tls/#pkg-constants).
