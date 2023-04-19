---
title: 'Pruebas de carga para APIs'
head_title: 'Introducción a las pruebas de carga para APIs: la guía k6'
excerpt: 'Las pruebas de carga de API tienen muchas facetas. Esta guía presenta las pruebas de performance y las mejores prácticas para realizar pruebas de carga de sus APIs con k6.'
---

Una prueba de carga de API generalmente comienza con pequeñas cargas en componentes aislados. A medida que se verifica que los componentes aislados cumplen con los requerimientos de performance con cargas pequeñas, puede considerar incluir en su estrategia pruebas a la API de una manera más completa. En este proceso, probará su API con más solicitudes, duraciones más largas y un mayor alcance, e incluir en un solo script desde componentes aislados hasta flujos de trabajo completos de extremo a extremo.

Cuando diseñe sus pruebas de API, primero evalúe las razones para probar la API:
- ¿Qué flujos o componentes desea probar?
- ¿Cómo va a ejecutar la prueba?
- ¿Qué valores determinan un performance aceptable?

Una vez que pueda responder a estas preguntas, su estrategia de prueba de API probablemente seguirá pasos como los siguientes:
1. **Creación del script de prueba**. Codifique los flujos de usuario, parametrice los datos de prueba y agrupe las URLs.
2. **Verifique que el script funcione y el performance de la aplicación**. Use `Checks` para comprobar que el sistema responda correctamente y utilice «Thresholds» para asegurarse de que el sistema funcione dentro de niveles de servicio aceptables.
3. **Modele y simule la carga**. Elija a los ejecutores (executors) adecuados para modelar la carga de trabajo apropiada para sus objetivos de prueba. Asegúrese de que los generadores de carga estén ubicados donde deberían estar.
4. **Itere sobre su set de pruebas**. Con el tiempo, podrá reutilizar la lógica de sus scripts (por ejemplo, un flujo de inicio de sesión de usuario o una configuración de parámetros para el ‘Throughput’). También podrá ejecutar pruebas con un alcance más amplio o como parte de su set de pruebas automatizadas.

Las siguientes secciones proporcionan explicaciones específicas y ejemplos para los pasos de este proceso.

## Identificar los componentes a probar

Antes de comenzar las pruebas, identifique los componentes que desea probar. ¿Desea probar un único punto final (endpoint) o un flujo de pasos?

El siguiente script utiliza el módulo [HTTP k6](https://k6.io/docs/javascript-api/k6-http/) para probar un único punto final.

```javascript
import http from 'k6/http';

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
}
```

Esta es una prueba básica, solo contiene una llamada a un componente. 
Generalmente, su conjunto de pruebas progresará de scripts como el anterior, a flujos de trabajo más complejos. En este proceso, su set de pruebas avanzará a través de la [pirámide de la automatización de pruebas](https://martinfowler.com/articles/practical-test-pyramid.html) de la siguiente manera:

- **Probar una API aislada**. Intentará conectarse repetidamente al punto final (endpoint) de una API, por ejemplo: [ab](https://httpd.apache.org/docs/2.4/programs/ab.html), para conocer el performance de base, el punto de quiebre o la disponibilidad. Si un componente no cumple con los requisitos de performance, a este se le considera un cuello de botella. Generalmente, la definición de la cantidad de carga es en solicitudes por segundo.
- **Probar APIs integradas**. Probará una o varias APIs que interactúen con otras APIs ya sea internas o externas. Se puede probar uno o varios sistemas.
- **Prueba de flujos de API de inicio a fin (end to end)**. Simulará interacciones realistas entre las APIs para probar el sistema como un conjunto. La atención se centra a menudo en acciones frecuentes y críticas del usuario.

Su set de pruebas de carga debe incluir una amplia gama de pruebas. Pero, cuando comience, empiece de forma pequeña y simple, probando API individuales y pruebas de integración sencillas.

## Determinar el motivo de la prueba

Antes de configurar la carga de la prueba, debe saber qué patrones de tráfico desea probar en la API. Una prueba de carga generalmente tiene como objetivo una de estas dos cosas:

- Validar la fiabilidad con el tráfico esperado.
- Descubrir los problemas y límites del sistema al recibir tráfico inusual.

Por ejemplo, su equipo podría crear un set de pruebas para flujos comunes de usuarios bajo un uso promedio, y otro conjunto para encontrar puntos de quiebre en la API. Incluso si la lógica de prueba permanece igual, su carga podría cambiar.

El objetivo de la prueba determina qué tipo de prueba se debe usar, lo cual, a su vez, determina la carga de prueba. Considere los siguientes tipos de prueba que corresponden a diferentes perfiles y objetivos:

- [Smoke test](https://k6.io/docs/test-types/smoke-testing). Verifique su script y las funciones del sistema con una carga mínima.
- [“Average” load test](https://k6.io/docs/test-types/load-testing/). Descubra cómo reacciona el sistema al recibir tráfico típico.
- [Stress test](https://k6.io/docs/test-types/stress-testing). Descubra cómo funciona el sistema con una carga de tráfico superior a lo típico.
- [Spike test](https://k6.io/docs/test-types/stress-testing#spike-testing-in-k6). Descubra cómo funciona el sistema con repentinos y masivos aumentos en el tráfico.
- [Breaking test](https://github.com/grafana/k6-learn/blob/main/Modules/I-Performance-testing-principles/03-Load-Testing.md#breakpoint-test). Incrementa progresivamente el tráfico para descubrir los puntos de quiebre del sistema.
- [Soak test](https://k6.io/docs/test-types/soak-testing). Descubra como y en qué momento se degrada el sistema bajo cargas de mayor duración.

Los tipos de prueba que elija definen cómo planificar y estructurar su prueba. Pero cada aplicación, organización y proyecto de prueba es diferente. Nuestra recomendación es siempre:

> **"Comience por lo básico y haga pruebas con frecuencia. Itere y crezca su set de pruebas".**

Una vez que haya decidido el tipo de carga, puede programarlo con las opciones k6.

## Modele la carga

Para configurar la carga de trabajo, utilice las [opciones de prueba](https://k6.io/docs/using-k6/k6-options/). La configuración define el tráfico generado por la prueba. k6 proporciona dos formas generales de modelar la carga:

- A través de usuarios virtuales (VU), para simular usuarios concurrentes.
- A través de solicitudes por segundo, para simular el volumen de transacciones.

<Blockquote mod="note" title="Comando Sleep al probar APIs">

En general, sus pruebas de carga deben añadir [pausas](https://k6.io/docs/javascript-api/k6/sleep/). Dichas pausas ayudan a controlar el generador de carga y simula mejor los patrones de tráfico de humanos interactuando con su sistema.

Sin embargo, cuando se trata de pruebas de carga de API, estas recomendaciones vienen con algunas condiciones. Si prueba un componente aislado, es posible que solo le importe el performance bajo un determinado volumen de transacciones. Pero, incluso en este caso, el comando de pausa (sleep) puede ayudar a evitar exceso de trabajo del generador de carga, e incluir unos pocos milisegundos aleatorios de pausa para evitar concurrencias accidentales.

Cuando pruebe la API con flujos de trabajo normales como si fuesen ejecutados por humanos, agregue pausas entre solicitudes como en una prueba normal.

</Blockquote>

### Usuarios virtuales

Cuando modela la carga utilizando usuarios virtuales, las opciones básicas son:

- [`vus`](https://k6.io/docs/using-k6/k6-options/reference/#vus)
- [`duration`](https://k6.io/docs/using-k6/k6-options/reference/#duration)
- [`iterations`](https://k6.io/docs/using-k6/k6-options/reference/#iterations)

Esto se puede definir en la sección de opciones (options) en el script de prueba. En la siguiente prueba, 50 usuarios simultáneos ejecutan continuamente el flujo `default` durante 30 segundos.

```javascript
import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
}
```

### Flujo de solicitudes

Al analizar el performance del punto final (endpoint) de la API, la carga generalmente se calcula por flujo de solicitudes, ya sean solicitudes por segundo o por minuto.

Para configurar las cargas de trabajo de usando un objetivo de flujo de solicitudes, utilice el ejecutor (executor) [constant arrival rate](https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/).

`constant-arrival-rate` establece una tasa constante de ejecuciones sobre la función del script. Cada iteración puede generar una o varias solicitudes.

Para alcanzar un objetivo de flujo de solicitudes (`RequestsRate`), siga estos pasos:

1. Fije el objetivo de la frecuencia de solicitudes por unidad de tiempo, ya sea por segundo o por minuto.
2. Busque cuantas solicitudes se hacen por iteración (`RequestsPerIteration`).
3. Establezca la tasa de iteración dividiendo las solicitudes objetivo por segundo entre el número de solicitudes por iteración.
    
    `rate` =  `RequestsRate ÷ RequestsPerIteration`.

Para alcanzar el objetivo de 50 solicitudes por segundo con el ejemplo anterior:

1. Establezca la opción `timeUnit` en `1s`.
2. El número de solicitudes por iteración es 1.
3. Defina la opción `rate` en 50/1 (para que sea igual a 50).

```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources     preAll

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  http.post('https://httpbin.test.k6.io/post', payload, { headers });
}
```

Esta prueba genera el número total de solicitudes HTTP y RPS (solicitudes por segundo) en la métrica `http_reqs`:

```bash
# the reported value is close to the 50 RPS target
 http_reqs......................: 1501   49.84156/s

# the iteration rate is the same as rps, because each iteration runs only one request
iterations.....................: 1501   49.84156/s
```

Para ver un ejemplo más detallado, consulte la siguiente publicación: [generating a constant request rate](https://k6.io/blog/how-to-generate-a-constant-request-rate-with-the-new-scenarios-api/).

Usando el ejecutor (executor) `constant-arrival-rate`, la carga será constante durante toda la prueba. Para aumentar o reducir el flujo de solicitudes, utilice el ejecutor [`ramping-arrival-rate`](https://k6.io/docs/using-k6/scenarios/executors/ramping-arrival-rate/) en su lugar.

Para ver todas las formas de modelar la carga en k6, consulte [Scenarios](https://k6.io/docs/using-k6/scenarios/).

## Verificar la funcionalidad con Checks (comprobaciones)

Tradicionalmente, las pruebas de performance se centran más en:

- La latencia: qué tan rápido responde el sistema.
- La disponibilidad: con qué frecuencia devuelve errores el sistema.

La métrica `http_req_duration` informa de la latencia y `http_req_failed` informa sobre la tasa de errores de las solicitudes HTTP. Estos son los resultados de la prueba anterior:

```bash
http_req_duration..............: avg=106.14ms min=102.54ms med=104.66ms max=198.93ms p(90)=113.78ms p(95)=114.58ms
    { expected_response:true }...: avg=106.14ms min=102.54ms med=104.66ms max=198.93ms p(90)=113.78ms p(95)=114.58ms
http_req_failed................: 0.00% ✓ 0    ✗ 1501
```

Es posible que el análisis de los resultados de la prueba deba ir más allá de lo que permiten las métricas predeterminadas de k6. Para obtener un análisis más relevante de los resultados, es posible que también desee validar las funcionalidades e informar de los errores.

Algunos fallos de la aplicación ocurren sólo bajo ciertas condiciones de carga, como un alto tráfico. Estos errores son difíciles de encontrar. Para encontrar la causa de los fallos más rápidamente, instrumente sus APIs y verifique que las solicitudes obtengan las respuestas esperadas. Para verificar la respuesta de la aplicación en k6, puede usar `Checks`.

[Check](https://k6.io/docs/using-k6/checks/) es un comando que valida diversas condiciones durante la ejecución de la prueba. Por ejemplo, puede usar check verificar las respuestas de la API. Con las verificaciones (checks), puede confirmar diversas respuestas de la API, como el estado HTTP o cualquier dato devuelto.

Nuestro script ahora verifica el estado de la respuesta HTTP, los encabezados y la carga útil.

```javascript
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};

export default function () {
  const payload = JSON.stringify({
    name: 'lorem',
    surname: 'ipsum',
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, { headers });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === 'lorem',
  });
}
```

En este fragmento, todas las verificaciones tuvieron éxito:

```bash
my_scenario1 ✓ [======================================] 00/50 VUs  30s  50.00 iters/s
     ✓ Post status is 200
     ✓ Post Content-Type header
     ✓ Post response name
```

Después, si incrementamos la carga a 300 solicitudes por segundo, los resultados arrojaron 8811 solicitudes exitosas y 7 checks fallados:

```bash
my_scenario1 ✓ [======================================] 000/300 VUs  30s  300.00 iters/s
     ✗ Post status is 200
      ↳  99% — ✓ 8811 / ✗ 7
     ✗ Post Content-Type header
      ↳  99% — ✓ 8811 / ✗ 7
     ✗ Post response name
      ↳  99% — ✓ 8811 / ✗ 7
```

Una verificación fallida no suspende ni aborta la prueba por default. En este sentido, una verificación (check) difiere de cómo funcionan las aserciones (assertions) para otros tipos de pruebas. Una prueba de carga puede ejecutar miles o millones de iteraciones, cada una con docenas de aserciones.

Es aceptable que haya una **pequeña tasa de fallo**, todo depende del «número de nueves» de su SLO o el presupuesto de error de su organización.

## Ponga a prueba sus objetivos de confiabilidad con «Thresholds»

Cada prueba debe tener objetivos. Las organizaciones de ingeniería establecen sus objetivos de fiabilidad utilizando los [objetivos de nivel de servicio](https://en.wikipedia.org/wiki/Service-level_objective)) (SLO, por sus siglas en inglés) para validar la disponibilidad, el performance o cualquier objetivo de performance.

Los SLO pueden definirse en distintos ámbitos, como puede ser en el nivel de un componente de infraestructura, de una API, o de toda la aplicación. Algunos ejemplos de SLO podrían ser:

- El 99 % de las APIs que devuelven información del producto responden en menos de 600 ms.
- El 99.99 % de las solicitudes fallidas iniciando sesión responden en menos de 1000 ms.

Diseñe sus pruebas de carga con criterios de pase/fallo para validar los SLO, los objetivos de confiabilidad, u otras métricas importantes. Para garantizar que su sistema pase sus SLOs, realice pruebas con frecuencia, tanto en los ambientes de preproducción como en los de producción.

En k6, puede usar [Thresholds](https://k6.io/docs/using-k6/thresholds/) para establecer los criterios de pase/fallo de la prueba. 

Este script codifica dos SLOs en la sección de thresholds, uno sobre la tasa de errores (disponibilidad) y otro sobre la duración de la solicitud (latencia).

```javascript
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  scenarios: {
    my_scenario1: {
      executor: 'constant-arrival-rate',
      duration: '30s', // total duration
      preAllocatedVUs: 50, // to allocate runtime resources

      rate: 50, // number of constant iterations given `timeUnit`
      timeUnit: '1s',
    },
  },
};
```

Cuando k6 ejecuta una prueba, el resultado indica si las métricas pasaron los umbrales (thresholds), ✅, o no, ❌. En esta ocasión, la prueba pasó ambos umbrales.

```bash
✓ http_req_duration..............: avg=104.7ms  min=101.87ms med=103.92ms max=120.68ms p(90)=107.2ms  p(95)=111.38ms
    { expected_response:true }...: avg=104.7ms  min=101.87ms med=103.92ms max=120.68ms p(90)=107.2ms  p(95)=111.38ms
✓ http_req_failed................: 0.00%   ✓ 0         ✗ 1501
```

Cuando la prueba falla, la interfaz de línea de comandos (CLI) de k6 devuelve un código de salida distinto de cero, una condición necesaria al automatizar pruebas. Como ejemplo de una prueba fallida, aquí tenemos el resultado de una prueba con un umbral que establece que el 95 % de las solicitudes terminen en menos de 50 ms, `http_req_duration:["p(95)<50"]`: 

```bash
running (0m30.1s), 00/50 VUs, 1501 complete and 0 interrupted iterations
my_scenario1 ✓ [======================================] 00/50 VUs  30s  50.00 iters/s

     ✓ Post status is 200
     ✓ Post Content-Type header
     ✓ Post response name

     checks.........................: 100.00% ✓ 4503      ✗ 0
     data_received..................: 1.3 MB  45 kB/s
     data_sent......................: 313 kB  10 kB/s
     http_req_blocked...............: avg=9.26ms   min=2µs      med=14µs     max=557.32ms p(90)=25µs     p(95)=46µs
     http_req_connecting............: avg=3.5ms    min=0s       med=0s       max=113.46ms p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=105.14ms min=102.01ms med=103.86ms max=171.56ms p(90)=112.4ms  p(95)=113.18ms
       { expected_response:true }...: avg=105.14ms min=102.01ms med=103.86ms max=171.56ms p(90)=112.4ms  p(95)=113.18ms
   ✓ http_req_failed................: 0.00%   ✓ 0         ✗ 1501
     http_req_receiving.............: avg=202.86µs min=17µs     med=170µs    max=4.69ms   p(90)=264µs    p(95)=341µs
     http_req_sending...............: avg=97.56µs  min=11µs     med=63µs     max=5.56ms   p(90)=98µs     p(95)=133µs
     http_req_tls_handshaking.......: avg=4.14ms   min=0s       med=0s       max=169.35ms p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=104.84ms min=101.88ms med=103.6ms  max=171.52ms p(90)=112.18ms p(95)=112.85ms
     http_reqs......................: 1501    49.834813/s
     iteration_duration.............: avg=115.18ms min=102.51ms med=104.66ms max=704.99ms p(90)=113.68ms p(95)=115.54ms
     iterations.....................: 1501    49.834813/s
     vus............................: 50      min=50      max=50
     vus_max........................: 50      min=50      max=50

ERRO[0030] some thresholds have failed
```

## Consideraciones cuando se crean scripts

Si tiene experiencia haciendo pruebas con scripts, la creación de scripts de k6 debería resultar familiar. Las pruebas de k6 se escriben en JavaScript, y el diseño de la API de k6 es similar a otras plataformas de pruebas.

Pero, a diferencia de otros tipos de pruebas, los scripts de pruebas de carga ejecutan sus pasos cientos, miles o millones de veces. La presencia de la carga crea algunas preocupaciones específicas. Cuando realice pruebas de carga de una API con k6, considere los siguientes aspectos al diseñar su script.

### Parametrización de datos

La parametrización de datos ocurre cuando se reemplazan los datos de prueba codificados con valores dinámicos. La parametrización facilita la gestión de una prueba de carga con diversos usuarios y llamadas a la API. Un caso común para la parametrización ocurre cuando se desea usar diferentes valores de `userID` y `password` para cada usuario virtual o iteración.

Por ejemplo, imaginemos un archivo JSON con una lista de información de usuarios como:

<CodeGroup labels={["users.json"]}>

```json
{
  "users": [
    { "username": "lorem", "surname": "ipsum" },
    { "username": "dolorem", "surname": "ipsum" },
  ]
}
```

</CodeGroup>

Puede parametrizar los usuarios usando el objeto [`SharedArray`](/javascript-api/k6-data/sharedarray/) de la siguiente manera:

```javascript
import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users.json', function () {
  return JSON.parse(open('./users.json')).users;
});

export const options = {};

export default function () {
  // now, user data is not the same for all the iterations
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });

  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, {
    headers,
  });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === user.username,
  });
}
```

Para obtener más información sobre la parametrización de datos, consulte [parameterization examples](https://k6.io/docs/examples/data-parameterization/) y [Execution context variables](https://k6.io/docs/using-k6/execution-context-variables/).

### Gestión de errores y aceptación de fallos

**Recuerde implementar gestión de errores dentro de la lógica de la prueba.** Al recibir una carga suficientemente pesada, el sistema que se está probando (SUT) puede fallar y responder con errores. Aunque la prueba podría estar diseñada para provocar fallos, a veces nos centramos solo en los escenarios optimistas y olvidamos la importancia de la posibilidad de errores.

El script de la prueba debe gestionar los errores de la API para evitar excepciones de ejecución y para asegurarse de probar cómo se comporta el SUT al saturarse, de acuerdo con los objetivos de la prueba. Por ejemplo, podríamos extender nuestro script para hacer alguna operación dependiente del resultado de la solicitud anterior:

```javascript
import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users.json', function () {
  return JSON.parse(open('./users.json')).users;
});

export const options = {};

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];
  const payload = JSON.stringify({
    name: user.username,
    surname: user.surname,
  });
  const headers = { 'Content-Type': 'application/json' };
  const res = http.post('https://httpbin.test.k6.io/post', payload, {
    headers,
  });

  check(res, {
    'Post status is 200': (r) => res.status === 200,
    'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
    'Post response name': (r) => res.status === 200 && res.json().json.name === user.username,
  });

  if (res.status === 200) {
    // enters only successful responses
    // otherwise, it triggers an exception
    const delPayload = JSON.stringify({ name: res.json().json.name });
    http.patch('https://httpbin.test.k6.io/patch', delPayload, { headers });
  }
}
```

### Reutilización y modularización de las pruebas

Las pruebas de carga pueden tener un gran alcance e incluir diferentes tipos de pruebas. En general, los equipos comienzan con pruebas de carga simples o pruebas críticas, y continúan agregando pruebas para nuevos casos de uso, flujos de usuarios, patrones de tráfico, características, sistemas, etc.

En este proceso, los sets de pruebas de carga crecen con el tiempo. Para minimizar el trabajo repetitivo, intente reutilizar scripts de prueba pasados y modularizar las funciones y la lógica de la prueba. Si escribe procesos comunes en módulos reutilizables, es más fácil crear diferentes tipos de pruebas de carga. El proceso de creación de una nueva prueba de carga es el siguiente:

1. Crear un nuevo archivo.
2. Configurar la carga específica y otras opciones.
3. Importar el proceso.

A medida que sus pruebas maduren, considere crear pruebas que [combine multiple scenarios](https://k6.io/docs/using-k6/scenarios/advanced-examples/#combine-scenarios) para simular diversas variaciones de tráfico.

### URL dinámicas para un punto final(EndPoint)

De forma predeterminada, cuando accede al mismo punto final (EndPoint) de una API con diferentes URL, por ejemplo, `http://example.com/posts/${id}`, k6 informa de los resultados por separado. Esto puede crear una cantidad innecesaria de métricas.

Para agrupar los resultados del punto final (EndPoint), utilice [URL grouping](https://k6.io/docs/using-k6/http-requests/#url-grouping).

## Ubicaciones del generador de carga

Cuando planifique la prueba, considere las ubicaciones de sus generadores de carga, es decir, las máquinas que ejecutan la prueba. A veces, ejecutar la prueba desde una ubicación específica es un requisito de la prueba. Otras veces, puede elegir la ubicación en función de cómo le resulte más conveniente o práctico. De cualquier manera, cuando establezca la ubicación del generador de carga, tenga en cuenta lo siguiente:

- **Ubicaciones requeridas**. Para comparar el performance o garantizar resultados precisos, algunas pruebas de carga deben medir la latencia desde ubicaciones específicas. Estas pruebas lanzan los generadores de carga desde ubicaciones que coinciden con la región de su usuario.
- **Ubicaciones opcionales**. Otras pruebas comparan las mediciones contra una base de referencia, para ver cómo cambia el performance del sistema a partir de métricas base de la aplicación. Para evitar resultados de latencia confusos, asegúrese de que la ubicación del generador de carga sea la misma en todas las ejecuciones de prueba y evite ejecutar las pruebas desde ubicaciones que estén demasiado cerca del Sistema probado (SUT por sus siglas en Inglés).

### APIs internas

Las pruebas de API que replican los flujos de usuarios del mundo real con pasos de inicio a fin acceden a las API públicas desde sistemas externos. Otras API son internas y no se puede acceder a ellas desde el exterior. La necesidad de ejecutar pruebas internas es común cuando se prueban integraciones de API y puntos finales (EndPoints) aislados.

Si la API se encuentra en un entorno interno o restringido, se puede usar k6 para probarla de varias maneras diferentes:

- Ejecute la prueba desde su red privada utilizando el comando "k6 run" o el [Kubernetes operator](https://github.com/grafana/k6-operator). Opcionalmente, almacene los resultados de la prueba en [k6 Cloud](https://k6.io/docs/results-output/real-time/cloud/) u otros [servicios externos](https://k6.io/docs/results-output/real-time/).
- Para pruebas en la nube:
  - [Abra su firewall](https://k6.io/docs/cloud/creating-and-running-a-test/troubleshooting/#open-a-firewall-for-k6-cloud) para el tráfico de prueba desde la nube.
  - Ejecute la prueba en la nube desde sus [instancias privadas de AWS EC2](https://k6.io/docs/cloud/creating-and-running-a-test/private-load-zones/).

## Herramientas complementarias

Es posible que desee utilizar k6 junto con otras herramientas de API.

### Integración con herramientas API

Hay muchas herramientas para las API de REST, pero no se centran demasiado en las pruebas de performance. k6 le ofrece varios convertidores para ayudarle a incorporar un ecosistema de herramientas de API más amplio en sus pruebas de carga:

- [Postman-to-k6 converter](https://github.com/apideck-libraries/postman-to-k6): para crear una prueba de k6 a partir de una colección de Postman.

  ```bash
  postman-to-k6 collection.json -o k6-script.js
  ```

- [OpenAPI k6 generator](https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6/#api-load-testing-with-swaggeropenapi-specification): para crear una prueba de k6 a partir de una definición de Open API (anteriormente Swagger).

  ```bash
  openapi-generator-cli generate -i my-api-spec.json -g k6
  ```

Estas herramientas generan una prueba de k6 que puede editar y ejecutar como de costumbre:

```bash
k6 run k6-script.js
```

Dependiendo del tipo de prueba, los convertidores podrían ayudarlo a crear rápidamente sus primeras pruebas o a alentar a nuevos miembros del equipo a usar k6. Aun así, le recomendamos que se familiarice con la [API de JavaScript de k6](https://k6.io/docs/javascript-api/) y escriba sus propias pruebas.

### Uso de grabadoras de proxy

Otra opción es generar automáticamente una prueba de k6 a partir de una sesión grabada. Estos scripts podrían ayudar a crear pruebas de integración o pasos de inicio a fin más complejas.

El [har-to-k6 converter](https://github.com/grafana/har-to-k6) crea la prueba de k6 a partir de una sesión grabada en formato HAR que contiene tráfico HTTP.

```bash
har-to-k6 archive.tar -o k6-script.js
```

La prueba k6 generada se puede editar y ejecutar como de costumbre:

```bash
k6 run k6-script.js
```

Para exportar una sesión grabada al formato HAR, utilice una grabadora de proxy como [Fiddler proxy](https://www.telerik.com/fiddler/fiddler-everywhere) o [GitLab HAR recorder](https://gitlab.com/gitlab-org/security-products/har-recorder/).

Al igual que con los convertidores anteriores, la grabadora puede ayudar a iniciar scripts de pruebas. Nuevamente, le recomendamos que aprenda a escribir sus scripts de prueba en lugar de usar sólo convertidores.

## Más allá de las APIs de HTTP

Debido a la popularidad de las web APIs y de REST, en esta guía hemos utilizado el término enfocándose en las APIs de HTTP. Pero las API no están restringidas al protocolo HTTP.

De forma predeterminada, k6 permite realizar pruebas con los siguientes protocolos:

- [HTTP/1.1, HTTP/2](https://k6.io/docs/javascript-api/k6-http/)
- [WebSockets](https://k6.io/docs/javascript-api/k6-ws/)
- [Redis (experimental)](https://k6.io/docs/javascript-api/k6-experimental/redis/)
- [gRPC](https://k6.io/docs/javascript-api/k6-net-grpc/)

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('grpcb.in:9001');

  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(1);
};
```

Pero los software modernos no se diseñan usando sólo estos protocolos. Las infraestructuras y las aplicaciones modernas dependen de otros protocolos API para proporcionar nuevas funciones o mejorar su performance, procesamiento y fiabilidad.

Para probar el performance y la capacidad de estos sistemas, la herramienta de prueba debe ser capaz de generar solicitudes usando protocolos específicos para sus API.

Si k6 no es compatible con un protocolo que necesite, puede usar (o crear) [extensions](https://k6.io/docs/extensions/). La lista de extensiones es larga:

- Avro
- ZeroMQ
- Ethereum
- STOMP
- MLLP
- NATS
- and [más](https://k6.io/docs/extensions/get-started/explore/).



