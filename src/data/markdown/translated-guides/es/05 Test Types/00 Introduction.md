---
title: 'Introducción'
excerpt: 'Guía de tipos de tests'
---

Es posible realizar muchos tipos de pruebas con k6, cada uno de los cuales son usado para un propósito diferente.

![Types of performance tests](./images/test-types.png)

Cada tipo de prueba está diseñado para proporcionarle diferentes conocimientos sobre su sistema.

[Smoke Test (Prueba de Humo)](/test-types/smoke-testing): verifica que su sistema puede manejar una carga mínima, sin ningún problema.

[Load Test (Prueba de Carga)](/test-types/load-testing): se ocupa principalmente de evaluar el rendimiento de su sistema en términos de usuarios concurrentes o solicitudes por segundo.

[Stress Test (Prueba de Estrés)](/test-types/stress-testing) y [Spike testing (Prueba de Pico)](/test-types/stress-testing#spike-testing-in-k6): se ocupan de evaluar los límites de su sistema y la estabilidad en condiciones extremas.

[Soak Test (Prueba de Resistencia)](/test-types/soak-testing): le informa sobre la fiabilidad y el rendimiento de su sistema durante un periodo de tiempo prolongado.

Lo importante es entender que cada prueba se puede realizar con el mismo script de prueba. Puedes escribir un script y realizar todas las pruebas anteriores con él. Lo único que cambia es la configuración de la prueba, la lógica permanece igual.

Los diferentes tipos de pruebas le enseñarán diferentes cosas sobre su sistema y le darán la información necesaria para entender y optimizar el rendimiento.

Comience con [Smoke test (Prueba de Humo)](/test-types/smoke-testing) y vea lo fácil que es hacer su primera prueba de carga.


<!--
 Note that performance, stability, and reliability, while related, are 3 different goals.

If you are reading this, you are here to achieve one or all 3 goals.

Here's the short recipe to test your system for performance, stability, and reliability.

1. Start small. Run a smoke test.
2. If your smoke test succeeded, increase the load and run a small load test.
3. If your load test worked as expected, automate it. Automate early. Consistency is key.
4. Monitor your performance over time. If you automated by scheduling your tests to run nightly,
   observe the performance changes over time.
5. Add thresholds to your load test to fail when the performance decreases below your expectations.
   Setup notifications on failure.
6. Run significant Load Tests nightly in your Staging Environment to make sure your performance
   didn't degrade due to recent code changes.
7. Run a Stress Test to verify the limits of your system, and it's stability under extreme
   conditions.
8. Run Soak Test to verify the reliability of your system over an extended period of time.
-->
