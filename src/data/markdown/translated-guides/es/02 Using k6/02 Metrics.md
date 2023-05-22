---
title: 'Métricas'
excerpt: 'Esta sección cubre el aspecto importante de la gestión de métricas en k6. Cómo y qué tipo de métricas recopila k6 automáticamente (_built-in_ metrics) y qué métricas personalizadas puede hacer que k6 recopile. '
---

Esta sección cubre el aspecto importante de la gestión de métricas en k6. Cómo y qué tipo de métricas recopila k6 automáticamente (_built-in_ metrics) y qué métricas personalizadas puede hacer que k6 recopile.

## Métricas integradas

Las métricas _built-in_ son las que puede ver la salida a stdout cuando ejecuta la prueba k6 más simple posible:


```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test-api.k6.io/');
}
```


```bash
$ k6 run script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: http_get.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m03.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m03.8s/10m0s  1/1 iters, 1 per VU

     data_received..................: 22 kB 5.7 kB/s
     data_sent......................: 742 B 198 B/s
     http_req_blocked...............: avg=1.05s    min=1.05s    med=1.05s    max=1.05s    p(90)=1.05s    p(95)=1.05s
     http_req_connecting............: avg=334.26ms min=334.26ms med=334.26ms max=334.26ms p(90)=334.26ms p(95)=334.26ms
     http_req_duration..............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
       { expected_response:true }...: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_req_failed................: 0.00% ✓ 0        ✗ 1
     http_req_receiving.............: avg=112.41µs min=112.41µs med=112.41µs max=112.41µs p(90)=112.41µs p(95)=112.41µs
     http_req_sending...............: avg=294.48µs min=294.48µs med=294.48µs max=294.48µs p(90)=294.48µs p(95)=294.48µs
     http_req_tls_handshaking.......: avg=700.6ms  min=700.6ms  med=700.6ms  max=700.6ms  p(90)=700.6ms  p(95)=700.6ms
     http_req_waiting...............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_reqs......................: 1     0.266167/s
     iteration_duration.............: avg=3.75s    min=3.75s    med=3.75s    max=3.75s    p(90)=3.75s    p(95)=3.75s
     iterations.....................: 1     0.266167/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1
```

Todas las `http_req_...` que están después de ellas son métricas _built-in_ que se escriben en stdout al final de una prueba.

Las siguientes métricas _built-in_ serán siempre recopiladas por k6:

Nombre de métrica                          | Tipo    | Descripción                                                                                                                                                                   |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vus                | Gauge   | Número actual de usuarios virtuales activos                                                                                 |
| vus_max            | Gauge   | Número máximo posible de usuarios virtuales (los recursos de VU están preasignados para garantizar que el rendimiento no se vea afectado al escalar el nivel de carga)                                                 |
| iterations         | Counter | El número total de veces que las VU de la prueba han ejecutado el script JS (la función "default").                                                 |
| iteration_duration | Trend   | El tiempo que tardó en completar una iteración completa de la función predeterminada / principal.                                                                                  |
| dropped_iterations | Counter | Introducido en k6 v0.27.0, el número de iteraciones que no se pudieron iniciar debido a la falta de VU (para los ejecutores de tasa de llegada) o falta de tiempo (debido a maxDuration expirado en los ejecutores basados en iteraciones). |
| data_received      | Counter | La cantidad de datos recibidos. Lea [este ejemplo](/examples/track-transmitted-data-per-url) para rastrear los datos de una URL individual.                                                    |
| data_sent          | Counter | La cantidad de datos enviados. Lea [este ejemplo](/examples/track-transmitted-data-per-url) para rastrear los datos de una URL individual.                                                                                  |
| checks             | Rate    | La tasa de controles exitosos.                                                                                 |

## Métricas integradas específicas de HTTP

Las métricas _built-in_ solo se generarán cuando / si se realizan solicitudes HTTP:

Nombre de métrica                          | Tipo    | Descripción                                                                                                                                                                                                                                  |
| ------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| http_reqs                            | Counter | Cuántas solicitudes HTTP ha generado k6, en total.                                                                                                                                                                                           |
| http_req_blocked                     | Trend   | Tiempo pasado bloqueado (esperando una ranura de conexión TCP libre) antes de iniciar la solicitud. `float`                                                                                                                                |
| http_req_connecting                  | Trend   | Tiempo empleado en establecer una conexión TCP con el host remoto. `float`                                                                                                                                                                           |
| http_req_tls_handshaking             | Trend   | Tiempo dedicado a la sesión de protocolo de enlace TLS con el host remoto                                                                                                                                |
| http_req_sending                     | Trend   | Tiempo empleado en enviar datos al host remoto. `float`                                                                                                                                 |
| http_req_waiting                     | Trend   | Tiempo dedicado a la espera de respuesta del host remoto (a.k.a. “time to first byte”, o “TTFB”). `float`                                                                                                                                       |
| http_req_receiving                   | Trend   | Tiempo empleado en recibir datos de respuesta del host remoto. `float`                                                                                                                                                                             |
| http_req_duration                    | Trend   | Tiempo total de la solicitud. Es igual a `http_req_sending + http_req_waiting + http_req_receiving` (es decir, cuánto tiempo tardó el servidor remoto en procesar la solicitud y responder, sin el DNS inicial lookup/connection times). `float` |
| http_req_failed <sup>(≥ v0.31)</sup> | Rate    | La tasa de solicitudes fallidas según [setResponseCallback](/javascript-api/k6-http/setresponsecallback).                                                                                                                        |

### Accediendo a los tiempos HTTP desde un script

Si desea acceder a la información de tiempo de una solicitud HTTP individual en el k6, el objeto [Response.timings](/javascript-api/k6-http/response) proporciona el tiempo dedicado a las diversas fases en `ms`:

- blocked: equals to `http_req_blocked`.
- connecting: equals to `http_req_connecting`.
- tls_handshaking: equals to `http_req_tls_handshaking`.
- sending: equals to  `http_req_sending`.
- waiting: equals to `http_req_waiting`.
- receiving: equals to `http_req_receiving`.
- duration: equals to `http_req_duration`.

<CodeGroup lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('http://httpbin.test.k6.io');
  console.log('Response time was ' + String(res.timings.duration) + ' ms');
}
```

</CodeGroup>

A continuación se muestra la salida esperada (parcial):

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  INFO[0001] Response time was 337.962473 ms               source=console
```

</CodeGroup>

## Métricas personalizadas

También puede crear sus propias métricas, que se informan al final de una prueba de carga, al igual que los tiempos HTTP:

```javascript
import http from 'k6/http';
import { Trend } from 'k6/metrics';

const myTrend = new Trend('waiting_time');

export default function () {
  const r = http.get('https://httpbin.test.k6.io');
  myTrend.add(r.timings.waiting);
  console.log(myTrend.name); // waiting_time
}
```


El código anterior creará una métrica de tendencia denominada "tiempo_de_espera" y se hará referencia en el código mediante el nombre de variable `myTrend`.

Las métricas personalizadas se informarán al final de una prueba. Así es como se vería la salida:


```bash
$ k6 run script.js

  ...
  INFO[0001] waiting_time                                  source=console

  ...
  iteration_duration.............: avg=1.15s    min=1.15s    med=1.15s    max=1.15s    p(90)=1.15s    p(95)=1.15s   
  iterations.....................: 1     0.864973/s
  waiting_time...................: avg=265.245396 min=265.245396 med=265.245396 max=265.245396 p(90)=265.245396 p(95)=265.245396
```


## Tipos de métricas

Todas las métricas (tanto las incorporadas como las personalizadas) tienen un tipo. Los cuatro tipos de métricas diferentes en k6 son:

| Nombre de métrica                                   | Descripción                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Counter](/javascript-api/k6-metrics/counter) | Métrica que suma valores agregados de manera acumulativa.                                                |
| [Gauge](/javascript-api/k6-metrics/gauge)     | Métrica que almacena los valores mínimo, máximo y último que se le agregan.                              |
| [Rate](/javascript-api/k6-metrics/rate)       | Métrica que rastrea el porcentaje de valores agregados que no son cero.                                  |
| [Trend](/javascript-api/k6-metrics/trend)     | Métrica que calcula estadísticas sobre los valores agregados (mínimo, máximo, promedio y percentiles).   |

Opcionalmente, todos los valores agregados a una métrica personalizada pueden ser [tagged](/using-k6/tags-and-groups), lo que puede ser útil al analizar los resultados de la prueba.

### Contador _(métrica acumulativa)_

<CodeGroup lineNumbers={[false]}>

```javascript
import { Counter } from 'k6/metrics';

const myCounter = new Counter('my_counter');

export default function () {
  myCounter.add(1);
  myCounter.add(2);
}
```

</CodeGroup>

El código anterior generará la siguiente salida:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=16.48µs min=16.48µs med=16.48µs max=16.48µs p(90)=16.48µs p(95)=16.48µs
  iterations...........: 1   1327.67919/s
  my_counter...........: 3   3983.037571/s
```

</CodeGroup>

El valor de `my_counter` será 3 (si lo ejecuta una sola iteración, es decir, sin especificar --iterations o --duration).

Tenga en cuenta que actualmente no hay forma de acceder al valor de ninguna métrica personalizada desde JavaScript. Tenga en cuenta también que los contadores que tienen valor cero (`0`) al final de una prueba son un caso especial: ** NO ** se imprimirán en el resumen de salida estándar.

### Gauge _ (mantener solo el último valor) _

<CodeGroup lineNumbers={[false]}>

```javascript
import { Gauge } from 'k6/metrics';

const myGauge = new Gauge('my_gauge');

export default function () {
  myGauge.add(3);
  myGauge.add(1);
  myGauge.add(2);
}
```

</CodeGroup>

El código anterior generará la siguiente salida:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=21.74µs min=21.74µs med=21.74µs max=21.74µs p(90)=21.74µs p(95)=21.74µs
  iterations...........: 1   1293.475322/s
  my_gauge.............: 2   min=1         max=3
```

</CodeGroup>

El valor de `my_gauge` será 2 al final de la prueba. Al igual que con la métrica Contador anterior, un indicador con valor cero (`0`) ** NO ** se imprimirá en el resumen de salida estándar al final de la prueba.

### Trend _(recopilar estadísticas de tendencias (mínimo / máximo / promedio / percentiles) para una serie de valores)_

<CodeGroup lineNumbers={[false]}>

```javascript
import { Trend } from 'k6/metrics';

const myTrend = new Trend('my_trend');

export default function () {
  myTrend.add(1);
  myTrend.add(2);
}
```

</CodeGroup>

El código anterior hará que k6 imprima una salida como esta:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=20.78µs min=20.78µs med=20.78µs max=20.78µs p(90)=20.78µs p(95)=20.78µs
  iterations...........: 1   1217.544821/s
  my_trend.............: avg=1.5     min=1       med=1.5     max=2       p(90)=1.9     p(95)=1.95
```

</CodeGroup>

Una métrica de tendencia es un contenedor que contiene un conjunto de valores de muestra y al que podemos pedir que genere estadísticas (mínimo, máximo, promedio, mediana o percentiles) sobre esas muestras.
De forma predeterminada, k6 imprimirá promedio, mínimo, máximo, mediano, percentil 90 y percentil 95.

### Rate _ (realiza un seguimiento del porcentaje de valores en una serie que no son cero) _

<CodeGroup lineNumbers={[false]}>

```javascript
import { Rate } from 'k6/metrics';

const myRate = new Rate('my_rate');

export default function () {
  myRate.add(true);
  myRate.add(false);
  myRate.add(1);
  myRate.add(0);
}
```

</CodeGroup>

El código anterior hará que k6 imprima una salida como esta:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=22.12µs min=22.12µs med=22.12µs max=22.12µs p(90)=22.12µs p(95)=22.12µs
  iterations...........: 1      1384.362792/s
  my_rate..............: 50.00% ✓ 2           ✗ 2
```

</CodeGroup>

El valor de "my_rate" al final de la prueba será del 50%, lo que indica que la mitad de los valores
agregados a la métrica eran distintos de cero.

### Notas

- las métricas personalizadas solo se recopilan de los subprocesos de VU al final de una iteración de VU, lo que significa que
  en el caso de los scripts de ejecución prolongada, es posible que no vea ninguna métrica personalizada hasta un tiempo después de la prueba.
