---
title: 'Recopilación de datos de uso'
excerpt: ''
---


Por defecto, k6 envía un reporte de uso cada vez que se ejecuta una prueba, para que podamos hacer un seguimiento de la frecuencia de uso. Este informe puede desactivarse estableciendo la variable de entorno `K6_NO_USAGE_REPORT` o añadiendo la opción `--no-usage-report` al ejecutar k6.

El reporte de uso no contiene ninguna información sobre lo que se está probando. Solamente contiene la siguiente información:

- La versión de k6 (string, por ejemplo, "0.17.2")
- Cantidad de VUs máximos configurados (número)
- Duración de la prueba (número)
- Duración total de los escenarios (número)
- Iteraciones de los VU configurados (número)
- El sistema operativo del programa en ejecución (darwin, freebsd, linux...)
- La arquitectura del programa en ejecución (386, amd64, arm, s390x...)

Esta información se envía a un servidor HTTP que recoge estadísticas sobre el uso de k6.

Para los que estén interesados en esto, aquí dejamos plasmado el [código Go](https://github.com/loadimpact/k6/blob/master/cmd/run.go) que genera y envía el reporte de uso:


<CodeGroup labels={["snippet from run.go"]} lineNumbers={[true]}>

```go
  // If the user hasn't opted out: report usage.

  if !conf.NoUsageReport.Bool {
    go func() {
      u := "http://k6reports.k6.io/"
      mime := "application/json"
      var endTSeconds float64

      if endT := engine.Executor.GetEndTime(); endT.Valid {
        endTSeconds = time.Duration(endT.Duration).Seconds()
      }

      var stagesEndTSeconds float64
      if stagesEndT := lib.SumStages(engine.Executor.GetStages()); stagesEndT.Valid {
        stagesEndTSeconds = time.Duration(stagesEndT.Duration).Seconds()
      }

      body, err := json.Marshal(map[string]interface{}{
        "k6_version":  Version,
        "vus_max":     engine.Executor.GetVUsMax(),
        "iterations":  engine.Executor.GetEndIterations(),
        "duration":    endTSeconds,
        "st_duration": stagesEndTSeconds,
        "goos":        runtime.GOOS,
        "goarch":      runtime.GOARCH,
      })

      if err != nil {
        panic(err) // This should never happen!!
      }
      if _, err := http.Post(u, mime, bytes.NewBuffer(body)); err != nil {
        log.WithError(err).Debug("Couldn't send usage blip")
      }
    }()
  }
```

</CodeGroup>
