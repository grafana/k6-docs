---
title: 'Grabador de navegador'
excerpt: ''
---

El grabador del navegador (browser recorder) permite generar un script de k6 basado en una sesión web. Actualmente está disponible como extensión para [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) y [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/).

### Integración con k6 Cloud

La funcionalidad del grabador del navegador se alimenta de k6 Cloud. Cuando el usuario finaliza la grabación de la sesión, la extensión subirá automáticamente la prueba a la cuenta de k6 Cloud.

> **Nota**: El grabador es de uso gratuito y no se necesita una suscripción activa a k6 Cloud para utilizarlo.
> 
> Cualquier usuario puede copiar el script desde el editor de scripts para editarlo o ejecutar la prueba localmente utilizando el comando k6 run. Para versiones futuras, planeamos hacer que esta característica sea operativa sin tener una cuenta de k6 Cloud.

### ¿Cómo funciona?

El grabador del navegador le permite generar la mayor parte de sus scripts de prueba simplemente navegando como lo haría un usuario en su sitio o aplicación web. El script creado le proporciona una base que puede editar posteriormente, según sea necesario.

El grabador capturará cada una de las peticiones HTTP(s) que se cargan en el navegador mientras hace clic incluyendo anuncios, imágenes, documentos, entre otros; de modo que se obtiene una lectura mucho más precisa de lo que está sucediendo. Sólo debes seleccionar la opción"grabar", y empezar a navegar, una vez completado, el script se guardará automáticamente en la cuenta de k6 Cloud.

## Instrucciones

1 - **Instalar** la extensión de [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) o [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/).

2 - **Iniciar una grabación**

Abra la extensión haciendo clic en el logotipo de k6 y luego seleccione la opción "Iniciar grabación" para comenzar a grabar la pestaña actual del navegador. Es bueno tener en cuenta las siguientes buenas prácticas para grabar una sesión de usuario:

## Qué hacer
- Navegar como lo haría un usuario.
- Tomar las pausas que normalmente los usuarios harían para consumir el contenido de una página.
- Ponga atención en los casos de uso más comunes, en lugar de todos los casos de uso posibles.
- Tome nota de las páginas en las que se producen formularios o registros, es probable que tenga que hacer algunas secuencias de comandos adicionales para hacer que utilice valores dinámicos.

## Qué no hacer
- Visitar todas las páginas en una sola vez
- Hacer clic en todas las opciones posibles
- Navegar tan rápido como pueda
- Navegar fuera del sitio o aplicación actual


![Step 2](./images/Recording-a-test-script/step-2.png)

3 - **Detener la grabación**

Cuando haya terminado, haga clic en la opción "Stop recording", luego será redireccionado a la aplicación para revisar el script de prueba grabado.

![Step 3](./images/Recording-a-test-script/step-3.png)

4 - **Guarde su script de prueba**

Guarde el script grabado en cualquiera de sus proyectos.

Si se realizan peticiones de terceros durante la grabación, esas peticiones se filtraran por defecto porque:
- Estas solicitudes de terceros desvirtúan los porcentajes de sus resultados de rendimiento.
- Es posible que no tenga la capacidad de influir en el rendimiento de los servicios de terceros
- La prueba de carga puede violar los términos del contrato de servicio que tiene con el proveedor.

Si quiere incluir algunas de las solicitudes en la lista de terceros, simplemente selecciona las que quiera incluir, y luego pulse guardar.


![Step 4](./images/Recording-a-test-script/step-4.png)

5 - **Edite su script** según sea necesario

Dependiendo del tipo de prueba, es posible que tenga que cambiar diferentes aspectos del script. Los cambios más habituales son
- Cambiar las [opciones de carga](/using-k6/options). El valor por defecto es una prueba con ramp-up de 12 minutos.
- Manejar la [correlación y los datos dinámicos](/examples/correlation-and-dynamic-data).

6 - **Ejecute la prueba** localmente o en k6 Cloud

Si desea ejecutar una prueba en la nube desde la interfaz de usuario de k6 Cloud, haga clic en la opción Ejecutar para iniciar la prueba.

Si desea utilizar la CLI (command-line interface) de k6 para ejecutar una prueba local o k6 Cloud, copie el script generado en su editor de texto local y ejecute el comando `k6 run` o `k6 cloud` para iniciar la prueba.

Para obtener más información sobre la ejecución de k6, consulte la [guía Ejecución de k6](/getting-started/running-k6).

## Solución de problemas

La extensión del navegador no registra otras pestañas o ventanas emergentes 

Si necesita capturar esta información, debe utilizar el convertidor HAR.

> El convertidor HAR es una alternativa al grabador del navegador. Genera un script de k6 basado en las peticiones HTTP incluidas en un archivo de tipo HAR.

### ¿Tiene problemas para registrar una solicitud?

Si tiene problemas para registrar una solicitud, le recomendamos que pruebe el convertidor HAR.

El grabador del navegador utiliza el convertidor HAR para generar un script de k6. Si el error persiste con el [har-to-k6 converter](https://github.com/loadimpact/har-to-k6), comunique una nueva incidencia proporcionando información detallada sobre el problema.



