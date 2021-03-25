---
title: 'Graceful stop'
excerpt: ''
---

Antes de la versión 0.27.0, k6 interrumpía cualquier iteración en curso cuando se alcanzaba la duración de la prueba o cuando se reducían los VU con la opción de etapas. En algunos casos esto podría llevar a métricas sesgadas y resultados de pruebas inesperadas. A partir de la versión 0.27.0, este comportamiento puede controlarse mediante las opciones `gracefulStop` y `gracefulRampDown`.

## Descripción

Esta opción está disponible para todos los `executors`, excepto `externally-controlled` y permite al usuario especificar una duración para esperar antes de interrumpirlos forzosamente. El valor por defecto de esta propiedad es de 30s.

## Ejemplo

<CodeGroup labels={[ "graceful-stop.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 100,
      duration: '10s',
      gracefulStop: '3s',
    },
  },
};

export default function () {
  let delay = Math.floor(Math.random() * 5) + 1;
  http.get(`https://httpbin.test.k6.io/delay/${delay}`);
}
```

</CodeGroup>

La ejecución de este script daría como resultado algo así:

```bash
running (13.0s), 000/100 VUs, 349 complete and 23 interrupted iterations
contacts ✓ [======================================] 100 VUs  10s
```

Nótese que aunque la duración total de la prueba es de 10s, el tiempo real de ejecución fue de 13s debido a `gracefulStop`, dando a las VUs un tiempo adicional de 3s para completar las iteraciones en curso. 23 de las iteraciones en curso no se completaron dentro de esta ventana y, por lo tanto, se interrumpieron.

## Información adicional

Existe una opción similar para el [ramping-vus](/using-k6/scenarios/executors/ramping-vus) executor: `gracefulRampDown`. Esto especifica el tiempo que k6 debe esperar para que cualquier iteración en progreso termine antes de que las VUs sean devueltas al pool global durante un período de rampa de descenso definido en `stages`.
