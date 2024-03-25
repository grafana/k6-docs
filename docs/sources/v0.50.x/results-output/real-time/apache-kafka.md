---
title: 'Apache Kafka'
descriptiontion: 'You can use xk6-output-kafka to send k6 metrics in real-time to Kafka, and, optionally, ingest them from InfluxDB.'
weight: 00
---

# Apache Kafka

[Apache Kafka](https://kafka.apache.org) is a stream-processing platform for handling real-time data. Using [xk6-output-kafka extension](https://github.com/grafana/xk6-output-kafka), you can send k6 metrics in real-time to Kafka, and, optionally, ingest them from InfluxDB.

## Build the k6 version

To build a k6 binary with the extension, first, make sure you have [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed on your machine.

Then, open your terminal and run the following commands:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the k6 binary
xk6 build --with github.com/grafana/xk6-output-kafka

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

xk6 will create the new k6 binary in the local folder.

{{% admonition type="note" %}}

To learn more about how to build custom k6 versions, check out [xk6](https://github.com/grafana/xk6).

{{% /admonition %}}

## Run the k6 test

You can configure the broker (or multiple ones), topic and message format directly from the command line parameter like this:

{{< code >}}

```bash
$ k6 run --out xk6-kafka=brokers=broker_host:8000,topic=k6
```

{{< /code >}}

or if you want multiple brokers:

{{< code >}}

```bash
--out xk6-kafka=brokers={broker1,broker2},topic=k6,format=json
```

{{< /code >}}

You can also specify the message `format` k6 will use. By default, it will be the same as the JSON output, but you can also use the InfluxDB line protocol for direct "consumption" by InfluxDB:

{{< code >}}

```bash
--out xk6-kafka=brokers=someBroker,topic=someTopic,format=influxdb
```

{{< /code >}}

You can even modify some of the `format` settings such as `tagsAsFields`:

{{< code >}}

```bash
--out xk6-kafka=brokers=someBroker,topic=someTopic,format=influxdb,influxdb.tagsAsFields={url,myCustomTag}
```

{{< /code >}}

### Options

Here is the full list of options that can be configured and passed to the extension:

| Name                                | Type      | Description                                                     |
| ----------------------------------- | --------- | --------------------------------------------------------------- |
| `K6_KAFKA_BROKERS`                  | `string`  | List of brokers                                                 |
| `K6_KAFKA_TOPIC`                    | `string`  | The name of the topic to be sent                                |
| `K6_KAFKA_AUTH_MECHANISM`           | `string`  | Authentication mechanism. Default `none`.                       |
| `K6_KAFKA_SASL_USER`                | `string`  | Kafka User                                                      |
| `K6_KAFKA_SASL_PASSWORD`            | `string`  | Kafka User Password                                             |
| `K6_KAFKA_SSL`                      | `boolean` |                                                                 |
| `K6_KAFKA_VERSION`                  | `string`  | Kafka version. Default the latest                               |
| `K6_KAFKA_INSECURE_SKIP_TLS_VERIFY` | `boolean` | Whether should ignore TLS verifications                         |
| `K6_KAFKA_PUSH_INTERVAL`            | `string`  | Interval of the metrics' aggregation and upload to the endpoint |
| `K6_KAFKA_FORMAT`                   | `string`  | Message format. `json` or `influxdb`                            |
| `K6_KAFKA_LOG_ERROR`                | `boolean` | Boolean indicating to log kafka errors                          |

## Read more

- [xk6-output-kafka extension](https://github.com/grafana/xk6-output-kafka)
- [Integrating k6 with Apache Kafka](https://k6.io/blog/integrating-k6-with-apache-kafka)
