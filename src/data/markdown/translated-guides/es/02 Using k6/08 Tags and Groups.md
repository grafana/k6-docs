---
title: 'Tags y Groups'
excerpt: 'k6 proporciona Tags y Groups para ayudarle durante el análisis y visualizar, ordenar y  filtrar fácilmente los resultados de sus pruebas.'
---

El análisis de los resultados de la carga es un paso necesario para encontrar los problemas de rendimiento; una prueba de carga suele tener como objetivo un servicio que implica diferentes subsistemas y recursos, lo que hace difícil encontrar el/los problemas que degradan su rendimiento.
 
k6 proporciona dos APIs de scripting para ayudarle durante el análisis y visualizar, ordenar y  filtrar fácilmente los resultados de sus pruebas.
 
- Grupos (groups): organice su script de carga en torno a una lógica común.
- Etiquetas (tags): clasifique sus Checks, Thresholds, métricas personalizadas y solicitudes con etiquetas para un filtrado en profundidad.

## Groups

Los [grupos](/javascript-api/k6/group/) son opcionales, y permiten "agrupar" su script de carga. Los grupos pueden ser anidados, y permiten el estilo BDD de pruebas.

<CodeGroup labels={["groups.js"]} lineNumbers={[true]}>

```javascript
import { group } from 'k6';

export default function () {
  group('visit product listing page', function () {
    // ...
  });
  group('add several products to the shopping cart', function () {
    // ...
  });
  group('visit login page', function () {
    // ...
  });
  group('authenticate', function () {
    // ...
  });
  group('checkout process', function () {
    // ...
  });
}
```

</CodeGroup>

Groups do the following tasks internally:

- For each `group()` function, k6 emits a [group_duration metric](/es/usando-k6/metricas/) that contains the total time to execute the group function. 

- When a taggable resource: checks, requests, or custom metrics runs within a group, k6 will set the tag `group` with the current group name. Read more about it in [Tags](/es/usando-k6/tags-y-groups/#tags).

Both options, the `group_duration` metric and `group tagging`, could help you analyze and visualize better the results of more complex tests. Check out how they work in your [k6 result output](/integrations#result-store-and-visualization).

**Discouraged use cases**

Wrapping each individual request within a group might add boilerplate code and be unnecessary.

<CodeGroup labels={["group-antipattern.js"]} lineNumbers={[true]}>

```javascript
import { group, check } from 'k6';
import http from 'k6/http';

const id = 10;

// reconsider this type of code
group('get post', function () {
  http.get(`http://example.com/posts/${id}`);
});
group('list posts', function () {
  const res = http.get(`http://example.com/posts`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
});
```

</CodeGroup>

If your code looks like the example above, consider the following alternatives to write cleaner code:

- For dynamic URLs, use the [URL grouping feature](/es/usando-k6/peticiones-http/#agrupamiento-de-las-urls).
- To provide a meaningful name to your request, set the value of [tags.name](/es/usando-k6/peticiones-http/#tags-en-las-solicitudes-http).
- To reuse common logic or organize your code better, group logic in functions or create a [local Javascript module](/es/usando-k6/modulos/#usando-los-modulos-locales-con-un-docker) and import it into the test script.
- If you need to model advanced user patterns, check out [Scenarios](/es/usando-k6/escenarios/). 



## Tags

Las etiquetas (tags) son una forma sencilla y potente de clasificar las entidades de k6 para el posterior filtrado de resultados.
 
k6 proporciona dos tipos de etiquetas:
 
- Tags definidas por el usuario: las que usted ha añadido al escribir su script.
- Tags del sistema: etiquetas asignadas automáticamente por k6.
 

### System tags

Actualmente, k6 crea automáticamente las siguientes etiquetas por defecto:

| Tag           | Descripción                                                                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `proto`       | El nombre del protocolo utilizado (por ejemplo, HTTP/1.1)                                                                                                                                          |
| `subproto`    | El nombre del sub protocolo (utilizado por los websockets)                                                                                                                                         |
| `status`      | El código de estado HTTP (por ejemplo, 200, 404, etc.)                                                                                                                                    |
| `method`      | El método HTTP (por ejemplo, GET, POST, etc.) o el nombre del método RPC para gRPC                                                                                                   |
| `url`         | URL de la petición HTTP                                                                                                                                                              |
| `name`        | Nombre de la petición HTTP                                                                                                                     |
| `group`       | Ruta completa del grupo                                                                                                                                                    |
| `check`       | Nombre del check                                                                                                                                                |
| `error`       | Un string con un mensaje de error no HTTP (por ejemplo, un error de red o de DNS)                                                                                                                |
| `error_code`  | añadido en la versión v0.24.0 de k6, se trata de un número único para los distintos tipos de error; puede encontrar una lista de los códigos de error actuales en la página de Códigos de error |
| `tls_version` | La versión del TLS                                                                                                                                    |
| `scenario`    | Nombre del escenario donde se emitió la métrica                                                                                                                             |
| `service`     | Nombre del servicio RPC para gRPC                                                                                                                                                     |
| `expected_response`    | [responseCallback](/javascript-api/k6-http/setresponsecallback/) |

Si lo desea, puede deshabilitar algunas de las etiquetas anteriores utilizando la opción systemTags, sólo tenga en cuenta que algunos recolectores de datos (por ejemplo, la nube) pueden requerir que ciertas etiquetas estén presentes. Además, puedes habilitar algunas etiquetas adicionales del sistema, si las necesitas:


| Tag           | Description                                                                                                                       |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `vu`          | el ID del VU que ejecutó la solicitud |
| `iter`        | el número de iteración                                                                                                              |
| `ip`          | La dirección IP del servidor remoto                                                                                               |
| `ocsp_status` | el estado del Protocolo de Estado de los Certificados en Línea (OCSP) HTTPS |

### Etiquetas definidas por el usuario

Las etiquetas definidas por el usuario le permiten categorizar las entidades de k6 basándose en su lógica. Las siguientes entidades pueden ser etiquetadas:

- checks
- thresholds
- custom metrics
- requests

<CodeGroup labels={["tagging-example.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { check } from 'k6';

const myTrend = new Trend('my_trend');

export default function () {
  // Add tag to request metric data
  const res = http.get('http://httpbin.test.k6.io/', {
    tags: {
      my_tag: "I'm a tag",
    },
  });

  // Add tag to check
  check(res, { 'status is 200': (r) => r.status === 200 }, { my_tag: "I'm a tag" });

  // Add tag to custom metric
  myTrend.add(res.timings.connecting, { my_tag: "I'm a tag" });
}
```

</CodeGroup>

## Etiquetas a lo largo de la prueba

Además de adjuntar etiquetas a las solicitudes, comprobaciones y métricas personalizadas, puede establecer etiquetas para toda la prueba que se aplicarán a todas las métricas. Puede establecer las etiquetas en la CLI utilizando uno o más indicadores `--tag NAME=VALUE` o en el script:

<CodeGroup labels={["test-wide-tags.js"]} lineNumbers={[true]}>

```javascript
export const options = {
  tags: {
    name: 'value',
  },
};
```

</CodeGroup>

## Etiquetas en los resultados de salida


<CodeGroup labels={["output.js"]} lineNumbers={[true]}>

```json
{
  "type ": "Point ",
  "data ": {
    "time ": "2017-05-09T14:34:45.239531499+02:00 ",
    "value ": 459.865729,
    "tags ": {
      "group ": "::my group::json ",
      "method ": "GET ",
      "status ": "200 ",
      "url ": "https://httpbin.test.k6.io/get "
    }
  },
  "metric ": "http_req_duration "
}
```

```json
{
  "type ": "Point ",
  "data ": {
    "time ": "2017-05-09T14:34:45.625742514+02:00 ",
    "value ": 5,
    "tags ": null
  },
  "metric ": "vus "
}
```

</CodeGroup>

Lea más sobre la sintaxis de la [salida de resultados](/es/visualizacion-de-resultados/json/) de k6 para ver cómo las etiquetas afectan a la salida de los resultados de las pruebas.
