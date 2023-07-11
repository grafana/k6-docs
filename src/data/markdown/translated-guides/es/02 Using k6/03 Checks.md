---
title: 'Checks'
excerpt: 'Checks son aserciones, pero difieren en que no detienen la ejecución, en su lugar, sólo almacenan el resultado de la comprobación, pase o no, y dejan que la ejecución del script continúe.'
---

## ¿Qué es un check?

Las [checks](/javascript-api/k6/check/) son como afirmaciones, pero se diferencian en que no detienen la ejecución. En su lugar, almacenan el resultado de la verificación, pasa o no pasa, y deja que continúe la ejecución del script. Eche un vistazo a [thresholds](/using-k6/thresholds) para encontrar una forma de detener la ejecución de una prueba basada en comprobaciones.

### Verifica el código de respuesta HTTP devuelto

`Checks` son excelentes para codificar aserciones relacionadas con peticiones/respuestas HTTP, asegurándose de que el código de respuesta es 2xx, por ejemplo:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
```

</CodeGroup>

### Verifique el texto en el cuerpo de la respuesta devuelto

A veces, incluso una respuesta HTTP 200 puede contener un mensaje de error. En estas situaciones, considere agregar una marca para verificar el cuerpo de la respuesta, como este:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'verify homepage text': (r) =>
      r.body.includes('Collection of simple web-pages suitable for load testing'),
  });
}
```

</CodeGroup>

### Verifica el tamaño de respuesta del body

Si desea verificar que la respuesta a una solicitud que envía k6 es de cierto tamaño, puede usar una verificación para eso como esta:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
```

</CodeGroup>

### Verificar salida

Cuando ejecuta un script que incluye verificaciones, puede ver el resultado de las llamadas de verificación en el siguiente resultado:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
    ✓ is status 200

  ...
  checks.........................: 100.00% ✓ 1        ✗ 0
  data_received..................: 11 kB   12 kB/s
```

</CodeGroup>

En el resultado anterior, puede ver que nuestra verificación "es el estado 200" fue exitosa el 100% de las veces que se llamó.

### Agregar varios checks

También puede agregar múltiples checks dentro de una sola declaración [check ()](/javascript-api/k6/check), como esta:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
```

</CodeGroup>

Cuando se ejecuta esta prueba, la salida se verá así:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run checks.js

  ...
    ✓ is status 200
    ✓ body size is 11,105 bytes

  ...
  checks.........................: 100.00% ✓ 2        ✗ 0
  data_received..................: 11 kB   20 kB/s
```

</CodeGroup>

> #### Acerca de los checks fallidos
>
> Cuando falla una verificación, el script continuará ejecutándose con éxito y no devolverá un estado de salida "fallido".
> Si necesita que toda la prueba falle según los resultados de una verificación, debe [combinar checks con thresholds](/using-k6/thresholds/#failing-a-load-test-using-checks).
> Esto es particularmente útil en contextos específicos, como la integración de k6 en sus canalizaciones de CI o la recepción de alertas al programar sus pruebas de rendimiento.

## Ver también

- [API de JavaScript](/javascript-api/k6/check/)
- [Fallo en una prueba de carga usando checks](/using-k6/thresholds/#failing-a-load-test-using-checks)
- [k6chaijs](/javascript-api/jslib/k6chaijs): usando BDD assertions en k6