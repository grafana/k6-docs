---
title: "InfluxDB"
excerpt: ""
---

Detailed statistics can also be sent directly to an [InfluxDB](https://github.com/influxdata/influxdb) instance:


<div class="code-group" data-props='{"labels": ["InfluxDB"]}'>

```shell
k6 run --out influxdb=http://localhost:8086/k6 script.js
````

</div>

The above will make k6 connect to an InfluxDB instance listening to port 8086 on localhost, and insert all test results data into a database named "k6" (which will be created if it doesn't exist).

Then you can use some other tool like [Grafana](https://grafana.com/) to visualize the data.

Read more in this [Tutorial about using k6 with InfluxDB and Grafana](https://k6.io/blog/k6-loves-grafana/).
