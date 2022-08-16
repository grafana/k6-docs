---
title: 'Apache Kafka'
excerpt: 'Al ejecutar una prueba, k6 puede enviar las métricas en tiempo real a Kafka.'
hideFromSidebar: true
---

<Blockquote mod="warning">

Esta opción no está soportada actualmente. Por favor, use la siguiente [extension](https://github.com/grafana/xk6-output-kafka).

</Blockquote>

[Apache Kafka](https://kafka.apache.org) es una plataforma de procesamiento de flujos para manejar datos en tiempo real.

Al ejecutar una prueba, k6 puede enviar las métricas en tiempo real a Kafka.

## Instrucciones

Puedes configurar el broker (o varios), el topic y el formato de los mensajes directamente desde la línea de comandos:

<CodeGroup labels={[]}>

```bash
$ k6 run --out kafka=brokers=broker_host:8000,topic=k6
```

</CodeGroup>

o si quieres configurar varios corredores puedes hacerlo de la siguiente manera:

<CodeGroup labels={[]}>

```bash
$ k6 --out kafka=brokers={broker1,broker2},topic=k6,format=json
```

</CodeGroup>

También puede especificar el formato de mensaje que utilizará k6. Por defecto, será el mismo que la salida del JSON, pero también puede utilizar el protocolo de línea de InfluxDB para el "consumo" directo de InfluxDB:

<CodeGroup labels={[]}>

```bash
$ k6 --out kafka=brokers=someBroker,topic=someTopic,format=influxdb
```

</CodeGroup>

Incluso puede modificar algunos de los ajustes de formato como `tagsAsFields`:

<CodeGroup labels={[]}>

```bash
$ k6 --out kafka=brokers=someBroker,topic=someTopic,format=influxdb,influxdb.tagsAsFields={url,myCustomTag}
```

</CodeGroup>

## Véase también


- [Integrating k6 with Apache Kafka](https://k6.io/blog/integrating-k6-with-apache-kafka)
