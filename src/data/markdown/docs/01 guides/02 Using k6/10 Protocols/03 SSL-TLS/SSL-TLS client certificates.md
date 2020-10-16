---
title: 'SSL/TLS client certificates'
excerpt: ''
---

Usually, when we are talking about TLS certificates we are referring to the mechanism by which
clients authenticate servers. The reverse, servers authenticating clients, is also supported by
both TLS and k6.

To use client certificates you specify global [configuration options](/using-k6/options) that
tell k6 how to map a public certificate and private key to the domains they are valid for. You can
load the certificate and key from local files or embed them as strings in the script.

## Loading a certificate and a key from local files

To load a certificate and a key from local files you use the builtin `open(...)` function:

<CodeGroup labels={["TLS client certificates from local certificate and key files"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  tlsAuth: [
    {
      domains: ['example.com'],
      cert: open('./mycert.pem'),
      key: open('./mycert-key.pem'),
    },
  ],
};

export default function () {
  http.get('https://example.com/');
}
```

</CodeGroup>

## Loading certificate and key from embedded strings

To load certificate and key from embedded strings (note the use of
[template literals](https://developer.mozilla.org/en-US/Web/JavaScript/Reference/Template_literals)
for multi-line strings):

> ### ⚠️ Certificate and key used in the example
>
> The partial certificate and key data in the above example were generated for this particular example, they're not real or in-use anywhere.

<CodeGroup labels={["TLS client certificates from local certificate and key files"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

const CERT = `-----BEGIN CERTIFICATE-----
MIIFgTCCA2kCAQEwDQYJKoZIhvcNAQEFBQAwgYExCzAJBgNVBAYTAlNFMRcwFQYD
VQQIEw5TdG9ja2hvbG1zIExhbjESMBAGA1UEBxMJU3RvY2tob2xtMRcwFQYDVQQK
...
/n5QrTGhP51P9Q1THzRfn6cNCDwzSTMVEJr40QhuTJQWASe3miuFmZoG5ykmGqVm
fWQRiQyM330s9vTwFy14J2Bxe4px6cyy7rVXvYL2LvfA4L0T7/x1nUULw+Mpqun1
R3XRJWqGDjBKXr5q8VatdQO1QLgr
-----END CERTIFICATE-----`;

const KEY = `-----BEGIN RSA PRIVATE KEY-----
KsZVVI1FTX+F959vqu1S02T+R1JM29PkIfJILIXapKQfb0FWrALU5xpipdPYBWp7
j5iSp06/7H8ms87Uz9BrOA6rytoRSE0/wEe5WkWdBBgLLPpfOSWZsAA5RGCB2n+N
...
Dk+frzKuiErHFN7HOHAQannui4eLsY0ehYMByowgJIUGzIJyXR6O19hVhV7Py66u
X7/Jy01JXn83LuWdpaPAKU+B42BLP0IGXt5CocPms07HOdtJ/wm2zwHTyfjn9vu+
HO/dQr6a7DhRu2lLI9Sc983NwRqDKICZQQ/+gqWk8BgQZ1yI9O4AYkzywzAEk3py
-----END RSA PRIVATE KEY-----`;

export let options = {
  tlsAuth: [
    {
      domains: ['example.com'],
      cert: CERT,
      key: KEY,
    },
  ],
};

export default function () {
  http.get('https://example.com/');
}
```

</CodeGroup>
