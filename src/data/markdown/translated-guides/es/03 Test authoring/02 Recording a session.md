---
title: 'Grabar una sesión'
excerpt: ''
---

En las pruebas de carga, la grabación suele referirse al proceso de creación de una prueba de carga a partir de la grabación de una sesión de usuario. El proceso consta de tres pasos:

1. Grabar una sesión de un usuario o de una API.
2. Convertir la sesión grabada en una prueba.
3. Ejecutar la prueba.

Aunque no es exclusivo, es habitual utilizar grabaciones mientras se prueban escenarios complejos en sitios web o aplicaciones móviles. La grabación permite ver la secuencia de peticiones y los parámetros de la sesión, lo que ayuda a los probadores a construir rápidamente complejas cadenas de peticiones.

Supongamos que hay que crear una prueba de rendimiento que simula el comportamiento de un usuario con docenas o cientos de peticiones. En ese caso, la grabación evita escribir la prueba desde cero.

k6 proporciona dos mecanismos para generar un script a partir de una sesión de usuario grabada:

- [Browser recorder](/test-authoring/recording-a-session/browser-recorder) genera un script de k6 a partir de una sesión del navegador. Disponible en
 [Chrome](https://chrome.google.com/webstore/detail/k6-browser-recorder/phjdhndljphphehjpgbmpocddnnmdbda?hl=en) y [Firefox](https://addons.mozilla.org/en-US/firefox/addon/k6-browser-recorder/).
- [HAR converter](/test-authoring/recording-a-session/har-converter) genera un script de k6 a partir de las peticiones incluidas en un archivo de tipo HAR.
 