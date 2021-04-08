---
title: 'Variables de entorno'
excerpt: 'Puede acceder a cualquier variable de entorno desde su código de script de k6, y usar esto para suministrar a sus VUs información de configuración.'
---

## k6 y las variables de entorno

Las variables de entorno se pueden utilizar con k6 de dos maneras:

- Puede acceder a cualquier variable de entorno desde su código de script de k6, y usar esto para suministrar a sus VUs información de configuración.
- Un par de variables de entorno son leídas automáticamente por k6 al iniciarse, afectando su comportamiento.


## Accediendo a las variables de entorno desde un script

Muchas veces, los scripts sólo necesitarán pequeños ajustes para ser reutilizables en diferentes contextos. En lugar de tener que crear varios scripts separados para estos diferentes contextos o entornos, puedes utilizar variables de entorno para hacer que partes de tu script sean modificables.

En k6, las variables de entorno se exponen a través de una variable global `__ENV`, un objeto JS. El origen de las variables de entorno puede ser doble. Pueden venir del sistema local y/o ser pasadas explícitamente a k6 usando una o más banderas CLI `-e NAME=VALUE`.

La principal diferencia entre ambos es que sólo `k6 run` pasa las variables de entorno del sistema al código del script por defecto, mientras que `k6 archive`, `k6 cloud` y `k6 inspect` no lo hacen. Por lo tanto, a menos que especifique explícitamente `--include-system-env-vars`, sólo las variables pasadas usando la bandera `-e` CLI se mantendrán al crear un archivo (`k6 archive script.js`). También puede desactivar el paso por defecto de las variables del entorno del sistema cuando se ejecutan los scripts utilizando `--include-system-env-vars=false`.

Una variable de entorno podría, por ejemplo, especificarse así en la línea de comandos:


<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ MY_HOSTNAME=test.k6.io k6 run script.js
```

```bash
c:\\k6> set MY_HOSTNAME=\"test.k6.io\"\nc:\\k6> k6 run script.js
```

```bash
c:\\k6> $env:MY_HOSTNAME = \"test.k6.io\"\nc:\\k6> k6 run script.js
```

</CodeGroup>

o utilizando una flag `-e` CLI (que será la misma para todas las plataformas):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```

</CodeGroup>

La variable de entorno podría usarse de la siguiente manera en un script:

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import { check, sleep } from 'k6';
import http from 'k6/http';

export default function () {
  var r = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  check(r, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(5);
}
```

</CodeGroup>

Las variables de entorno especificadas con el indicador `-e` de la CLI tienen prioridad sobre (sobrescriben) las variables de entorno reales del sistema con el mismo nombre.

## Las variables de entorno que k6 leerá automáticamente

k6 también intentará leer algunas variables de entorno específicas que el usuario puede establecer para cambiar el comportamiento de k6:

| Nombre                 | Descripción                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUD_HOST`      | Una URL a la que conectarse, cuando se especifica la opción de salida de resultados `--out=cloud`.                                          |
| `K6_CLOUD_TOKEN`     | Un token de autenticación para utilizar en las llamadas a la API del servicio en la nube, cuando se especifica la opción de salida de resultados `--cloud`. |
| `K6_NO_USAGE_REPORT` | Defina esto para desactivar los [informes de uso.](/misc/usage-collection).                                                        |
| `K6_OUT`             | Especifica la salida de resultados, igual que la opción de línea de comandos `--out`.                                                             |
