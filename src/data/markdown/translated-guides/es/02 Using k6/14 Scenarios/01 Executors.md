---
title: 'Executors'
excerpt: 'Executors son los caballos de batalla del motor de ejecución k6. Cada uno programa los VUs y las iteraciones de forma diferente, y usted elegirá uno dependiendo del tipo de tráfico que quiera modelar para probar sus servicios.'
---

[Executors](/es/usando-k6/escenarios/executors) son los caballos de batalla del motor de ejecución k6. Cada uno programa los VUs y las iteraciones de forma diferente, y usted elegirá uno dependiendo del tipo de tráfico que quiera modelar para probar sus servicios.

Los valores posibles para el `executor` son el nombre del ejecutor separado por guiones.

| Nombre           | Valor | Descripción                                                            |
| ---------------- | ----------------------- | ---------------------------------------------------- |
| [Shared iterations](/es/usando-k6/escenarios/executors/shared-iterations/)         | `shared-iterations`     | Una cantidad fija de iteraciones que son "compartidas" entre un número de VUs.                                                                            |
| [Per VU iterations](/es/usando-k6/escenarios/executors/per-vu-iterations/)         | `per-vu-iterations`     | Cada VU ejecuta un número exacto de iteraciones.                                                                                                    |
| [Constant VUs](/es/usando-k6/escenarios/executors/constant-vus/)                   | `constant-vus`          | Un número fijo de VUs que ejecuta una cantidad de iteraciones determinada, durante un tiempo determinado.                                                  |
| [Ramping VUs](/es/usando-k6/escenarios/executors/ramping-vus)                     | `ramping-vus`           | Un número variable de VUs que ejecuta una cantidad de iteraciones determinada, durante un tiempo determinado.                                               |
| [Constant Arrival Rate](/es/usando-k6/escenarios/executors/constant-arrival-rate/) | `constant-arrival-rate` | Se ejecuta un número fijo de iteraciones en un periodo de tiempo determinado.                                                                      |
| [Ramping Arrival Rate](/es/usando-k6/escenarios/executors/ramping-arrival-rate)   | `ramping-arrival-rate`  | Se ejecuta un número variable de iteraciones, ejecutadas en un periodo de tiempo determinado.                                          |
| [Externally Controlled](/es/usando-k6/escenarios/executors/externally-controlled/) | `externally-controlled` | Controla y escala la ejecución en runtime a través  [k6's REST API](/misc/k6-rest-api) o [CLI](https://k6.io/blog/how-to-control-a-live-k6-test). |