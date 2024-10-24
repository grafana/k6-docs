---
title: 'CSV'
description: 'You can also make k6 output detailed statistics in a CSV format by using the --out option.'
weight: 00
---

# CSV

You can output granular data points in CSV format.
To do so, use `k6 run` with the `--out` flag.
Pass the path for your CSV file as the flag argument:

{{< code >}}

```bash
$ k6 run --out csv=test_results.csv script.js
```

{{< /code >}}

You can also get the results gzipped, like this:

{{< code >}}

```bash
$ k6 run --out csv=test_results.gz script.js
```

{{< /code >}}

To inspect the output in real time, you can use a command like `tail -f` on the file you save:

```bash
$ tail -f test_results.csv
```

## CSV format

The CSV result file will look something like this:

{{< code >}}

```plain
metric_name,timestamp,metric_value,check,error,error_code,group,method,name,proto,scenario,status,subproto,tls_version,url,extra_tags
http_reqs,1595325560,1.000000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_duration,1595325560,221.899000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_blocked,1595325560,225.275000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_connecting,1595325560,217.680000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_tls_handshaking,1595325560,0.000000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_sending,1595325560,0.112000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_waiting,1595325560,220.280000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
http_req_receiving,1595325560,1.507000,,,,,GET,http://test.k6.io,HTTP/1.1,default,200,,,http://test.k6.io,
vus,1595325560,1.000000,,,,,,,,,,,,,
vus_max,1595325560,20.000000,,,,,,,,,,,,,
checks,1595325561,1.000000,status is 200,,,,,,,default,,,,,
checks,1595325561,0.000000,response body,,,,,,,default,,,,,
data_sent,1595325561,76.000000,,,,,,,,default,,,,,
data_received,1595325561,11045.000000,,,,,,,,default,,,,,
iteration_duration,1595325561,1449.049580,,,,,,,,default,,,,,
iterations,1595325561,1.000000,,,,,,,,default,,,,,
```

{{< /code >}}

Each entry in the report represents a metric, `metric_name`, along with its value, `metric_value`, at time, `timestamp`.
If an error happens, then the `error` along with the `error_code` fields will be populated.

## CSV options

k6 provides a few options to help you configure your CSV output:

<!-- vale off -->

| option         | Configures                                       | Possible values                                                                                                 | Default    | Env. variable          |
| -------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------- |
| `saveInterval` | The time intervals at which k6 writes to the CSV | Either a string with time units(`"1m45s"`), or a number of milliseconds                                         | `"1s"`     | `K6_CSV_SAVE_INTERVAL` |
| `timeFormat`   | The timestamp format                             | unix, unix_nano, unix_micro, unix_milli, [rfc3339](https://datatracker.ietf.org/doc/html/rfc3339), rfc3339_nano | unix       | `K6_CSV_TIME_FORMAT`   |
| `fileName`     | The file name and path where output is saved     | N/A                                                                                                             | `file.csv` | `K6_CSV_FILENAME`      |

<!-- vale on -->

## Read more

- [Metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics)
- [Error codes](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/error-codes)
