---
title: "Smoke testing"
excerpt: "La prueba de humo es una prueba de carga regular, configurada para una carga mínima."
---

La smoke test (prueba de humo) es una prueba de carga regular, configurada para una carga mínima. Usted quiere ejecutar una prueba de humo como una comprobación de cordura cada vez que escribe un nuevo script o modifica un script existente.

Usted quiere ejecutar una prueba de humo para:

1. Verificar que su script de prueba no tenga errores.
2. Verificar que su sistema no arroja ningún error cuando está bajo carga mínima.


## Smoke testing en k6

Aquí hay un script de prueba de humo relativamente simple para empezar. Puedes copiarlo, cambiar algunas URLs y empezar a hacer pruebas en poco tiempo. Si desea ver un script más completo, consulte nuestra sección de [ejemplos](/examples).

<CodeGroup labels={["sample-smoke-test.js"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://test-api.k6.io';
const USERNAME = 'TestUser';
const PASSWORD = 'SuperCroc2020';

export default () => {
  const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('access') !== '',
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('access')}`,
    },
  };

  const myObjects = http.get(`${BASE_URL}/my/crocodiles/`, authHeaders).json();
  check(myObjects, { 'retrieved crocodiles': (obj) => obj.length > 0 });

  sleep(1);
};
```

</CodeGroup>

El gráfico de VU de una prueba de humo debe ser similar a esto. Es conveniente utilizar solo 1 o 2 VU.
![Smoke test VU chart](./images/smoke-test.png)

Si su prueba de humo produjo algún error, debe corregir el script o arreglar su entorno antes de poder continuar.

La salida de k6 debe ser similar a esta:
![Smoke test Terminal Output](./images/smoke-test-terminal-output.png)

Una vez que su prueba de humo muestra 0 errores, como en la captura de pantalla anterior, puede ir al siguiente paso y ejecutar un [load test](/es/tipos-de-prueba/load-testing/) para evaluar el rendimiento de su sistema.
