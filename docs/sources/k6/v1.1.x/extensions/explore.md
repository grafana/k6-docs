---
title: 'Explore k6 extensions'
menuTitle: 'Explore extensions'
weight: 01
---

# Explore k6 extensions

With over 50 available extensions, the k6 extension ecosystem has many options to meet your requirements and help you incorporate new protocol access, embed a particular client, or improve your test performance. Extensions are developed both by the k6 developers and by the open-source developer community.

Extensions are composable; you can combine any extensions, or mix and match different test cases. You can use [Go and xk6](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-go/) or [Docker](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-docker/) to build your custom k6 binary:

{{< code >}}

```go-and-xk6
xk6 build \
  --with github.com/grafana/xk6-sql@v0.0.1 \
  --with github.com/grafana/xk6-output-prometheus-remote
```

```docker-in-linux
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" grafana/xk6 build \
  --with github.com/grafana/xk6-sql@v0.0.1 \
  --with github.com/grafana/xk6-output-prometheus-remote
```

{{< /code >}}

<br/>

Use the table to explore the many extensions. Questions? Feel free to join the discussion about extensions in the [k6 Community Forum](https://community.grafana.com/c/grafana-k6/extensions/82).

## Official extensions

These are the official extensions, which are owned and maintained by the Grafana organization.

<div class="nav-cards">
    <a href="https://github.com/grafana/xk6-client-prometheus-remote" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-client-prometheus-remote</h4>
        <p>Test Prometheus Remote Write-compatible endpoints</p>
    </a>
    <a href="https://github.com/grafana/xk6-dashboard" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-dashboard</h4>
        <p>Create a web-based metrics dashboard</p>
    </a>
    <a href="https://github.com/grafana/xk6-disruptor" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-disruptor</h4>
        <p>Inject faults to test 💣</p>
    </a>
    <a href="https://github.com/grafana/xk6-exec" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-exec</h4>
        <p>Run external commands</p>
    </a>
    <a href="https://github.com/grafana/xk6-faker" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-faker</h4>
        <p>Generate fake data in your tests</p>
    </a>
    <a href="https://github.com/grafana/xk6-kubernetes" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-kubernetes</h4>
        <p>Interact with Kubernetes clusters</p>
    </a>
    <a href="https://github.com/grafana/xk6-output-influxdb" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-influxdb</h4>
        <p>Export results to InfluxDB v2</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql</h4>
        <p>Load-test SQL Servers</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-mysql" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-mysql</h4>
        <p>xk6-sql driver extension for MySQL database support</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-postgres" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-postgres</h4>
        <p>xk6-sql driver extension for Postgres database support</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-sqlite3" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-sqlite3</h4>
        <p>xk6-sql driver extension for SQLite v3 database support</p>
    </a>
    <a href="https://github.com/grafana/xk6-ssh" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-ssh</h4>
        <p>Use SSH connections in your tests</p>
    </a>
</div>

## Community extensions

These are the community extensions, which are owned by our community members.
The Grafana team makes a best-effort assistance to keep these extensions in compliance.

<div class="nav-cards">
    <a href="https://github.com/prmuthu/xk6-amqp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-amqp</h4>
        <p>To publish and consume messages using AMQP protocol</p>
    </a>
    <a href="https://github.com/szkiba/xk6-ansible-vault" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-ansible-vault</h4>
        <p>Encrypt and decrypt Ansible Vault</p>
    </a>
    <a href="https://gitlab.com/szkiba/xk6-banner" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-banner</h4>
        <p>Print ASCII art banner from k6 test</p>
    </a>
    <a href="https://github.com/anycable/xk6-cable" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-cable</h4>
        <p>Test Action Cable and AnyCable functionality</p>
    </a>
    <a href="https://github.com/szkiba/xk6-cache" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-cache</h4>
        <p>Enable vendoring remote HTTP modules to a single source-control-friendly file</p>
    </a>
    <a href="https://github.com/grafana/xk6-client-tracing" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-client-tracing</h4>
        <p>Client for load testing distributed tracing backends</p>
    </a>
    <a href="https://github.com/golioth/xk6-coap" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-coap</h4>
        <p>Interact with Constrained Application Protocol endpoints</p>
    </a>
    <a href="https://github.com/tmieulet/xk6-cognito" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-cognito</h4>
        <p>Get a cognito access token using USER_SRP_AUTH flow</p>
    </a>
    <a href="https://github.com/thotasrinath/xk6-couchbase" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-couchbase</h4>
        <p>Load-test Couchbase no-SQL databases</p>
    </a>
    <a href="https://github.com/grafana/xk6-crawler" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-crawler</h4>
        <p>Web crawler API for k6</p>
    </a>
    <a href="https://github.com/szkiba/xk6-csv" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-csv</h4>
        <p>Parse CSV values</p>
    </a>
    <a href="https://github.com/szkiba/xk6-dotenv" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-dotenv</h4>
        <p>Load env vars from a .env file</p>
    </a>
    <a href="https://github.com/distribworks/xk6-ethereum" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-ethereum</h4>
        <p>K6 extension for ethereum protocols</p>
    </a>
    <a href="https://github.com/domsolutions/xk6-fasthttp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-fasthttp</h4>
        <p>Enable RPS increase & file streaming on HTTP/1.1 requests</p>
    </a>
    <a href="https://github.com/avitalique/xk6-file" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-file</h4>
        <p>Write files</p>
    </a>
    <a href="https://github.com/szkiba/xk6-g0" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-g0</h4>
        <p>Write k6 tests in golang</p>
    </a>
    <a href="https://github.com/deejiw/xk6-gcp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-gcp</h4>
        <p>A k6 extension for Google Cloud Platform services.</p>
    </a>
    <a href="https://github.com/skibum55/xk6-git" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-git</h4>
        <p>Clone Git repositories from tests</p>
    </a>
    <a href="https://github.com/gpiechnik2/xk6-httpagg" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-httpagg</h4>
        <p>Aggregate HTTP requests into an HTML report</p>
    </a>
    <a href="https://github.com/JorTurFer/xk6-input-prometheus" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-input-prometheus</h4>
        <p>Enables real-time input from prometheus</p>
    </a>
    <a href="https://github.com/deejiw/xk6-interpret" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-interpret</h4>
        <p>Interpret Go code</p>
    </a>
    <a href="https://github.com/mostafa/xk6-kafka" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-kafka</h4>
        <p>Load test Apache Kafka. Includes support for Avro messages.</p>
    </a>
    <a href="https://github.com/oleiade/xk6-kv" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-kv</h4>
        <p>Share key-value data between VUs</p>
    </a>
    <a href="https://github.com/grafana/xk6-loki" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-loki</h4>
        <p>Test Grafana Loki log ingestion endpoints</p>
    </a>
    <a href="https://github.com/gjergjsheldija/xk6-mllp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-mllp</h4>
        <p>Simple MLLP sender for k6</p>
    </a>
    <a href="https://github.com/GhMartingit/xk6-mongo" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-mongo</h4>
        <p>Load-test Mongo no-SQL databases</p>
    </a>
    <a href="https://github.com/pmalhaire/xk6-mqtt" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-mqtt</h4>
        <p>MQTT extension</p>
    </a>
    <a href="https://github.com/akiomik/xk6-nostr" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-nostr</h4>
        <p>Interact with Nostr relays</p>
    </a>
    <a href="https://github.com/frankhefeng/xk6-oauth-pkce" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-oauth-pkce</h4>
        <p>Generate OAuth PKCE code verifier and code challenge</p>
    </a>
    <a href="https://github.com/thmshmm/xk6-opentelemetry" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-opentelemetry</h4>
        <p>Generate OpenTelemetry signals from k6 tests</p>
    </a>
    <a href="https://github.com/Maksimall89/xk6-output-clickhouse" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-clickhouse</h4>
        <p>Export results to ClickHouse</p>
    </a>
    <a href="https://github.com/elastic/xk6-output-elasticsearch" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-elasticsearch</h4>
        <p>Export results to Elasticsearch 8.x</p>
    </a>
    <a href="https://github.com/grafana/xk6-output-kafka" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-kafka</h4>
        <p>Export k6 results in real-time to Kafka</p>
    </a>
    <a href="https://github.com/szkiba/xk6-output-plugin" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-plugin</h4>
        <p>Dynamic output extension using your favorite programming language</p>
    </a>
    <a href="https://github.com/martymarron/xk6-output-prometheus-pushgateway" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-prometheus-pushgateway</h4>
        <p>Export results to Prometheus pushgateway</p>
    </a>
    <a href="https://github.com/LeonAdato/xk6-output-statsd" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-statsd</h4>
        <p>Enables real-time output of test metrics to a StatsD service</p>
    </a>
    <a href="https://github.com/grafana/xk6-output-timescaledb" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-timescaledb</h4>
        <p>Export k6 results to TimescaleDB</p>
    </a>
    <a href="https://github.com/leonyork/xk6-output-timestream" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-output-timestream</h4>
        <p>Export results to AWS Timestream</p>
    </a>
    <a href="https://github.com/nicholasvuono/xk6-playwright" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-playwright</h4>
        <p>Browser automation and end-to-end web testing using Playwright</p>
    </a>
    <a href="https://github.com/grafana/xk6-plugin" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-plugin</h4>
        <p>Create k6 plugins using JavaScript and Node.js</p>
    </a>
    <a href="https://github.com/szkiba/xk6-prometheus" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-prometheus</h4>
        <p>Prometheus HTTP exporter for k6</p>
    </a>
    <a href="https://github.com/Juandavi1/xk6-prompt" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-prompt</h4>
        <p>Support for input arguments via UI</p>
    </a>
    <a href="https://github.com/SYM01/xk6-proxy" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-proxy</h4>
        <p>Dynamic proxy support, allow changing the HTTP proxy settings in the script</p>
    </a>
    <a href="https://github.com/grafana/xk6-python" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-python</h4>
        <p>Write k6 tests in Python</p>
    </a>
    <a href="https://github.com/acuenca-facephi/xk6-read" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-read</h4>
        <p>Read files and directories</p>
    </a>
    <a href="https://github.com/ogarciacar/xk6-sftp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sftp</h4>
        <p>SFTP extension for k6</p>
    </a>
    <a href="https://github.com/gpiechnik2/xk6-smtp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-smtp</h4>
        <p>Use SMTP protocol to send emails</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-azuresql" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-azuresql</h4>
        <p>xk6-sql driver extension for Microsoft Azure SQL database support</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-clickhouse" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-clickhouse</h4>
        <p>xk6-sql driver extension for ClickHouse database support</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-ramsql" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-ramsql</h4>
        <p>xk6-sql driver extension for RamSQL database support</p>
    </a>
    <a href="https://github.com/grafana/xk6-sql-driver-sqlserver" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sql-driver-sqlserver</h4>
        <p>xk6-sql driver extension for Microsoft SQL Server database support</p>
    </a>
    <a href="https://github.com/phymbert/xk6-sse" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-sse</h4>
        <p>Server Sent Event</p>
    </a>
    <a href="https://github.com/walterwanderley/xk6-stomp" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-stomp</h4>
        <p>Client for STOMP protocol</p>
    </a>
    <a href="https://github.com/Maksimall89/xk6-telegram" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-telegram</h4>
        <p>Interact with Telegram Bots</p>
    </a>
    <a href="https://github.com/szkiba/xk6-toml" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-toml</h4>
        <p>Encode and decode TOML values</p>
    </a>
    <a href="https://github.com/szkiba/xk6-top" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-top</h4>
        <p>Updating the current k6 metrics summaries on the terminal during the test run</p>
    </a>
    <a href="https://github.com/kubeshop/xk6-tracetest" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-tracetest</h4>
        <p>Support for Tracetest test execution and tracing client</p>
    </a>
    <a href="https://github.com/kelseyaubrecht/xk6-webtransport" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-webtransport</h4>
        <p>Add support for webtransport protocol</p>
    </a>
    <a href="https://github.com/szkiba/xk6-yaml" target="_blank" class="nav-cards__item nav-cards__item--guide">
        <h4>xk6-yaml</h4>
        <p>Encode and decode YAML values</p>
    </a>
</div>

Don't see what you need? Learn how you can [create a custom extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/).
