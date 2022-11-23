---
title: 'Pruebas de carga para APIs'
excerpt: 'En esta guía, aprenderás cómo hacer pruebas de carga a las APIs y cuáles son las mejores prácticas a tener en cuenta.'
---

Es muy importante probar los APIs usando varios métodos y herramientas de prueba. Desde las pruebas unitarias hasta las de rendimiento, además necesitan tener planes de prueba y ejecutarlos con precaución. Un tipo de prueba para las APIs consiste en agregarles carga para ver cómo se comporta la misma, de ahí el concepto: pruebas de carga.

En esta guía, aprenderás cómo hacer pruebas de carga a las APIs y cuáles son las mejores prácticas a tener en cuenta. También conocerás nuestras herramientas, que le ayudarán a generar o convertir su documentación o pruebas de APIs existentes en scripts de k6.

## Cómo hacer pruebas de carga para API con k6

k6 es nuestra herramienta de pruebas de carga para desarrolladores. Puede escribir código JavaScript para probar la carga de su API. Esto es diferente en comparación con otras herramientas, que se centran más en las pruebas simples por el forzado de uno o varios endpoints a través de solicitudes predefinidas, en la que, puede escribir un flujo de escenarios de los usuarios en JavaScript para realizar todo tipo de pruebas de carga. El uso de esta herramienta le ayudará a lograr mucho más, ya que brinda la posibilidad de:

1. Escribir sus pruebas en este conocido lenguaje de scripting, ES5.1(+).
2. Utilizar la correlación para conectar fácilmente varias solicitudes. (Por ejemplo, puede iniciar una sesión en su API, extraer la clave de la API en la respuesta y utilizarla para realizar otras solicitudes, con una clave de la API única dedicada a esa sesión específica).
3. Tener la opción de establecer umbrales en sus peticiones para alcanzar sus SLO.
4. Automatizar sus pruebas de carga usando una herramienta CI.

Los binarios de k6 están disponibles para varias plataformas, por lo que ya no es necesario instalar un lenguaje de ejecución. Es realmente fácil de usar al proporcionar una interfaz de línea de comandos:

```bash
$ k6 run script.js
```

Usando este comando, puede ejecutar su script de prueba de carga y agregarle carga a el API. Como ya estás en la documentación, asegúrate de buscar los detalles que se adapten a tu caso de uso. Para darte un ejemplo, echa un vistazo al siguiente script, tomado de la sección [Peticiones HTTP](/es/usando-k6/peticiones-http/) de la documentación. Utiliza la [API k6/http](/javascript-api/k6-http) para realizar una solicitud de prueba de carga. Puedes jugar fácilmente con el ejemplo para crear tu propio script. Las siguientes secciones describen cómo hacer una prueba de carga, ya sea forzando un endpoint o probando el flujo de usuarios (escenario).

### Benchmarking un endpoint

Supongamos que quieres probar la carga de tu endpoint del login para ver cuántas peticiones puede manejar concurrentemente. A continuación un ejemplo:

```javascript
import http from 'k6/http';

export default function () {
  const url = 'http://api.yourplatform.com/login';
  const payload = JSON.stringify({
    email: 'johndoe@example.com',
    password: 'PASSWORD',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
```

Se muestra una petición HTTP simple, que se ejecuta una vez. Ajustando los argumentos de la línea de comandos, puede ajustar el número de peticiones concurrentes que desea realizar. Este comando creará 1000 sesiones concurrentes de  (usuarios virtuales), y ejecutará esta única petición 10 veces por cada usuario virtual, por lo tanto serán 10.000 iteraciones.

```bash
$ k6 run --vus 1000 --iterations 10000 script.js
```

Aunque forzar un endpoint es bueno en algunos casos, por ejemplo, si quiere probar endpoints de forma aislada, se recomienda tener en cuenta otros endpoints y escribir un script de prueba de carga basado en el escenario.

### Pruebas de flujo de usuarios (escenarios)

En el siguiente ejemplo, se muestran cuatro peticiones HTTP consecutivas al API de iniciar sesión, se obtiene el perfil del usuario, actualiza el perfil del usuario y, finalmente, cierra la sesión. Cada solicitud tiene características únicas, acepta algunos parámetros y finalmente devuelve una respuesta, que se comprueba con un conjunto de reglas. También hacemos una pausa después de cada solicitud y respuesta, para que la API pueda seguir el ritmo y no se vea sobrecargada. Al principio del script, también hemos añadido un conjunto de opciones que sirven para controlar el script.

Las iteraciones son el número que especifica cuántas ejecuciones del script por VU deben ocurrir, la cual se divide por el número de VU. VUs es el número que especifica la cantidad de sesiones concurrentes de los VUs al API. Por lo tanto, de las iteraciones y los VUs se deduce que probablemente se ejecutará cada VU alrededor de 10 iteraciones, dependiendo del tiempo de respuesta del API y de la velocidad de la red.

Como puede ver, este es un flujo de usuario bastante normal, aunque simple, que intenta imitar el comportamiento del usuario mientras usa nuestra aplicación móvil o sitio web. En aras de la simplicidad, sólo se han mostrado cuatro peticiones, pero puedes añadir fácilmente peticiones adicionales para poder tener una experiencia de usuario más realista. De esta forma podrás probar el flujo de navegación de tus usuarios en tu aplicación o plataforma. Este es el punto que distingue a k6 de la mayoría de las herramientas de pruebas de carga disponibles en la actualidad, en el sentido de que puede utilizarse para probar flujos de usuarios realistas, en lugar de limitarse a estresar un conjunto de puntos finales.


```javascript
import http from 'k6/http';
import { check, group, sleep } from 'k6';

const options = {
  vus: 1000,
  duration: '600s',
};
const SLEEP_DURATION = 0.1;

export default function () {
  let body = JSON.stringify({
    username: 'user_' + __ITER,
    password: 'PASSWORD',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
    tags: {
      name: 'login', // first request
    },
  };

  group('simple user journey', (_) => {
    // Login request
    const login_response = http.post('http://api.yourplatform.com/v2/login', body, params);
    check(login_response, {
      'is status 200': (r) => r.status === 200,
      'is api key present': (r) => r.json().hasOwnProperty('api_key'),
    });
    params.headers['api-key'] = login_response.json()['api_key'];
    sleep(SLEEP_DURATION);

    // Get user profile request
    params.tags.name = 'get-user-profile';
    const user_profile_response = http.get(
      'http://api.yourplatform.com/v2/users/user_' + __ITER + '/profile',
      params
    );
    sleep(SLEEP_DURATION);

    // Update user profile request
    body = JSON.string({
      first_name: 'user_' + __ITER,
    });
    params.tags.name = 'update-user-profile';
    const update_profile_response = http.post(
      'http://api.yourplatform.com/v2/users/user_' + __ITER + '/profile',
      body,
      params
    );
    sleep(SLEEP_DURATION);

    // Logout request
    params.tags.name = 'logout';
    const logout_response = http.get('http://api.yourplatform.com/v2/logout', params);
    sleep(SLEEP_DURATION);
  });
}
```

## Usuarios virtuales(VU) vs. tasa de solicitudes constante

Históricamente, hay dos tipos de categorías de herramientas de pruebas de carga: con script y sin script. Las herramientas que no dependen de un script generan peticiones a uno o varios endpoints sin ninguna correlación entre las peticiones, proporcionando la opción de definir una tasa de peticiones constante para llegar a un endpoint. Por otro lado, las herramientas que dependen de un script suelen estar diseñadas para facilitar las pruebas de flujo de usuarios, proporcionando así la opción de configurar el número de usuarios virtuales para establecer la carga de su prueba. k6 pertenece a esta categoría.

k6 se incluye la función de [scenarios](/es/usando-k6/escenarios/), donde se pueden configurar múltiples escenarios y modelar diferentes patrones de tráfico. El motor de ejecución de k6 ha sido completamente renovado y ahora incluye soporte para diferentes [executors](/es/usando-k6/escenarios/executors/) en cada escenario. Ahora puede utilizar el ejecutor de tasa de llegada constante para [generar una tasa de solicitud constante](https://k6.io/blog/how-to-generate-a-constant-request-rate-with-the-new-scenarios-api).

## Creación de las pruebas


Es posible crear una prueba, y eventualmente ejecutarla con k6, de múltiples maneras. Puedes escribir tus pruebas en tu editor favorito, convertir tus colecciones de Postman existentes y los documentos de especificación Swagger/OpenAPI en scripts o utilizar la grabación de proxy como archivos HAR y convertirlos en scripts de k6. La forma recomendada es definitivamente escribir sus propios scripts. Las otras herramientas están disponibles sólo para ayudarle con la introducción a k6. Hay un conjunto de herramientas que pueden ayudarte a crear pruebas de carga y ejecutarlas para obtener información sobre su sistema.

![Our tools](./images/our-tools.png)

Como es evidente en el diagrama anterior, hay cuatro herramientas diferentes para ayudar a incorporar a los usuarios existentes a k6. La mejor manera es hacer su propio script personalizado, pero puede utilizar nuestros convertidores para ayudarle a generar un script a partir de sus colecciones de postman existentes, documentos de especificación swagger, fiddler y grabaciones [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>).

### Escriba su script

Escribir su propio script es la forma recomendada de crear su script de prueba de carga, ya que es la forma más fácil, pero también la más flexible y personalizable, de crear y al ejecutar sus pruebas de carga. Con muchos ejemplos para diferentes casos de uso a lo largo de la documentación, puede crear fácilmente scripts de pruebas de carga.

### Converters for API testing tools

Hemos desarrollado dos (en realidad más) convertidores para que puedas convertir tus colecciones existentes de Postman o documentos de especificación Swagger/OpenAPI a scripts de k6. Aunque son bastante fáciles de usar, el script de salida no es 100% preciso, ya que se utilizan APIs y funcionalidades limitadas (postman a k6), o tienen soporte limitado para todas las características (open api a k6). Puedes utilizarlos para crear la base de tu script, y luego modificarlo o utilízalo en tu propio script.

El convertidor de postman-a-k6 crea scripts de k6 no idiomáticos, porque utiliza un "wrapper" para varias funcionalidades dentro de Postman, y tiene sus propias limitaciones. Por otro lado, el convertidor openapi-a-k6 produce scripts de k6 idiomáticos, aunque no se soportan todas las especificaciones de OpenAPI.

**Postman-to-k6**

Postman es una herramienta fácil de usar para las pruebas de la APIs. Puede agrupar solicitudes en colecciones y puedes exportarlas/importarlas fácilmente. Sin embargo, hay una manera fácil de crear tu propio script de k6 a partir de tus colecciones exportadas por Postman. Tenemos una herramienta [postman-to-k6](https://github.com/apideck-libraries/postman-to-k6) que puede convertir las colecciones exportadas desde Postman. Esta herramienta también convierte los scripts de Postman escritos con la ayuda de la API de scripting de Postman e incluye un "wrapper" para la API y bibliotecas relacionadas. Puede leer más en el artículo [Pruebas de carga a los APIs con Postman](https://k6.io/blog/es/load-testing-with-postman-collections).


![Postman export collection](./images/postman-export.png)

**OpenAPI-Generator**

Swagger/OpenAPI es una buena manera de diseñar, documentar y probar tus APIs.
Hemos construido un nuevo generador de OpenAPI en el proyecto [openapi-generator](https://openapi-generator.tech/docs/generators/k6), que toma la especificación Swagger/OpenAPI en formato JSON/YAML y genera un script de k6 puramente idiomático. Es realmente fácil de usar, y hay varias formas de instalarlo y utilizarlo. Para tener una idea de cómo funciona, puede consultar nuestra entrada del blog: [Pruebas de carga para las APIs con Swagger/OpenAPI y k6](https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6).

### Convertidores para grabadores proxy

**HAR-to-k6**

Los archivos HAR son registros de navegación grabados que pueden exportarse como archivos y reproducirse posteriormente. La especificación de los archivos HAR define el formato del archivo, que es básicamente un archivo JSON con varios objetos que contienen peticiones a diferentes recursos. Este archivo se puede convertir en un script de k6 utilizando la herramienta [HAR-to-k6](https://github.com/k6io/har-to-k6). Dado que los archivos HAR contienen peticiones a cada uno de los recursos que el navegador obtiene, no se recomienda utilizar el script convertido intacto, sino que se recomienda revisarlo para eliminar las peticiones innecesarias a las CDN de prueba de carga y otros archivos estáticos. Generalmente, grabar las sesiones de los usuarios no suele ser la mejor manera de hacer pruebas de carga de las APIs, ya que crea más elementos que las peticiones reales y se utiliza más para [probar la carga de un sitio web](/es/guias-de-prueba/pruebas-de-carga-a-sitios-web/). No obstante, puedes aprovecharlo, pero debes tener cuidado, ya que podría llevarte a probar sistemas no relacionados con tu API.


**Fiddler-to-k6**

Originalmente llamado [FiddlerToLoadImpact](https://github.com/li-clutter-org/FiddlerToLoadImpact), puede ser usado para exportar tus grabaciones de fiddler a un script de k6. Obviamente, necesitas tener Fiddler instalado para que funcione. Esta herramienta también crea grabaciones HAR, así que lo mismo ocurre con esto, en el sentido de que no es apto para las pruebas de carga de las APIs, sino que está hecho para las pruebas de carga del sitio web, así que tenga esto en cuenta. Para más información, consulte la [guía de grabación de sesiones](/es/creacion-de-pruebas/grabar-una-sesion/).

## Diferentes tipos de pruebas de carga para las APIs

Como hemos estado mostrando en la introducción, es crucial hacer pruebas de APIs por adelantado, en lugar de confiar en una API no probada, ya que estas pueden fallar en cualquier momento y tener consecuencias inesperadas.

Puede hacer pruebas de API de múltiples maneras, cada una de ellas pertenece a un tipo de prueba particular y produce un tipo de carga diferente.

- [Smoke test](/es/tipos-de-prueba/smoke-testing/)
- [Load test](/es/tipos-de-prueba/load-testing)
- [Stress test](/es/tipos-de-prueba/stress-testing)
- [Spike test](/es/tipos-de-prueba/stress-testing#spike-testing)
- [Soak test](/es/tipos-de-prueba/soak-testing)

## Consideraciones sobre las pruebas de carga de la API

### Identifique sus objetivos

Tener un objetivo claro es de suma importancia a la hora de ejecutar una prueba de carga en sus APIs. Al igual que el tipo de prueba de carga que desea utilizar, también debe identificar sus objetivos para esperar resultados correctos. Por ejemplo, no puede esperar que el API funcione muy bien bajo una carga pesada, si solo realiza una prueba de humo. Por lo tanto, debe establecer objetivos bien definidos y ajustar su prueba de carga para satisfacer sus expectativas. Por lo general, sus objetivos son cumplir con los niveles de servicios (SLO), que pueden estar definidos en un acuerdo de nivel de servicio (SLA), formal o informalmente, entre usted y la otra parte, por ejemplo, sus usuarios. Afortunadamente, estos umbrales pueden ser probados utilizando k6, que tiene un rico conjunto de métricas incorporadas y personalizadas, que pueden ser probadas con [Thresholds](/es/usando-k6/thresholds/). Antes de escribir y eventualmente ejecutar su prueba, reserve algún tiempo para pensar en sus SLOs y luego trate de diseñar su prueba, para que cumpla con sus requisitos y las expectativas de sus clientes.

### Empezar poco a poco y construir el  script 

Es importante tener un conjunto predefinido de objetivos y expectativas, pero no es bueno intentar cumplirlos todos a la vez. Cuanto mayor sea tu lista de objetivos, menos probable será tu capacidad de hacer las cosas bien a la primera. Así que empieza por lo pequeño, por ejemplo, escribe y ejecuta una prueba para uno o dos endpoints de la API. Intenta experimentar con diferentes configuraciones y entornos, luego puedes basarte en eso y ejecutar grandes pruebas que abarquen varias horas y tengan miles de usuarios virtuales y cientos de miles de peticiones por segundo

Los ejemplos muy sencillos de la sección [ejecutando k6](/es/empezando/ejecucion-de-k6/).

### Correlación y parametrización de datos

Dado que las APIs REST están basadas en HTTP, y por tanto son asíncronas, siempre es responsabilidad del cliente describir qué recurso se requiere en el CRUD. La idea es tener una API sin estado, que tenga una forma de relacionar las distintas peticiones con los recursos relacionados. Normalmente se hace mediante algún tipo de correlación. La correlación ayudaría a los desarrolladores a rastrear fácilmente la relación entre las solicitudes y los recursos con una clave o identificador único.

Al escribir los scripts de pruebas de carga, es posible que quieras utilizar esta clave única para que  los usuarios virtuales sepan con qué recursos trabajar en cada petición. En el script del escenario anterior, has visto cómo hemos utilizado las respuestas de la solicitud de inicio de sesión para extraer la clave de la API y, posteriormente, la hemos utilizado con las siguientes solicitudes para identificarnos como un determinado usuario (virtual).

Esto se puede aprovechar fácilmente utilizando los datos de la respuesta (en forma de objeto JSON o incluso un cuerpo de texto) para proporcionar claves únicas (IDs de correlación, claves de API, etc.) a otras peticiones en el flujo.

También existe la posibilidad de cargar archivos de datos desde el disco para ayudar a parametrizar la prueba de carga. Imagina que quieres tener 1000 usuarios con credenciales distintas para poder hacer múltiples peticiones. Esto se puede conseguir simplemente cargando un fichero JSON y luego utilizarlo en las peticiones.

Para más información, consulte el [post en el foro de la comunidad de k6](https://community.k6.io/t/when-parameterizing-data-how-do-i-not-use-the-same-data-more-than-once-in-a-test/).

### Agrupación de las URLs

Por defecto, k6 imprimirá la información del tiempo de ejecución y los resultados generales a la salida estándar, `stdout`, mientras la prueba se esté ejecutando, y también imprimirá un resumen después de que la prueba haya terminado. Puede dar salida a datos de resultados más granulares utilizando módulos de salida especiales, uno de ellos es la [salida JSON](/es/visualizacion-de-resultados/json/). El contenido de los registros en la salida incluye muchas piezas de información útil como varias métricas y algunas de esas métricas incluyen la URL de las peticiones que ha realizado.

A veces es necesario hacer muchas peticiones de APIs similares para leer o crear muchos recursos del mismo tipo. Como se muestra en el siguiente ejemplo, se obtendrán 100 entradas con peticiones únicas. Cada una de estas peticiones creará una métrica y tendrá la URL completa dentro de la métrica. Esto plantea un problema para la agregación de datos, ya sea en nuestra plataforma en la nube o en su propia pila de pruebas de carga de la API. El problema es que todas las métricas para cada una de estas URLs estarán separadas y serán agregadas individualmente, porque son diferentes en su campo de id. También crea varios registros innecesarios en la salida.

```javascript
import http from 'k6/http';

for (let id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`);
}

// tags.name="http://example.com/posts/1",
// tags.name="http://example.com/posts/2",
```

Hay una forma de evitar la creación de muchas métricas para la misma URL. Se llama [agrupación de URLs](/es/usando-k6/peticiones-http/#agrupamiento-de-las-urls), y al usarla evitarás crear métricas separadas para la misma URL. Se trata simplemente de utilizar una etiqueta que debes añadir a los [parámetros](/javascript-api/k6-http/params) de tus peticiones.

```javascript
import http from 'k6/http';

for (let id = 1; id <= 100; id++) {
  http.get(`http://example.com/posts/${id}`, {
    tags: { name: 'PostsItemURL' },
  });
}

// tags.name="PostsItemURL",
// tags.name="PostsItemURL",
```
