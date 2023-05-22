---
title: 'Peticiones HTTP'
excerpt: 'Utilice el módulo http para realizar todo tipo de peticiones HTTP en sus pruebas de carga'
---

## Haciendo peticiones HTTP

Al crear una nueva prueba de carga, lo primero que se suele hacer es definir las peticiones HTTP que se utilizarán para probar el sistema. Un ejemplo sencillo que sólo realiza una petición de tipo GET es el siguiente:

<CodeGroup labels={["http_get.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  http.get('http://test.k6.io');
}
```

</CodeGroup>

Una solicitud algo más compleja podría ser por ejemplo, una solicitud POST para autenticarse en un sitio web o servicio:

<CodeGroup labels={["http_post.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
```

</CodeGroup>

## Available methods

Utilice el [módulo http](/javascript-api/k6-http) para realizar todo tipo de peticiones HTTP en sus pruebas de carga.

| Nombre                                                                | Descripción                                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [batch()](/javascript-api/k6-http/batch)                   | Emitir múltiples peticiones HTTP en paralelo (como suelen hacer, por ejemplo, los navegadores).|
| [del()](/javascript-api/k6-http/del)                | Emitir una solicitud HTTP DELETE.                                             |
| [get()](/javascript-api/k6-http/get)                     | Emitir una solicitud HTTP GET.                                                |
| [options()](/javascript-api/k6-http/options)        | Emitir una solicitud HTTP OPTIONS.                                            |
| [patch()](/javascript-api/k6-http/patch)            | Emitir una solicitud HTTP PATCH.                                              |
| [post()](/javascript-api/k6-http/post)              | Emitir una solicitud HTTP POST.                                               |
| [put()](/javascript-api/k6-http/put)                | Emitir una solicitud HTTP PUT.                                                |
| [request()](/javascript-api/k6-http/request) | Emitir una solicitud HTTP.                                           |

## Tags en las solicitudes HTTP 

k6 aplicará automáticamente [etiquetas (tags)](/es/usando-k6/tags-y-groups/#system-tags) a sus peticiones HTTP. Estas etiquetas le permiten filtrar sus resultados durante el análisis.

| Nombre   | Descripción                                |
| ------ | ------------------------------------------ |
| expected_response <sup>(≥ v0.31)</sup>  | Por defecto, cuando el valor de  `response.status` está entre 200 y 399, el valor es `true`. Cambia el compartamiento por defecto mediante [setResponseCallback](/javascript-api/k6-http/setresponsecallback).                  |
| group   | Cuando una petición se ejecutan dentro de un [group](/javascript-api/k6/group), el valor es el nombre del grupo. Por defecto está vacío.    |
| name   | Por defecto será la URL solicitada                  |
| method | Métodos de la solicitud (GET,POST,PUT, entre otros) |
| scenario   | Cuando una petición se ejecutan dentro de un [scenario](/es/usando-k6/escenarios/), el valor es el nombre del grupo. Por defecto está vacío. |
| status | Estatus de la respuesta                            |
| url    | URL de la solicitud                  |

A continuación puede se ver cómo se registra un valor de la métrica HTTP (la duración de una solicitud HTTP), en formato JSON, incluyendo las diversas etiquetas mencionadas anteriormente:

<CodeGroup labels={["data_point.json"]} lineNumbers={[true]}>

```json
{
  "type": "Point",
  "metric": "http_req_duration",
  "data": {
    "time": "2017-06-02T23:10:29.52444541+02:00",
    "value": 586.831127,
    "tags": {
      "expected_response": "true",
      "group": "",
      "method": "GET",
      "name": "http://test.k6.io",
      "scenario": "",
      "status": "200",
      "url": "http://test.k6.io"
    }
  }
}
```

</CodeGroup>

## Agrupamiento de las URLs

Por defecto, las peticiones informan el nombre de la etiqueta con el valor de la URL de la petición. Para las URLs que contienen partes dinámicas, esto puede no ser deseable ya que puede introducir un gran número de URLs únicas en el flujo de métricas. El siguiente código muestra una situación en la que se accede a 100 URLs diferentes pero se desea que todas ellas se reporten usando una sola métrica:

<CodeGroup labels={["grouping.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

for (let id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`);
}

// tags.name=\"http://example.com/posts/1\",
// tags.name=\"http://example.com/posts/2\",
```

</CodeGroup>

Puede agregar datos de URLs dinámicas estableciendo explícitamente una etiqueta de nombre:

<CodeGroup labels={["explicit_tag.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

for (let id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`, {
    tags: { name: 'PostsItemURL' },
  });
}

// tags.name=\"PostsItemURL\",
// tags.name=\"PostsItemURL\",
```

</CodeGroup>

Lo que produciría una salida JSON como la siguiente:

<CodeGroup labels={[ ]} lineNumbers={[true]}>

```json
{
    "type":"Point",
    "metric":"http_req_duration",
    "data": {
        "time":"2017-06-02T23:10:29.52444541+02:00",
        "value":586.831127,
        "tags": {
            "method":"GET",
            "name":"PostsItemURL",
            "status":"200",
            "url":"http://example.com/1"
        }
    }
}
// and
{
    "type":"Point",
    "metric":"http_req_duration",
    "data": {
        "time":"2017-06-02T23:10:29.58582529+02:00",
        "value":580.839273,
        "tags": {
            "method":"GET",
            "name":"PostsItemURL",
            "status":"200",
            "url":"http://example.com/2"
        }
    }
}
```

</CodeGroup>


Observe cómo el `name` es el mismo para las dos muestras de datos relacionadas con dos URLs diferentes. Si filtramos los resultados por el nombre de la etiqueta (`name: PostsItemURL`), obtendremos un conjunto de resultados que incluye todos los puntos de datos de las 100 URL diferentes.

Además, también puede utilizar el “wrapper”  `http.url` para establecer el nombre de la etiqueta con un valor determinado:

<CodeGroup labels={[ ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

for (let id = 1; id <= 100; id++) {
  http.get(http.url`http://example.com/posts/${id}`);
}

// tags.name="http://example.com/posts/${}",
// tags.name="http://example.com/posts/${}",
```

</CodeGroup>