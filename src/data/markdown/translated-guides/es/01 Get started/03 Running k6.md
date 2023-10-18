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


## Modos de ejecución

k6 soporta tres modelos de ejecución para ejecutar los tests: local, cluster, and cloud. 

> El objetivo de k6 es permitir cambiar el modo de ejecución con mínimos cambios. El objetivo es soportar ejecutar el test en los differentes modos de ejecución sin modificar el script de k6. Ésto te permitirá reutilizar los tests independientemente del entorno de tu equipo de trabajo.

1. [Local](#ejecutando-los-tests-localmente): la ejecución del test es local en una máquina, container or servidor de CI.

  ```bash
  k6 run script.js
  ```

2. [Distribuido](/testing-guides/running-distributed-tests/): la ejecución del test es distribuida en un cluster de Kubernetes. 
  
  <CodeGroup labels={["Running", "k6-resource.yml"]} lineNumbers={[true]}> 

  ```bash
  kubectl apply -f /path/k6-resource.yml
  ```

  ```yml
  ---
  apiVersion: k6.io/v1alpha1
  kind: K6
  metadata:
    name: k6-sample
  spec:
    parallelism: 4
    script:
      configMap:
        name: "k6-test"
        file: "script.js"
  ```

  </CodeGroup>

3. [Cloud](/cloud): la ejecución del test es en k6 Cloud.  

  ```bash
  k6 cloud script.js
  ```

  Adicionalmente, k6 Cloud puede ejecutar cloud tests en tu [propia infraestructura cloud](https://grafana.com/docs/grafana-cloud/k6/author-run/private-load-zone-v2/), y acepta los resultados de un test [local](/results-output/real-time/cloud/) o [distribuido en k8s](https://github.com/grafana/k6-operator#k6-cloud-output).



