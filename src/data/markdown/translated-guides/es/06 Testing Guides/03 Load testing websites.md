---
title: 'Pruebas de carga a sitios web'
excerpt: 'Esta guía proporciona orientación y recomendaciones para empezar, crear escenarios de usuario y evitar los errores más comunes para probar la carga de un sitio web.'
---

Una mala experiencia de usuario repercute en el negocio. Esta es la razón por la que usted podría querer saber cuántos usuarios concurrentes puede manejar su sitio web apropiadamente.

Las pruebas de carga le ayudan a simular esos usuarios para evaluar el rendimiento de su sistema y saber si su sitio o aplicación web cumple con sus objetivos.

Esta guía proporciona orientación y recomendaciones para empezar, crear escenarios de usuario y evitar los errores más comunes para probar la carga de un sitio web.

## Factores que afectan al rendimiento del sitio web

En un sitio web, el rendimiento es una parte crucial de la experiencia de usuario. A menudo se mide por el tiempo de respuesta para visualizar o interactuar con alguna información. Los dos principales factores que afectan el tiempo de respuesta de la experiencia del usuario son:

- Frontend
- Backend

El rendimiento del frontend se centra en las métricas del navegador como el tiempo de renderizado, el tiempo interactivo, el tiempo de carga, entre otros.

El rendimiento del backend, por otro lado, se centra principalmente en el tiempo de respuesta del servidor y la cantidad de errores devueltos.

¿Cuál es más importante? Depende. En términos generales, la [regla de oro del rendimiento](https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/) plantea lo siguiente:

> Entre el 80 y el 90% del tiempo de respuesta del usuario final se emplea en el frontend.

Pero esto no es necesariamente exacto.

Con una cantidad creciente de visitas a su sitio web, el tiempo de respuesta del frontend se mantiene más o menos igual. Sin embargo, cuando su sistema se enfrenta al aumento de la concurrencia, el **tiempo del backend puede crecer exponencialmente con el aumento de usuarios concurrentes**.

El siguiente gráfico ilustra esta situación:

![Frontend tiempo vs Backend tiempo cuando crece el número de visitantes](./images/Frontend-Backend-LoadTesting.png)

## ¿Cuándo hay que probar la carga de un sitio web?

En resumen, siempre que le sea preocupante la **disponibilidad y la escalabilidad de su sitio web**.

Si tiene un número muy bajo de usuarios, el rendimiento del backend no será probablemente un problema. Puedes dedicar tu tiempo a optimizar el frontend.

Pero a medida que el número de usuarios crece, deberías empezar a dedicar más tiempo a mejorar y probar el rendimiento de tu backend. En la [regla de oro del rendimiento](https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/), Steve Souders señaló que:

> Si te preocupa la disponibilidad y la escalabilidad, céntrate en el backend.

### Métricas del navegador y pruebas de carga

Cuando se prueba cómo se comporta el sistema con algunos usuarios concurrentes, las métricas del navegador son, en la mayoría de los casos, menos útiles.

Dado que cada navegador se ejecuta de forma independiente, el número de usuarios concurrentes en una prueba de carga no afectará a las métricas del navegador, como el tiempo de renderizado.

## Prueba de carga a un sitio web

Una prueba de carga se centra en comprobar **el rendimiento de las peticiones a su backend**. Los dos aspectos fundamentales a analizar son el **tiempo de respuesta** del servidor y el **número de errores**.

Por ejemplo, una prueba de carga que simule cientos de usuarios concurrentes podría validar que:

- El servidor no responde con errores.
- El tiempo de respuesta para el 95% de sus usuarios debe ser inferior a 400ms.
- El tiempo de respuesta de sus imágenes debe ser siempre inferior a 600ms.

A continuación, algunas recomendaciones comunes que podría tener en cuenta a la hora de probar la carga de un sitio web:

### Decida qué probar primero

Le recomendamos que considere las pruebas de rendimiento como un proceso iterativo y continuo.

Se empieza por la parte más pequeña, probando, evaluando e iterando con frecuencia.

> Comience con algo pequeño y sencillo, asegúrese de obtener algún resultado de las pruebas primero, luego amplíe el conjunto de pruebas y añade más complejidad hasta que sienta que ha llegado al punto en el que un mayor esfuerzo invertido en realidad no dará suficiente rendimiento a su tiempo invertido.
> [Las pruebas sencillas son mejores que la ausencia de pruebas](https://k6.io/our-beliefs#simple-testing-is-better-than-no-testing)

Lo primero es decidir qué pruebas de carga realizar. Por un lado, podrías probar tus servicios críticos, los más valiosos para tu negocio, y que tienen los riesgos más importantes. Por otro lado, probar los recorridos más frecuentes de los usuarios.

Con esta información, es el momento de analizar la frecuencia de uso, el valor del negocio, los riesgos de rendimiento y cualquier otro aspecto crítico de rendimiento de su organización para ayudarle a decidir qué probar primero.

A continuación, debe decidir qué tipos de pruebas de carga ejecutar. Consulte los siguientes artículos para obtener más información:

- [Smoke test](/es/tipos-de-prueba/smoke-testing)
- [Load test](/es/tipos-de-prueba/load-testing)
- [Stress test](/es/tipos-de-prueba/stress-testing)
- [Spike test](/es/tipos-de-prueba/stress-testing#spike-testing)
- [Soak test](/es/tipos-de-prueba/soak-testing)

### Calcular el número de usuarios concurrentes

Podría definir sus pruebas de carga basándose en la observación de sus niveles de tráfico normal y de pico, y utilizar esta fórmula para determinar el número de VUs a especificar en sus pruebas de carga:

> VUs = (sesiones por hora * duración media de la sesión en segundos)/3600
>
> - sesiones por hora = Número de sesiones por hora
> - duración media de la sesión = Tiempo medio entre la primera y la última solicitud de cada usuario

Consulte la sección [Determinación de usuarios concurrentes en sus pruebas de carga](https://k6.io/blog/monthly-visits-concurrent-users) para aprender a calcular la fórmula utilizando Google Analytics.

### Pruebe la carga de su sitio web pre-producción

Recomendamos realizar las [pruebas de carga en un entorno pre-producción](https://k6.io/our-beliefs#load-test-in-a-pre-production-environment) que imite lo más posible el entorno de producción.

Probar regularmente en un entorno de pre-producción permite evaluar el rendimiento de su sitio web a lo largo del tiempo y detectar regresiones de rendimiento antes de que lleguen a producción.

Las pruebas de carga de un sitio web en pre-producción permiten probar sus sistemas sin preocuparse por la interrupción de su servicio. Las pruebas de carga en producción son arriesgadas, pero si sus procesos y su equipo están maduros, podría ejecutar sus pruebas de carga en producción como parte de sus experimentos de caos. A veces es la mejor manera de obtener una imagen del mundo real.

### Comience a grabar el recorrido del usuario

Las pruebas de carga deben imitar los flujos de los usuarios lo más fielmente posible. Estos flujos, también conocidos como escenarios de los usuarios, generalmente implican acciones complejas en un flujo lógico (docenas o cientos de solicitudes).

El proceso de creación de este tipo de pruebas de carga podría ser engorroso. Pero la grabación de una sesión de usuario podría facilitarle el trabajo de iniciar la creación de la prueba.

Consulte la [guía de grabación de sesiones](/es/creacion-de-pruebas/grabar-una-sesion/grabador-de-navegador/) para obtener más información sobre cómo autogenerar su prueba de carga a partir de una sesión de usuario.

### No incluya solicitudes de terceros

Es posible que un visitante normal en su sitio tenga varias solicitudes externas, por ejemplo, herramientas de análisis, redes sociales, widgets, etc.

Mientras que estas peticiones tienen un impacto en la experiencia del usuario en el frontend, no tienen ningún impacto en el rendimiento de su sistema en el backend. Recomendamos encarecidamente eliminar todas las solicitudes de terceros de su script de prueba por las siguientes razones:

- Las solicitudes de terceros no tienen ningún impacto en el rendimiento de su backend.
- Los terceros pueden acelerar las solicitudes, sesgando los resultados.
- Los terceros añaden mucho ruido a los datos de los resultados de las pruebas, lo que dificulta su comprensión.
- Puede ir en contra de las condiciones de servicio de un tercero el realizar una prueba con su sistema.

### No incluya sus recursos de CDN

Debe considerar su CDN como un proveedor externo y no incluir las solicitudes de CDN en sus pruebas de carga por las razones explicadas anteriormente. Además, las pruebas de carga de una CDN pueden tener un coste.

Pero también hay casos válidos para probar su CDN en caso de que quiera entender algo sobre su proveedor de CDN.

### Análisis del contenido HTML

Cuando se prueban sitios web es común que se tenga que interactuar con HTML para enviar formularios, extraer datos, comprobar la existencia de elementos o texto, etc.

Por esa razón k6 tiene el [parseHTML](/javascript-api/k6-html/parsehtml-src) y el [Selection](/javascript-api/k6-html/selection) API que contiene más o menos todo el API de jQuery que tiene sentido en el contexto de k6.

<CodeGroup labels={["Parsing HTML content"]}>

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body); // equivalent to res.html()
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
}
```

</CodeGroup>

Para enviar un formulario, consulte [Response.submitForm([params])](/javascript-api/k6-http/response/response-submitform-params).

### Etiquetar diferentes tipos de recursos

Por defecto, las métricas estandarizadas de una herramienta de pruebas de carga por ejemplo, la métrica del tiempo de respuesta agrega los valores de todas las peticiones del sitio web. Pero es posible que quiera ver los resultados de estas métricas filtrados por el tipo de recursos:

- Percentil 95 del tiempo de respuesta de todas las imágenes.
- Percentil 99 del tiempo de respuesta de todas las peticiones de la API.

Los diferentes tipos de recursos podrían comportarse de forma muy diferente y podrían hacer que el valor de las métricas agregadas no tuviera sentido.

Si desea filtrar sus métricas en función de los diferentes tipos de solicitudes, considere la posibilidad de utilizar la función de [etiquetado (tags)](/es/usando-k6/tags-y-groups/#tags).

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
http.get('http://myweb.com/images/logo.png', { tags: { assets: 'image' } });
```

</CodeGroup>

### Agrupar las diferentes páginas web

[Groups](/es/usando-k6/tags-y-groups/#groups) ayudan a organizar su prueba de carga en torno a una lógica común. Cuando una prueba de carga simula un escenario de un usuario que visita varias páginas, es una buena práctica configurar un grupo para cada página web para organizar su prueba de carga y facilitar la visualización de los resultados de su prueba.

<CodeGroup labels={[]}>

```javascript
import { group } from 'k6';

group('visit homepage', function () {
  // load homepage resources
});
group('login page', function () {
  // load login page and perform login
});
```

</CodeGroup>

## Véase también

- [k6 no ejecuta un navegador](/#¿que-no-hace-k6)
- [Guía de grabación de sesiones ](/es/creacion-de-pruebas/grabar-una-sesion/)
- [Determining concurrent users in your load tests](https://k6.io/blog/monthly-visits-concurrent-users)
- [Data correlation in your test script](/examples/correlation-and-dynamic-data)
- Interacting with HTML content: [parseHTML](/javascript-api/k6-html/parsehtml-src) and [Selection.find](/javascript-api/k6-html/selection/selection-find-selector)
