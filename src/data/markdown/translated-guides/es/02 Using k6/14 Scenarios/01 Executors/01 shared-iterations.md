---
title: 'Shared iterations'
excerpt: 'Un número fijo de iteraciones se "comparte" entre un número de VUs, y la prueba termina una vez que se ejecutan todas las iteraciones.'
---

## Descripción

Un número fijo de iteraciones se "comparte" entre un número de VUs, y la prueba termina una vez que se ejecutan todas las iteraciones. Este ejecutor es equivalente a las opciones globales de VUs e iteraciones.
 
Tenga en cuenta que las iteraciones no se distribuyen equitativamente con este ejecutor, y un VU que se ejecute más rápido completará más iteraciones que otras.


## Opciones

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option        | Type    | Description                                                                        | Default |
| ------------- | ------- | ---------------------------------------------------------------------------------- | ------- |
| `vus`         | integer | Número de VUs que se ejecutan simultáneamente.                                                 | `1`     |
| `iterations`  | integer | Número total de iteraciones de un script al ejecutar en todas las VUs.                       | `1`     |
| `maxDuration` | string  | Duración máxima del escenario antes de que se detenga forzosamente (excluyendo `gracefulStop`). | `"10m"` |

## Cuando usarlo
 
Este ejecutor es adecuado cuando se desea una cantidad específica de VUs para completar un número fijo de iteraciones totales, y la cantidad de iteraciones por VU no es importante.
 
## Ejemplo
 
En este ejemplo, ejecutaremos 200 iteraciones totales compartidas por 10 VUs con una duración máxima de 10 segundos


<CodeGroup labels={[ "shared-iters.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>
