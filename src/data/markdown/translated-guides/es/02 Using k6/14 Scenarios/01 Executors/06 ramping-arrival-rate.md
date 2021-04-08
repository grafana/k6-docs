---
title: 'Ramping arrival rate'
excerpt: 'Se ejecuta un número variable de iteraciones en un periodo de tiempo determinado.'
---

## Descripción

Se ejecuta un número variable de iteraciones en un periodo de tiempo determinado. Este es similar al ejecutor de VUs en rampa, pero para iteraciones en su lugar, y k6 intentará cambiar dinámicamente el número de VUs para alcanzar la tasa de iteración configurada.

See the [arrival rate](/using-k6/scenarios/arrival-rate) section for details.

## Opciones

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option             | Type    | Description                                                                             | Default |
| ------------------ | ------- | --------------------------------------------------------------------------------------- | ------- |
| `stages*`          | array   | Matriz de objetos que especifican el número objetivo de VUs para subir o bajar.    | `[]`    |
| `preAllocatedVUs*` | integer | Número de VUs a pre asignar antes del inicio de la prueba para preservar los recursos del tiempo de ejecución. | -       |
| `startRate`        | integer | Número de iteraciones a ejecutar en cada periodo timeUnit al inicio de la prueba.                   | `0`     |
| `timeUnit`         | string  | Periodo de tiempo para aplicar el valor de la tasa.                      | `"1s"`  |
| `maxVUs`           | integer | Número máximo de VUs a permitir durante la ejecución de la prueba.                                     | -       |

## Cuando usarlo

Si necesita que sus pruebas no se vean afectadas por el rendimiento del sistema bajo prueba, y desea aumentar o disminuir el número de iteraciones durante períodos de tiempo específicos.


## Ejemplo

En este ejemplo, ejecutaremos una prueba de RPS variable, comenzando en 50, subiendo a 200 y luego volviendo a 0, durante un período de 1 minuto.

<CodeGroup labels={[ "ramping-arr-rate.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>
