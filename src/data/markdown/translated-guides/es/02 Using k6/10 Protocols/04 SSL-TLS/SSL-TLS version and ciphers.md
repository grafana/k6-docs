---
title: 'Versiones SSL/TLS y cifrados'
excerpt: 'Para soportar las pruebas de configuraciones específicas de los clientes, k6 le permite establecer una versión específica o un rango de versiones de SSL/TLS que deben ser permitidas para una conexión, así como qué suites de cifrado están permitidas para ser utilizadas en esa conexión.'
---

Para soportar las pruebas de configuraciones específicas de los clientes, k6 le permite establecer una versión específica o un rango de versiones de SSL/TLS que deben ser permitidas para una conexión, así como qué suites de cifrado están permitidas para ser utilizadas en esa conexión.

## Limiting SSL/TLS version

Limitar las versiones de SSL/TLS que k6 podrá utilizar durante una prueba es una [opción de configuración global](/using-k6/options). Puede elegir limitar a una versión específica:

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
      
o elegir aceptar un rango de versiones de SSL/TLS:

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

## Versiones disponibles

A continuación se muestra la lista de versiones de SSL/TLS disponibles entre las que puede elegir. Están listadas en orden desde la versión más baja/antigua hasta la más alta/nueva.

- `http.SSL_3_0`
- `http.TLS_1_0`
- `http.TLS_1_1`
- `http.TLS_1_2`

## Limitación de los conjuntos de cifrado

La limitación de los conjuntos de cifrado que k6 puede utilizar durante una prueba es una [opción de configuración global](/using-k6/options). Usted elige una lista de cifrados permitidos:

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

## Comprobación de la versión SSL/TLS y el conjunto de cifrado utilizado en la solicitud

También puedes comprobar qué versión SSL/TLS y qué cifrado se ha utilizado para realizar una petición mirando las propiedades del objeto de respuesta `tls_version` y `tls_cipher_suite`.

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

## Suites de cifrado disponibles

A continuación se muestra una lista de suites de cifrado SSL/TLS disponibles para elegir.

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

> ### ⚠️ Diferencias dependiendo de la versión de k6
>
> Tenga en cuenta que puede haber diferencias con respecto a la lista anterior de conjuntos de cifrado disponibles en función de la versión de k6 que utilice.
>
> La lista anterior refleja los conjuntos de cifrado disponibles en la última versión oficial. Si estás usando un k6 construido a medida, los conjuntos de cifrado disponibles dependen de la versión de Go con la que lo hayas compilado, consulta [https://golang.org/pkg/crypto/tls/#pkg-constants](https://golang.org/pkg/crypto/tls/#pkg-constants).
