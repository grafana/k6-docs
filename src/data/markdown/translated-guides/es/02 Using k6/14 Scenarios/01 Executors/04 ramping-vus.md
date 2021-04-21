---
title: 'Ramping VUs'
excerpt: 'Un número variable de VUs que ejecutan tantas iteraciones como sea posible durante un tiempo determinado. Este ejecutor es equivalente a la opción global `stages`.'
---

## Description

Un número variable de VUs que ejecutan tantas iteraciones como sea posible durante un tiempo determinado. Este ejecutor es equivalente a la opción global `stages`.

## Opciones

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option             | Type    | Description                                                                                    | Default |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------- | ------- |
| `stages*`          | array   | Matriz de objetos que especifican el número objetivo de VUs para subir o bajar.                  | `[]`    |
| `startVUs`         | integer | Número de VUs a ejecutar al inicio de la prueba.                                                            | `1`     |
| `gracefulRampDown` | string  | Tiempo para esperar a que termine una iteración ya iniciada antes de detenerla durante la etapa de descenso. | `"30s"` |

## Cuando usarlo

Este ejecutor es una buena opción si se necesita que los VUs aumenten o disminuyan durante períodos específicos de tiempo.

## Ejemplo

En este ejemplo, realizaremos una prueba en dos etapas, subiendo de 0 a 100 VUs durante 5 segundos, y bajando a 0 VUs durante 5 segundos.

<CodeGroup labels={[ "ramping-vus.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>

Note que la opción `gracefulRampDown` a 0 segundos, podría causar que algunas iteraciones sean interrumpidas durante la etapa de descenso.
