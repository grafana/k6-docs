---
title: 'CSV'
excerpt: 'También puede hacer que k6 emita estadísticas detalladas en formato CSV utilizando la opción -o.'
---

También puede hacer que k6 emita estadísticas detalladas en formato CSV utilizando la opción `--out/-o` con `k6 run`, de la siguiente manera:

<CodeGroup labels={["CLI"]}>

```bash
$ k6 run --out csv=my_test_result.csv script.js
```

</CodeGroup>

O si quieres obtener el resultado comprimido, puede ejecutar el siguiente comando:

<CodeGroup labels={["CLI"]}>

```bash
$ k6 run --out csv=my_test_result.gz script.js
```

</CodeGroup>

## Formato CSV

El archivo de resultados CSV contendrá líneas como éstas:

<CodeGroup labels={["Output"]}>

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

</CodeGroup>

Cada entrada en el informe representa una métrica `metric_name` junto con su valor `metric_value` en el tiempo `timestamp`. Si hay un error, se rellenará el error junto con los campos `error_code`.

## Véase también

- [Métricas](/es/usando-k6/metricas/)
- [Error codes](/javascript-api/error-codes)
