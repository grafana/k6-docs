---
title: 'Stress testing'
excerpt: 'El propósito de las pruebas de estrés es evaluar la disponibilidad y la estabilidad del sistema bajo una carga pesada.
.'
---

Las pruebas de estrés (stress test) son uno de los diferentes tipos de pruebas de carga.

Mientras que las pruebas de carga se ocupan principalmente de evaluar el rendimiento de los sistemas, el propósito de las pruebas de estrés es evaluar la disponibilidad y la estabilidad del sistema bajo una carga pesada.


> ## ¿Qué es la prueba de  Estrés?
>
> La prueba de estrés es un tipo de prueba de carga que se utiliza para determinar los límites del sistema. El objetivo de esta prueba es verificar la estabilidad y fiabilidad del sistema en condiciones extremas.

Para realizar una prueba de estrés adecuada, se necesita una herramienta que lleve al sistema más allá de sus operaciones normales, hasta sus límites y más allá del punto de ruptura.
Normalmente se quiere hacer una prueba de estrés de una API o de un sitio web para
- determinar cómo se comportará su sistema en condiciones extremas.
- determinar cuál es la capacidad máxima de su sistema en términos de usuarios o rendimiento.
- determinar el punto de ruptura de su sistema y su modo de fallo.
- determinar si su sistema se recuperará sin intervención manual una vez finalizada la prueba de resistencia.
 
Cuando se realizan pruebas de estrés, usted va a configurar la prueba para incluir más usuarios concurrentes o generar un rendimiento más alto que:
- Lo que su aplicación normalmente ve.
- Lo que crees que será capaz de manejar.

Es importante tener en cuenta que una prueba de estrés no significa que vayas a sobrecargar el sistema inmediatamente - eso es una prueba de pico, vamos a cubrirlo en un minuto.

Una prueba de estrés debe ser configurada en muchos pasos graduales, cada paso incrementando la carga concurrente del sistema.

Un ejemplo clásico de la necesidad de realizar pruebas de estrés es el "Black Friday" o el "Cyber Monday", dos días al año que generan varias veces el tráfico normal para muchos sitios web.

Una prueba de estrés puede consistir en sólo un par de pasos o en muchos, como se ve en el ejemplo siguiente. Independientemente del número de pasos que incluya, recuerde que este tipo de prueba consiste en averiguar lo que ocurre cuando se empujan los límites de rendimiento de su sistema, así que no se preocupe por ser demasiado agresivo.

Dicho esto, probablemente no quieras ejecutar esta prueba contra tu entorno de producción. Recomendamos ejecutar una prueba de estrés en un entorno UAT o de ensayo.


## Pruebas de stress para APIs en K6

Usted puede crear fácilmente una prueba de estrés en k6 configurando adecuadamente el objeto de opciones. Recuerde, el punto de esta prueba es empujar gradualmente sus APIs más allá de su punto de ruptura. Probablemente lo más fácil es empezar con un ejemplo.

<CodeGroup labels={["API stress test k6 example"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'https://test-api.k6.io'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/public/crocodiles/1/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/2/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/3/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/4/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
  ]);

  sleep(1);
}
```

</CodeGroup>

El gráfico de VU de una prueba de esfuerzo debería tener un aspecto similar a este:

![Virtual user chart of an API stress test](./images/stress-test.png)

Esta configuración aumenta la carga en 100 usuarios cada 2 minutos y se mantiene en este nivel durante 5 minutos. También hemos incluido una etapa de recuperación al final, en la que el sistema disminuye gradualmente la carga hasta llegar a 0.

Si su infraestructura está configurada para el autoescalado, esta prueba le ayudará a determinar

- La rapidez con la que los mecanismos de autoescalado reaccionan al aumento de la carga.
- Si hay fallos durante los eventos de escalado.

El objetivo de la etapa de recuperación es determinar si el sistema puede servir peticiones una vez que la carga disminuye a un nivel normal. Si está probando el autoescalado, es posible que quiera reducir la escala en pasos también para determinar si la reducción de la escala está funcionando.


## Spike testing

La prueba de picos (spike test) es una variante de la prueba de estrés, pero no aumenta gradualmente la carga, sino que alcanza una carga extrema en un periodo de tiempo muy corto. Mientras que una prueba de estrés permite al SUT (sistema bajo prueba) escalar gradualmente su infraestructura, una prueba de picos no lo hace.

> ### ¿Qué es la prueba de Spike (picos)?
>
> La prueba de picos es un tipo de prueba de estrés que abruma inmediatamente el sistema con un aumento extremo de la carga.

Usted quiere ejecutar una prueba de pico para:

- Determinar cómo funcionará su sistema ante un aumento repentino del tráfico.
- Determinar si su sistema se recuperará una vez que el tráfico haya disminuido.

Una necesidad clásica de una prueba de pico es si ha comprado publicidad en un gran evento televisivo, como la Super Bowl o un concurso de canto popular.

Esperas que un gran número de personas vean tu anuncio y visiten inmediatamente tu sitio web, lo que puede acabar con resultados desastrosos si no has hecho pruebas para este escenario y has optimizado el rendimiento de antemano.

Otro ejemplo típico es el "HackerNews hug of death": alguien enlaza a su sitio web en uno de los foros de Internet más populares, como HackerNews o Reddit, lo que hace que miles de personas visiten su sistema al mismo tiempo.

El éxito o el fracaso de una prueba de picos depende de sus expectativas. Los sistemas suelen reaccionar de 4 maneras diferentes:

- Excelente: el rendimiento del sistema no se degrada durante el aumento del tráfico. El tiempo de respuesta es similar durante el bajo tráfico y el alto tráfico.
- Bueno: El tiempo de respuesta es más lento, pero el sistema no produce errores. Se atienden todas las solicitudes.
- Pobre: el sistema produce errores durante la oleada de tráfico, pero se recupera a la normalidad después de que el tráfico disminuye.
- Mal: El sistema se bloquea y no se recupera después de que el tráfico haya disminuido.

## Spike testing en k6

He aquí un ejemplo de configuración de script para una prueba de picos.

<CodeGroup labels={["Spike test k6 example"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // spike to 1400 users
    { duration: '3m', target: 1400 }, // stay at 1400 for 3 minutes
    { duration: '10s', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};
export default function () {
  const BASE_URL = 'https://test-api.k6.io'; // make sure this is not production

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/public/crocodiles/1/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/2/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/3/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
    [
      'GET',
      `${BASE_URL}/public/crocodiles/4/`,
      null,
      { tags: { name: 'PublicCrocs' } },
    ],
  ]);

  sleep(1);
}
```

</CodeGroup>

El gráfico VU de una prueba de picos debería tener un aspecto similar a este:
![Virtual user chart of a spike test](./images/spike-test.png)

Tenga en cuenta que la prueba comienza con un período de 1 minuto de carga baja, un pico rápido de carga muy alta, seguido de un período de recuperación de carga baja.

Recuerde que el objetivo de esta prueba es sobrecargar repentinamente el sistema. No tenga miedo de aumentar el número de VUs más allá de su peor predicción. Dependiendo de sus necesidades, puede querer extender la etapa de recuperación a más de 10 minutos para ver cuando el sistema finalmente se recupera.


## Conclusiones

Las pruebas de estrés y de pico ayudan a prepararse para las condiciones extremas que inevitablemente encontrará su sistema en producción.

Prepararse para lo inevitable es un signo de madurez para una organización técnica. Las pruebas de estrés no sólo hacen que su sistema sea más fiable, sino que también disminuyen el nivel de estrés de sus equipos de operaciones y desarrollo.

Una vez que su sistema es a prueba de estrés, es posible que desee ejecutar una “Soak Test” para ver si otros problemas de fiabilidad no surgen durante un período prolongado.

## Vea también

- [Ejecución de pruebas a gran escala](/es/guias-de-prueba/pruebas-a-gran-escala/)