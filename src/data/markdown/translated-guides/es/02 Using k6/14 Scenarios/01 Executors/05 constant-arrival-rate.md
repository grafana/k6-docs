---
title: 'Constant arrival rate'
excerpt: 'Se ejecuta un número fijo de iteraciones en un periodo de tiempo determinado.'
---

## Description

Se ejecuta un número fijo de iteraciones en un periodo de tiempo determinado. Dado que el tiempo de ejecución de la iteración puede variar debido a la lógica de la prueba o a que el sistema bajo prueba responda más lentamente, este ejecutor intentará compensar ejecutando un número variable de VUs incluyendo la posibilidad de inicializar más en medio de la prueba para cumplir con la tasa de iteración configurada. Este enfoque es útil para una representación más precisa de RPS, por ejemplo.

Consulte [arrival rate](/es/usando-k6/escenarios/arrival-rate/) para más detalles.

## Opciones

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option             | Type    | Description                                                                             | Default |
| ------------------ | ------- | --------------------------------------------------------------------------------------- | ------- |
| `duration*`        | string  | Duración total del escenario (excluyendo gracefulStop).| -       |
| `rate*`            | integer | Número de iteraciones a ejecutar en cada periodo de timeUnit.                                 | -       |
| `preAllocatedVUs*` | integer | Número de VUs a pre asignar antes del inicio de la prueba para preservar los recursos del tiempo de ejecución. | -       |
| `timeUnit`         | string  | Periodo de tiempo para aplicar el valor de la tasa.                                               | `"1s"`  |
| `maxVUs`           | integer | Número máximo de VUs a permitir durante la ejecución de la prueba.                                     | -       |

## Cuando usarlo

Cuando se quiere mantener un número constante de peticiones sin que se vea afectado el rendimiento del sistema bajo prueba.

## Ejemplo

En este ejemplo, ejecutaremos una tasa constante de 200 RPS durante 1 minuto, permitiendo a k6 programar dinámicamente hasta 100 VUs.

<CodeGroup labels={[ "constant-arr-rate.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 200, // 200 RPS, since timeUnit is the default 1s
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>

Tenga en cuenta que para lograr de forma fiable una tasa de peticiones fija, se recomienda mantener la función que se ejecuta muy simple, con preferiblemente una sola llamada de petición, y sin procesamiento adicional o llamadas a `sleep()`.
