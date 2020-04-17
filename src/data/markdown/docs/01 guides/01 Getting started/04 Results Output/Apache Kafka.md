---
title: "Apache Kafka"
excerpt: ""
---

You can also push the emitted metrics to [Apache Kafka](https://kafka.apache.org). You can configure the broker (or multiple ones), topic and message format directly from the command line parameter like this:

<div class="code-group" data-props='{"labels": ["Apache Kafka"]}'>

```shell
$ k6 run --out kafka=brokers=broker_host:8000,topic=k6
```

</div>

or if you want multiple brokers:

<div class="code-group" data-props='{"labels": ["Apache Kafka multiple brokers"]}'>

```shell
$ k6 --out kafka=brokers={broker1,broker2},topic=k6,format=json
```

</div>

You can also specify the message `format` k6 will use. By default, it will be the same as the JSON output, but you can also use the InfluxDB line protocol for direct "consumption" by InfluxDB:


<div class="code-group" data-props='{"labels": ["Apache Kafka format"]}'>

```shell
$ k6 --out kafka=brokers=someBroker,topic=someTopic,format=influxdb
```

</div>

You can even modify some of the `format` settings such as `tagsAsFields`:

<div class="code-group" data-props='{"labels": ["Apache Kafka format settings"]}'>

```shell
$ k6 --out kafka=brokers=someBroker,topic=someTopic,format=influxdb,influxdb.tagsAsFields={url,myCustomTag}
```

</div>
