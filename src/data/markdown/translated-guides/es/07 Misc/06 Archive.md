---
title: 'Archivo Command'
excerpt: 'Un archivo en k6 es simplemente un archivo tar con todos los archivos necesarios para ejecutar una prueba k6.'
---

## ¿Qué es un archivo?

Cuando la complejidad de una prueba en k6 va más allá de un solo archivo JS (Java Script), rápidamente se vuelve engorroso encontrar y agrupar todas las dependencias (JS, archivos de datos [open()](/javascript-api/init-context/open-filepath-mode)'ed, certificados de clientes TLS, etc.). Los archivos en k6 son una forma nativa de agrupar y distribuir, o compartir, una prueba.

Un archivo en k6 es simplemente un archivo [tar](https://en.wikipedia.org/wiki/Tar_%28computing%29) con todos los archivos necesarios para ejecutar una prueba k6.

## Cómo crear y ejecutar un archivo

Supongamos que normalmente ejecutamos una prueba utilizando:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run script.js
```

</CodeGroup>

Ahora bien, si sustituye `k6 run` por `k6 archive`, k6 ejecutará la fase de [inicio del código](/using-k6/test-life-cycle) para determinar qué archivos JS se están importando y qué archivos de datos se están [open()](/javascript-api/init-context/open-filepath-mode) y agrupa todos los archivos en un archivo tar:


<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 archive script.js
```

</CodeGroup>

Esto crea un archivo tar en el disco llamado `archive.tar` (puede cambiar el nombre usando el comando `-O filename.tar`). También es fácil ejecutar un archivo, ya que `k6 run` es compatible con los archivos comprimidos que puede ejecutar:


> ### ⚠️ Anulación de opciones
>
> Como siempre, puedes anular las opciones utilizando banderas de la CLI o variables de entorno al ejecutar un archivo.

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run archive.tar
```

</CodeGroup>

## Casos de uso

Los archivos tienen una gran variedad de usos, pero todos comparten la necesidad de agrupar los archivos de una prueba en un único archivo para facilitar su distribución.

### Compartir una prueba

Al agrupar una prueba en un archivo, es fácil compartir la prueba con tus compañeros de equipo, simplemente almacenando o enviando un único archivo tar. Como vimos en la sección anterior, sus compañeros de equipo pueden ejecutar el archivo ejecutando `k6 run archive.tar`.

### Preparación de pruebas para CI

Si tienes un complejo CI pipeline y tus pruebas de carga están separadas del código de tu aplicación, podrías almacenar archivos k6 como artefactos de construcción cada vez que el código fuente de la prueba de carga se modifique, y luego tirar de esos archivos k6 desde el almacenamiento de artefactos para la ejecución de la prueba cuando sea necesario.

### Ejecución en k6 Cloud

k6 ofrece un servicio comercial para ejecutar pruebas de carga a gran escala y distribuidas geográficamente en una infraestructura gestionada en la nube. Las pruebas ejecutadas en k6 Cloud se desencadenan desde la línea de comandos de k6 a través del comando `k6 cloud script.js` (similar a `k6 run`) que desencadenará una creación implícita de un archivo k6 que se carga y distribuye a los generadores de k6 Cloud para su ejecución.

### Ejecución en clúster  (_futuro_)

En el futuro (véase nuestra [hoja de ruta](https://github.com/loadimpact/k6/wiki/Roadmap)) k6 soportará un modo de ejecución en clúster que permitirá la ejecución de pruebas en más de un nodo. Este modo de ejecución también es probable que haga uso de la funcionalidad de archivo para distribuir los archivos de prueba a todos los nodos participantes.

## Contenido de un fichero de archivo

Un archivo contiene la fuente original del código JS, cualquier archivo de datos open()'ed, certificados de cliente SSL/TLS así como un metadata.json con todas las opciones (una cascada de las opciones establecidas en el CLI, a través de variables de entorno y opciones in-script (`export let options = {...})`).

Vamos a crear un archivo de la siguiente prueba de ejemplo. Aquí está la disposición en el sistema de archivos de los archivos:

<CodeGroup labels={["Sample test structure"]} lineNumbers={[true]}>

```bash
/home/johndoe/tests/api-test $ tree
.
├── utils
|   └-- common.js
├── endpoints
|   ├── login.js
|   └-- search.js
├── node_modules
|   └-- somelib
|       └-- lib.js
├── data
|   └-- users.json
└-- script.js
```

</CodeGroup>

Ahora, si el directorio de trabajo actual es `/home/johndoe/tests/api-test/` y ejecutamos `k6 archive script.js` obtendremos un archivo tar llamado `archive.tar` (puedes cambiar el nombre del archivo usando `-O filename.tar`). El contenido del fichero de archivo tendría un aspecto similar al siguiente:

<CodeGroup labels={["Structure of archive.tar"]} lineNumbers={[true]}>

```bash
├-- data
├-- files
|   └-- home
|       └-- nobody <-- the username has been anonymized (see section further down)
|           └-- tests
|               └-- api-test
|                   └-- data
|                       └-- users.json
├-- metadata.json
└-- scripts
    └-- home
        └-- nobody <-- the username has been anonymized (see section further down)
            └-- tests
                └-- api-test
                    ├-- script.js
                    ├-- utils
                    |   └-- common.js
                    ├-- endpoints
                    |   ├-- login.js
                    |   └-- search.js
                    └-- node_modules
                        └-- somelib
                            └-- lib.js
```

</CodeGroup>

Desglosando la estructura del archivo obtenemos

`data` contiene el código fuente del archivo JS principal (script.js en este ejemplo).

`files` contiene el árbol de directorios original completo de todos los archivos de datos open()'ed.

`metadata.json` Las opciones "por defecto" resueltas para esta prueba basadas en banderas CLI, variables de entorno y opciones in-script.

`scripts` contiene el árbol de directorios original completo de todas las dependencias JS importadas.

<CodeGroup labels={["metadata.json"]} lineNumbers={[true]} heightTogglers={[true]}>

```json
{
  "type": "js",
  "options": {
    "paused": null,
    "vus": null,
    "vusMax": null,
    "duration": null,
    "iterations": null,
    "stages": null,
    "setupTimeout": null,
    "teardownTimeout": null,
    "rps": null,
    "maxRedirects": null,
    "userAgent": null,
    "batch": null,
    "batchPerHost": null,
    "httpDebug": null,
    "insecureSkipTLSVerify": null,
    "tlsCipherSuites": null,
    "tlsVersion": {
      "min": "",
      "max": ""
    },
    "tlsAuth": null,
    "throw": null,
    "thresholds": null,
    "blacklistIPs": null,
    "hosts": null,
    "noConnectionReuse": null,
    "ext": null,
    "summaryTrendStats": null,
    "systemTags": [
      "url",
      "name",
      "check",
      "error",
      "tls_version",
      "method",
      "subproto",
      "status",
      "group",
      "proto"
    ],
    "tags": null
  },
  "filename": "/home/johndoe/tests/api-test/script.js",
  "pwd": "/home/johndoe/tests/api-test/",
  "env": {}
}
```

</CodeGroup>

## Lo que no contiene un fichero de archive

Intentamos ser cautelosos con lo que incluimos en un fichero de archivo. Algunas cosas que hacemos con ese fin:

- Anonimizar el nombre de usuario que se encuentra en cualquier ruta de acceso a las dependencias de archivos JS y de datos.
- No incluimos variables de entorno del sistema en el archivo.
