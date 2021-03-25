---
title: 'Constant VUs'
excerpt: ''
---

## Descripción


Un número fijo de VUs que ejecutan tantas iteraciones como sea posible durante un tiempo determinado. Este ejecutor es equivalente a las opciones globales `vus` y `duration`.

## Opciones

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option      | Type    | Description                                         | Default |
| ----------- | ------- | --------------------------------------------------- | ------- |
| `duration*` | string  | Duración total del escenario (excluyendo gracefulStop). | -       |
| `vus`       | integer | Número de VUs que se ejecutan simultáneamente.      | `1`     |

## Cuando usarlo

Utilice este ejecutor si necesita que una cantidad específica de VUs se ejecuten durante un tiempo determinado.

## Ejemplo

En este ejemplo, ejecutaremos 10 VUs constantemente durante una duración de 45 minutos.

<CodeGroup labels={[ "constant-vus.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    my_awesome_api_test: {
      executor: 'constant-vus',
      vus: 10,
      duration: '45m',
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io/');
  sleep(Math.random() * 3);
}
```

</CodeGroup>
