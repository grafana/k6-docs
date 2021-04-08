---
title: Glosario
excerpt: 'A continuación, encontrará una lista de términos de uso común en el proyecto k6.'
---

Cuando estamos presentando temas complejos, suele ser una buena idea definir una terminología clara y compartida para garantizar el menor espacio posible para los malentendidos. A continuación, encontrará una lista de términos de uso común en el proyecto k6.

<Glossary>

- [Correlation](#correlation)
- [Dynamic Data](#dynamic-data)
- [Endurance Testing](#endurance-testing)
- [Goja](#goja)
- [Horizontal Scalability](#horizontal-scalability)
- [HTTP Archive](#http-archive)
- [k6 Cloud](#k6-cloud)
- [Load Test](#load-test)
- [Metric](#metric)
- [Parameterization](#parameterization)
- [Performance Threshold](#performance-threshold)
- [Reliability](#reliability)
- [Requests per Second](#requests-per-second)
- [Saturation](#saturation)
- [Scalability](#scalability)
- [Service-level Agreement](#service-level-agreement)
- [Service-level Indicator](#service-level-indicator)
- [Service-level Objective](#service-level-objective)
- [Smoke test](#smoke-test)
- [Soak test](#soak-test)
- [Stability](#stability)
- [Stress test](#stress-test)
- [System under test](#system-under-test)
- [Test configuration](#test-configuration)
- [Test Run](#test-run)
- [Test Script](#test-script)
- [User Journey](#user-journey)
- [User Scenario](#user-scenario)
- [Vertical Scalability](#vertical-scalability)
- [Virtual Users](#virtual-users)

</Glossary>

### Correlation

La correlación es el proceso que captura los datos dinámicos, recibidos por sistema bajo prueba, para su reutilización en solicitudes posteriores. Un caso de uso común para la correlación es la recuperación y reutilización de un identificador de sesión, o token, durante toda la vida de un usuario virtual (VU).

### Dynamic Data

Los datos dinámicos son aquellos valores que pueden cambiar en las pruebas. Algunos ejemplos más comunes son los identificadores de pedidos, los tokens de sesión o timestamps.

### Endurance Testing

Estas pruebas son un sinónimo de las pruebas de resistencia.

### Goja

Goja es el motor para ejecutar código en JavaScript, escrito exclusivamente en Go para mejor el rendimiento del sistema. Utilizamos Goja para permitir la creación de scripts de pruebas sin tener que comprometer la velocidad, la eficiencia o la fiabilidad, lo que habría sido en el caso de utilizar NodeJS. Para más detalles, puede consultar el repositorio de Goja en GitHub.

### Horizontal Scalability

Es un rasgo que describe hasta qué punto el rendimiento y la capacidad de un sistema bajo prueba pueden aumentarse añadiendo más nodos (ejemplo: servidores u ordenadores).

### HTTP Archive

Un archivo HTTP, o archivo HAR, son archivos que contienen registros de las interacciones de un navegador con el sistema bajo prueba. Todas las transacciones incluidas se almacenan como texto con formato JSON. Estos archivos pueden utilizarse para generar scripts de prueba utilizando, por ejemplo, el convertidor har-to-k6. Para más detalles, puede consultar la especificación HAR 1.2.

### Iteration

Una iteración es una ejecución de la función por defecto (default function), o de la función escenario (exec).
Puede calcular las iteraciones a través de todos los VU (como hace el ejecutor de iteraciones compartido), o por VU (como las iteraciones por VU).


### k6 Cloud

k6 Cloud es el nombre común para todo el producto de la nube, que se compone tanto de la ejecución en la nube (k6 Cloud Execution) como de los resultados de la prueba en la nube (k6 Cloud Test Results).

### Load Test

Una prueba de carga es un tipo de prueba que se utiliza para evaluar el rendimiento del sistema bajo prueba en términos de usuarios concurrentes o peticiones por segundo.

### Metric

Una métrica es un cálculo que, mediante mediciones, sirve como indicador del rendimiento del sistema bajo prueba en una condición determinada.

### Parameterization

La parametrización se refiere al proceso de construcción de una prueba de tal manera que los valores utilizados a lo largo de la prueba pueden ser cambiados sin tener que cambiar el script de prueba real.

### Performance Threshold

Describe los límites de lo que se considera valores aceptables para una métrica producida por una prueba de rendimiento. En muchos sentidos, es similar a un SLO (Service-level Objective), aunque un umbral de rendimiento sólo se refiere a una única métrica.

### Reliability

La fiabilidad es un rasgo utilizado para describir la capacidad de un sistema sometido a prueba para producir resultados fiables de forma consecutiva, incluso bajo presión.

### Requests per Second

Las peticiones por segundo, o RPS, es la velocidad en la que se ejecutan las solicitudes contra el sistema bajo prueba.

### Saturation

La saturación se alcanza cuando el sistema bajo prueba está totalmente utilizado y, por lo tanto, es incapaz de manejar cualquier solicitud adicional

### Scalability

La escalabilidad es un rasgo que se utiliza para describir hasta qué punto el rendimiento o la capacidad de un sistema bajo prueba puede aumentarse añadiendo recursos adicionales. Véase: Escalabilidad vertical y Escalabilidad horizontal.

### Service-level Agreement

Un acuerdo de nivel de servicio, o SLA (Service Level Agreement), es un acuerdo hecho entre el que proporciona el servicio y otro individuo, a menudo un usuario del servicio, prometiendo que la disponibilidad del servicio cumplirá un cierto nivel durante un período determinado.

Si el proveedor del servicio no cumple esa promesa, se suele aplicar algún tipo de penalización, como un reembolso parcial o total, o una compensación monetaria.

### Service-level Indicator

Un indicador de nivel de servicio, o SLI, es la métrica que utilizamos para medir si un servicio cumple el objetivo de nivel de servicio (SLO). Cuando se hace un seguimiento del rendimiento, este podría ser, por ejemplo, el número de solicitudes exitosas contra el servicio durante un período determinado

### Service-level Objective

Un objetivo de nivel de servicio, o SLO, es un objetivo real, ya sea interno o parte del acuerdo de nivel de servicio (SLA), para la disponibilidad del servicio. Suele expresarse en forma de porcentaje (por ejemplo: 99,2%). Si el servicio cumple o supera este objetivo, se considera estable.

### Smoke test

Una prueba de humo es un tipo de prueba que se utiliza para verificar que el sistema bajo prueba puede manejar una cantidad mínima de carga sin ningún problema. Se suele utilizar como primer paso, para garantizar que todo funciona como está previsto en condiciones óptimas, antes de pasar a hacer otros tipos de pruebas de rendimiento.

### Soak test

Es un tipo de prueba que se utiliza para descubrir problemas de rendimiento y fiabilidad derivados de que un sistema esté bajo presión durante un período prolongado.

### Stability

La estabilidad es un rasgo que se utiliza para describir la capacidad de un sistema sometido a prueba para soportar fallos y comportamientos erróneos en condiciones normales de uso.

### Stress test

Una prueba de estrés es un tipo de prueba que se utiliza para identificar los límites de lo que el sistema bajo prueba es capaz de manejar en términos de carga. 

### System under test

El sistema bajo prueba se refiere a la pieza real de software que estamos probando. Puede tratarse de una API, sitio web,infraestructura o una combinación de ellos.

### Test Configuration

El objeto de opciones de un script de prueba o los parámetros de configuración pasados a través de la CLI.

### Test Run

Una ejecución individual de un script de prueba. 

### Test Script

Un script de prueba es el código real que se ejecuta como parte de la prueba, así como cualquier configuración necesaria para ejecutar el código. Define cómo se comportará la prueba y qué peticiones se harán.

### User Journey

Se utiliza para describir una secuencia de acciones realizadas por un usuario real o simulado.

### User Scenario

El escenario del usuario es sinónimo de recorrido de usuario.

### Vertical Scalability

La escalabilidad vertical es un rasgo que describe hasta qué punto se puede aumentar el rendimiento o la capacidad de un sistema bajo prueba añadiendo más recursos de hardware a un nodo (RAM, núcleos, ancho de banda, etc.).

### Virtual Users

Los usuarios virtuales, o VUs, se utilizan para realizar ejecuciones separadas y concurrentes de su script de prueba. Pueden realizar peticiones HTTP(s) y WebSocket contra una página web o API.
Los VU, aunque emulados por el propio k6, pueden utilizarse para imitar el comportamiento de un usuario real.

**Usuarios virtuales en el contexto de las aplicaciones web/sitios web**

Los usuarios virtuales están diseñados para actuar y comportarse como lo harían los usuarios o navegadores reales. Es decir, son capaces de realizar múltiples conexiones de red en paralelo, al igual que lo haría un usuario real en un navegador. Cuando se utiliza una petición http.batch, las peticiones HTTP se envían en paralelo. Para más información, consulte el artículo sobre las pruebas de carga de los sitios web.

<CodeGroup labels={["Calcular el número de VU con Google Analytics"]}>

```plain
VUs = (hourly sessions * average session duration in seconds)/3600
```

</CodeGroup>

Lea más sobre el uso de esta fórmula en el [tutorial para calcular el número de VU con Google Analytics](https://k6.io/blog/monthly-visits-concurrent-users).

**Para obtener más información sobre las pruebas de las API, consulte nuestro artículo**

Cuando realice las pruebas a  las API individuales, puede aprovechar que cada VU hace varias peticiones cada una para producir peticiones por segundo (rps) un factor superior a su recuento de VU. Por ejemplo, su prueba puede ser estable con cada VU haciendo 10 rps cada una. Si quieres alcanzar 1000 RPS, puede que sólo necesites 100 VUs en ese caso.
