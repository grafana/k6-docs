---
title: 'Variables de contexto'
excerpt: 'VU y ITER son variables globales con información del contexto de ejecución que k6 pone a disposición del script de prueba.'
---

[El tutorial "Ejecución de k6"](/es/empezando/ejecucion-de-k6/)  describe cómo k6 ejecuta un script de prueba para un número especificado de Usuarios Virtuales (VUs) y una duración de tiempo o un número fijo de iteraciones para cada VU.

Cuando se especifica la opción de duración, k6 ejecutará continuamente el script de prueba para cada VU hasta que la cantidad de tiempo de duración haya transcurrido.

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --vus 10 --duration 30s script.js
```

</CodeGroup>

Alternativamente, puede establecer la opción `iterations` para especificar el número de bucles completos del script de prueba que k6 ejecutará para cada VU.

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --vus 10 --iterations 100 script.js
```

</CodeGroup>

## \_\_VU and \_\_ITER

__VU y __ITER son variables globales con información del contexto de ejecución que k6 pone a disposición del script de prueba.

### \_\_ITER

Un contador numérico con el número de iteración actual para un VU específico. Basado en cero.

### \_\_VU

Número actual de la VU. El valor se asigna de forma incremental para cada nueva instancia de VU. Se basa en uno. Sin embargo, el número de VU es 0 mientras se ejecutan las funciones de `setup` y `teardown`.

> ### ⚠️ Ejecutando tests en k6 Cloud
>
>El valor **\_\_VU** cuando se ejecuté el test en k6 Cloud será por servidor/generador de carga. Puedes leer los detalles en la [documentación](/cloud/cloud-reference/).
>
>En k6 Cloud existen nuevas [variables de entorno](/cloud/creating-and-running-a-test/cloud-scripting-extras/cloud-environment-variables) que especifican el servidor, zona de carga  y distribución.

> ### ⚠️ Información de contexto adicional disponible en k6 Cloud
>
> Si está ejecutando una prueba en k6 Cloud tendrá variables de entorno adicionales que le indicarán en qué servidor, zona de carga y distribución de la prueba se está ejecutando actualmente. Puede leer más sobre ellas [aquí](/es/usando-k6/variables-de-entorno/).

## Coordinador de Pruebas k6

Los Usuarios Virtuales de k6 son concurrentes, se ejecutarán continuamente a través de su script hasta que la prueba termine o lleguen a su límite de iteración (si usted establece uno como se describió anteriormente). Cuando usted aumenta el número de Usuarios Virtuales, k6 iniciará otros nuevos en ese momento. Cuando se reduzca el número de usuarios virtuales, k6 los detendrá al finalizar la iteración.

## Examples

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://test.k6.io');
  console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);
  sleep(1);
}
```

</CodeGroup>

Se pueden lograr diferentes comportamientos de prueba y parametrizaciones haciendo uso de las variables de contexto de ejecución. Un caso de uso típico sería una prueba de carga que simula diferentes usuarios realizando un flujo de inicio de sesión.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const email = `user+${__VU}@mail.com`;
  const payload = JSON.stringify({ email: email, password: 'test' });
  const params = { headers: { 'Content-Type': 'application/json' } };
  http.post('http://test.k6.io/login', payload, params);
  console.log(email);
  // .. continue the user flow

  sleep(1);
}
```

</CodeGroup>
