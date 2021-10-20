---
title: 'HAR converter'
excerpt: 'El convertidor HAR es una alternativa al grabador del navegador (Browser recorder). Genera un script de k6 basado en las peticiones HTTP incluidas en un archivo HAR.'
---

El convertidor HAR es una alternativa al [grabador del navegador (Browser recorder)](/es/creacion-de-pruebas/grabar-una-sesion/grabador-de-navegador/). Genera un script de k6 basado en las peticiones HTTP incluidas en un archivo HAR.

> HAR es un formato de archivo utilizado por los principales navegadores y otras herramientas para exportar las peticiones HTTP registradas.

El [har-to-k6 converter](https://github.com/k6io/har-to-k6) es una herramienta de NodeJS. A diferencia del grabador del navegador, no se requiere una cuenta de k6 Cloud para generar el script de k6.
Cuando se utiliza el convertidor HAR, el proceso es similar a:

1. Grabar un archivo HAR usando su navegador o herramienta de elección.
2. Utilizar el convertidor har-to-k6 para generar una prueba en k6 a partir de un archivo HAR.
3. Actualizar la prueba de k6 autogenerada en su editor de texto o IDE.
4. Utilizar k6 para ejecutar la prueba.


## 1. Grabar un archivo HAR

Se pueden utilizar múltiples navegadores y herramientas para exportar el tráfico HTTP en formato HAR. Algunos de los más populares son los siguientes:

- [Chrome](https://www.google.com/chrome/)
- [Firefox](https://www.mozilla.org/en-US/firefox/)
- [Microsoft Edge](https://www.microsoft.com/en-us/windows/microsoft-edge)
- [Charles recording proxy](http://www.charlesproxy.com/)(HTTP proxy/recorder)
- [Fiddler](http://www.telerik.com/fiddler) (HTTP proxy/recorder)

A continuación se describen los pasos básicos que se deben seguir para realizar una grabación usando el navegador Chrome:

1. Abra una nueva ventana de incógnito en Chrome (no es necesario, pero usar una ventana de incógnito significa que no se enviaran las cookies, entre otros; que podrían haber sido guardadas por tu navegador).
2. Abra las herramientas de desarrollo de Chrome (Pulsa la tecla F12)
3. Haga clic en la pestaña "Red".
4. Comprueba que el botón de grabación (botón redondo) está activado (color rojo).
5. Haga clic en la casilla "Conservar registro" si quieres hacer una grabación de varias cargas de páginas sucesivas.
6. Introduce la URL del sitio y puedes empezar a simular el comportamiento de los usuarios de la prueba de carga simulada.
7. Una vez terminado, haga clic derecho en la lista de URLs en las herramientas para desarrolladores de Chrome y escoja la opción "Guardar como HAR con contenido".

![Save HAR for load testing](./images/session_recorder_save_as_har.png)

Es bueno tener en cuenta las siguientes buenas prácticas para grabar una sesión de usuario:

## Qué hacer
- Navegar como lo haría un usuario
- Tomar las pausas naturales que los usuarios harían para consumir el contenido de la página
- Concéntrese en los casos de uso más comunes, en lugar de todos los casos de uso posibles
- Tomar nota de las páginas en las que se producen formularios o inicios de sesión, ya que es probable que tenga que completar algunas secuencias de comandos.

## Qué no hacer
- Visitar todas las páginas de una sola vez
- Hacer clic en todas las opciones posibles
- Navegar tan rápido como sea posible
- Navegar lejos de su sitio o aplicación actual


## 2. Convertir el archivo HAR en un script de k6


El [har-to-k6 converter](https://github.com/k6io/har-to-k6) es una herramienta de NodeJS que puede convertir un archivo HAR (sesión del navegador) en un script de k6.

**Instalar el convertidor har-to-k6**

Un requisito previo es tener instalado NodeJS (versión: 11.0.0 o mayor). Para instalar el convertidor, puedes utilizar npm:


```bash
$ npm install -g har-to-k6
```

Para otras opciones de instalación, consulte las instrucciones de [instalación de har-to-k6](https://github.com/k6io/har-to-k6#installation).

**Ejecute el comando de conversión**

Ahora, puede ejecutar el convertidor para generar un script de k6 a partir de un archivo HAR:


```bash
$ har-to-k6 myfile.har -o loadtest.js
```

El comando anterior generará automáticamente un script de k6. Leerá el archivo HAR (myfile.har) y lo convertirá en una prueba de k6 (loadtest.js).

## 3. Modificar el script k6 autogenerado

En el paso anterior, el convertidor ha creado un script de k6 para probarlo. Ahora, debe evaluar si tiene que cambiar alguna parte del script de k6. Dependiendo de su caso de uso, es posible que tenga que modificar algunos de los siguientes aspectos:

- Configurar las opciones de carga
- Eliminar el contenido de terceros
- Correlacionar los datos dinámicos


### Configurar las opciones de carga


En este momento, K6 ha autogenerado una prueba "funcional", una prueba que por defecto se ejecutará con un VU "Usuario Virtual" durante una "Iteración".

Es hora de que configure las opciones de "carga" de sus pruebas de rendimiento. k6 le permite configurarlas de varias maneras:

1 - Como argumentos CLI mientras se ejecuta el test:


```bash
k6 run --vus 10 --duration 30s loadtest.js
```

2 - Las opciones del archivo de script.


```javascript
export const options = {
  vus: 10,
  duration: '30s',
};
```

Para obtener más información sobre cómo configurar las opciones de carg, puede leer la guía [Añadir más VUs](/es/empezando/ejecucion-de-k6/#agregando-mas-usuarios-virtuales-vus) y [Options](/es/usando-k6/opciones/).

### Eliminar el contenido de terceros

Si está grabando una sesión de usuario de un sitio web, por defecto, grabará todas las peticiones HTTP, incluyendo las peticiones de herramientas de terceros utilizadas en su sitio web - por ejemplo, herramientas de Analytics, Facebook, Twitter, Widgets de soporte, CDNs y muchas más.

Se deben eliminar estas solicitudes de terceros ya que:
- Estas peticiones de terceros desvirtúan los porcentajes de sus resultados de rendimiento.
- Es posible que no pueda influir en el rendimiento del servicio de terceros.
- La prueba de carga puede violar los términos del contrato de servicio que tiene con el proveedor.

Tiene dos opciones para omitir las solicitudes de terceros en su script de k6.
1 - Editar el script de k6 autogenerado y eliminar una a una las peticiones a servicios de terceros.
2 - Descargar un archivo HAR con sólo las peticiones a los dominios seleccionados.

En Chrome, puede utilizar el filtro de red de DevTools para seleccionar sólo determinados dominios. La entrada del filtro acepta una Regex para coincidir con múltiples dominios.

```bash
/loadimpact.com|cloudfront.net/
```

![Save HAR filter domain using regex](./images/session_recorder_filter_domain.png)

Después de filtrar los dominios seleccionados, puede descargar el archivo HAR como se describe en el primer paso de este tutorial, y el archivo HAR sólo incluirá las peticiones a los dominios seleccionados.

Si no conoce todos los dominios a filtrar, es beneficioso utilizar el lenguaje de consulta del Filtro de Red. Basta con introducir domain: en el filtro para ver todos los diferentes dominios registrados por el Panel de Red.

![Save HAR filter domain list](./images/session_recorder_filter_domain_list.png)

### Correlacionar los datos dinámicos


En una prueba de carga, la correlación significa extraer uno o más valores de la respuesta de una solicitud y luego reutilizarlos en solicitudes posteriores. A menudo, esto podría ser obtener un token o algún tipo de ID necesario para cumplir con una secuencia de pasos de un usuario

El archivo HAR registrado puede incluir datos dinámicos utilizados en su sitio por ejemplo:  IDs, tokens CSRF, VIEWSTATE, wpnonce, y otros valores dinámicos que serán convertidos en el script de k6.

Para ejecutar su prueba de carga correctamente, es posible que tenga que reemplazar los datos codificados con datos dinámicos que obtiene de las solicitudes anteriores. Por ejemplo, los tokens expiran rápidamente y es una de las cosas más comunes que los usuarios correlacionan de una sesión registrada.

[Aquí](/examples/correlation-and-dynamic-data) podrás encontrar algunos ejemplos que utilizan la API de k6 para correlacionar datos dinámicos.

## 4. Ejecute la prueba

Ahora, puede ejecutar su prueba de carga con k6. Si aún no ha instalado k6, por favor, siga las [instrucciones de instalación de k6](/es/empezando/instalacion/).
Ejecute el comando `k6 run` para ejecutar su script de k6:


```bash
$ k6 run loadtest.js
```

Para saber más sobre la ejecución de k6, consulte la [guía de ejecución de k6](/es/empezando/ejecucion-de-k6/).

## Vea también

- [Grabador del navegador (Browser recorder)](/es/creacion-de-pruebas/grabar-una-sesion/grabador-de-navegador/): Extensiones de Chrome y Firefox para generar un script de k6 a partir de una sesión del navegador.
