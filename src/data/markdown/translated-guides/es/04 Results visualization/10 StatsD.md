---
title: 'StatsD'
excerpt: 'k6 también puede mostrar las métricas con un servicio StatsD.'
---

k6 también puede mostrar las métricas con un servicio [StatsD](https://github.com/statsd/statsd) como se muestra a continuación:

<CodeGroup labels={["StatsD"]}>

```bash
$ k6 run --out output-statsd script.js
```

</CodeGroup>

Se pueden configurar las siguientes opciones:

| Nombre                      | Valor                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `K6_STATSD_ADDR`          | Dirección del servicio statsd, actualmente sólo se admite UDP. El valor por defecto es `localhost:8125`. |
| `K6_STATSD_NAMESPACE`     | El espacio de nombres utilizado como prefijo para todos los nombres de las métricas. El valor por defecto es `k6`.                    |
| `K6_STATSD_PUSH_INTERVAL` | Configure la frecuencia con la que se envían los datos. El valor por defecto es `1s`.                     |
| `K6_STATSD_BUFFER_SIZE`   | El tamaño del buffer. El valor por defecto es `20`.                                                            |
| `K6_STATSD_ENABLE_TAGS`   | Si es `true` habilita el envío de tags. Es `false` por defecto ya que versiones de statsd anterior a v0.9.0 no soportan tags. (disponible desde v0.32.0) |
| `K6_STATSD_TAG_BLOCKLIST` | Una lista de tags separada por coma que NO deben ser enviados a statsd. Por ejemplo, "tag1,tag2". El valor por defecto es `vu,iter,url`. (disponible desde v0.32.0) |
