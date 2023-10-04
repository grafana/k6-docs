---
title: 'New Relic'
excerpt: 'La integración de k6 con New Relic permite visualizar los resultados de tests de pruebas de k6 en NewRelic y correlacionarlos con las otras métricas almacenadas en tu New Relic.'
---

> ⚠️ &nbsp; Para k6 Cloud tests, sigue las [instrucciones de k6 Cloud](/cloud/integrations/cloud-apm/new-relic).

k6 puede enviar los datos de telemetría a [New Relic](https://newrelic.com/) a través de la integración de New Relic [StatsD](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2). Dentro de New Relic puede encontrar sus datos de rendimiento de k6 junto con los datos de sus usuarios reales y el rendimiento del lado del servidor. Estos datos pueden ser visualizados en los dashboards y ser compartidos con otros usuarios, además pueden ser utilizados para comparar el impacto de la carga con el rendimiento del sistema, y también alertar sobre las métricas.

Esta guía cubre la ejecución de la integración de New Relic:

- Ejecutar la integración de New Relic StatsD
- Ejecutar la prueba con k6
- Visualizar la telemetría de k6 en New Relic

## Ejecutar la integración de New Relic StatsD

Para obtener las métricas de k6 en New Relic, k6 envía las métricas a la integración New Relic StatsD que se encargará de recopilar, agregar, formatear y enviar la telemetría a la plataforma de datos de telemetría de New Relic. Puede ejecutar esto con o sin un agente de New Relic.

Ejecute la integración de New Relic como un contenedor Docker con el siguiente comando:


<CodeGroup labels={[""]}>

```bash
docker run --rm \
  -d --restart unless-stopped \
  --name newrelic-statsd \
  -h $(hostname) \
  -e NR_ACCOUNT_ID=<NR-ACCOUNT-ID> \
  -e NR_API_KEY="<NR-INSERT-API-KEY>" \
  -p 8125:8125/udp \
  newrelic/nri-statsd:latest
```

</CodeGroup>

Reemplace `<NR-ACCOUNT-ID>` con su [ID de cuenta de New Relic](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id#:~:text=If%20you%20have%20a%20single,account%20ID%20is%20displayed%20there.) y `<NR-INSERT-API-KEY>` con su [clave de API de New Relic Insert](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api#register).

Si su cuenta está alojada en la región de la UE de New Relic, añada también esto al comando anterior: `-e NR_EU_REGION=true \`.

### Acerca de la integración de New Relic

La integración de New Relic StatsD instalada anteriormente puede funcionar de forma independiente. La instalación de un agente de New Relic es opcional.

Todo lo proporcionado en el comando anterior es suficiente para enviar las métricas de rendimiento de k6 a New Relic. Sin embargo, opcionalmente puede [añadir más configuración](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#configure), [definir más métricas y sus formatos](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#metric-format) (sin embargo, puede hacer esto en la configuración del lado de New Relic), [añadir etiquetas personalizadas](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#add-tags) y [crear alertas](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#alerts). Esto está cubierto en la tabla opcional de abajo.

## Ejecutar la prueba con k6

Una vez que la integración esté lista, ejecute la prueba con k6 y envíe las métricas a la integración con el siguiente comando:

<CodeGroup labels={[""]}>

```bash
$ k6 run --out output-statsd script.js
```

</CodeGroup>

Las variables de entorno necesarias utilizadas en el comando anterior son:

| Nombre            | Valor                                                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NR_ACCOUNT_ID` | El ID de la cuenta utilizado en New Relic. Puede encontrar su ID de la cuenta [aquí](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id#:~:text=If%20you%20have%20a%20single,account%20ID%20is%20displayed%20there.).                        |
| `NR_API_KEY`    | La clave del API de su cuenta de New Relic para enviar la telemetría de k6 al ID de la cuenta especificado anteriormente. Puede generar una clave del API de inserción [aquí](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api#register). |

Variables de entorno opcionales que puede utilizar:

| Nombre             | Valor                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NR_EU_REGION`   | Si se establece como verdadero, se indica a la integración que su cuenta está alojada en la región de New Relic EU.       |
| `TAGS`           | Establecer las etiquetas en el formato clave:valor separadas por un espacio le permite comprender mejor sus datos en New Relic. Por ejemplo, identificar diferentes ejecuciones de prueba o máquinas que ejecuten las pruebas. En el comando docker añada: -e TAGS="k6Test:myExampleTest someKey:someValue" \N-. |
| `NR_LOG_METRICS` | Si se establece como verdadero, se activa el registro detallado de la integración.                                        |

## Visualización en New Relic

A medida que su prueba de k6 se ejecuta, k6 envía métricas de rendimiento a la integración con New Relic StatsD, que a su vez envía estas métricas a la plataforma de datos de telemetría de New Relic. Éstas llevarán el prefijo `k6.` para que pueda identificarlas.

![k6 métricas en New Relic data explorer](images/NewRelic/new-relic-data-explorer.png)

Puedes visualizar las métricas enviadas desde esta integración en [data explorer](https://docs.newrelic.com/docs/insights/use-insights-ui/explore-data/metric-explorer-search-chart-metrics-sent-new-relic-agents) en la parte superior derecha de New Relic (consulta tus datos).


![Ejemplo New Relic k6 dashboard](images/NewRelic/new-relic-dashboard.png)

También puede añadir estas métricas a los [dashboards](https://docs.newrelic.com/docs/query-your-data/explore-query-data/dashboards/introduction-new-relic-one-dashboards) y [alertar](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-conditions/create-nrql-alert-conditions) sobre las métricas de k6.

### Ejemplo de las consultas NRQL

<Blockquote mod="note" title="">

New Relic no tiene soporte para calcular percentiles sobre datos enviados como métricas, que es el formato enviado por esta integración. Vea [este hilo en el foro de New Relic](https://discuss.newrelic.com/t/percentiles-of-values-from-metrics-api-with-nrql-not-working/95832) y [la documentación sobre el tipo de dato `metric`](https://docs.newrelic.com/docs/data-apis/understand-data/metric-data/query-metric-data-type/) (en inglés) para más detalle.

</Blockquote>

A continuación se muestran algunos ejemplos de consultas NRQL que puedes copiar y pegar fácilmente en los widgets de un dashboard de New Relic, sin embargo, puedes seguir con el [constructor de gráficos](https://docs.newrelic.com/docs/query-your-data/explore-query-data/query-builder/introduction-query-builder). Encuentre todas sus métricas de k6 en la pestaña de métricas, con el prefijo `k6.`.


**Número de usuarios virtuales**

<CodeGroup labels={["Number of Virtual Users"]}>

```plain
SELECT latest(k6.vus) FROM Metric TIMESERIES
```

</CodeGroup>

**Duración máxima, mediana y media de las solicitudes**

<CodeGroup labels={[""]}>

```plain
SELECT max(k6.http_req_duration.summary) AS 'Max Duration', average(k6.http_req_duration.median) AS 'Median', average(k6.http_req_duration.mean) AS 'Avg' FROM Metric TIMESERIES
```

</CodeGroup>

**Tasa de solicitudes**

<CodeGroup labels={[""]}>

```plain
SELECT rate(max(k6.http_reqs.per_second), 1 seconds) FROM Metric TIMESERIES
```

</CodeGroup>

**Datos enviados y datos recibidos**

<CodeGroup labels={[""]}>

```plain
SELECT sum(k6.data_received) as 'Data Received', max(k6.data_sent) AS 'Data Sent' FROM Metric TIMESERIES
```

</CodeGroup>

**Histograma de solicitudes**

<CodeGroup labels={[""]}>

```plain
SELECT histogram(`k6.http_reqs`, 80, 20) FROM Metric
```

</CodeGroup>

**Cambio en el número de solicitudes**

<CodeGroup labels={[""]}>

```plain
SELECT derivative(k6.http_reqs, 30 seconds) AS 'Rate /reqs' FROM Metric TIMESERIES
```

</CodeGroup>

**Lista desplegable de todas las métricas de rendimiento de k6**

<CodeGroup labels={[""]}>

```plain
SELECT uniques(metricName) FROM Metric WHERE metricName LIKE 'k6%' LIMIT MAX
```

</CodeGroup>
