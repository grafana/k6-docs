---
title: 'Soak testing'
excerpt: 'El soak test descubre los problemas de rendimiento y fiabilidad derivados de un sistema sometido a presión durante un periodo prolongado.'
---

Mientras que las [pruebas de carga (load tests)](/test-types/load-testing) se centran principalmente en la evaluación del rendimiento, y las [pruebas de estrés (stress tests)](/test-types/stress-testing) en la estabilidad del sistema en condiciones extremas, las soak Tests (Pruebas de inmersión) se centran en la fiabilidad a largo plazo.

El soak test descubre los problemas de rendimiento y fiabilidad derivados de un sistema sometido a presión durante un periodo prolongado.

Los problemas de fiabilidad suelen estar relacionados con errores, fugas de memoria, cuotas de almacenamiento insuficientes, configuración incorrecta o fallos de infraestructura. Los problemas de rendimiento suelen estar relacionados con un ajuste incorrecto de la base de datos, fugas de memoria, fugas de recursos o una gran cantidad de datos.

Con el soak test se puede simular el tráfico de varios días en sólo unas horas.

Normalmente se realiza esta prueba para:

- Verificar que su sistema no sufre fallos o fugas de memoria, que provocan un fallo o un reinicio tras varias horas de funcionamiento.
- Verificar que los reinicios esperados de la aplicación no pierden peticiones.
- Encontrar errores relacionados con las condiciones de carrera que aparecen esporádicamente.
- Asegúrese de que su base de datos no agota el espacio de almacenamiento asignado y se detiene.
- Asegúrese de que sus registros no agotan el espacio de almacenamiento en disco asignado.
- Asegúrese de que los servicios externos de los que depende no dejan de funcionar después de que se ejecute una determinada cantidad de peticiones.

Puede descubrir que el rendimiento de su aplicación era mucho mejor al principio de la prueba en comparación con el final. Esto suele ocurrir si su base de datos no está bien ajustada. Añadir índices o asignar memoria adicional puede ayudar.


## Soak testing en k6

Le recomendamos que configure su soak test a un 80% de la capacidad de su sistema. Si su sistema puede manejar un máximo de 500 usuarios simultáneos, debería configurar su soak test a 400 VUs.

La duración de un soak test debe medirse en horas. Le recomendamos que comience con una prueba de 1 hora y, una vez que tenga éxito, la amplíe a varias horas. Algunos errores están relacionados con el tiempo, y no con el número total de peticiones ejecutadas.

He aquí un ejemplo de configuración de la prueba.


<CodeGroup labels={["sample-soak-test.js"]} lineNumbers={[true]} heightTogglers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

const API_BASE_URL = 'https://test-api.k6.io';

export default function () {
  http.batch([
    ['GET', `${API_BASE_URL}/public/crocodiles/1/`],
    ['GET', `${API_BASE_URL}/public/crocodiles/2/`],
    ['GET', `${API_BASE_URL}/public/crocodiles/3/`],
    ['GET', `${API_BASE_URL}/public/crocodiles/4/`],
  ]);

  sleep(1);
}
```

</CodeGroup>

El gráfico VU de un Soak Test debería tener un aspecto similar al siguiente:
![Soak Test Configuration](./images/soak-test.png)

<Blockquote mod="warning">

#### Realice una estimación de costes antes de iniciar un soak test

El soak test puede simular días o semanas de tráfico normal en unas pocas horas. Esto significa que sus costes de infraestructura y de proveedores pueden ser significativos.

Si está probando un sitio web, debería considerar excluir su CDN de la prueba.

Si su sistema hace uso de servicios externos, es posible que quiera calcular el coste antes de comenzar la prueba.

</Blockquote>

## Cuando hacer soak testing?

Estas pruebas le ayudan a descubrir los errores y problemas de fiabilidad que surgen durante un período prolongado. Muchos sistemas complejos tienen fallos de este tipo.

Deberías ejecutar estas pruebas después de que las pruebas de carga estándar hayan tenido éxito, y de que tu sistema se haya encontrado estable al ejecutar una prueba de estrés.

Soak Testing son el último gran paso en el camino hacia la construcción de sistemas fiables.


## Vea también

- [Ejecución de pruebas a gran escala](/testing-guides/running-large-tests)