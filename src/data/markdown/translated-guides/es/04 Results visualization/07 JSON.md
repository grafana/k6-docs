---
title: 'JSON'
excerpt: 'También puede hacer que k6 emita estadísticas detalladas en formato JSON utilizando la opción -o'
---

También puede hacer que k6 emita estadísticas detalladas en formato JSON utilizando la opción `--out`/`-o` con `k6 run`:

<CodeGroup labels={["CLI", "Docker"]}>

```bash
$ k6 run --out json=my_test_result.json script.js
```

```bash
$ docker run -it --rm \
    -v <scriptdir>:/scripts \
    -v <outputdir>:/jsonoutput \
    grafana/k6 run --out json=/jsonoutput/my_test_result.json /scripts/script.js

# El usuario de docker debe tener permiso de escritura en <outputdir>!
```

</CodeGroup>

O si quieres obtener el resultado comprimido, puede ejecutar el siguiente comando:

<CodeGroup labels={["CLI", "Docker"]}>

```bash
$ k6 run --out json=my_test_result.gz script.js
```

```bash
$ docker run -it --rm \
    -v <scriptdir>:/scripts \
    -v <outputdir>:/jsonoutput \
    grafana/k6 run --out json=/jsonoutput/my_test_result.gz /scripts/script.js

# El usuario de docker debe tener permiso de escritura en <outputdir>!
```

</CodeGroup>


## Formato JSON

El archivo JSON contendrá líneas como las que se describen a continuación:

<CodeGroup labels={["Output"]}>

```json
{"type":"Metric","data":{"type":"gauge","contains":"default","tainted":null,"thresholds":[],"submetrics":null},"metric":"vus"}
{"type":"Point","data":{"time":"2017-05-09T14:34:45.625742514+02:00","value":5,"tags":null},"metric":"vus"}
{"type":"Metric","data":{"type":"trend","contains":"time","tainted":null,"thresholds":["avg<1000"],"submetrics":null},"metric":"http_req_duration"}
{"type":"Point","data":{"time":"2017-05-09T14:34:45.239531499+02:00","value":459.865729,"tags":{"group":"::my group::json","method":"GET","status":"200","url":"https://httpbin.test.k6.io/get"}},"metric":"http_req_duration"}
```

</CodeGroup>

Cada línea contendrá información sobre una métrica o registrará una serie de datos (muestra) para una métrica. Las líneas constan de tres elementos:

- type - puede tener los valores Metric o Point donde Metric significa que en la línea se está declarando una métrica, y Point es un punto de datos real (muestra) para una métrica.
- data - es un diccionario que contiene una serie de elementos, que varían según el "type".
- metric - el nombre de la métrica.


### Métricas

Esta línea contiene información sobre la naturaleza de una métrica. Aquí, "data" contendrá la siguiente información:

- "type" - el tipo de métrica: ("gauge", "rate", "counter" o "trend")
- "contains" - información sobre el tipo de datos recogidos (puede ser, por ejemplo, "time" para las métricas de tiempo)
- "tainted" - ¿ha hecho esta métrica que falle un umbral?
- "threshold" - ¿Hay algún umbral asociado a esta métrica?
- "submetrics" - cualquier métrica derivada, creada como resultado de la adición de un umbral mediante etiquetas.


### Point

Esta línea contiene muestras de datos reales. Aquí, "data" contendrá estos campos:

- "time" - marca el tiempo de cuando se recogió la muestra
- "value" - la muestra de datos real; los valores de tiempo están en milisegundos
- "tags" - diccionario con pares de nombre de la etiqueta y valor de la etiqueta que pueden utilizarse al filtrar los datos de los resultados


## Procesando la salida JSON


Recomendamos utilizar [jq][jq_url] para procesar la salida del JSON de k6. [jq][jq_url] es un procesador JSON de línea de comandos ligero y flexible.
Puede crear rápidamente [filters][jq_filters_url] para devolver una métrica particular del archivo JSON:


<CodeGroup labels={["Filters"]}>

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200")' myscript-output.json
```

</CodeGroup>

Y calcular un valor agregado de cualquier métrica:

<CodeGroup labels={["Average"]}>

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s 'add/length'
```

</CodeGroup>

<CodeGroup labels={["Min"]}>

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s min
```

</CodeGroup>

<CodeGroup labels={["Max"]}>

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s max
```

</CodeGroup>


Para casos más avanzados, consulte el [Manual de jq][jq_manual_url]

[jq_url]: https://stedolan.github.io/jq/ 'jq_url'
[jq_filters_url]: https://stedolan.github.io/jq/manual/#Basicfilters 'jq_filters_url'
[jq_manual_url]: https://stedolan.github.io/jq/manual/ 'jq_manual_url'

## Exportar los datos del resumen

Si no está interesado en cada una de las mediciones de las métricas individuales y, en cambio, desea ver sólo los datos agregados, exportar los datos del resumen de fin de la prueba a un archivo JSON puede ser una mejor opción que utilizar la salida JSON descrita en este documento. Para más detalles, consulte `--export-summary` y `handleSummary()` en la documentación del resumen de fin de la prueba.

<CodeGroup labels={[ "stdout", "Other output"]}>

```bash
$ k6 run --summary-export=export.json script.js
```

```bash
# you can use the `summary-export` option with other output (Prometheus, Datadog, Cloud, InfluxDB, JSON...)
$ k6 run --summary-export=export.json --out datadog script.js
```

</CodeGroup>

El formato del fichero sería de la siguiente forma:

<CodeGroup labels={[ "export.json" ]} heightTogglers={[true]}>

```json
{
  "metrics": {
    "checks": {
      "fails": 0,
      "passes": 434,
      "value": 0
    },
    "data_received": {
      "count": 4267088,
      "rate": 213353.42114517145
    },
    "data_sent": {
      "count": 33726,
      "rate": 1686.2922633754104
    },
    "http_req_blocked": {
      "avg": 2.2303510806451645,
      "max": 466.009823,
      "med": 0.006873000000000001,
      "min": 0.001265,
      "p(90)": 0.0093969,
      "p(95)": 0.01104339999999999
    },
    "http_req_connecting": {
      "avg": 1.4719108986175116,
      "max": 176.017402,
      "med": 0,
      "min": 0,
      "p(90)": 0,
      "p(95)": 0
    },
    "http_req_duration": {
      "avg": 146.13434929493093,
      "max": 663.812323,
      "med": 115.237707,
      "min": 104.336176,
      "p(90)": 204.6849077,
      "p(95)": 205.27533795
    },
    "http_req_receiving": {
      "avg": 0.32699811981566856,
      "max": 5.86652,
      "med": 0.135682,
      "min": 0.026588,
      "p(90)": 1.4118543,
      "p(95)": 1.6629313999999984
    },
    "http_req_sending": {
      "avg": 0.031275672811059876,
      "max": 0.149365,
      "med": 0.028853,
      "min": 0.006069,
      "p(90)": 0.041769099999999997,
      "p(95)": 0.05106769999999998
    },
    "http_req_tls_handshaking": {
      "avg": 0,
      "max": 0,
      "med": 0,
      "min": 0,
      "p(90)": 0,
      "p(95)": 0
    },
    "http_req_waiting": {
      "avg": 145.77607550230408,
      "max": 663.551133,
      "med": 114.90324000000001,
      "min": 103.389659,
      "p(90)": 204.4926965,
      "p(95)": 205.02902265
    },
    "http_reqs": {
      "count": 434,
      "rate": 21.699900441941768
    },
    "iteration_duration": {
      "avg": 148.59040099078345,
      "max": 671.970894,
      "med": 115.69334950000001,
      "min": 104.558313,
      "p(90)": 205.0391277,
      "p(95)": 209.87447475000002
    },
    "iterations": {
      "count": 434,
      "rate": 21.699900441941768
    },
    "vus": {
      "max": 5,
      "min": 1,
      "value": 1
    },
    "vus_max": {
      "max": 5,
      "min": 5,
      "value": 5
    }
  },
  "root_group": {
    "name": "",
    "path": "",
    "id": "d41d8cd98f00b204e9800998ecf8427e",
    "groups": {},
    "checks": {
      "status is 200": {
        "name": "status is 200",
        "path": "::status is 200",
        "id": "6210a8cd14cd70477eba5c5e4cb3fb5f",
        "passes": 435,
        "fails": 0
      }
    }
  }
}
```

</CodeGroup>

## Véase también

- [Métricas](/es/usando-k6/metricas/)
