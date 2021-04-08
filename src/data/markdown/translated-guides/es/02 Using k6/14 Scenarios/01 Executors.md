---
title: 'Executors'
excerpt: 'Executors son los caballos de batalla del motor de ejecución k6. Cada uno programa los VUs y las iteraciones de forma diferente, y usted elegirá uno dependiendo del tipo de tráfico que quiera modelar para probar sus servicios.'
---

[Executors](/using-k6/scenarios/executors) son los caballos de batalla del motor de ejecución k6. Cada uno programa los VUs y las iteraciones de forma diferente, y usted elegirá uno dependiendo del tipo de tráfico que quiera modelar para probar sus servicios.

Los valores posibles para el `executor` son el nombre del ejecutor separado por guiones.

| Nombre           | Valor | Descripción                                                            |
| ---------------- | ----------------------- | ---------------------------------------------------- |
| [Shared iterations](/using-k6/scenarios/executors/shared-iterations)         | `shared-iterations`     | Una cantidad fija de iteraciones que son "compartidas" entre un número de VUs.                                                                            |
| [Per VU iterations](/using-k6/scenarios/executors/per-vu-iterations)         | `per-vu-iterations`     | Cada VU ejecuta un número exacto de iteraciones.                                                                                                    |
| [Constant VUs](/using-k6/scenarios/executors/constant-vus)                   | `constant-vus`          | Un número fijo de VUs que ejecuta una cantidad de iteraciones determinada, durante un tiempo determinado.                                                  |
| [Ramping VUs](/using-k6/scenarios/executors/ramping-vus)                     | `ramping-vus`           | Un número variable de VUs que ejecuta una cantidad de iteraciones determinada, durante un tiempo determinado.                                               |
| [Constant Arrival Rate](/using-k6/scenarios/executors/constant-arrival-rate) | `constant-arrival-rate` | Se ejecuta un número fijo de iteraciones en un periodo de tiempo determinado.                                                                      |
| [Ramping Arrival Rate](/using-k6/scenarios/executors/ramping-arrival-rate)   | `ramping-arrival-rate`  | Se ejecuta un número variable de iteraciones, ejecutadas en un periodo de tiempo determinado.                                          |
| [Externally Controlled](/using-k6/scenarios/executors/externally-controlled) | `externally-controlled` | Controla y escala la ejecución en runtime a través  [k6's REST API](/misc/k6-rest-api) o [CLI](https://k6.io/blog/how-to-control-a-live-k6-test). |