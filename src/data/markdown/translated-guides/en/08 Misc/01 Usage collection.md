---
title: 'Usage collection'
excerpt: 'By default, k6 sends a usage report each time it is run, so that we can track how often people use it. This report can be turned off by setting an environment variable or option.'
canonicalUrl: https://grafana.com/docs/k6
---

By default, k6 sends a usage report each time it is run, so that we can track how often people use it. This report can be turned off by setting the environment variable `K6_NO_USAGE_REPORT` or by adding the option `--no-usage-report` when executing k6.

The usage report does not contain any information about what you are testing. The contents are the following:

- The k6 version (string, e.g. "0.17.2")
- Max VUs configured (number)
- Test duration (number)
- Total stages duration (number)
- VU iterations configured (number)
- The running program's operating system target (`darwin`, `freebsd`, `linux`...)
- The running program's architecture target (386, amd64, arm, s390x...)

This info is sent to an HTTP server that collects statistics on k6 usage.

For those interested, here is the actual Go [code](https://github.com/grafana/k6/blob/master/cmd/run.go) that generates and sends the usage report:

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
