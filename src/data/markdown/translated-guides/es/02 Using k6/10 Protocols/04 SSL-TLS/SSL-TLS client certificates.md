---
title: 'Certificados del cliente SSL/TLS'
excerpt: ''
---

Normalmente, cuando hablamos de certificados TLS nos referimos al mecanismo por el que los clientes identifican a los servidores. Lo contrario, es decir, que los servidores identifiquen a los clientes, también es soportado tanto por TLS como por k6.

Para utilizar los certificados de cliente se especifican las [opciones de configuración global](/using-k6/options) que indican a k6 cómo asignar un certificado público y una clave privada a los dominios para los que son válidos. Puedes cargar el certificado y la clave desde archivos locales o incrustarlos como cadenas en el script.

## Cargar un certificado y una clave desde archivos locales

Para cargar un certificado y una clave desde archivos locales se utiliza la función incorporada `open()`:

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

## Cargar el certificado y la clave de las cadenas incrustadas

Para cargar el certificado y la clave a partir de cadenas incrustadas (tenga en cuenta el uso de [template literals](https://developer.mozilla.org/en-US/Web/JavaScript/Reference/Template_literals) para los strings de varias líneas):

> ### ⚠️ Certificado y clave utilizados en el ejemplo
>
> Los datos parciales del certificado y la clave en el ejemplo anterior fueron generados para este ejemplo en particular, no son reales ni están en uso en ningún lugar.

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
