---
title: JavaScript Compatibility Mode
excerpt: 'k6 soporta la ejecución de scripts de prueba con diferentes modos de compatibilidad de ECMAScript utilizando la opción CLI run `--compatibility-mode`'
hideFromSidebar: true
---

k6 soporta la ejecución de scripts de prueba con diferentes modos de compatibilidad de ECMAScript utilizando la opción CLI run `--compatibility-mode` o la variable de entorno `K6_COMPATIBILITY_MODE`.

Actualmente hay dos modos disponibles:

## Base

<CodeGroup labels={["CLI Parameter", "Environment Variable"]}>

```bash
$ k6 run --compatibility-mode=base script.js
```

```bash
$ K6_COMPATIBILITY_MODE=base k6 run script.js
```

</CodeGroup>

VM JavaScript puro de Golang que soporta ES5.1+. Utilice este modo si sus scripts ya están escritos utilizando sólo las características de ES5.1, o fueron previamente transformados por Babel, para reducir el tiempo de inicio, el uso de RAM y mejorar el rendimiento. Consulte el [proyecto k6-es6](https://github.com/k6io/k6-es6) para ver un ejemplo de configuración de Webpack que realiza esta transformación fuera de k6.


### Ejemplo básico


<CodeGroup labels={[ "base-example.js" ]} lineNumbers={[true]}>

```javascript
var http = require('k6/http');
var k6 = require('k6');

module.exports.options = {
  vus: 10,
  duration: '30s',
};

module.exports.default = function () {
  http.get('http://test.k6.io');
  k6.sleep(1);
};
```

</CodeGroup>

> ### ⚠️ Sobre require()
> 
> Tenga en cuenta que `require()` es una implementación personalizada de k6 para la carga de módulos, que no se comporta de la misma manera que la llamada require() en Node.js. Específicamente, sólo maneja la carga de módulos incorporados en k6, scripts en el sistema de archivos local, y scripts remotos a través de HTTP(S), pero no soporta el algoritmo de resolución de módulos de Node.js.

### Ejemplo avanzado

<CodeGroup labels={[ "advanced-example.js" ]} lineNumbers={[true]}>

```javascript
var http = require('k6/http');
var metrics = require('k6/metrics');
var k6 = require('k6');

module.exports.options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'failed requests': ['rate<0.1'],
  },
};

var myFailRate = new metrics.Rate('failed requests');

module.exports.default = function () {
  var res = http.get('https://httpbin.test.k6.io/');
  var checkRes = k6.check(res, {
    'status was 200': function (r) {
      return r.status == 200;
    },
  });
  if (!checkRes) {
    myFailRate.add(1);
  }
  k6.sleep(1);
};
```

</CodeGroup>

## Extended

<CodeGroup labels={["CLI Parameter", "Environment Variable"]}>

```bash
$ k6 run --compatibility-mode=extended script.js
```

```bash
$ K6_COMPATIBILITY_MODE=extended k6 run script.js
```

</CodeGroup>

Transforma los scripts a ES5.1 utilizando Babel con el preajuste ES2015. Este es el modo por defecto, proporcionando una mayor compatibilidad con JavaScript, a expensas del tiempo de inicio, el uso de RAM y el rendimiento.

## Comparación de rendimiento

Hay una diferencia sustancial en el rendimiento entre ambos modos, como se muestra en el tiempo de GNU a continuación, especialmente cuando se ejecutan pruebas con un gran número de VUs:

<CodeGroup labels={["Base Mode", "Extended Mode"]}>

```bash
$ /usr/bin/time -v k6 run \
    --compatibility-mode=base \
    --vus 3500 \
    --duration=60s \
    script.js

[...]
User time (seconds): 15.10
System time (seconds): 10.02
Percent of CPU this job got: 40%
Elapsed (wall clock) time (h:mm:ss or m:ss): 1:01.88
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 903612
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 1
Minor (reclaiming a frame) page faults: 352090
Voluntary context switches: 558479
Involuntary context switches: 4689
Swaps: 0
File system inputs: 0
File system outputs: 78856
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```

```bash
$ /usr/bin/time -v k6 run \
    --compatibility-mode=extended \
    --vus 3500 \
    --duration=60s \
    script.js

[...]
User time (seconds): 104.44
System time (seconds): 6.96
Percent of CPU this job got: 101%
Elapsed (wall clock) time (h:mm:ss or m:ss): 1:49.49
Average shared text size (kbytes): 0
Average unshared data size (kbytes): 0
Average stack size (kbytes): 0
Average total size (kbytes): 0
Maximum resident set size (kbytes): 7972316
Average resident set size (kbytes): 0
Major (requiring I/O) page faults: 1
Minor (reclaiming a frame) page faults: 2595676
Voluntary context switches: 535511
Involuntary context switches: 9306
Swaps: 0
File system inputs: 0
File system outputs: 78856
Socket messages sent: 0
Socket messages received: 0
Signals delivered: 0
Page size (bytes): 4096
Exit status: 0
```

</CodeGroup>
