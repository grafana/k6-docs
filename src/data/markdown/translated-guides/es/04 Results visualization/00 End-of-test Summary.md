---
title: 'Resumen del final de la prueba'
excerpt: 'Por defecto, al final de cada prueba local, k6 imprime un informe de resumen en stdout que contiene una visión general de los resultados de la prueba.'
---

Por defecto, al final de cada prueba local, k6 imprime un informe de resumen en stdout que contiene una visión general de los resultados de la prueba. Incluye los valores agregados de todas las métricas y submétricas [incorporadas](/es/usando-k6/metricas/#metricas-incorporadas) y [propias](/es/usando-k6/metricas/#metricas-personalizadas), [thresholds](/es/usando-k6/thresholds/), [groups](/es/usando-k6/tags-y-groups/#groups), y [checks](/es/usando-k6/checks/). Puede tener un aspecto similar al siguiente:


<CodeGroup labels={[]}>

```
     ✓ http2 is used
     ✓ status is 200
     ✓ content is present

     █ Static Assets

       ✓ status is 200
       ✓ reused connection

   ✓ check_failure_rate.........: 0.00%   ✓ 0     ✗ 6708
     checks.....................: 100.00% ✓ 16770 ✗ 0
     data_received..............: 94 MB   308 kB/s
     data_sent..................: 1.6 MB  5.2 kB/s
     group_duration.............: min=134.4ms  avg=177.67ms med=142.75ms p(95)=278.26ms p(99)=353.49ms p(99.99)=983.84ms max=1.01s
     http_req_blocked...........: min=947ns    avg=1.66ms   med=2.37µs   p(95)=4.65µs   p(99)=38.98µs  p(99.99)=620.34ms max=811.88ms
     http_req_connecting........: min=0s       avg=536.83µs med=0s       p(95)=0s       p(99)=0s       p(99.99)=208.81ms max=232.16ms
   ✓ http_req_duration..........: min=131.44ms avg=150.63ms med=138.13ms p(95)=269.81ms p(99)=283.83ms p(99.99)=982.76ms max=1.01s
     ✗ { staticAsset:yes }......: min=131.44ms avg=153.09ms med=138.2ms  p(95)=271.34ms p(99)=284.22ms p(99.99)=1.01s    max=1.01s
     http_req_receiving.........: min=33.36µs  avg=2.66ms   med=180.36µs p(95)=2.4ms    p(99)=128.79ms p(99.99)=205.16ms max=205.45ms
     http_req_sending...........: min=6.09µs   avg=44.92µs  med=35.77µs  p(95)=98.26µs  p(99)=148.49µs p(99.99)=1.09ms   max=5.53ms
     http_req_tls_handshaking...: min=0s       avg=1.12ms   med=0s       p(95)=0s       p(99)=0s       p(99.99)=447.46ms max=614.35ms
     http_req_waiting...........: min=131.3ms  avg=147.92ms med=137.57ms p(95)=267.49ms p(99)=282.23ms p(99.99)=982.55ms max=1.01s
     http_reqs..................: 13416   44.111343/s
     iteration_duration.........: min=2.28s    avg=3.83s    med=3.82s    p(95)=5.2s     p(99)=5.36s    p(99.99)=6.1s     max=6.18s
     iterations.................: 3354    11.027836/s
     vus........................: 1       min=1   max=50
     vus_max....................: 50      min=50  max=50
```

</CodeGroup>

Algunas opciones pueden afectar al comportamiento de este informe:

- La opción [`--summary-trend-stats` option](/es/usando-k6/opciones/#summary-trend-stats) le permite definir qué estadísticas de las métricas de tendencia se calcularán y mostrarán.
- La opción [`--summary-time-unit` option](/es/usando-k6/opciones/#summary-time-unit) obliga a k6 a utilizar una unidad de tiempo fija para todos los valores de tiempo en el resumen.
- La opción [`no-summary`](/es/usando-k6/opciones/#no-summary) desactiva completamente la generación de informes. Disponible desde la versión de k6  v0.30.0 que incluye `--summary-export` y `handleSummary()`.


## Exportación de un resumen a un archivo JSON

Desde la versión 0.26.0 k6 se tiene [`--summary-export=path/to/file.json` option](/es/usando-k6/opciones/#summary-export) para las ejecuciones de pruebas locales. Esta opción exporta algunos de los datos del informe de resumen a un formato de archivo JSON.

Desafortunadamente, el formato exportado es algo limitado y tiene algunas peculiaridades confusas. Por ejemplo, los grupos y las comprobaciones no están ordenados. Los valores de los umbrales también son algo poco intuitivos: indican si se ha superado el umbral. Así, true es el valor de umbral "malo", es decir, cuando el umbral ha fallado, y false es el valor "bueno"...

No podemos cambiar el formato de datos `--summary-export` porque habría roto la compatibilidad anterior con características de la que los usuarios dependían en CI, así que sigue funcionando como antes. Sin embargo, en la versión de k6 v0.30.0, se introdujo `handleSummary()`  una nueva y mejor manera de hacer exportaciones JSON de los datos de resumen, así como cualquier otro formato (CSV, XML (JUnit/xUnit/etc.), HTML, TXT, etc.) que pueda ser necesario. Recomendamos encarecidamente a todos que utilicen `handleSummary()` en lugar de `--summary-export`. Para más detalles, consulte la siguiente sección de este documento…


## handleSummary() callback

¡A partir de la versión v0.30.0, los usuarios pueden ahora personalizar completamente el informe de resumen de fin de prueba!

Ahora puede exportar una función llamada `handleSummary()` y k6 la llamará al final de la ejecución de la prueba, incluso después de [`teardown()`](/using-k6/test-life-cycle#setup-and-teardown-stages). `handleSummary()` será llamada con un objeto JS que contiene la misma información que se utiliza para generar el resumen de fin de prueba y `--summary-export`, y permite a los usuarios personalizar completamente el aspecto del resumen de fin de prueba.

Además de personalizar el resumen CLI de fin de prueba (si se exporta `handleSummary()`, k6 no imprimirá el predeterminado), también puede transformar los datos del resumen a varios formatos legibles por la máquina o por el ser humano y guardarlos en archivos. Esto permite la creación de funciones de ayuda JS que generan archivos JSON, CSV, XML (JUnit/xUnit/etc.), HTML, etc. a partir de los datos del resumen.

¡También puede enviar los informes generados a un servidor remoto haciendo una petición HTTP con ellos (o usando cualquiera de los otros protocolos que k6 ya soporta)! He aquí un ejemplo sencillo:


<CodeGroup labels={["handleSummary() demo"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/samples/thresholds_readme_example.js';
export default k6example; // use some predefined example to generate some data
export const options = { vus: 5, iterations: 10 };

// These are still very much WIP and untested, but you can use them as is or write your own!
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  // Send the results to some remote server or trigger a hook
  const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
  if (resp.status != 200) {
    console.error('Could not send summary, got status ' + resp.status);
  }

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    '../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
    'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
    // And any other JS transformation of the data you can think of,
    // you can write your own JS helpers to transform the summary data however you like!
  };
}
```

</CodeGroup>

k6 espera que `handleSummary()` retorne un mapa como el siguiente `{key1: value1, key2: value2, ...}`. Los valores pueden ser un `string` o un `ArrayBuffer`, y representan el contenido de forma resumida del informe generado. Las claves deben ser cadenas y determinan dónde se mostrará o guardará el contenido:

- `stdout` para la salida estándar
- `stderr` para el error estándar,
- o cualquier ruta relativa o absoluta a un archivo del sistema (que se sobrescribirá)

El formato del parámetro de datos es similar pero no idéntico al formato de datos de `--summary-export`. El formato de `--summary-export` se mantiene sin cambios, por compatibilidad con versiones anteriores, pero el formato de datos para esta nueva función de k6 se ha hecho más extensible y se han corregido algunas de las ambigüedades y problemas del formato anterior.

Para tener una mejor idea de cómo se verían los datos en una prueba específica, sólo agrega return `{'raw-data.json': JSON.stringify(data)}`; en su función handleSummary() e inspeccione el archivo `raw-data.json` resultante. Este es un ejemplo muy abreviado de cómo podría ser:

<CodeGroup labels={["data passed to handleSummary()"]} lineNumbers={[true]}>

```json
{
    "root_group": {
        "path": "",
        "groups": [
            // Sub-groups of the root group...
        ],
        "checks": [
            {
                "passes": 10,
                "fails": 0,
                "name": "check name",
                "path": "::check name"
            },
            // More checks...
        ],
        "name": ""
    },
    "options": {
        // Some of the global options of the k6 test run,
        // Currently only summaryTimeUnit and summaryTrendStats
    },
    "metrics": {
        // A map with metric and sub-metric names as the keys and objects with
        // details for the metric. These objects contain the following keys:
        //  - type: describes the metric type, e.g. counter, rate, gauge, trend
        //  - contains: what is the type of data, e.g. time, default, data
        //  - values: the specific metric values, depends on the metric type
        //  - thresholds: any thresholds defined for the metric or sub-metric
        //
        "http_reqs": {
            "type": "counter",
            "contains": "default",
            "values": {
                "count": 40,
                "rate": 19.768856959496336
            }
        },
        "vus": {
            "type": "gauge",
            "contains": "default",
            "values": {
                "value": 1,
                "min": 1,
                "max": 5
            }
        },
        "http_req_duration": {
            "type": "trend",
            "contains": "time",
            "values": {
                // actual keys depend depend on summaryTrendStats
                "min": 135.092841,
                "avg": 268.31137452500013,
                "max": 846.198634,
                "p(99.99)": 846.1969478817999,
                // ...
            },
            "thresholds": {
                "p(95)<500": {
                    "ok": false
                }
            }
        },
        "http_req_duration{staticAsset:yes}": { // sub-metric from threshold
            "contains": "time",
            "values": {
                // actual keys depend on summaryTrendStats
                "min": 135.092841,
                "avg": 283.67766343333335,
                "max": 846.198634,
                "p(99.99)": 846.1973802197999,
                // ...
            },
            "thresholds": {
                "p(99)<250": {
                    "ok": false
                }
            },
            "type": "trend"
        },
        // ...
    }
}
```

</CodeGroup>

Esta característica sólo está disponible para las pruebas de ejecución locales de k6 hasta el momento, aunque planeamos soportar las pruebas en k6 Cloud eventualmente. Y, como se menciona en el fragmento anterior, las funciones de ayuda JS que transforman el resumen en varios formatos están lejos de ser definitivas, así que mantén un ojo en jslib.k6.io para las actualizaciones. O, mejor aún, envía PRs con mejoras y más transformaciones en https://github.com/k6io/jslib.k6.io
