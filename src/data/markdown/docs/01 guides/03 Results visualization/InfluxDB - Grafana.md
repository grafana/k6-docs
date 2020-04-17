---
title: 'InfluxDB + Grafana'
excerpt: ''
---

Want some graphs? It's simpler than you think, using InfluxDB for data storage and Grafana
for visualization.

![Grafana Visualization](images/grafana-visualization.png)

## Installing InfluxDB and Grafana

### InfluxDB

Full installation instructions are available in [the InfluxDB docs](https://docs.influxdata.com/influxdb/v1.2/introduction/installation/).

<div class="code-group" data-props='{ "labels": ["Linux (Debian/Ubuntu)", "macOS"] }'>

```shell
$ sudo apt install influxdb
```

```shell
$ brew install influxdb
```

</div>

### Grafana

Full installation instructions are available in [the Grafana docs](http://docs.grafana.org/installation/).

<div class="code-group" data-props='{ "labels": ["Linux (Debian/Ubuntu)", "macOS"] }'>

```shell
$ sudo apt install grafana
```

```shell
$ brew install grafana
```

</div>

_After this, you should have an InfluxDB server running on localhost, listening on port 8086,
and a Grafana server on `http://localhost:3000_`

## Using InfluxDB to store results

k6 has built-in support for outputting results data directly to an InfluxDB database using
the `--out` (`-o`) switch:

<div class="code-group" data-props='{ "labels": ["Linux & MacOS", "Docker"] }'>

```shell
$ k6 run --out influxdb=http://localhost:8086/myk6db script.js
```

```shell
$ docker run -i loadimpact/k6 run --out influxdb=http://localhost:8086/myk6db - <script.js
```

</div>

The above command line makes k6 connect to a local influxdb instance, and send the results from
the test to a database named `myk6db`. If this database does not exist, k6 will create it
automatically.

Once you have k6 results in your InfluxDB database, you can then use Grafana to
create results visualizations.

## Using Grafana to visualize results

- Open `http://localhost:3000` (or wherever your Grafana installation is located) in your browser.
- Create a data source:
  ![Create Data Source](images/grafana-create-data-source.png)
- Now create a dashboard. Here is the newly created dashboard:
  ![Create Dashboard](images/grafana-new-dashboard.png)
- Click `Graph` to create a new graph panel:
  ![Create Graph Panel](images/grafana-new-graph-panel.png)
- Click the `Panel title` and then `Edit` to set up the graph panel:
  ![Edit Graph Panel](images/grafana-configure-graph-panel.png)
- Set the panel data source to your `myk6db` database and click the `SELECT mean(value)...`
  statement to edit the metric:
  ![Edit metric](images/grafana-edit-metric.png)

## Using our docker-compose setup

To make all the above even simpler, we have created a docker-compose setup that will:

- Start a Docker container with InfluxDB
- Start a Docker container with Grafana
- Make available a k6 container that you can use to run load tests

Make sure you have at least docker-compose version v1.12.0 installed.
You just need to do the following:

```shell
$ git clone 'https://github.com/loadimpact/k6'
$ cd k6
$ git submodule update --init
$ docker-compose up -d \
    influxdb \
    grafana
$ docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/es6sample.js
```

Now you should be able to connect to localhost on port 3000 with your browser and access the
Grafana installation in the Docker container.

## Preconfigured Grafana dashboards

Here we will list premade Grafana dashboard configurations contributed by users, for use
with k6. To enable a contributed Grafana dashboard is simple: you just choose to "import"
a dashboard in the Grafana UI and then specify the ID number of the dashboard you want,
see http://docs.grafana.org/reference/export_import/ for more details.

![ID 2587, by Dave Cadwallader](images/grafana-dave.png)
_https://grafana.com/dashboards/2587_
