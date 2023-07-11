---
title: 'Arrival rate'
excerpt: 'En k6, hemos implementado este modelo abierto con nuestros dos executors de tasa de llegada (Arrival Rate).'
---

## Closed Model

> En un modelo cerrado, el tiempo de ejecución de cada iteración dicta el número real de iteraciones ejecutadas en su prueba, ya que la siguiente iteración no se iniciará hasta que la anterior se haya completado.

Antes de la versión 0.27.0, k6 sólo admitía un modelo cerrado para la simulación de la llegada de nuevos VU. En este modelo cerrado, una nueva iteración del VU sólo comienza cuando la iteración anterior del VU ha completado su ejecución. Por lo tanto, en un modelo cerrado, la tasa de inicio, o tasa de llegada, de las nuevas iteraciones del VU está estrechamente vinculada a la duración de la iteración (es decir, el tiempo desde el inicio hasta el final de la función de ejecución del VU, por defecto la función de exportación por defecto):

<CodeGroup labels={[ "closed-model.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    closed_model: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
    },
  },
};

export default function () {
  // The following request will take roughly 6s to complete,
  // resulting in an iteration duration of 6s.

  // As a result, New VU iterations will start at a rate of 1 per 6s,
  // and we can expect to get 10 iterations completed in total for the
  // full 1m test duration.

  http.get('https://httpbin.test.k6.io/delay/6');
}
```

</CodeGroup>

La ejecución de este script daría como resultado algo así:

```bash

running (1m01.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
closed_model ✓ [======================================] 1 VUs  1m0s

```

## Inconvenientes de la utilización del modelo cerrado

Este estrecho vínculo entre la duración de la iteración del VU y el inicio de las nuevas iteraciones del  VU significa, en efecto, que el sistema objetivo puede influir en el rendimiento de la prueba, a través de su tiempo de respuesta. Un tiempo de respuesta más lento significa iteraciones más largas y una menor tasa de llegada de nuevas iteraciones, y viceversa para tiempos de respuesta más rápidos.
 
En otras palabras, cuando el sistema objetivo está sometido a estrés y empieza a responder más lentamente, una prueba de carga de modelo cerrado se hará la "buena" y esperará, lo que dará lugar a un aumento de la duración de las iteraciones y a una disminución de la tasa de llegada (Arrival Rate) de nuevas iteraciones del VU.
 
Esto no es ideal cuando el objetivo es simular una determinada tasa de llegada de nuevas VUs, o más generalmente el rendimiento (por ejemplo, peticiones por segundo).


## Open model

> En comparación con el modelo cerrado, el modelo abierto desvincula las iteraciones de la VU de la duración real de la iteración. Los tiempos de respuesta del sistema objetivo ya no influyen en la carga que se aplica al sistema objetivo.
 

Para solucionar este problema utilizamos un modelo abierto, desvinculando el inicio de nuevas iteraciones de la VU de la duración de la iteración y de la influencia del tiempo de respuesta del sistema objetivo.

![Arrival rate closed/open models](../images/Scenarios/arrival-rate-open-closed-model.png)


En k6, hemos implementado este modelo abierto con nuestros dos executors de "tasa de llegada (Arrival Rate)" [constant-arrival-rate](/es/usando-k6/escenarios/executors/constant-arrival-rate/) and [ramping-arrival-rate](/es/usando-k6/escenarios/executors/ramping-arrival-rate/):

<CodeGroup labels={[ "open-model.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
    },
  },
};

export default function () {
  // With the open model arrival rate executor config above,
  // new VU iterations will start at a rate of 1 every second,
  // and we can thus expect to get 60 iterations completed
  // for the full 1m test duration.
  http.get('https://httpbin.test.k6.io/delay/6');
}
```

</CodeGroup>

La ejecución de este script daría como resultado algo así:

```bash
running (1m09.3s), 000/011 VUs, 60 complete and 0 interrupted iterations
open_model ✓ [======================================] 011/011 VUs  1m0s  1 iters/s
```
