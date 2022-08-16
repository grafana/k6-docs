---
title: 'Salida de resultados'
excerpt: 'De manera predeterminada, el comando k6 run imprime la información del tiempo de ejecución y los resultados generales en stdout.'
---

De manera predeterminada, el comando `k6 run` imprime la información del tiempo de ejecución y los resultados generales en `stdout`.

## Salida estándar


![k6 results - console/stdout output](./images/k6-results-stdout.png)

Cuando k6 muestre los resultados en `stdout`, se mostrará el logotipo de k6 y la siguiente información de la prueba:

- Detalles de la prueba: información general de la prueba y opciones de carga.
- Barra de progreso: estado de la prueba y el tiempo transcurrido.
- Resumen de la prueba: los resultados de la prueba (tras la finalización).


### Detalles de la prueba


<CodeGroup labels={[]}>

```bash
execution: local
    output: -
    script: script.js

duration: 1m0s, iterations: -
    vus: 100,  max: 100
```

</CodeGroup>

- Ejecución  local:  el modo de ejecución de k6 (local o en la nube).
- Salida:  la salida de los resultados de la prueba. El valor por defecto es stdout.
- Script: script.js muestra el nombre del script que se está ejecutando.
- Duración: 1m0s la duración de la ejecución de la prueba.
- Iteraciones: el número total de iteraciones de los VU.
- VUs: El número inicial de los VUs que la prueba comenzará a ejecutar es 100. 
- max: 100 es el número máximo de VUs que escalará la prueba.


### Resumen de la prueba


The test summary provides a general overview of your test result. The summary prints to `stdout` the status of:

- [Métricas incorporadas](/es/usando-k6/metricas/#metricas-incorporadas) y [métricas personalizadas](/es/usando-k6/metricas/#metricas-personalizadas).
- [Checks](/es/usando-k6/checks/) and [thresholds](/es/usando-k6/thresholds/).
- [Groups](/es/usando-k6/tags-y-groups/#groups) y [Tags](/es/usando-k6/tags-y-groups/#tags).

<CodeGroup labels={[]}>

```bash
data_received..............: 148 MB 2.5 MB/s
data_sent..................: 1.0 MB 17 kB/s
http_req_blocked...........: avg=1.92ms   min=1µs      med=5µs      max=288.73ms p(90)=11µs     p(95)=17µs
http_req_connecting........: avg=1.01ms   min=0s       med=0s       max=166.44ms p(90)=0s       p(95)=0s
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
http_req_receiving.........: avg=5.53ms   min=49µs     med=2.11ms   max=1.01s    p(90)=9.25ms   p(95)=11.8ms
http_req_sending...........: avg=30.01µs  min=7µs      med=24µs     max=1.89ms   p(90)=48µs     p(95)=63µs
http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...........: avg=137.57ms min=111.44ms med=132.59ms max=589.4ms  p(90)=159.95ms p(95)=169.41ms
http_reqs..................: 13491  224.848869/s
iteration_duration.........: avg=445.48ms min=413.05ms med=436.36ms max=1.48s    p(90)=464.94ms p(95)=479.66ms
iterations.................: 13410  223.498876/s
vus........................: 100    min=100 max=100
vus_max....................: 100    min=100 max=100
```

</CodeGroup>

> Para saber más sobre las métricas que recolecta e informa k6, lea la [guía de las métricas.](/using-k6/metrics).

**Salida de las métricas de tendencia**

[Métricas de tendencia](/es/usando-k6/metricas/#tipos-de-metricas) recogen las estadísticas de tendencia (min/max/avg/percentiles) de una serie de valores. En stdout se imprimen de la siguiente manera:

<CodeGroup labels={[]}>

```bash
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
```

</CodeGroup>

Puede utilizar la opción [summary-trend-stats](/es/usando-k6/opciones/#summary-trend-stats) para cambiar las estadísticas reportadas a las métricas de tendencia.

<CodeGroup labels={[]}>

```bash
$ k6 run --summary-trend-stats="avg,p(99)" script.js
```

</CodeGroup>

## Plugins de salida

k6 puede enviar datos de resultados más granulares a diferentes salidas para integrar y visualizar las métricas de k6 en otras plataformas.

<CodeGroup labels={[]}>

```bash
$ k6 run --out statsd script.js
```

</CodeGroup>

La lista de plugins de salida son los siguientes:

<Glossary>

  - [Amazon CloudWatch](/es/visualizacion-de-resultados/amazon-cloudwatch)
  - [Cloud](/es/visualizacion-de-resultados/cloud)
  - [CSV](/es/visualizacion-de-resultados/csv)
  - [Datadog](/es/visualizacion-de-resultados/datadog)
  - [Grafana Cloud / Prometheus](/es/visualizacion-de-resultados/grafana-cloud)
  - [InfluxDB](/es/visualizacion-de-resultados/influxdb-+-grafana)
  - [JSON](/es/visualizacion-de-resultados/json)
  - [Netdata](/es/visualizacion-de-resultados/netdata)
  - [New Relic](/es/visualizacion-de-resultados/new-relic)
  - [Prometheus](/results-visualization/prometheus) 
  - [TimescaleDB](/results-visualization/timescaledb) 
  - [StatsD](/es/visualizacion-de-resultados/statsd) 

</Glossary>


### Salidas múltiples

Puede enviar simultáneamente métricas a varias salidas utilizando el indicador CLI `--out` varias veces, por ejemplo:

<CodeGroup labels={[]}>

```bash
$ k6 run \
    --out json=test.json \
    --out influxdb=http://localhost:8086/k6
```

</CodeGroup>

## Exportando el resumen

Además, el comando `k6 run` puede exportar el informe de resumen de fin de prueba a un archivo JSON que incluye los datos de todas las métricas, comprobaciones y umbrales de la prueba.

Esto es útil para obtener los resultados agregados de la prueba en un formato legible por la máquina, para la integración con paneles de control, alertas externas, entre otros.


<CodeGroup labels={[]}>

```bash
$ k6 run --summary-export=export.json script.js
```

</CodeGroup>

> Lea más información acerca del resumen, en la [documentación del plugin de JSON](/es/visualizacion-de-resultados/json/#exportar-los-datos-del-resumen)
