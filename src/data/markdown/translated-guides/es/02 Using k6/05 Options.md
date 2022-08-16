---
title: 'Opciones'
excerpt: 'Las opciones le permiten configurar cómo se comportará k6 durante la ejecución de la prueba.'
---

Las opciones le permiten configurar cómo se comportará k6 durante la ejecución de la prueba.

| Option                                                    | Description                                                                         |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Address](#address)                                       | Dirección del servidor para la REST API                                                           |
| [Batch](#batch)                                           | Número máximo de conexiones simultáneas de una llamada http.batch() |
| [Batch per host](#batch-per-host)                         | Número máximo de conexiones simultáneas de una llamada http.batch() para un host          |
| [Blacklist IPs](#blacklist-ips)                           | Blacklist de rangos de IP para no ser llamados                                               |
| [Block hostnames](#block-hostnames)                       | Bloquear cualquier petición a nombres de host específicos                                                   |
| [Compatibility Mode](#compatibility-mode)                 | Soporta la ejecución de scripts con diferentes modos de ECMAScript                             |
| [Config](#config)                                         | Especificar el archivo de configuración en formato JSON para leer los valores de las opciones                   |
| [Console Output](#console-output) | Redirecciona logs de la consola a un fichero |
| [Discard Response Bodies](#discard-response-bodies)       | Especificar si los cuerpos de respuesta deben ser descartados                                      |
| [DNS](#dns)                                               | Configurar el comportamiento de la resolución DNS                                                   |
| [Duration](#duration)                                     | Una cadena que especifica la duración total de la ejecución de una prueba                 |
| [Execution Segment](#execution-segment)                   | Limitar la ejecución a un segmento de la prueba total                                      |
| [Exit On Running](#exit-on-running) | Acaba cuando el test finaliza el estado ejecutándose |
| [Extension Options](#extension-options)                   | Un objeto utilizado para establecer las opciones de configuración de los recolectores de terceros              |
| [Hosts](#hosts)                                           | Un objeto con anulaciones de la resolución DNS                                          |
| [HTTP Debug](#http-debug)                                 | Logear todas las peticiones y respuestas HTTP                                                 |
| [Include System Env Vars](#include-system-env-vars)       | Pasar las variables de entorno del sistema real al tiempo de ejecución                           |
| [Insecure Skip TLS Verify](#insecure-skip-tls-verify)     | Un booleano que especifica si se deben ignorar las verificaciones TLS para las conexiones VU     |
| [Iterations](#iterations)                                 | Un número que especifica un número fijo de iteraciones a ejecutar el script           |
| [Linger](#linger)                                         | Un booleano que especifica si k6 debe permanecer tras la finalización de la ejecución de la prueba      |
| [Local IPs](#local-ips)                                   | Una lista de IPs locales, rangos de IPs y CIDRs desde los que las VUs harán peticiones                 |
| [Log Output](#log-output)                                 | Configuración sobre dónde deben enviarse los registros de k6                               |
| [LogFormat](#logformat)                                   | Especificar el formato de la salida de los logs                                                |
| [Max Redirects](#max-redirects)                           | El número máximo de redirecciones HTTP que seguirá k6                            |
| [Minimum Iteration Duration](#minimum-iteration-duration) | Especificar la duración mínima de cada ejecución                             |
| [No Color](#no-color) | Especifica si el color de la salida en el terminal está deshabilitado |
| [No Connection Reuse](#no-connection-reuse)               | Un booleano que especifica si k6 debe desactivar las conexiones keep-alive               |
| [No Cookies Reset](#no-cookies-reset)                     | Esto desactiva el restablecimiento del tarro de galletas después de cada iteración de la VU                      |
| [No Summary](#no-summary)                                 | Desactiva el [resumen de fin de test](/es/visualizacion-de-resultados/resumen-del-final-de-la-prueba/)                  |
| [No Setup](#no-setup)                                     | Un booleano indicando si la función `setup()` está deshabilitada                       |
| [No Teardown](#no-teardown)                               | Un booleano indicando si la función `teardown()` está deshabilitada                    |
| [No Thresholds](#no-thresholds)                           | Desactiva la ejecución de Thresholds                                                        |
| [No Usage Report](#no-usage-report)                       | Un booleano que especifica si k6 debe enviar un informe de uso                          |
| [No VU Connection Reuse](#no-vu-connection-reuse)         | Un booleano que especifica si k6 debe reutilizar las conexiones TCP                        |
| [Paused](#paused)                                         | Un booleano que especifica si la prueba debe comenzar en estado de pausa                |
| [Quiet](#quiet)                                           | Un booleano que especifica si mostrar la barra de progreso del test en el terminal       |
| [Results Output](#results-output)                         | Especifica la salida de resultados                                                          |
| [RPS](#rps)                                               | El número máximo de peticiones a realizar por segundo                                   |
| [Scenarios](#scenarios)                                   | Definir escenarios de ejecución avanzados                                                 |
| [Setup Timeout](#setup-timeout)                           | Especificar el tiempo de ejecución de la función `setup()` antes de su finalización      |
| [Show Logs](#show-logs) | Un boleano especificando si los logs de cloud son mostrados en el terminal |
| [Stages](#stages)                                         | Una lista de objetos que especifican el número objetivo de VUs para subir o bajar          |
| [Summary export](#summary-export)                         | Guarda el informe de resumen de fin de prueba en un archivo JSON                                |
| [Supply Env Var](#supply-env-var)                         | Añadir/sustituir la variable de entorno con VAR=valor                                    |
| [System Tags](#system-tags)                               | Especificar qué etiquetas del sistema estarán en las métricas recogidas                          |
| [Summary Time Unit](#summary-time-unit)                   | Unidad de tiempo para todos los valores del [resumen del fin de test](/es/visualizacion-de-resultados/resumen-del-final-de-la-prueba/)                                                      |
| [Summary Trend Stats](#summary-trend-stats)               | Definir las estadísticas de las métricas de tendencia                 |
| [Tags](#tags)                                             | Especificar `tags` que deben establecerse en todas las métricas de la prueba |
| [Teardown Timeout](#teardown-timeout)                     | Especifica el tiempo de ejecución de la función `teardown()` antes de su finalización   |
| [Thresholds](#thresholds)                                 | Configurar bajo qué condiciones una prueba tiene éxito o no                         |
| [Throw](#throw)                                           | Un booleano que especifica si se lanzan errores en las peticiones HTTP fallidas                |
| [TLS Auth](#tls-auth)                                     | Una lista de objetos de configuración del certificado de cliente TLS                              |
| [TLS Cipher Suites](#tls-cipher-suites)                   | Una lista de suites de cifrado que se pueden utilizar en las interacciones SSL/TLS con un servidor |
| [TLS Version](#tls-version)                               | String u objeto que representa la única versión SSL/TLS permitida                      |
| [User Agent](#user-agent)                                 | Un string que especifica la cabecera User-Agent al enviar solicitudes HTTP                |
| [Verbose](#verbose) | Un boleando especifiando si el logging verboso está habilidado |
| [VUs](#vus)                                               | Un número que especifica el número de VUs que se ejecutan simultáneamente                           |

## Usando las opciones

Las opciones pueden formar parte del código de los scripts para que puedan ser controladas por la versión. También se pueden especificar con flags de línea de comandos, variables de entorno o a través de un archivo de configuración. El orden de precedencia es el siguiente:

> **command-line flags > environment variables > exported script options > config file > defaults**

Las opciones de cada nivel sobre escribirán las opciones del nivel siguiente, teniendo las flags de la línea de comandos la mayor precedencia.

Por ejemplo, se puede definir la duración de 4 maneras diferentes:

- Establecer la `duration: 10s` en el archivo de configuración
- Establezca la opción de `duration: 10s` en el script
- Definir `K6_DURATION` cómo variable de entorno
- Utilizar la flag de línea de comandos `--duration 10s` sobrescribe todo lo anterior.

El siguiente fragmento de JS muestra cómo especificar las opciones en el script:

<CodeGroup labels={["example.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  hosts: { 'test.k6.io': '1.2.3.4' },
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '1m', target: 0 },
  ],
  thresholds: { http_req_duration: ['avg<100', 'p(95)<200'] },
  noConnectionReuse: true,
  userAgent: 'MyK6UserAgentString/1.0',
};

export default function () {
  http.get('http://test.k6.io/');
}
```

</CodeGroup>

También puede establecer las mismas opciones a través de un archivo de configuración:

<CodeGroup labels={["config.json"]} lineNumbers={[true]}>

```json
{
  "hosts": {
    "test.k6.io": "1.2.3.4"
  },
  "stages": [
    {
      "duration": "1m",
      "target": 10
    },
    {
      "duration": "1m",
      "target": 30
    },
    {
      "duration": "1m",
      "target": 0
    }
  ],
  "thresholds": {
    "http_req_duration": ["avg<100", "p(95)<200"]
  },
  "noConnectionReuse": true,
  "userAgent": "MyK6UserAgentString/1.0"
}
```

</CodeGroup>

O establecer algunas de las opciones anteriores a través de variables de entorno y flags de línea de comandos:

<CodeGroup labels={["Bash"]} lineNumbers={[true]}>

```bash
$ K6_NO_CONNECTION_REUSE=true K6_USER_AGENT="MyK6UserAgentString/1.0" k6 run ~/script.js

$ k6 run ---no-connection-reuse --user-agent "MyK6UserAgentString/1.0" ~/script.js
```

</CodeGroup>

<br/>

A continuación, encontrará detalles sobre todas las opciones disponibles que se pueden especificar dentro de un script. También se documenta la flag de la línea de comandos equivalente, las variables de entorno o la opción al ejecutar `k6 run ...` y `k6 cloud ...` que pueden utilizarse para anular las opciones especificadas en el código.

## Address

Dirección del API server. Cuando ejecutas  `k6 run` un servidor HTTP con la API REST se inicia,
lo cual puede ser usado para controlar la ejecución del test. Lee más en [k6 REST API](/misc/k6-rest-api).

| Env | CLI               | Code / Config file | Default          |
| --- | ----------------- | ------------------ | ---------------- |
| N/A | `--address`, `-a` | N/A                | `localhost:6565` |

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --address "localhost:3000" script.js
```

</CodeGroup>

## Batch

El número máximo de conexiones simultáneas/paralelas en total que puede hacer una llamada `http.batch()` en una VU. Si tienes una llamada `batch()` a la que has dado 20 URLs y --batch está establecido en 15, entonces la VU hará 15 peticiones de inmediato en paralelo y pondrá en cola el resto, ejecutándose tan pronto como una petición anterior haya terminado y se abra un hueco.

| Env        | CLI       | Code / Config file | Default |
| ---------- | --------- | ------------------ | ------- |
| `K6_BATCH` | `--batch` | `batch`            | `20`    |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  batch: 15,
};
```

</CodeGroup>

## Batch per host

El número máximo de conexiones simultáneas/paralelas para el mismo nombre de host que puede hacer una llamada http.batch() en una VU. Si tiene una llamada a batch() a la que le ha dado 20 URLs para el mismo nombre de host y --batch-per-host está establecido en 5, entonces la VU hará 5 peticiones de inmediato en paralelo y pondrá en cola el resto, ejecutándose tan pronto como una petición anterior haya terminado y se abra un hueco. Esto no ejecutará más peticiones en paralelo que el valor del lote.

| Env                 | CLI                | Code / Config file | Default |
| ------------------- | ------------------ | ------------------ | ------- |
| `K6_BATCH_PER_HOST` | `--batch-per-host` | `batchPerHost`     | `6`     |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  batchPerHost: 5,
};
```

</CodeGroup>

## Blacklist IPs

Blacklist de IP para no ser llamados.

| Env                | CLI              | Code / Config file | Default |
| ------------------ | ---------------- | ------------------ | ------- |
| `K6_BLACKLIST_IPS` | `--blacklist-ip` | `blacklistIPs`     | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  blacklistIPs: ['10.0.0.0/8'],
};
```

</CodeGroup>



## Block Hostnames

Bloquea los nombres de host basándose en una lista de cadenas de coincidencia glob. La cadena de coincidencia de patrones puede tener un solo `*` al principio, como `*.example.com`, que coincidirá con cualquier cosa antes de eso, como `test.example.com` y `test.test.example.com`.

| Env                  | CLI                 | Code / Config file | Default |
| -------------------- | ------------------- | ------------------ | ------- |
| `K6_BLOCK_HOSTNAMES` | `--block-hostnames` | `blockHostnames`   | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  blockHostnames: ['test.k6.io', '*.example.com'],
};
```

</CodeGroup>


<CodeGroup labels={[]}>

```bash
$ k6 run --block-hostnames="test.k6.io,*.example.com" script.js
```

</CodeGroup>

## Compatibility Mode

Soporta la ejecución de scripts con diferentes modos de compatibilidad con ECMAScript.

Lea más sobre los diferentes [modos de compatibilidad con JavaScript](/es/usando-k6/javascript-compatibility-mode/).

| Env                     | CLI                    | Code / Config file | Default      |
| ----------------------- | ---------------------- | ------------------ | ------------ |
| `K6_COMPATIBILITY_MODE` | `--compatibility-mode` | N/A                | `"extended"` |

<CodeGroup labels={[]}>

```bash
$ k6 run --compatibility-mode=base script.js
```

</CodeGroup>

## Config

Especifica el archivo config, k6 buscará `config.json` en el directorio loadimpact/k6 dentro del directorio habitual de archivos de configuración del sistema operativo. Las ubicaciones de configuración por defecto en los diferentes sistemas operativos son:

|OS|Default Config Path|
|---|---|
|Unix-based|`${HOME}/.config/loadimpact/k6/config.json`|
|macOS|`${HOME}/Library/Application Support/loadimpact/k6/config.json`|
|Windows|`%AppData%/loadimpact/k6/config.json`|

Available in `k6 run` and `k6 cloud` commands:

| Env | CLI                            | Code / Config file | Default |
| --- | ------------------------------ | ------------------ | ------- |
| N/A | `--config <path>`, `-c <path>` | N/A                | `null`  |

Puede encontrar un ejemplo de archivo de configuración disponible [aquí](/using-k6/options#config-json).

## Console Output

Redirecciona logs del terminal a un fichero. Disponible en los comandos `k6 cloud` y `k6 run`.

| Env                 | CLI                | Code / Config file | Default |
| ---                 | -------------------| ------------------ | ------- |
| `K6_CONSOLE_OUTPUT` | `--console-output` | N/A                | `null`  |


<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --console-output "loadtest.log" script.js
```

</CodeGroup>

## Discard Response Bodies

Especifica si los cuerpos de respuesta deben ser descartados cambiando el valor por defecto del tipo de respuesta a none para todas las peticiones HTTP. Se recomienda que se establezca en true y entonces sólo para las peticiones en las que el cuerpo de la respuesta es necesario para el scripting para establecer el tipo de respuesta a text o binary. Reduce la cantidad de memoria requerida y la cantidad de GC - reduciendo la carga en la máquina de pruebas, y probablemente produciendo resultados de pruebas más fiables.

| Env                          | CLI                         | Code / Config file      | Default |
| ---------------------------- | --------------------------- | ----------------------- | ------- |
| `K6_DISCARD_RESPONSE_BODIES` | `--discard-response-bodies` | `discardResponseBodies` | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  discardResponseBodies: true,
};
```

</CodeGroup>

## DNS

> _Nuevo en v0.29.0_

Esta es una opción compuesta que proporciona el control del comportamiento de la resolución DNS con la configuración de la expiración de la cache (TTL), la estrategia de selección de IP y la preferencia de la versión de IP. El campo TTL en el registro DNS actualmente no es leído por k6, por lo que la opción ttl permite el control manual de este comportamiento, aunque como un valor fijo para la duración de la ejecución de la prueba.

Tenga en cuenta que la resolución de DNS se realiza sólo en las nuevas conexiones HTTP, y por defecto k6 intentará reutilizar las conexiones si HTTP keep-alive está soportado. Para forzar un determinado comportamiento de DNS considere habilitar la opción [`noConnectionReuse`](#no-connection-reuse) en sus pruebas.

| Env      | CLI     | Code / Config file | Default                                  |
| ---------| --------| -------------------| ---------------------------------------- |
| `K6_DNS` | `--dns` | `dns`              | `ttl=5m,select=random,policy=preferIPv4` |

Los posibles valores de ttl son:

- 0: no se almacena en caché en absoluto - cada petición desencadenará una nueva búsqueda de DNS.
- inf: se almacena en caché cualquier IP resuelta durante la duración de la prueba.
cualquier duración de tiempo como 60s, 5m30s, 10m, 2h, etc.; si no se especifica ninguna unidad (por ejemplo, ttl=3000), k6 asume milisegundos.

Los posibles valores de select son:

- first: elige siempre la primera IP resuelta.
- random: elige una IP aleatoria para cada nueva conexión.
- roundRobin: iterar secuencialmente sobre las IPs resueltas.

Los posibles valores de policy son:

- preferIPv4: utiliza direcciones IPv4 si están disponibles, en caso contrario, volver a IPv6.
- preferIPv6: utiliza direcciones IPv6 si están disponibles, en caso contrario, volver a IPv4.
- onlyIPv4: sólo utiliza direcciones IPv4, ignora las IPv6.
- onlyIPv6: sólo utiliza direcciones IPv6, ignora las IPv4.
- any: no hay preferencia, utiliza todas las direcciones.

He aquí algunos ejemplos de configuración:


```bash
k6 run --dns "ttl=inf,select=first,policy=any" script.js # the old k6 behavior before v0.29.0
K6_DNS="ttl=5m,select=random,policy=preferIPv4" k6 cloud script.js # new default behavior from v0.29.0
```

<CodeGroup labels={[ "script.js" ]} lineNumbers={[true]}>

```javascript
export const options = {
  dns: {
    ttl: '1m',
    select: 'roundRobin',
    policy: 'any',
  },
};
```

</CodeGroup>

## Duration

Una cadena que especifica la duración total de la ejecución de una prueba. Durante este tiempo, cada VU ejecutará el script en un bucle.

Junto con la opción vus, la duración es un atajo para un escenario único con un ejecutor de VUs constante.

| Env           | CLI                | Code / Config file | Default |
| ------------- | ------------------ | ------------------ | ------- |
| `K6_DURATION` | `--duration`, `-d` | `duration`         | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  duration: '3m',
};
```

</CodeGroup>

## Extension Options

Un objeto utilizado para establecer las opciones de configuración de los colectores de terceros, como los plugins.

| Env | CLI | Code / Config file | Default |
| --- | --- | ------------------ | ------- |
| N/A | N/A | `ext`              | `null`  |

Este es un ejemplo de cómo especificar el nombre de la prueba (las ejecuciones de la prueba con el mismo nombre se agruparán lógicamente para las tendencias y la comparación) al transmitir los resultados a [k6 Cloud Performance Insights](/cloud/analyzing-results/performance-insights).

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  ext: {
    loadimpact: {
      name: 'My test name',
    },
  },
};
```

</CodeGroup>

## Execution Segment

Estas opciones especifican cómo dividir la ejecución de la prueba y qué segmento ejecutar. Si se definen, K6 escalará el número de VUs e iteraciones a ejecutar para ese segmento, lo cual es útil en la ejecución distribuida.

| Env | CLI                            | Code / Config file         | Default |
| --- | ------------------------------ | -------------------------- | ------- |
| N/A | `--execution-segment`          | `executionSegment`         | `"0:1"` |
| N/A | `--execution-segment-sequence` | `executionSegmentSequence` | `"0,1"` |


## Exit On Running

Un boleano indicando si el comando debe salir cuando el test empieza a ejecutarse - estado `running`. Disponible en el comando `k6 cloud`.

| Env                  | CLI                 | Code / Config file | Default |
| -------------------- | ------------------- | ------------------ | ------- |
| `K6_EXIT_ON_RUNNING` | `--exit-on-running` | N/A                | `false` |

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 cloud --exit-on-running script.js
```

</CodeGroup>

## Hosts

Un objeto con anulaciones de la resolución DNS, similar a lo que puede hacer con `/etc/hosts` en Linux/Unix o `C:\\Windows\\System32\\drivers\\etc\\hosts` en Windows. Por ejemplo, puede configurar una anulación que dirija todas las solicitudes de test.k6.io a 1.2.3.4.

A partir de la versión v0.28.0 también se soporta el redireccionamiento sólo desde ciertos puertos y/o hacia ciertos puertos.

> ### ⚠️ Tenga en cuenta que!
>
> Esto no modifica la cabecera HTTP Host propiamente dicha, sino hacia dónde se dirigirá.

| Env | CLI | Code / Config file | Default |
| --- | --- | ------------------ | ------- |
| N/A | N/A | `hosts`            | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  hosts: {
    'test.k6.io': '1.2.3.4',
    'test.k6.io:443': '1.2.3.4:8443',
  },
};
```

</CodeGroup>

Con el código anterior cualquier petición hecha a `test.k6.io` será redirigida a `1.2.3.4` sin cambiar su puerto a menos que su puerto sea `443` que será redirigido al puerto `8443`.

## HTTP Debug

Registra todas las peticiones y respuestas HTTP. Excluye el cuerpo por defecto, para incluir el cuerpo use `--http-debug=full`.

Lea más [aquí](/es/usando-k6/http-debugging/).

| Env             | CLI                                     | Code / Config file | Default |
| --------------- | --------------------------------------- | ------------------ | ------- |
| `K6_HTTP_DEBUG` | `--http-debug`,<br/>`--http-debug=full` | `httpDebug`        | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  httpDebug: 'full',
};
```

</CodeGroup>

## Include System Env Vars

Pasa las variables del entorno del sistema real al tiempo de ejecución.

| Env | CLI                         | Code / Config file | Default                                                                                              |
| --- | --------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| N/A | `--include-system-env-vars` | N/A                | `true` para k6 run, pero `false` para todos los demás comandos para evitar la filtración inadvertida de datos sensibles. |

<CodeGroup labels={[ "Shell" ]} lineNumbers={[true]}>

```bash
$ k6 run --include-system-env-vars ~/script.js
```

</CodeGroup>

## Insecure Skip TLS Verify

Un booleano, verdadero o falso. Cuando esta opción está habilitada (establecida en true), todas las verificaciones que de otro modo se harían para establecer la confianza en un certificado TLS proporcionado por el servidor serán ignoradas. Esto sólo se aplica a las conexiones creadas por el código de la VU, como las solicitudes http.

| Env                           | CLI                          | Code / Config file      | Default |
| ----------------------------- | ---------------------------- | ----------------------- | ------- |
| `K6_INSECURE_SKIP_TLS_VERIFY` | `--insecure-skip-tls-verify` | `insecureSkipTLSVerify` | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  insecureSkipTLSVerify: true,
};
```

</CodeGroup>

## Iterations

Un valor entero, que especifica el número total de iteraciones de la función por defecto que se ejecutará en prueba, en lugar de especificar una duración de tiempo durante la cual el script se ejecutará en un bucle.

Junto con la opción vus, iterations es un atajo para un único escenario con un ejecutor de iteraciones compartido.

Por defecto, la duración máxima de un escenario de iteraciones compartidas es de 10 minutos. Puedes ajustar ese tiempo a través de la opción maxDuration del escenario, o especificando también la opción de acceso directo global duration.
Tenga en cuenta que las iteraciones no se distribuyen equitativamente con esta opción, y un VU que se ejecute más rápido completará más iteraciones que otras. Cada VU intentará completar tantas iteraciones como sea posible, "tomándolas" del número total de iteraciones de la prueba. Así, dependiendo de los tiempos de iteración, algunas VUs pueden completar más iteraciones que otras. Si quiere garantizar que cada VU completará un número específico y fijo de iteraciones, utilice el ejecutor de iteraciones por VU.


| Env             | CLI                  | Code / Config file | Default |
| --------------- | -------------------- | ------------------ | ------- |
| `K6_ITERATIONS` | `--iterations`, `-i` | `iterations`       | `1`     |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  iterations: 10,
};
```

</CodeGroup>

O, para ejecutar 10 VUs 10 veces cada una:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  vus: 10,
  iterations: 100,
};
```

</CodeGroup>

## Linger

Un booleano, verdadero o falso, que especifica si el proceso k6 debe permanecer después de la finalización de la prueba. Disponible en el comando de ejecución `k6 run`.


| Env         | CLI              | Code / Config file | Default |
| ----------- | ---------------- | ------------------ | ------- |
| `K6_LINGER` | `--linger`, `-l` | `linger`           | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  linger: true,
};
```

</CodeGroup>

## Local IPs

Una lista de IPs, rangos de IPs y CIDRs desde los que las VUs harán peticiones. Las IPs serán entregadas secuencialmente a las VUs. Esta opción no cambia nada a nivel del SO, por lo que las IPs deben estar ya configuradas a nivel del SO para que k6 pueda utilizarlas. También los CIDRs IPv4 con más de 2 IPs no incluyen la primera y la última IP ya que están reservadas para referirse a la propia red y a la dirección de difusión respectivamente.

Esta opción puede utilizarse para dividir el tráfico de red de k6 entre varias tarjetas de red, aumentando así potencialmente el rendimiento de red disponible. Por ejemplo, si tiene 2 NICs, puede ejecutar k6 con `--local-ips="<IP-del-primer-NIC>,<IP-del-segundo-NIC>"` para equilibrar el tráfico de forma equitativa entre ellos - la mitad de los VUs utilizarán la primera IP y la otra mitad la segunda. Esto puede escalar a cualquier número de NICs, y puede repetir algunas IPs locales para darles más tráfico. Por ejemplo, `--local-ips="<IP1>,<IP2>,<IP3>,<IP3>"` dividirá los VUs entre 3 IPs de origen diferentes en una proporción `25%:25%:50%`.

Disponible en el comando de ejecución `k6 run`.

| Env            | CLI              | Code / Config file | Default |
| -------------- | ---------------- | ------------------ | ------- |
| `K6_LOCAL_IPS` | `--local-ips`    | N/A                | N/A     |


<CodeGroup labels={[]}>

```bash
$ k6 run --local-ips=192.168.20.12-192.168.20-15,192.168.10.0/27 script.js
```

</CodeGroup>

## Log output

Esta opción especifica a dónde enviar los registros y otra configuración conectada a ella. Está disponible en el comando de ejecución `k6 run`.

Los valores posibles son:
- none - deshabilitar
- stdout - enviar a la salida estándar
- stderr - enviar a la salida de error estándar (este es el valor por defecto)
- loki - envía los registros a un servidor loki. Leer más en el [tutorial de Loki](https://k6.io/blog/using-loki-to-store-and-query-k6-logs/)

El servidor loki puede configurarse adicionalmente de la siguiente manera: `loki=http://127.0.0.1:3100/loki/api/v1/push,label.something=else,label.foo=bar,limit=32,level=info,pushPeriod=5m32s,msgMaxSize=1231`, donde todo, excepto la url del principio, no es necesario. Las posibles claves con sus significados y valores por defecto:




| key               | meaning                                                                                                                                                                                | default value                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `nothing`         | el endpoint  al cual se enviarán los registros                                                                                                                                                    | `http://127.0.0.1:3100/loki/api/v1/push` |
| allowedLabels     | si se establece k6 sólo enviará las etiquetas proporcionadas como tales y todas las demás se añadirán al mensaje en la forma `clave=valor`. El valor de la opción tiene la forma `[label1,label2]`  | N/A                                      |
| label.`labelName` | añade una etiqueta adicional con la clave y el valor proporcionados a cada mensaje                                                                                                               | N/A                                      |
| limit             | el límite de mensajes por pushPeriod, se envía un registro adicional cuando se alcanza el límite, registrando cuántos registros se han dejado caer                                                           | 100                                      |
| level             | el nivel mínimo de un mensaje para que sea enviado a loki                                                                                                                                    | all                                      |
| pushPeriod        | a qué hora enviar las líneas de registro                                                                                                                                                       | 1s                                       |
| profile           | si imprimir alguna información sobre el rendimiento del envío a loki                                                                                                                    | false                                    |
| msgMaxSize        | cuántos símbolos puede haber como máximo en un mensaje. Los mensajes más grandes perderán la mitad del mensaje con unos pocos caracteres adicionales que explican cuántos caracteres se han eliminado. | 1048576                                  |

| Env             | CLI            | Code / Config file | Default  |
| --------------- | -------------- | ------------------ | -------- |
| `K6_LOG_OUTPUT` | `--log-output` | N/A                | `stderr` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --log-output=stdout script.js
```

</CodeGroup>

## LogFormat

Un valor que especifica el formato del registro. Por defecto, k6 incluye información extra de depuración como la fecha y el nivel de registro. Las otras opciones disponibles son:

- json: imprime toda la información de depuración en formato JSON.
- raw: imprime sólo el mensaje de registro.


| Env            | CLI                 | Code / Config file | Default |
| -------------- | ------------------- | ------------------ | ------- |
| `K6_LOG_FORMAT` | `--log-format`, `-f` | N/A                |         |

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --log-format raw test.js
```

</CodeGroup>

## Max Redirects

El número máximo de redirecciones HTTP que k6 seguirá antes de abandonar una solicitud y dar un error.

| Env                | CLI               | Code / Config file | Default |
| ------------------ | ----------------- | ------------------ | ------- |
| `K6_MAX_REDIRECTS` | `--max-redirects` | `maxRedirects`     | `10`    |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  maxRedirects: 10,
};
```

</CodeGroup>

## Minimum Iteration Duration

Especifica la duración mínima que debe tener cada una de las ejecuciones (es decir, iteraciones) de la función `default`. Cualquier iteración que sea más corta que este valor hará que ese VU duerma durante el tiempo restante hasta que se alcance la duración mínima especificada.

| Env                         | CLI                        | Code / Config file     | Default        |
| --------------------------- | -------------------------- | ---------------------- | -------------- |
| `K6_MIN_ITERATION_DURATION` | `--min-iteration-duration` | `minIterationDuration` | `0` (disabled) |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  minIterationDuration: '10s',
};
```

</CodeGroup>

## No Color

Especifica si el color de la salida en el terminal está deshabilitado. Disponible en los comandos `k6 run` y `k6 cloud`.

| Env | CLI          | Code / Config file  | Default |
| --- | ------------ | ------------------- | ------- |
| N/A | `--no-color` | N/A                 | `false` |


<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --no-color script.js
```

</CodeGroup>

## No Connection Reuse

Un booleano, verdadero o falso, que especifica si k6 debe desactivar las conexiones keep-alive.

| Env                      | CLI                     | Code / Config file  | Default |
| ------------------------ | ----------------------- | ------------------- | ------- |
| `K6_NO_CONNECTION_REUSE` | `--no-connection-reuse` | `noConnectionReuse` | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  noConnectionReuse: true,
};
```

</CodeGroup>

## No Cookies Reset

Esto deshabilita el comportamiento por defecto de restablecer el tarro de cookies después de cada iteración del VU. Si se habilita, las cookies guardadas se mantendrán a través de las iteraciones del VU.

| Env                   | CLI | Code / Config file | Default |
| --------------------- | --- | ------------------ | ------- |
| `K6_NO_COOKIES_RESET` | N/A | `noCookiesReset`   | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  noCookiesReset: true,
};
```

</CodeGroup>

## No Summary

Desactiva el [end-of-test summary](/es/visualizacion-de-resultados/resumen-del-final-de-la-prueba/) generation. Desde v0.30.0, k6 incluye [`handleSummary()`](/es/visualizacion-de-resultados/resumen-del-final-de-la-prueba/#handlesummary-callback) and `--summary-export`.

| Env                | CLI               | Code / Config file | Default |
| ------------------ | ----------------- | ------------------ | ------- |
| `K6_NO_SUMMARY`    | `--no-summary`    | N/A                | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --no-summary ~/script.js
```

</CodeGroup>

## No Setup

Especifica si la función `setup()` debe ejecutarse. Disponible en los comandos `k6 cloud` y `k6 run`.

| Env                | CLI               | Code / Config file | Default |
| ------------------ | ----------------- | ------------------ | ------- |
| `K6_NO_SETUP`      | `--no-setup`      | N/A                | `false` |

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --no-setup script.js
```

</CodeGroup>

## No Teardown

Especifica si la función `teardown()` debe ejecutarse. Disponible en los comandos `k6 cloud` y `k6 run`.

| Env                | CLI               | Code / Config file | Default |
| ------------------ | ----------------- | ------------------ | ------- |
| `K6_NO_TEARDOWN`   | `--no-teardown`   | N/A                | `false` |

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --no-teardown script.js
```

</CodeGroup>

## No Thresholds

Desactiva la ejecución de Thresholds.

| Env                | CLI               | Code / Config file | Default |
| ------------------ | ----------------- | ------------------ | ------- |
| `K6_NO_THRESHOLDS` | `--no-thresholds` | N/A                | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --no-thresholds ~/script.js
```

</CodeGroup>

## No Usage Report

Un booleano, verdadero o falso. Por defecto, k6 envía un informe de uso cada vez que se ejecuta, para que podamos hacer un seguimiento de la frecuencia de uso. Si esta opción se establece como verdadera, no se realizará ningún informe de uso. Para saber más, eche un vistazo a la documentación sobre los [informes de uso](/misc/usage-collection). Disponible en `k6 run`.

| Env                  | CLI                 | Config file        | Default |
| -------------------- | ------------------- | ------------------ | ------- |
| `K6_NO_USAGE_REPORT` | `--no-usage-report` | `noUsageReport`\*  | `false` |


<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --no-usage-report ~/script.js
```

</CodeGroup>

\* Note que esta opción no puede ser especificada en el script, pero sí en un archivo de configuración.


## No VU Connection Reuse

Un booleano, verdadero o falso, que especifica si k6 debe reutilizar las conexiones TCP entre las iteraciones de un VU.


| Env                         | CLI                        | Code / Config file    | Default |
| --------------------------- | -------------------------- | --------------------- | ------- |
| `K6_NO_VU_CONNECTION_REUSE` | `--no-vu-connection-reuse` | `noVUConnectionReuse` | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  noVUConnectionReuse: true,
};
```

</CodeGroup>

## Paused

Un booleano, verdadero o falso, que especifica si la prueba debe comenzar en un estado de pausa. Para reanudar un estado de pausa se utilizará el comando k6 resume.

| Env         | CLI              | Code / Config file | Default |
| ----------- | ---------------- | ------------------ | ------- |
| `K6_PAUSED` | `--paused`, `-p` | `paused`           | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  paused: true,
};
```

</CodeGroup>

## Quiet

Un booleano, verdadero o falso, que deshabilita la barra de progreso en la salida del terminal. Disponible en los commands `k6 run` y `k6 cloud`.

| Env | CLI              | Code / Config file | Default |
| --- | ---------------- | ------------------ | ------- |
| N/A | `--quiet`, `-q`  | N/A                | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run script.js -d 20s --quiet
```

</CodeGroup>

## Results Output

Especifique la salida de resultados. Por favor, vaya a [Salida de resultados](/es/empezando/salida-de-resultados/) para más información sobre todos los módulos de salida disponibles y cómo configurarlos. Disponible en el comando de ejecución `k6 run`.


| Env | CLI           | Code / Config file | Default |
| --- | ------------- | ------------------ | ------- |
| N/A | `--out`, `-o` | N/A                | `null`  |

<CodeGroup labels={[ "Shell" ]} lineNumbers={[true]}>

```bash
$ k6 run --out influxdb=http://localhost:8086/k6 script.js
```

</CodeGroup>

## RPS

El número máximo de peticiones a realizar por segundo, en total en todas los VUs.


| Env      | CLI     | Code / Config file | Default         |
| -------- | ------- | ------------------ | --------------- |
| `K6_RPS` | `--rps` | `rps`              | `0` (unlimited) |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  rps: 500,
};
```

</CodeGroup>

> Esta opción tiene algunas advertencias y es difícil de utilizar correctamente, por lo que se desaconseja su uso. Por ejemplo, en la ejecución en `k6 Cloud` o distribuida, esta opción afecta a cada instancia de k6 de forma independiente, es decir, no está fragmentada como los VU. Recomendamos encarecidamente el uso de [Scenarios](#scenarios) para simular un RPS constante en lugar de esta opción.

## Scenarios

Defina uno o más patrones de ejecución, con varias configuraciones de programación de VU e iteraciones, ejecutando diferentes funciones exportadas (¡además de las predeterminadas!), utilizando diferentes variables de entorno, etiquetas y más.
Consulte el artículo [Escenarios](/es/usando-k6/escenarios/) para obtener detalles y más ejemplos.


| Env | CLI | Code / Config file | Default |
| --- | --- | ------------------ | ------- |
| N/A | N/A | `scenarios`        | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  scenarios: {
    my_api_scenario: {
      // arbitrary scenario name
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '10s',
      env: { MYVAR: 'example' },
      tags: { my_tag: 'example' },
    },
  },
};
```

</CodeGroup>

## Setup Timeout

Especifica el tiempo que se permite ejecutar la función `setup()` antes de que se termine y la prueba falle.

| Env                | CLI | Code / Config file | Default |
| ------------------ | --- | ------------------ | ------- |
| `K6_SETUP_TIMEOUT` | N/A | `setupTimeout`     | `"60s"` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  setupTimeout: '30s',
};
```

</CodeGroup>

## Show Logs

Especifica si los logs de cloud se muestran en el terminal. Disponible en el comando `k6 cloud`.

| Env | CLI           | Code / Config file | Default |
| --- | ------------- | ------------------ | ------- |
| N/A | `--show-logs` | N/A                | `true`  |


<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 cloud --show-logs=false script.js
```

</CodeGroup>

## Stages

Una lista de VU `{ target: ..., duration: ... }` que especifican el número objetivo de VUs para aumentar o disminuir durante un período específico.

Es una opción de acceso directo para un escenario único con un ejecutor de VUs en rampa. Si se utiliza junto con la opción VUs, el valor vus se utiliza como la opción startVUs del ejecutor.

| Env         | CLI                                                     | Code / Config file | Default                        |
| ----------- | ------------------------------------------------------- | ------------------ | ------------------------------ |
| `K6_STAGES` | `--stage <duration>:<target>`, `-s <duration>:<target>` | `stages`           | Based on `vus` and `duration`. |

<CodeGroup labels={["Code", "Shell"]} lineNumbers={[true]}>

```javascript
// The following config would have k6 ramping up from 1 to 10 VUs for 3 minutes,
// then staying flat at 10 VUs for 5 minutes, then ramping up from 10 to 35 VUs
// over the next 10 minutes before finally ramping down to 0 VUs for another
// 3 minutes.

export const options = {
  stages: [
    { duration: '3m', target: 10 },
    { duration: '5m', target: 10 },
    { duration: '10m', target: 35 },
    { duration: '3m', target: 0 },
  ],
};
```

```bash
$ k6 run --stage 5s:10,5m:20,10s:5 ~/script.js

# or...

$ K6_STAGES="5s:10,5m:20,10s:5" k6 run ~/script.js
```

</CodeGroup>

## Summary export

Guarde el informe de resumen de fin de prueba en un archivo JSON que incluya los datos de todas las métricas, comprobaciones y umbrales de la prueba. Esto es útil para obtener los resultados agregados de las pruebas en un formato legible por la máquina, para la integración con paneles de control, alertas externas, tuberías de CI, etc.

A partir de k6 v0.30.0, aunque esta característica no está obsoleta todavía, se desaconseja su uso, vea la explicación del porqué aquí. Para una mejor y más flexible exportación de JSON, así como la exportación de los datos del resumen a diferentes formatos (por ejemplo, JUnit/XUnit/etc. XML, HTML, .txt) y una completa personalización del resumen, vea el nuevo callback handleSummary().


| Env                 | CLI                           | Code / Config file | Default |
| ------------------- | ----------------------------- | ------------------ | ------- |
| `K6_SUMMARY_EXPORT` | `--summary-export <filename>` | N/A                | `null`  |

<CodeGroup labels={[ "Shell" ]} lineNumbers={[true]}>

```bash
$ k6 run --summary-export export.json ~/script.js

# or...

$ K6_SUMMARY_EXPORT="export.json" k6 run ~/script.js
```

</CodeGroup>

Vea un archivo de ejemplo en la [página de resultados](/es/empezando/salida-de-resultados/#exportando-el-resumen) page.

## Supply Env Var

Añade o sustituye una variable de entorno con VAR=valor.

Para que las variables de entorno del sistema estén disponibles en el script de k6 a través de __ENV, utilice la opción --include-system-env-vars.

| Env | CLI           | Code / Config file | Default |
| --- | ------------- | ------------------ | ------- |
| N/A | `--env`, `-e` | N/A                | `null`  |

<CodeGroup labels={[ "Shell" ]} lineNumbers={[true]}>

```bash
$ k6 run -e FOO=bar ~/script.js
```

</CodeGroup>

## System Tags

Especifique qué [Tags](/es/usando-k6/tags-y-groups/#system-tags) del sistema estarán en las métricas recopiladas. Algunos recopiladores, como el de la nube, pueden requerir que se utilicen determinadas etiquetas del sistema. Puede especificar las etiquetas como un array desde los scripts JS o como una lista separada por comas a través de la CLI.

| Env              | CLI             | Code / Config file | Default                                                                                                      |
| ---------------- | --------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `K6_SYSTEM_TAGS` | `--system-tags` | `systemTags`       | `proto`,`subproto`,`status`,`method`,`url`,`name`,`group`,`check`,`error`,`error_code`,`tls_version`,`scenario`,`service`,`expected_response` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  systemTags: ['status', 'method', 'url'],
};
```

</CodeGroup>

## Summary Time Unit

Define la unidad de tiempo en [ resumen de fin de tests](/es/visualizacion-de-resultados/resumen-del-final-de-la-prueba/). Lo valores posibles son `s` (segundos), `ms` (milisegundos) y `us` (microsegundos). Si no es especificado, k6 usará la unidad más apropiada para cada valor.

| Env                    | CLI                   | Code / Config file  | Default |
| ---------------------- | --------------------- | ------------------- | ------- |
| `K6_SUMMARY_TIME_UNIT` | `--summary-time-unit` | `summaryTimeUnit`   | `null`  |


<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  summaryTimeUnit: 'ms',
};
```

</CodeGroup>

## Summary Trend Stats

Defina qué estadísticas de las métricas de tendencia (por ejemplo, tiempos de respuesta, duraciones de grupo/de iteración, etc.) se mostrarán en el resumen de fin de prueba. Los valores posibles incluyen avg (media), med (mediana), min, max, count (desde k6 v0.26.0), así como valores de percentil arbitrarios (por ejemplo, p(95), p(99), p(99.99), etc.).

Para una mayor personalización del resumen y la exportación del mismo en varios formatos (por ejemplo, JSON, JUnit/XUnit/etc. XML, HTML, .txt, etc.), véase la nueva llamada de retorno handleSummary() introducida en k6 v0.30.0.


| Env                      | CLI                     | Code / Config file  | Default |
| ------------------------ | ----------------------- | ------------------- | ------- |
| `K6_SUMMARY_TREND_STATS` | `--summary-trend-stats` | `summaryTrendStats` | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  summaryTrendStats: ['avg', 'p(95)'],
};
```

</CodeGroup>

## Tags

Especifique las etiquetas que deben establecerse a nivel de prueba en todas las métricas. Si se ha especificado una etiqueta con el mismo nombre en una solicitud, una comprobación o una métrica personalizada, tendrá prioridad sobre una etiqueta de prueba.

| Env | CLI                | Code / Config file | Default |
| --- | ------------------ | ------------------ | ------- |
| N/A | `--tag NAME=VALUE` | `tags`             | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  tags: {
    name: 'value',
  },
};
```

</CodeGroup>

## Teardown Timeout

Especifica cuánto tiempo se permite que se ejecute la función `teardown()` antes de que se termine y la prueba falle.


| Env                   | CLI | Code / Config file | Default |
| --------------------- | --- | ------------------ | ------- |
| `K6_TEARDOWN_TIMEOUT` | N/A | `teardownTimeout`  | `"60s"` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  teardownTimeout: '30s',
};
```

</CodeGroup>

## Thresholds

Una colección de especificaciones de umbrales para configurar bajo qué condición(es) se considera que una prueba ha tenido éxito o no, cuando ha pasado o fallado, basándose en los datos métricos. Para obtener más información, consulte la documentación sobre [Thresholds](/es/usando-k6/thresholds/).

| Env | CLI | Code / Config file | Default |
| --- | --- | ------------------ | ------- |
| N/A | N/A | `thresholds`       | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  thresholds: {
    'http_req_duration': ['avg<100', 'p(95)<200'],
    'http_req_connecting{cdnAsset:true}': ['p(95)<100'],
  },
};
```

</CodeGroup>

## Throw

Un booleano, verdadero o falso, que especifica si se lanzan errores en las peticiones HTTP fallidas o no.

| Env        | CLI             | Code / Config file | Default |
| ---------- | --------------- | ------------------ | ------- |
| `K6_THROW` | `--throw`, `-w` | `throw`            | `false` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  throw: true,
};
```

</CodeGroup>

## TLS Auth

Una lista de objetos de configuración de certificados de cliente TLS. `domains` y `password` son opcionales, pero `cert` y `key` son obligatorios.

| Env | CLI | Code / Config file | Default |
| --- | --- | ------------------ | ------- |
| N/A | N/A | `tlsAuth`          | `null`  |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  tlsAuth: [
    {
      domains: ['example.com'],
      cert: open('mycert.pem'),
      key: open('mycert-key.pem'),
      password: "mycert-passphrase",
    },
  ],
};
```

</CodeGroup>

## TLS Cipher Suites

Una lista de suites de cifrado permitidas para ser utilizadas por en las interacciones SSL/TLS con un servidor. Para una lista completa de cifrados disponibles, vaya [aquí](https://golang.org/pkg/crypto/tls/#pkg-constants).

| Env | CLI | Code / Config file | Default                   |
| --- | --- | ------------------ | ------------------------- |
| N/A | N/A | `tlsCipherSuites`  | `null` (Allow all suites) |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  tlsCipherSuites: ['TLS_RSA_WITH_RC4_128_SHA', 'TLS_RSA_WITH_AES_128_GCM_SHA256'],
};
```

</CodeGroup>

## TLS Version

Either a string representing the only SSL/TLS version allowed to be used in interactions with a
server, or an object specifying the "min" and "max" versions allowed to be used.

| Env | CLI | Code / Config file | Default                     |
| --- | --- | ------------------ | --------------------------- |
| N/A | N/A | `tlsVersion`       | `null` (Allow all versions) |

<CodeGroup labels={["tlsVersion"]} lineNumbers={[true]}>

```javascript
export const options = {
  tlsVersion: 'tls1.2',
};
```

</CodeGroup>

<CodeGroup labels={["Min and max versions"]} lineNumbers={[true]}>

```javascript
export const options = {
  tlsVersion: {
    min: 'ssl3.0',
    max: 'tls1.2',
  },
};
```

</CodeGroup>

## User Agent

Una cadena que especifica la cadena de agente de usuario a utilizar en las cabeceras User-Agent cuando se envían peticiones HTTP. Si se establece como una cadena vacía no se enviará una cabecera User-Agent desde la v0.29.0.

| Env             | CLI            | Code / Config file | Default                                                               |
| --------------- | -------------- | ------------------ | --------------------------------------------------------------------- |
| `K6_USER_AGENT` | `--user-agent` | `userAgent`        | `k6/0.27.0 (https://k6.io/)` (depending on the version you're using)` |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  userAgent: 'MyK6UserAgentString/1.0',
};
```

</CodeGroup>

## Verbose

Especifica si el modo verboso del logging está habilitado. Disponible en los comandos `k6 run` y `k6 cloud`.

| Env | CLI                | Code / Config file  | Default |
| --- | ------------------ | ------------------- | ------- |
| N/A | `--verbose`, `-v`  | N/A                 | `false` |


<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ k6 run --verbose script.js
```

</CodeGroup>

## VUs

Un valor entero que especifica el número de VUs a ejecutar simultáneamente, utilizado junto con las opciones de iteraciones o duración. Si desea un mayor control, consulte la opción de [stages](#stages) o [scenarios](#scenarios).

| Env      | CLI           | Code / Config file | Default |
| -------- | ------------- | ------------------ | ------- |
| `K6_VUS` | `--vus`, `-u` | `vus`              | `1`     |

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  vus: 10,
};
```

</CodeGroup>
