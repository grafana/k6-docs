---
title: 'Thresholds'
excerpt: 'Thresholds es una funcionalidad que permite definir las expectativas de rendimiento del sistema sometido a prueba. Thresholds establecen el criterio por el cual un test se considera correcto o un error.'
---

## ¿Qué es un Threshold?

Thresholds es una funcionalidad que permite definir las expectativas de rendimiento del sistema sometido a prueba. Thresholds establecen el criterio por el cual un test se considera correcto o un error.

Ejemplos de expectativas (Thresholds):

- El sistema no produce más de un 1% de errores
- El tiempo de respuesta para el 95% de las solicitudes debe ser inferior a 200ms.
- El tiempo de respuesta para el 99% de las solicitudes debe ser inferior a 400 ms.
- El punto final específico debe responder siempre antes de 300ms.
- Cualquier condición en una [métrica personalizada](/es/usando-k6/metricas/#metricas-personalizadas).

Thresholds analizan las métricas de rendimiento y determinan el resultado final de la prueba (pasa/no pasa). Thresholds son esenciales para la [automatización de las pruebas de carga](/es/guias-de-prueba/automatizacion-de-pruebas-de-rendimiento/).


A continuación se muestra un script de ejemplo que especifica dos thresholds, un evaluando la tasa de errores de peticiones HTTP (`http_req_failed`) y una que usa el percentil del tiempo de reqspuesta de todas las peticiones ( `http_req_duration`).

<CodeGroup labels={["threshold.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

</CodeGroup>

Cuando se ejecute el test anterior, el resultado de k6 es similar a:


<CodeGroup labels={["threshold-output"]} lineNumbers={[false]}>

```bash
   ✓ http_req_duration..............: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
       { expected_response:true }...: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
   ✓ http_req_failed................: 0.00%  ✓ 0 ✗ 1
```
</CodeGroup>

El threshold de peticiones fallidas, específica que queremos que nuestra prueba de carga se considere un fracaso (que resulte en que k6 salga con un código de salida distinto de cero) si el 10% o más de las peticiones resultan en error. El threshold `http_req_duration` especifica que el 95% de las peticiones deben completarse en 200ms.

Al ejecutar ese script, k6 mostrará algo similar a esto:

- En el caso anterior, se han cumplido los criterios de ambos thresholds. Se considera que toda la prueba de carga es un pass, lo que significa que k6 saldrá con el código de salida cero.

- Si alguno de los thresholds ha fallado, la marca de verificación de color verde <span style="color:green; font-weight:bold">✓</span> junto al nombre del threshold (`http_req_failed`, `http_req_duration`) se mostrara con una cruz de color rojo <span style="color:red; font-weight:bold">✗</span> en su lugar, y k6 debera generar un código de salida distinto de cero.

## Copiar y pegar ejemplos de Thresholds

La forma más rápida de empezar con los thresholds es utilizar las métricas estándares incorporadas en k6. A continuación se muestran algunos ejemplos para copiar y pegar que puede empezar a utilizar de inmediato.

<CodeGroup labels={["threshold-request-duration.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // 90% of requests must finish within 400ms.
    http_req_duration: ['p(90) < 400'],
  },
};

export default function () {
  const res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</CodeGroup>

<CodeGroup labels={["threshold-error-rate.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // During the whole test execution, the error rate must be lower than 1%.
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</CodeGroup>

### Múltiples thresholds en una sola métrica


<CodeGroup labels={["threshold-request-duration.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};

export default function () {
  const res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</CodeGroup>

### Threshold de duración del grupo

<CodeGroup labels={["threshold-group-duration.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  thresholds: {
    'group_duration{group:::individualRequests}': ['avg < 200'],
    'group_duration{group:::batchRequests}': ['avg < 200'],
  },
  vus: 1,
  duration: '10s',
};

export default function () {
  group('individualRequests', function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    http.get('https://test-api.k6.io/public/crocodiles/2/');
    http.get('https://test-api.k6.io/public/crocodiles/3/');
  });

  group('batchRequests', function () {
    http.batch([
      ['GET', `https://test-api.k6.io/public/crocodiles/1/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/2/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/3/`],
    ]);
  });

  sleep(1);
}
```

</CodeGroup>

## Threshold Syntax

Los thresholds pueden especificarse en formato corto o completo.

<CodeGroup labels={["threshold-options.js"]} lineNumbers={[true]}>

```javascript
export const options = {
  thresholds: {
    metric_name1: ['threshold_expression' /* ...*/], // short format
    metric_name1: [
      {
        threshold: 'threshold_expression',
        abortOnFail: true, // boolean
        delayAbortEval: '10s', // string
      },
    ], // full format
  },
};
```

</CodeGroup>

La declaración anterior dentro de un script k6 significa que habrá un threshold configurado para la métrica `metric_name1`. Para determinar si el threshold ha fallado o ha sido superado, se evaluará la cadena `threshold_expression`. La `expresión_threshold` debe seguir el siguiente formato.

`aggregation_method operator value`

Ejemplos:

- `avg < 200` // la duración media no puede ser superior a 200ms
- `count >= 500` // el recuento debe ser mayor o igual a 500
- `p(90) < 300` // El 90% de las muestras debe ser inferior a 300

Una expresión de threshold se evalúa como verdadero o falso.

Cada uno de los cuatro tipos de métrica incluidos en k6 proporciona su propio conjunto de métodos de agregación utilizables en las expresiones de threshold.


| Tipo de métrica |   Métodos agregados                                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Counter     | `count` y `rate`                                                                                                                                                                                                  |
| Gauge       | `value`                                                                                                                                                                                                             |
| Rate        | `rate`                                                                                                                                                                                                              |
| Trend       | `avg`, `min`, `max`, `med` and `p(N)`  donde `N` es un número entre 0,0 y 100,0 que significa el valor del percentil a mirar, por ejemplo, p(99,99) significa el percentil 99,99. La unidad para estos valores es el milisegundos. |

Aquí hay un script de muestra (ligeramente artificial) que utiliza todos los diferentes tipos de métricas, y establece diferentes tipos de thresholds para ellos:

<CodeGroup labels={["thresholds-all.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');
export const options = {
  thresholds: {
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
    'Content OK': ['rate>0.95'],
    'ContentSize': ['value<4000'],
    'Errors': ['count<100'],
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  const contentOK = res.json('name') === 'Bert';

  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);

  sleep(1);
}
```

</CodeGroup>

Tenemos estos thresholds:

- Una métrica de tendencia que se alimenta con muestras de tiempo de respuesta, y que tiene los siguientes criterios de threshold:
  - El tiempo de respuesta del percentil 99 debe ser inferior a 300 ms
  - El tiempo de respuesta del percentil 70 debe ser inferior a 250 ms
  - El tiempo de respuesta medio debe ser inferior a 200 ms
  - La mediana del tiempo de respuesta debe ser inferior a 150 ms
  - El tiempo de respuesta mínimo debe ser inferior a 100 ms
- Una métrica de tasa que lleva la cuenta de la frecuencia con la que el contenido devuelto estaba bien. Esta métrica tiene un criterio de éxito: el contenido debe estar bien más del 95% de las veces.
- Una métrica de calibre que contiene el último tamaño del contenido devuelto. El criterio de éxito para esta métrica es que el contenido devuelto debe ser menor de 4000 bytes.
- Una métrica de contador que lleva la cuenta del número total de veces que el contenido devuelto no estaba bien. El criterio de éxito aquí implica que el contenido no puede haber sido malo más de 99 veces.


## Thresholds en tags


A menudo es útil especificar thresholds sólo en una única URL o en una etiqueta específica. En k6, las solicitudes etiquetadas crean sub métricas que pueden utilizarse en los thresholds, como se muestra a continuación.

```javascript
export const options = {
  thresholds: {
    'metric_name{tag_name:tag_value}': ['threshold_expression'],
  },
};
```

Y aquí hay un ejemplo completo.

<CodeGroup labels={["thresholds-on-submetrics.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
  thresholds: {
    'http_req_duration{type:API}': ['p(95)<500'], // threshold on API requests only
    'http_req_duration{type:staticContent}': ['p(95)<200'], // threshold on static content only
  },
};

export default function () {
  const res1 = http.get('https://test-api.k6.io/public/crocodiles/1/', {
    tags: { type: 'API' },
  });
  const res2 = http.get('https://test-api.k6.io/public/crocodiles/2/', {
    tags: { type: 'API' },
  });

  const responses = http.batch([
    ['GET', 'https://test-api.k6.io/static/favicon.ico', null, { tags: { type: 'staticContent' } }],
    [
      'GET',
      'https://test-api.k6.io/static/css/site.css',
      null,
      { tags: { type: 'staticContent' } },
    ],
  ]);

  sleep(1);
}
```

</CodeGroup>

## Abortar una prueba cuando se cruza un thresholds


Si desea abortar una prueba en cuanto se cruza un threshold, antes de que la prueba haya finalizado, existe un formato de especificación de threshold ampliado que tiene el siguiente aspecto:

<CodeGroup labels={["threshold-abort.js"]} lineNumbers={[true]}>

```javascript
export const options = {
  thresholds: {
    metric_name: [
      {
        threshold: 'p(99) < 10', // string
        abortOnFail: true, // boolean
        delayAbortEval: '10s', // string
        /*...*/
      },
    ],
  },
};
```

</CodeGroup>

Como puede ver en el ejemplo anterior, la especificación del thresholds se ha ampliado para admitir alternativamente un objeto JS con parámetros para controlar el comportamiento de la interrupción. Los campos son los siguientes:

| Nombre           | Tipo    | Descripción                                                                                                                                                                                                               |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| threshold      | string  | Es la cadena de expresión de threshold que especifica la condición de threshold a evaluar.                                                                                                                                   |
| abortOnFail    | boolean | Si se aborta la prueba si el threshold se evalúa como falso antes de que la prueba haya finalizado.                                                                                                                           |
| delayAbortEval | string  | Si desea retrasar la evaluación del threshold durante algún tiempo, para permitir que se recojan algunas muestras métricas, puede especificar la cantidad de tiempo a retrasar utilizando cadenas de tiempo relativas como `10s`, `1m` y así sucesivamente. |

A continuación un ejemplo: 

<CodeGroup labels={["abort-on-fail-threshold.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  vus: 30,
  duration: '2m',
  thresholds: {
    http_req_duration: [{ threshold: 'p(99) < 10', abortOnFail: true }],
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

</CodeGroup>

> **⚠️ Retraso de la evaluación en k6 Cloud**
>
> Cuando k6 se ejecuta en la nube, los thresholds se evalúan cada 60 segundos, por lo que la función "abortOnFail" puede retrasarse hasta 60 segundos.

## Fallo de una prueba de carga mediante comprobaciones

Los checks son buenas para codificar aserciones, pero a diferencia de los thresholds, las checks no afectarán al estado de salida de k6.

Si sólo utilizas checks para verificar que las cosas funcionan como se espera, no podrás suspender toda la prueba basándote en los resultados de esas checks.

A menudo puede ser útil combinar checks y thresholds, para obtener lo mejor de ambos:

<CodeGroup labels={["check_and_fail.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    // the rate of successful checks should be higher than 90%
    checks: ['rate>0.9'],
  },
};

export default function () {
  const res = http.get('http://httpbin.test.k6.io');

  check(res, {
    'status is 500': (r) => r.status == 500,
  });

  sleep(1);
}
```

</CodeGroup>

En este ejemplo, el threshold se configura en la métrica de los checks, estableciendo que la tasa de checks con éxito debe ser superior al 90%.

Además, puede utilizar etiquetas en los controles si desea definir un threshold basado en un control o grupo de controles concreto. Por ejemplo:


<CodeGroup labels={[""]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    'checks{myTag:hola}': ['rate>0.9'],
  },
};

export default function () {
  let res;

  res = http.get('http://httpbin.test.k6.io');
  check(res, {
    'status is 500': (r) => r.status == 500,
  });

  res = http.get('http://httpbin.test.k6.io');
  check(
    res,
    {
      'status is 200': (r) => r.status == 200,
    },
    { myTag: 'hola' }
  );

  sleep(1);
}
```

</CodeGroup>