---
title: 'Automatización de pruebas de rendimiento'
excerpt: 'Esta guía pretende establecer los pasos y las mejores prácticas para lograr su objetivo de automatizar las pruebas de rendimiento.'
---

import {IntegrationsCiIconBlock} from 'templates/docs/integrations'

La automatización, un tema importante en la comunidad de pruebas en general y una especie de santo grial, es el objetivo final para muchas organizaciones cuando se trata de entender el rendimiento en el tiempo. Sin embargo, no siempre es fácil saber por dónde empezar, qué herramienta elegir o cómo conseguirlo. Sobre todo si no se tiene mucha experiencia en ingeniería de rendimiento.

Esta guía pretende establecer los pasos y las mejores prácticas para lograr su objetivo de automatizar las pruebas de rendimiento.

## ¿Por qué se deben automatizar las pruebas de rendimiento? 

Comencemos por examinar por qué considerarías la automatización de tus pruebas de rendimiento. Para ello, tenemos que revisar por qué ejecutamos las pruebas de rendimiento en primer lugar:

- Evitar los fracasos de lanzamiento que conducen a una ventana de oportunidad perdida y a inversiones desperdiciadas, por ejemplo, que su aplicación o sitio se bloquee durante un evento de lanzamiento de un producto de alto perfil.
- Evitar que las malas experiencias de los usuarios lleven a los visitantes y clientes a irse con la competencia, y que en última instancia se pierdan ingresos, por ejemplo, la pérdida de clientes que tanto costó ganar debido a que la aplicación o el sitio web no son responsive.
- Evitar regresiones en el rendimiento a medida que los nuevos cambios de código se despliegan en su sistema de producción y se ponen delante de los usuarios finales. Este es el objetivo principal de esta guía.

A partir de aquí, la decisión de optar por las pruebas automatizadas es, con suerte, sencilla:

- Desplazar las pruebas de rendimiento hacia la izquierda, asegurándose de que se realicen lo más cerca posible del desarrollo, proporcionando a los desarrolladores un bucle de retroalimentación temprana para cuestiones de rendimiento.
- Añadir comprobaciones de regresión de rendimiento a sus conductos de integración y entrega continuas (CI/CD).

Por supuesto, no todos los tipos de pruebas de rendimiento son adecuados para la automatización, las pruebas de rendimiento de tipo A/B es uno de esos tipos de pruebas de rendimiento donde probablemente no tiene mucho sentido automatizar, a menos que usted esté apuntando a comparar el rendimiento en el tiempo de A y B, por supuesto.

## Conozca sus objetivos

Además del paso de crear un caso de prueba en sí mismo, el paso más importante para asegurar un proyecto de automatización de pruebas de rendimiento exitoso es detallar sus objetivos. Qué métricas y valores (en términos absolutos; "los tiempos de respuesta deben ser inferiores a 500 ms", y no sólo "los tiempos de respuesta no deben ser lentos"), son importantes para usted, su equipo y la empresa.

Si ha establecido [Acuerdos de Nivel de Servicio (SLA)](https://en.wikipedia.org/wiki/Service-level_agreement) con sus clientes, o simplemente [Objetivos de Nivel de Servicio (SLO)](https://en.wikipedia.org/wiki/Service-level_objective) e [Indicadores de Nivel de Servicio (SLI)](https://en.wikipedia.org/wiki/Service_level_indicator) definidos internamente, entonces es un gran punto de partida. Si no es así, es una gran oportunidad para reunir a las partes interesadas y discutir qué objetivos debería haber definido para impulsar una cultura de rendimiento.

Empezar con los resultados de una prueba de referencia es otra buena manera de encontrar un punto de partida para sus objetivos. Una prueba de referencia es una prueba realizada con una solo o muy pocos VUs donde sabes que tu sistema lo puede manejar sin problemas. La idea es que usted obtenga algunos números reales sobre dónde está su sistema en términos de latencia y tiempo de respuesta. Es importante asegurarse de que la prueba de referencia no produce errores no deseados y es funcionalmente precisa.

Desde el punto de vista de la capacidad de percepción humana, los siguientes puntos de orientación de [Nielsen Norman Group](https://www.nngroup.com/articles/response-times-3-important-limits/) pueden ser de ayuda a la hora de decidir a qué latencia y tiempo de respuesta hay que aspirar:

> - 0,1 segundos es el límite para que el usuario sienta que el sistema reacciona de forma instantánea, lo que significa que no es necesario ningún tipo de respuesta especial, excepto la visualización del resultado.
> - 1,0 segundo es el límite para que el flujo de pensamiento del usuario permanezca ininterrumpido, aunque el usuario notará el retraso. Normalmente, no es necesaria ninguna información especial durante los retrasos superiores a 0,1 pero inferiores a 1,0 segundos, pero el usuario pierde la sensación de operar directamente con los datos.
> - 10 segundos es el límite para mantener la atención del usuario en el diálogo. En el caso de retrasos más largos, los usuarios querrán realizar otras tareas mientras esperan a que el ordenador termine, por lo que deben recibir una retroalimentación que les indique cuándo espera el ordenador que terminen. La retroalimentación durante el retraso es especialmente importante si el tiempo de respuesta puede ser muy variable, ya que entonces los usuarios no sabrán qué esperar.

Una vez que los objetivos están claros, hay que codificarlos como [Thresholds](/es/usando-k6/thresholds/), que es el mecanismo por el que se especifican los criterios de aprobado/reprobado en k6. Más adelante se habla de ello.

## ¿Cómo automatizar las pruebas de performance?

Una vez que sus objetivos están claros, puede empezar a introducir las pruebas de carga en sus pipelines de automatización. Ejecutar pruebas de carga desde un sistema de integración continua (CI) es muy sencillo con k6. 

## 1. Instalación de k6

El primer paso para integrar las pruebas de carga en su CI es encontrar e instalar una herramienta de pruebas de rendimiento.

Hemos construido k6 para la automatización. Es una herramienta CLI que puede integrarse fácilmente.
La instalación de k6 se puede hacer de tres maneras diferentes:

Usando uno de los gestores de paquetes específicos del sistema operativo
Extrayendo la imagen Docker
Descargando el binario para su sistema operativo
Consulte las instrucciones de instalación completas para obtener más información.

Además, también tenemos disponibles guías para [instalar k6 en herramientas CI específicas](/integrations#continuous-integration-and-continuous-delivery).

## 2. Crear una prueba

Si aún no ha creado casos de prueba para su sistema, le sugerimos que lea una de nuestras guías para crear pruebas para sitios web y APIs/microservicios:

- [Guía de pruebas para sitios web](/es/guias-de-prueba/pruebas-de-carga-a-sitios-web/)
- [Guía de pruebas de API](/testing-guides/automated-performance-testing/)

En general, cuando se crean casos de prueba, la regla de oro es empezar con algo pequeño y luego ampliarlo desde ese punto de partida. Identifique las transacciones más críticas para el negocio en su sistema y escriba casos de prueba que cubran esa parte del sistema.

**Control de versiones de los archivos de prueba**

Una de las mejores prácticas que aconsejamos a los usuarios y clientes es el control de las versiones de las pruebas de carga, preferiblemente junto con el código de la aplicación, al igual que otros tipos de pruebas. Según nuestra experiencia, así se consigue una mayor probabilidad de que las pruebas se mantengan a medida que la aplicación evoluciona. Además, ofrece todas las ventajas habituales del control de versiones del código.

**Modules**

Una vez que haya adquirido suficiente experiencia en la creación de pruebas, le aconsejamos encarecidamente que [moduralize sus pruebas](/es/usando-k6/modulos/) para que la lógica/patrones comunes sean reutilizables entre los miembros de su equipo y las diferentes pruebas de rendimiento.

## 3. Criterios para éxito/fallo

Cada paso en una línea de automatización pasa o falla. Como se mencionó en `Conozca sus objetivos`, el mecanismo por el cual k6 decide si una prueba ha pasado o fallado se llama [Thresholds](/es/usando-k6/modulos/). Sin sus objetivos codificados como umbrales no hay manera de que k6 sepa realmente si su prueba debe ser considerada un éxito o un fracaso.

Un Thresholds básico en el percentil 95 de la métrica del tiempo de respuesta tiene este aspecto:

```javascript
export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
};
```

Puede configurar umbrales en cualquier métrica en k6 y puede tener múltiples Thresholds por métrica. También puede especificar opcionalmente que un Threshold debe abortar inmediatamente una prueba si se alcanza un determinado umbral. Añadiendo esto al ejemplo anterior quedaría así:

```javascript
export const options = {
  thresholds: {
    // fail and abort the test if 95th percentile response goes above 500ms
    // delay the threshold evaluation for 1 min to gather enought data
    http_req_duration: [{ threshold: 'p(95)<500', abortOnFail: true, delayAbortEval: '1min' }],
  },
};
```

Si la prueba termina con uno o más Thresholds fallidos, k6 saldrá con un código de salida distinto de cero, indicando a la herramienta de CI que el paso de la prueba de carga ha fallado, deteniendo el progreso de la construcción / línea de producción y, notificándole para que pueda tomar medidas correctivas, más adelante se habla de las notificaciones.


## 4. Ejecución local vs k6 Cloud

k6 soporta tanto el modo de ejecución local (`k6 run ...`) como el de ejecución en el cloud (`k6 cloud ...`). En el modo de ejecución local k6 generará todo el tráfico desde la máquina donde se está ejecutando. En CI esto sería los servidores de construcción. Cuando se ejecuta una prueba localmente, opcionalmente puede transmitir los resultados a k6 Cloud para su almacenamiento y visualización (`k6 run -o cloud ...`). En el modo de ejecución en k6 Cloud, k6 agrupará y enviará el archivo de prueba JS principal, y todos los archivos dependientes, a k6 Cloud como un archivo para su ejecución en la infraestructura de la nube gestionada por nuestro servicio k6 Cloud. Los diferentes modos de ejecución son apropiados para diferentes casos de uso. A continuación se ofrecen algunas orientaciones generales:

k6 supports both local (`k6 run ...`) and cloud execution (`k6 cloud ...`) modes. In local execution mode k6 will generate all the traffic from the machine where it's being run. In CI this would be the build servers. When executing a test locally, you can optionally stream the results to k6 Cloud for storage and visualization (`k6 run -o cloud ...`). In cloud execution mode k6 will instead bundle up and send the main JS test file, and all dependent files, to k6 Cloud as an archive for execution on cloud infrastructure managed by our k6 Cloud service. The different modes of execution are appropriate for different use cases. Some general guidance follows:

| Caso de uso                                                                                                                                                      | Modo de ejecución  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Prueba de carga con <1000 VUs en una máquina con recursos dedicados consistentes                                                       | Ejecución local |
| El sistema de destino está detrás de un cortafuegos y no es accesible desde la Internet pública                                    | Ejecución local |
| No se pueden asegurar recursos dedicados consistentes localmente para la prueba de carga, por ejemplo, si su herramienta CI está ejecutando trabajos en máquinas/contenedores con diferentes cantidades de recursos | Ejecución k6 Cloud |
| Necesidad de ejecutar la prueba desde múltiples ubicaciones geográficas en una prueba                                                | Ejecución k6 Cloud |

### Autenticación con k6 Cloud

Si decide utilizar el servicio k6 Cloud, ya sea para transmitir los resultados con la ejecución local (`k6 run -o cloud ...`) o a través de la ejecución en la nube, tendrá que autenticarse con k6 Cloud. La forma recomendada de hacerlo es estableciendo la variable de entorno `K6_CLOUD_TOKEN` en su herramienta CI. Alternativamente, usted puede pasar su token al comando `k6 login cloud`  así:

```bash
k6 login cloud -t <YOUR_K6_CLOUD_TOKEN>
```

Obtenga su token de k6 Cloud en la [página de configuración de la cuenta](https://app.k6.io/account/token).

## 5. Frecuencia de las pruebas

Una respuesta un tanto aburrida, pero cierta, a la pregunta de con qué frecuencia se deben realizar las pruebas de carga es que "depende". Depende de una serie de parámetros. ¿Con qué frecuencia cambia su aplicación? ¿Necesita muchos o pocos VU para generar la carga necesaria? ¿Cuánto dura un ciclo completo de una iteración de VU? entre otros. Probar un recorrido completo del usuario o sólo un endpoint de la API o una página del sitio web también tiene diferentes implicaciones en la respuesta.

Tenga en cuenta estos tres factores a la hora de elegir la mejor solución para usted:

- Duración de la iteración del VU
- Su estrategia de ramificación
- Entorno de prueba de pre-producción

### Duración de la iteración de los VU

Una regla general es que cuanto más corta sea la "duración de la iteración de la VU", más frecuente será la ejecución de las pruebas sin introducir largos retrasos en el ciclo de retroalimentación del desarrollo, ni bloquear el acceso de los compañeros de equipo a los entornos de preproducción compartidos.

Una rápida recapitulación del artículo sobre el [ciclo de vida de las pruebas](/es/usando-k6/etapas-de-un-test/):


```javascript
export default function () {
  // k6 will execute this default function in a loop for every VU
  // for the duration of the test run.
  // The duration it takes for a VU to complete one loop, or iteration,
  // of this function is what we refer to as "VU iteration duration".
}
```

Puede encontrar la duración de la iteración de los VU en la salida del terminal de k6:

![VI uteration duration in k6 terminal output](images/vu-iteration-duration-k6-cli.png)

### Estrategia de ramificación

Otro aspecto importante a tener en cuenta es la política de ramificación del control de versiones de su equipo. Si eres estricto en mantener las ramas de características separadas de la rama principal de desarrollo de todo el equipo, y tienes entornos de prueba por característica, entonces también puedes ejecutar generalmente las pruebas de carga con una frecuencia más alta que si tus construcciones están compitiendo por el acceso exclusivo a un entorno compartido de pre-producción.

También es importante tener en cuenta que las pruebas de carga podrían no necesitar ejecutarse con la misma frecuencia que las pruebas unitarias o funcionales. La ejecución de las pruebas de carga podría ejecutarse también como parte de la creación de una solicitud de fusión o cuando una rama de características se fusiona con la rama de desarrollo principal de todo el equipo. Ambas variantes de configuración se pueden lograr con la mayoría de las herramientas de CI.

### Entorno de prueba de pre-producción

omo se ha comentado en la sección anterior, sobre la estrategia de ramificación, el entorno de pruebas es el tercer punto a tener en cuenta. Señalamos "pre-producción" específicamente ya que son las mejores prácticas cuando se trata de pruebas de carga. Si su equipo está en el nivel de madurez de ejecutar experimentos de caos en producción, entonces bien, ejecute la prueba de carga en producción también. Si no es así, limítese al entorno de pre-producción.

Detalles a tener en cuenta con su entorno de pruebas:
- Asegúrese de que no hay otro tráfico que golpea el mismo entorno de prueba como su prueba
- Asegúrese de que el sistema tiene una cantidad adecuada de datos en cualquier base de datos a la que se accede como resultado del tráfico de prueba
- Asegúrese de que las bases de datos sólo contienen datos de prueba, y no datos de producción reales

### Orientación

De forma general, nuestra recomendación es la siguiente, desglosada por la duración de la iteración de la VU:

| Duración de las iteraciones de los VU | Frecuencia de las pruebas         | Mecanismo del trigger                                                            |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| <10s                  | En cada commit        | Commit push                                                                  |
| <60s                  | Diaria/ cada noche          | Schedule, Pull/Merge Requests o cuando se fusiona en la rama principal de desarrollo |
| >60s                  | Algunas veces a la semana | Schedule, Pull/Merge Requests o cuando se fusiona en la rama principal de desarrollo |
| >5min                 | Una vez por semana            | Schedule, Pull/Merge Requests o cuando se fusiona en la rama principal de desarrollo |

**Scheduling**

Además de desencadenar pruebas basadas en eventos de commit, también vemos a menudo que los usuarios y clientes utilizan mecanismos equivalentes a las herramientas de [cron](https://k6.io/blog/performance-monitoring-with-cron-and-k6) o CI para ejecutar pruebas en horas no laborables o con una frecuencia determinada.

Si utiliza k6 Cloud, puede utilizar la [función de scheduling](/cloud/manage/scheduled-tests) para configurar la ejecución de las pruebas con la frecuencia que desee.

**Conjunto de pruebas de carga**

¿Es necesario ejecutar el conjunto de pruebas de carga completo en cada confirmación? Probablemente no, pero en cualquier caso no debería ser la ambición inicial. Repitiendo el consejo de la guía anterior, empiece con algo pequeño y amplíe a partir de ahí. Comience por evaluar las transacciones/viajes más críticos para el negocio que tiene en su sistema y empiece por automatizarlos.

## 6. Notificaciones

Una vez que tengas tus pruebas de carga integradas en un pipeline de CI, deberías asegurarte de que también recibes notificaciones cada vez que una construcción/pipeline falla. Es posible que ya recibas notificaciones por correo electrónico, Slack, Microsoft Teams o Webhook a través de tu herramienta de CI, pero si no es así puedes configurarlo de la siguiente manera.

### Para k6 OSS

No hay un mecanismo de notificación incorporado en k6 OSS, por lo que tendrá que enviar una notificación desde el script de prueba. Una forma de conseguirlo es enviando una solicitud de evento de notificación a Slack o Microsoft Teams.

Para Slack necesitas primero [configurar un webhook de entrada](https://slack.com/intl/en-se/help/articles/115005265063-Incoming-WebHooks-for-Slack). Una vez configurado se obtiene una URL de webhook que se especifica como destino de la solicitud POST en la función de teardown:

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(5.0);
}

export function teardown(data) {
  // send notification request to Slack API
  const event = {
    text: 'My test just finished!',
  };
  const res = http.post('https://hooks.slack.com/services/...', JSON.stringify(event), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

En el caso de Microsoft Teams, primero hay que [configurar un conector de webhooks entrantes](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook). Una vez configurado, se obtiene una URL de webhook que se especifica como destino de la solicitud POST en la función de teardown:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // fail the test if 95th percentile response goes above 500ms
    http_req_duration: ['p(95)<500'],
  },
  // Increase teardown function timeout as MS Teams API seems to be slower than >10s
  teardownTimeout: '60s',
};

export default function () {
  http.get('https://test.k6.io/');
  sleep(5.0);
}

export function teardown(data) {
  // send notification request to Microsoft Teams API
  const event = {
    text: 'My test just finished!',
  };
  const res = http.post('https://outlook.office.com/webhook/...', JSON.stringify(event), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

### Para k6 cloud

Si está ejecutando sus pruebas en la nube, en la aplicación web, puede configurar estas [notificaciones](/cloud/manage/notifications): Slack, Webhook y Microsoft Teams.

## Véase también

Hemos escrito guías específicas para las herramientas de CI siguiendo los pasos mencionados anteriormente:

<IntegrationsCiIconBlock />
