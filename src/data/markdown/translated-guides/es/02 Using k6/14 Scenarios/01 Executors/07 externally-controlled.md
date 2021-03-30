---
title: 'Externally controlled'
excerpt: ''
---

## Descripción

Controla y escala la ejecución en tiempo de ejecución a través d2 [k6's REST API](/misc/k6-rest-api) o [CLI](https://k6.io/blog/how-to-control-a-live-k6-test).

Anteriormente, los comandos CLI de `pause`, `resume`, y `scale` se utilizaban para controlar globalmente la ejecución de k6. Este ejecutor hace el mismo trabajo proporcionando una mejor API que se puede utilizar para controlar la ejecución de k6 en tiempo de ejecución.

Tenga en cuenta que, pasando argumentos al comando CLI de escala para cambiar la cantidad de VUs activas o máximas sólo afectará al ejecutor controlado externamente.

## Opciones

Además de las opciones de configuración comunes, este ejecutor también añade las siguientes opciones:

| Option      | Type    | Description                                         | Default |
| ----------- | ------- | --------------------------------------------------- | ------- |
| `duration*` | string  | Duración total del escenario (excluyendo gracefulStop).                                | -       |
| `vus`       | integer | Número de VUs que se ejecutan simultáneamente.                  | -       |
| `maxVUs`    | integer | Número máximo de VUs a permitir durante la ejecución de la prueba. | -       |

## Cuando usarlo


Si desea controlar el número de VUs mientras se ejecuta la prueba.

Importante: este es el único ejecutor que no está soportado en k6 Cloud, sólo puede ser utilizado localmente con `k6 run`.


## Ejemplo

En este ejemplo, ejecutaremos una prueba controlable en tiempo de ejecución, comenzando con 0 VUs hasta un máximo de 50, y una duración total de 10 minutos.

<CodeGroup labels={[ "externally-controlled.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'externally-controlled',
      vus: 0,
      maxVUs: 50,
      duration: '10m',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>
