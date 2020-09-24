---
title: "Transport Layer Security (TLS)"
excerpt: |
  TLS is the mechanism through which encrypted connections can be established between clients and
  servers on the web and through which data can flow with integrity intact.
---

<div class="code-group" data-props='{ "labels": ["tls-example.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import { check } from "k6";

export let options = {
    tlsCipherSuites: [
        "TLS_RSA_WITH_RC4_128_SHA",
        "TLS_RSA_WITH_AES_128_GCM_SHA256",
    ],
    tlsVersion: {
        min: "ssl3.0",
        max: "tls1.2"
    }
};

export default function() {
    let res = http.get("https://sha256.badssl.com");
    check(res, {
        "is TLSv1.2": (r) => r.tls_version === http.TLS_1_2,
        "is sha256 cipher suite": (r) => r.tls_cipher_suite === "TLS_RSA_WITH_AES_128_GCM_SHA256"
    });
};
```

</div>
