---
title: 'Etapas de un test'
excerpt: 'Las cuatro etapas del ciclo de vida de una prueba en k6 son "init", "setup", "VU" y "teardown".'
---

Las cuatro etapas del ciclo de vida de una prueba en k6 son "init", "setup", "VU" y "teardown". A lo largo de la documentación, usted podrá notar que nos referimos a ellas como "init code", "VU code", etc.

<CodeGroup labels={["The four life cycle stages"]} lineNumbers={[true]}>

```javascript
// 1. init code

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
}

export function teardown(data) {
  // 4. teardown code
}
```

</CodeGroup>

## Etapas Init y VU


Los scripts deben contener como mínimo, una `default` función la cual define el punto de entrada para los VUs, la misma sería similar a la función `main()` como en muchos otros lenguajes:

<CodeGroup labels={["Default/Main function"]} lineNumbers={[true]}>

```javascript
export default function () {
  // do things here...
}
```

</CodeGroup>

Nos podemos preguntar, ¿Por qué no ejecutar mi script normalmente, desde el inicio hasta el final? La respuesta es: Sí, se puede hacer, pero el código dentro y fuera de la función predeterminada puede hacer cosas diferentes.

El código predeterminado de adentro es llamado “VU Code”, y se ejecuta una y otra vez mientras el test está ejecutándose. El código de afuera es comúnmente llamado “init Code” y se ejecuta una vez por VU.
 
El “VU Code” puede hacer peticiones HTTP, proveer métricas, y generalmente hace todo lo que se espera en una prueba de carga, no puede cargar nada desde su sistema de archivos local ni importar ningún otro módulo. Todo esto debe hacerse desde el “init Code”.
 
Tenemos dos razones para ello. La primera es, por supuesto, el rendimiento.
Si lees un archivo del disco en cada iteración del script, sería sumamente lento; incluso si guardas en el caché el contenido del archivo y cualquier módulo importado, esto significa que la primera ejecución del script sería mucho más lenta que todas las demás. Peor aún, si tienes un script que importa o carga cosas basadas en otras cosas que sólo pueden conocerse en el tiempo de ejecución, tendrías iteraciones lentas cada vez que cargues algo nuevo.
Pero hay otra razón más interesante. Al forzar todas las importaciones y lecturas de archivos en el contexto init, hacemos posible un importante objetivo de diseño; soportar tres modos de ejecución diferentes sin necesidad de que modifiques tus scripts; ejecución local, en la nube y en clúster. En el caso de la ejecución en la nube y en clúster, sabemos qué archivos se necesitarán, por lo que distribuimos sólo esos archivos. Sabemos qué módulos se importarán, por lo que podemos agruparlos desde el principio. Y, relacionado con el punto de rendimiento anterior, los otros nodos ni siquiera necesitan sistemas de archivos con capacidad de escritura: todo puede mantenerse en memoria.
Como ventaja adicional, puede utilizar esto para reutilizar los datos entre las iteraciones (pero sólo para el mismo VU):


<CodeGroup labels={[]}>

```javascript
let counter = 0;

export default function () {
  counter++;
}
```

</CodeGroup>

## Función default

Un VU ejecutará la función por defecto desde el principio hasta el final en secuencia. Nada fuera de lo común hasta ahora, pero aquí está la parte importante; una vez que el VU llega al final de la función por defecto, hará un bucle de vuelta al principio y ejecutará el código de nuevo.
Como parte de este proceso de "reinicio", la VU se restablece. Las cookies se borran y las conexiones TCP pueden ser eliminadas, dependiendo de las opciones de configuración de la prueba.

> Asegúrese de utilizar las sentencias `sleep()` para medir el ritmo de sus VUs adecuadamente. Una cantidad apropiada de tiempo de espera al final de la función predeterminada es a menudo necesaria para simular adecuadamente a un usuario leyendo el contenido de una página. Si no tiene una sentencia sleep() al final de la función predeterminada su VU podría ser más "agresivo" de lo que había planeado.
> El VU sin ningún `sleep()` es similar a un usuario que constantemente presiona F5 para refrescar la página.


## Etapas Setup y Teardown

Más allá de las etapas requeridas init y VU, las cuales son el código que se ejecuta para cada VU, K6 también soporta las etapas de `setup` y `teardown` a nivel de prueba, como muchos otros frameworks y herramientas de prueba. Las funciones de `setup` y `teardown`, como la función `default`, necesitan ser funciones exportadas. Pero a diferencia de la función `default`, `setup` y `teardown` sólo se llaman una vez por prueba, setup se llama al principio de la prueba, después de la etapa init pero antes de la etapa VU (función por defecto), y teardown se llama al final de una prueba, después de la etapa VU (función por defecto). Por lo tanto, el número de VU es 0 mientras se ejecutan las funciones setup y teardown.

De nuevo, veamos la estructura básica de una prueba k6:

<CodeGroup labels={["Setup/Teardown"]} lineNumbers={[true]}>

```javascript
// 1. init code

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
}

export function teardown(data) {
  // 4. teardown code
}
```

</CodeGroup>

Habrás notado que la firma de la función predeterminadas y la función de teardown toman un argumento, al que aquí nos referimos como datos.

Estos datos serán lo que devuelva la función de setup, así que es un mecanismo para pasar los datos de la etapa de configuración a las etapas posteriores de VU y teardown de una manera que, de nuevo, sea compatible con nuestro objetivo de soportar los modos de ejecución local, k6 Cloud y en clúster sin requerir cambios de script al cambiar entre ellos. (puede o no ser el mismo nodo el que ejecute las etapas de setup y teardown en el modo de ejecución en la nube o en cluster).
 
Para soportar todos esos modos, sólo se pueden pasar datos (por ejemplo, JSON) entre setup() y las otras etapas, cualquier otra función pasada será descartada.

Este es un ejemplo de cómo hacerlo, pasando algunos datos de las etapas de setup a VU y teardown:

<CodeGroup labels={["Setup/Teardown"]} lineNumbers={[true]}>

```javascript
export function setup() {
  return { v: 1 };
}

export default function (data) {
  console.log(JSON.stringify(data));
}

export function teardown(data) {
  if (data.v != 1) {
    throw new Error('incorrect data: ' + JSON.stringify(data));
  }
}
```

</CodeGroup>

Una gran diferencia entre la etapa init y la de setup/teardown es que en esta última tienes disponible toda la API de k6, puedes por ejemplo hacer peticiones HTTP en las etapas de setup y teardown:

<CodeGroup labels={["Setup/Teardown with HTTP request"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export function setup() {
  const res = http.get('https://httpbin.org/get');
  return { data: res.json() };
}

export function teardown(data) {
  console.log(JSON.stringify(data));
}

export default function (data) {
  console.log(JSON.stringify(data));
}
```

</CodeGroup>

Tenga en cuenta que las solicitudes realizadas en las etapas de setup y teardown se contarán en el resumen final de la prueba. Dichas solicitudes serán etiquetadas adecuadamente con los valores  `::setup` y `::teardown` para la etiqueta de métrica de grupo, de modo que pueda filtrarse en la respuesta del JSON o en InfluxDB.

## Omitir la ejecución de setup y teardown


Es posible omitir la ejecución de las etapas de setup y teardown utilizando las dos opciones `--no-setup` y `--no-teardown` respectivamente.

<CodeGroup labels={["Skipping setup/teardown execution"]} lineNumbers={[true]}>

```bash
$ k6 run --no-setup --no-teardown ...
```

</CodeGroup>
