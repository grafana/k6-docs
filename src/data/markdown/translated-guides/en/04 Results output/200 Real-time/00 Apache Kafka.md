---
title: 'Apache Kafka'
excerpt: 'You can use xk6-output-kafka to send k6 metrics in real-time to Kafka, and, optionally, ingest them from InfluxDB.'
canonicalUrl: https://grafana.com/docs/k6
---

[Apache Kafka](https://kafka.apache.org) is a stream-processing platform for handling real-time data. Using [xk6-output-kafka extension](https://github.com/grafana/xk6-output-kafka), you can send k6 metrics in real-time to Kafka, and, optionally, ingest them from InfluxDB.


## Build the k6 version

<InstallationInstructions extensionUrl="github.com/grafana/xk6-output-kafka"/>

## Run the k6 test

You can configure the broker (or multiple ones), topic and message format directly from the command line parameter like this:

<CodeGroup labels={[]}>

```bash
$ k6 run --out xk6-kafka=brokers=broker_host:8000,topic=k6
```

</CodeGroup>

or if you want multiple brokers:

<CodeGroup labels={[]}>

```bash
--out xk6-kafka=brokers={broker1,broker2},topic=k6,format=json
```

</CodeGroup>

You can also specify the message `format` k6 will use. By default, it will be the same as the JSON output, but you can also use the InfluxDB line protocol for direct "consumption" by InfluxDB:

<CodeGroup labels={[]}>

```bash
--out xk6-kafka=brokers=someBroker,topic=someTopic,format=influxdb
```

</CodeGroup>

You can even modify some of the `format` settings such as `tagsAsFields`:

<CodeGroup labels={[]}>

```bash
--out xk6-kafka=brokers=someBroker,topic=someTopic,format=influxdb,influxdb.tagsAsFields={url,myCustomTag}
```

</CodeGroup>

### Options

Here is the full list of options that can be configured and passed to the extension:

| Name | Type |  Description |
| ---- | ---- |  ----------- |
| `K6_KAFKA_BROKERS`                 | `string` | List of brokers |
| `K6_KAFKA_TOPIC`                   | `string` | The name of the topic to be sent |
| `K6_KAFKA_AUTH_MECHANISM`          | `string` | Authentication mechanism. Default `none`. |
| `K6_KAFKA_SASL_USER`               | `string` | Kafka User |
| `K6_KAFKA_SASL_PASSWORD`           | `string` | Kafka User Password |
| `K6_KAFKA_SSL`                     | `boolean` |  |
| `K6_KAFKA_VERSION`                 | `string` | Kafka version. Default the latest |
| `K6_KAFKA_INSECURE_SKIP_TLS_VERIFY`| `boolean` | Whether should ignore TLS verifications |
| `K6_KAFKA_PUSH_INTERVAL`           | `string` | Interval of the metrics' aggregation and upload to the endpoint |
| `K6_KAFKA_FORMAT`                  | `string` | Message format. `json` or `influxdb` |
| `K6_KAFKA_LOG_ERROR`               | `boolean` | Boolean indicating to log kafka errors |

## Read more

- [xk6-output-kafka extension](https://github.com/grafana/xk6-output-kafka)
- [Integrating k6 with Apache Kafka](https://k6.io/blog/integrating-k6-with-apache-kafka)
