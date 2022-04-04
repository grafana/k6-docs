---
title: 'Ejecución de k6'
excerpt: 'Empieza ejecutando un test sencillo. Detallamos las opciones básicas para ejecutar los tests de carga o distintos modos de ejecución de k6.'
---

## Ejecutando los tests localmente

Primeramente vamos a comenzar corriendo el script de manera local. Copie el siguiente código,  pégalo en tu editor favorito y luego guarda el script como: "script.js":

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```

</CodeGroup>

Luego ejecute el archivo K6 usando el siguiente comando:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run script.js
```

```bash
# Al usar la imagen del docker "k6", no se puede simplemente especificar el nombre del archivo, ya que el archivo no estará disponible para el contenedor(docker) mientras este se ejecuta. En su lugar debe decirle a K6 que lea "STDIN" pasando el nombre del archivo como "-". Luego ponga el archivo en el contenedor con `<` o el equivalente. Esto hará que el archivo sea redirigido al contenedor y sea leído por k6.

$ docker run --rm -i grafana/k6 run - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run -
```

</CodeGroup>

## Agregando más usuarios virtuales (VUs)


Ahora vamos a ejecutar una prueba de carga con más de un usuario y una duración mayor:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run --vus 10 --duration 30s script.js
```

```bash
$ docker run --rm -i grafana/k6 run --vus 10 --duration 30s - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run --vus 10 --duration 30s -
```

</CodeGroup>

_Ejecutando una prueba de carga de 10 usuarios en 30 segundos_

k6 funciona usando el concepto de usuarios virtuales (VUs), los cuales ejecutan los scripts en paralelo mientras que sea verdadero `while(true)`. Los scripts son desarrollados usando JavaScript, como módulos ES6, lo cual permite separar pruebas grandes en pequeñas porciones de prueba, o reutilizar estas porciones de prueba.

Los scripts deben contener al menos una función predeterminada, que defina los puntos de entrada para los VUs, similar a la función `main()` de otros lenguajes: 

<CodeGroup labels={[]}>

```javascript
export default function () {
  // vu code: do things here...
}
```

</CodeGroup>

### El contexto de inicio y la función predeterminada


Nos podemos preguntar, ¿Por qué no ejecutar mi script normalmente, desde el inicio hasta el final? La respuesta es: Sí, se puede hacer, pero el código dentro y fuera de la función predeterminada puede hacer cosas diferentes.
El código predeterminado de adentro es llamado “VU Code”, y se ejecuta una y otra vez mientras el test está ejecutándose. El código de afuera es comúnmente llamado “init Code” y se ejecuta una vez por VU.

<CodeGroup labels={[""]}>

```javascript
// init code

export default function () {
  // vu code
}
```

</CodeGroup>

El “VU Code” puede hacer peticiones HTTP, proveer métricas, y generalmente hace todo lo que se espera en una prueba de carga, no puede cargar nada desde su sistema de archivos local ni importar ningún otro módulo. Todo esto debe hacerse desde el “init Code”.
Lea más acerca de diferentes etapas del [ciclo de vida de una prueba k6](/es/usando-k6/etapas-de-un-test/)


## Usando las opciones 

Si quiere evitar escribir `--vus 10` y `--duration 30s` todo el tiempo, también puede incluir estas configuraciones dentro de su archivo JavaScript.

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```

</CodeGroup>

Luego solo ejecute el script con esos parámetros por  línea de comando. 

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run script.js
```

```bash
$ docker run --rm -i grafana/k6 run - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run -
```

</CodeGroup>

## Escenarios: Periodo de subida/bajada de los VUs 

Además puede tener el nivel de periodo de subida (ramp up)  y de bajada (ramp down) de los VU durante la prueba. La propiedad `options.stages` te permite configurar el comportamiento de los periodos de subida y bajada.

<CodeGroup labels={["stages.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

</CodeGroup>

Esto también se puede lograr con una configuración más avanzada utilizando [escenarios](/es/usando-k6/escenarios/) y el ejecutor `ramping-vus`.

## Ejecutando las pruebas en la nube

k6 soporta tres modelos de ejecución para ejecutar los tests:
- [Local](#running-local-tests): En tu máquina local o en un servidor de Integración continua (CI server) 
- [Cloud](/cloud):  En la infraestructura de la nube administrada por K6 Cloud
- Clustered: En más de una máquina administrada por usted. [No está soportado aun](https://github.com/grafana/k6/issues/140).

Uno de los objetivos de K6 es permitir la ejecución de las pruebas en tres modelos de ejecución sin hacer modificaciones en el script . 
Para ejecutar las pruebas en la nube desde la interfaz de línea de comando (CLI), debe primero crear una cuenta en K6 Cloud e iniciar sesión con su cuenta usando CLI. Luego debe pasar su script al comando `k6 cloud`. 

<CodeGroup labels={["Running a cloud test"]}>

```bash
$ k6 cloud script.js
```

</CodeGroup>

Para instrucciones más detalladas y otras opciones, puede encontrar más información en [ejecución de pruebas en la nube desde CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli).
