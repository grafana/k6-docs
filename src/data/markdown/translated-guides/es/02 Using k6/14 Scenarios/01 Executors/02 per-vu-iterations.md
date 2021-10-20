---
title: 'Per VU iterations'
excerpt: 'Cada VU ejecuta un número exacto de iteraciones. El número total de iteraciones completadas será VUs * iteraciones.'
---

## Descripción

Cada VU ejecuta un número exacto de iteraciones. El número total de iteraciones completadas será VUs * iteraciones.

## Options

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option        | Type    | Description                                                                        | Default |
| ------------- | ------- | ---------------------------------------------------------------------------------- | ------- |
| `vus`         | integer | Número de VUs que se ejecutan simultáneamente.                                                 | `1`     |
| `iterations`  | integer | Número total de iteraciones de un script al ejecutar en todas las VUs.                    | `1`     |
| `maxDuration` | string  | Duración máxima del escenario antes de que se detenga forzosamente (excluyendo gracefulStop). | `"10m"` |

## Cuando usarlo

Utilice este ejecutor si necesita una cantidad específica de VUs para completar la misma cantidad de iteraciones. Esto puede ser útil cuando tienes conjuntos fijos de datos de prueba que quieres dividir entre VUs.
 
## Ejemplo
 
En este ejemplo, dejaremos que 10 VUs ejecuten 20 iteraciones cada una, para un total de 200 iteraciones, con una duración máxima de 1 hora y 30 minutos.


<CodeGroup labels={[ "per-vu-iters.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '1h30m',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>
