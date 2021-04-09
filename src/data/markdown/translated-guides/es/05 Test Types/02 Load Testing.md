---
title: 'Load testing'
excerpt: 'Las pruebas de carga se ocupan principalmente de evaluar el rendimiento actual de su sistema en términos de usuarios concurrentes o solicitudes por segundo.'
---

Las pruebas de carga (load test) se ocupan principalmente de evaluar el rendimiento actual de su sistema en términos de usuarios concurrentes o solicitudes por segundo.

Cuando quiera entender si su sistema está cumpliendo los objetivos de rendimiento, este es el tipo de prueba que ejecutará.


When you want to understand if your system is meeting the performance goals, this is the type of test you'll run.

> #### Qué es la prueba de carga
>
> Las Pruebas de Carga son un tipo de Pruebas de Rendimiento utilizadas para determinar el comportamiento de un sistema tanto en condiciones normales como en condiciones de pico.
> Las Pruebas de Carga se utilizan para asegurar que la aplicación funciona satisfactoriamente cuando muchos usuarios acceden a ella al mismo tiempo.


Debe ejecutar la prueba de carga para:

1 - Evaluar el rendimiento actual de su sistema bajo carga típica y máxima.
2 - Asegurarse de que cumple continuamente los estándares de rendimiento a medida que realiza cambios en su sistema (código e infraestructura).

Es probable que tenga algún conocimiento sobre la cantidad de tráfico que su sistema está viendo en promedio y durante las horas pico. Esta información será útil a la hora de decidir cuáles deben ser sus objetivos de rendimiento, es decir, cómo configurar [thresholds de rendimiento](/es/usando-k6/thresholds/).

Digamos que estás viendo alrededor de 60 usuarios concurrentes en promedio y 100 usuarios durante las horas pico de operación.
Probablemente sea importante para usted cumplir los objetivos de rendimiento tanto en horas normales como en horas punta, por lo que se recomienda configurar la prueba de carga teniendo en cuenta la carga alta: 100 usuarios en este caso

## Prueba de carga en k6

Tenga en cuenta que esta prueba tiene un Threshold simple. El tiempo de respuesta para el 99% de las peticiones debe ser inferior a 1,5 segundos. Thresholds son una forma de asegurar que su sistema está cumpliendo con los objetivos de rendimiento que usted estableció para él.

<CodeGroup labels={["sample-load-test.js"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://test-api.k6.io';
const USERNAME = 'TestUser';
const PASSWORD = 'SuperCroc2020';

export default () => {
  let loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('access') !== '',
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('access')}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/my/crocodiles/`, authHeaders).json();
  check(myObjects, { 'retrieved crocodiles': (obj) => obj.length > 0 });

  sleep(1);
};
```

</CodeGroup>

Este es un script bastante simple que autentifica al usuario, y recupera la lista de objetos. Si desea ver una prueba más completa que haga uso de groups, Checks, Thresholds y funciones de ayuda, consulte nuestra sección de ejemplos.

El gráfico VU de una prueba de carga típica es similar a esto:

![Load Test VU chart](./images/load-test.png)

Obsérvese que el número de usuarios comienza en 0, y sube lentamente hasta el valor nominal, donde se mantiene durante un largo periodo de tiempo. La etapa de rampa descendente es opcional.

Le recomendamos que incluya siempre una etapa de rampa ascendente en todas sus pruebas de carga porque
- permite un precalentamiento del sistema o que este se autoescale para manejar el tráfico.
- le permite comparar el tiempo de respuesta entre las etapas de carga baja y carga nominal.
- si ejecuta una prueba de carga utilizando el servicio de nube SaaS, permite que las alertas de rendimiento automatizadas comprendan mejor el comportamiento normal de su sistema.


## Escenario de la prueba de carga: simulación de un día normal



También puede ir un paso más allá y configurar la prueba de carga para que se asemeje más a sus condiciones normales y de pico. En ese caso, podría configurar la prueba de carga para que se mantenga en 60 usuarios durante la mayor parte del día, y que aumente a 100 usuarios durante las horas de mayor actividad, para luego disminuir a la carga normal.
Asegúrese de no sobrepasar su número normal de VUs - eso no es una prueba de carga, es una [prueba de estrés (stress test)](/es/tipos-de-prueba/stress-testing).

<CodeGroup labels={["ramp-up-scenario.js"]} lineNumbers={[true]}>

```javascript
export let options = {
  stages: [
    { duration: '5m', target: 60 }, // simulate ramp-up of traffic from 1 to 60 users over 5 minutes.
    { duration: '10m', target: 60 }, // stay at 60 users for 10 minutes
    { duration: '3m', target: 100 }, // ramp-up to 100 users over 3 minutes (peak hour starts)
    { duration: '2m', target: 100 }, // stay at 100 users for short amount of time (peak hour)
    { duration: '3m', target: 60 }, // ramp-down to 60 users over 3 minutes (peak hour ends)
    { duration: '10m', target: 60 }, // continue at 60 for additional 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};
```

</CodeGroup>

The VU chart for the above configuration should look like this:

![Load Test VU chart](./images/load-test-2.png)

k6 es muy flexible a la hora de simular los escenarios de subida/bajada.

### Nota sobre thresholds

Siempre que se realizan pruebas de carga, se tienen en cuenta algunas expectativas.

Las expectativas típicas son:
- El 99% de las peticiones deben terminar en 5 segundos.
- El 95% de las solicitudes deben finalizar en 1 segundo.
- El 99% de los usuarios debería poder iniciar sesión con éxito en el primer intento.

Thresholds son una forma de describir sus expectativas de manera formal, y evaluar automáticamente esas expectativas en cada prueba. Una vez configurados, verás una métrica de Pasa/Falla para cada Threshold, y sabrás inmediatamente si tu sistema cumple tus expectativas sin necesidad de analizar los resultados en detalle.

> #### Comience con algo pequeño
>
> Si es la primera vez que ejecuta pruebas de carga, empiece con algo pequeño. Es posible que su aplicación e infraestructura no sean tan sólidas como cree. Hemos tenido miles de usuarios que han ejecutado pruebas de carga que rápidamente colapsaron sus aplicaciones (o entornos de ensayo).

Si su sistema se bloquea bajo una prueba de carga, significa que su prueba de carga se ha transformado en una [prueba de estrés (stress test)](/es/tipos-de-prueba/stress-testing), que es el siguiente tipo que vamos a tratar.
