---
title: Escenarios
excerpt: 'Los escenarios nos permiten realizar configuraciones a profundidad sobre cómo los VUs y las iteraciones son programadas.'
hideFromSidebar: false
---

Los escenarios nos permiten realizar configuraciones a profundidad sobre cómo los VUs y las iteraciones son programadas. Esto hace posible modelar diversos patrones de tráfico en las pruebas de carga. Los beneficios de usar escenarios incluyen:

- Se pueden declarar múltiples escenarios en el mismo script, y cada uno de ellos puede ejecutar independientemente una función JavaScript diferente, lo que hace que la organización de las pruebas sea más fácil y flexible.
- Cada escenario puede utilizar un patrón de programación de VUs en distintas iteraciones, llevado a cabo por un ejecutor diseñado a tal efecto. Esto permite modelar patrones de ejecución avanzados que pueden simular mejor el tráfico del mundo real.
- Pueden configurarse para que se ejecuten en secuencia o en paralelo, o en cualquier combinación de ambas.
- Se pueden establecer diferentes variables de entorno y etiquetas métricas por escenario.

## Configuración


Los escenarios de ejecución son principalmente configurados a través de la clave `scenarios` de `options`. La clave de cada escenario puede ser un nombre de escenario arbitrario, pero debe ser único. Este aparecerá en el resumen de resultados, etiquetas, entre otros.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'shared-iterations',

      // common scenario configuration
      startTime: '10s',
      gracefulStop: '5s',
      env: { EXAMPLEVAR: 'testing' },
      tags: { example_tag: 'testing' },

      // executor-specific configuration
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
    another_scenario: {
      /*...*/
    },
  },
};
```

</CodeGroup>

## Executors

[Executors](/es/usando-k6/escenarios/executors/) son los workhorses del motor de ejecución de k6. Cada uno programa los VUs y las iteraciones de forma diferente, y usted podrá elegir uno dependiendo del tipo de tráfico que quiera modelar para probar sus servicios.
 
Los posibles valores para los `executor` son los siguientes: 



| Nombre           | Valor | Descripción                                                            |
| ---------------- | ----------------------- | ---------------------------------------------------- |
| [Shared iterations](/es/usando-k6/escenarios/executors/shared-iterations/)         | `shared-iterations`     | Una cantidad fija de iteraciones que son "compartidas" entre un número de VUs.                                                                            |
| [Per VU iterations](/es/usando-k6/escenarios/executors/per-vu-iterations/)         | `per-vu-iterations`     | Cada VU ejecuta un número exacto de iteraciones.                                                                                                    |
| [Constant VUs](/es/usando-k6/escenarios/executors/constant-vus/)                   | `constant-vus`          | Un número fijo de VUs que ejecuta una cantidad de iteraciones determinada, durante un tiempo determinado.                                                  |
| [Ramping VUs](/es/usando-k6/escenarios/executors/ramping-vus/)                     | `ramping-vus`           | Un número variable de VUs que ejecuta una cantidad de iteraciones determinada, durante un tiempo determinado.                                               |
| [Constant Arrival Rate](/es/usando-k6/escenarios/executors/constant-arrival-rate/) | `constant-arrival-rate` | Se ejecuta un número fijo de iteraciones en un periodo de tiempo determinado.                                                                      |
| [Ramping Arrival Rate](/es/usando-k6/escenarios/executors/ramping-arrival-rate/)   | `ramping-arrival-rate`  | Se ejecuta un número variable de iteraciones, ejecutadas en un periodo de tiempo determinado.                                          |
| [Externally Controlled](/es/usando-k6/escenarios/executors/externally-controlled/) | `externally-controlled` | Controla y escala la ejecución en runtime a través  [k6's REST API](/misc/k6-rest-api) o [CLI](https://k6.io/blog/how-to-control-a-live-k6-test). |

## Opciones comunes

| Opción         | Tipo   | Descripción                                                                                                                                    | Default     |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `executor*` ️  | string | Nombre único del ejecutor. Consulte la lista de valores posibles en la sección de [executors](#executors) section.                                                  | -           |
| `startTime`    | string | Desplazamiento de tiempo desde el inicio de la prueba, en el que este escenario debe comenzar a ejecutarse.                                                  | `"0s"`      |
| `gracefulStop` | string | Tiempo para esperar a que las iteraciones terminen de ejecutarse antes de detenerlas forzosamente. Véase la sección [gracefulStop](/using-k6/scenarios/concepts/graceful-stop/). | `"30s"`     |
| `exec`         | string | Nombre de la función JS exportada a ejecutar.                                                                                                       | `"default"` |
| `env`          | object | Variables de entorno específicas para este escenario.                                                                                               | `{}`        |
| `tags`         | object | [Tags](/es/usando-k6/tags-y-groups/) específicas para este escenario. | `{}`        |
