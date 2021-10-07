---
title: 'Variables de entorno'
excerpt: 'Puede acceder a cualquier variable de entorno desde su código de script de k6, y usar esto para suministrar a sus VUs información de configuración.'
---

La mayoría de las veces los scripts solo necesitarán ajustes menores para que sean reutilizables en diferentes contextos. En lugar de tener que crear varios scripts separados para estos diferentes contextos o entornos puede usar variables de entorno para hacer que algunas partes de su script se puedan modificar.

Puede usar variables de entorno para dos propósitos principales:

1. Pasar variables de entorno al script k6
2. Configurar [k6 Options](/using-k6/options) con variables de entorno


## Pasando variables de entorno al script k6

En k6, las variables de entorno se exponen a través de una variable global `__ENV`, un objeto JS. Como referencia, consulte el ejemplo de secuencia de comandos a continuación:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  sleep(1);
}
```
La opción recomendada de pasar variables de entorno a su secuencia de comandos de prueba es utilizar una o más  [`-e` / `--env` CLI flags](/using-k6/options#supply-environment-variables)(este comando funciona igual para todas las plataformas):

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io script.js
```
</CodeGroup>

** Nota **: Esto _no_ se puede utilizar para configurar k6 con las variables de entorno que se enumeran en la [options](/using-k6/options)página. En otras palabras `-e K6_ITERATIONS=120` _no_ configurará el script [iterations](/using-k6/options#iterations) solo proporcionará `__ENV.K6_ITERATIONS` al script, a diferencia de `K6_ITERATIONS=120 k6 run script.js`.

<Collapsible title="Uso de variables de entorno del sistema">
  
Una segunda opción para pasar variables de entorno es obtenerlas del sistema local.

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ MY_HOSTNAME=test.k6.io k6 run script.js
```

```bash
C:\k6> set "MY_HOSTNAME=test.k6.io" && k6 run script.js
```

```bash
PS C:\k6> $env:MY_HOSTNAME="test.k6.io"; k6 run script.js
```

</CodeGroup>

#### ⚠️ Advertencia

Por defecto, pasar variables de entorno del sistema no funciona para `k6 archive`,` k6 cloud` y `k6 inspect`. Es una medida de seguridad para evitar el riesgo de subir datos sensibles a k6 Cloud. Puede anular este modo especificando explícitamente [--include-system-env-vars] (/ using-k6 / options / # include-system-env-vars).
  
</Collapsible>

## Configurar las opciones de k6 con variables de entorno

k6 [opciones] (/ using-k6 / options) se puede configurar pasando variables de entorno. Considere la siguiente secuencia de comandos de prueba básica:

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');
  sleep(1);
}
```
De forma predeterminada, la ejecución del script anterior de forma local ejecutará una única iteración utilizando un usuario virtual (VU). Podemos modificar el ** comportamiento predeterminado ** pasando [k6 options] (/ using-k6 / options) como variables de entorno. Por ejemplo, podemos configurar el script para ejecutar 10 usuarios virtuales por una duración de 10 segundos:

<CodeGroup labels={["Bash", "Windows: CMD", "Windows: PowerShell"]} lineNumbers={[false]}>

```bash
$ K6_VUS=10 K6_DURATION=10s k6 run script.js
```

```bash
C:\k6> set "K6_VUS=10 K6_DURATION=10s" && k6 run script.js
```

```bash
PS C:\k6> $env:K6_VUS=10 ; $env:K6_DURATION="10s" ; k6 run script.js
```

</CodeGroup>

Como se demostró anteriormente, deberá agregar el prefijo `K6_` en el nombre de la variable de entorno para que k6 lo evalúe como un ** parámetro de opción **. Sin embargo, tenga en cuenta que no todas las opciones son compatibles como variables de entorno. Puede confirmar consultando la documentación de cada [option] (/ using-k6 / options / # list-of-options).

Tenga en cuenta que cuando usa varias formas de definir opciones para un script, hay un [orden de precedencia] (/ using-k6 / options # using-options) que se usa para determinar qué opción se usa realmente. Para asegurarse de que siempre está trabajando con la mayor prioridad, siempre use marcas de línea de comandos en lugar de variables de entorno:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run -e MY_HOSTNAME=test.k6.io --duration 10s --vus 10 script.js
```

</CodeGroup>

