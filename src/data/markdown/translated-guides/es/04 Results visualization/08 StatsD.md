---
title: 'StatsD'
excerpt: ''
---

k6 también puede mostrar las métricas con un servicio [StatsD](https://github.com/statsd/statsd) como se muestra a continuación:

<CodeGroup labels={["StatsD"]}>

```bash
$ k6 run --out statsd script.js
```

</CodeGroup>

Se pueden configurar las siguientes opciones:

| Nombre                      | Valor                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| `K6_STATSD_ADDR`          | Dirección del servicio statsd, actualmente sólo se admite UDP. El valor por defecto es `localhost:8125`. |
| `K6_STATSD_NAMESPACE`     | El espacio de nombres utilizado como prefijo para todos los nombres de las métricas. El valor por defecto es `k6`.                    |
| `K6_STATSD_PUSH_INTERVAL` | Configure la frecuencia con la que se envían los datos. El valor por defecto es `1s`.                     |
| `K6_STATSD_BUFFER_SIZE`   | El tamaño del buffer. El valor por defecto es `20`.                                                            |
