---
title: 'Output Extensions'
---

Create a custom output extension if you wish to store or alter metrics captured during an active k6 test. Out of the box, 
k6 already provides multiple destinations and metric types, but we cannot directly support all possibilities.

Some potential reasons for a custom extension could include:
* Support a time-series database not already supported
* add derived metrics data for storage
* filter metrics to only that data you care about

Like [JavaScript extensions](/extensions/getting-started/create/javascript-extensions/), output extensions rely
on the extension author to implement specific APIs.

## Writing a simple extension

The core of an Output extension is a struct that implements the [`output.Output`](https://pkg.go.dev/go.k6.io/k6/output#Output) 
interface.

We'll create a simple example that outputs each set of metrics to the console as received by the `AddMetricSamples(samples []metrics.SampleContainer)` 
method of the output interface.

```go
package log

import (
    "fmt"
	"strings"
	"time"

    "go.k6.io/k6/metrics"
    "go.k6.io/k6/output"
)

// AddMetricSamples receives metric samples from the k6 Engine as they're emitted.
func (l *Logger) AddMetricSamples(samples []metrics.SampleContainer) {
    for _, sample := range samples {
        all := sample.GetSamples()
        fmt.Fprintf(l.out, "%s [%s]\n", all[0].GetTime().Format(time.RFC3339Nano), metricKeyValues(all))
    }
}

// metricKeyValues returns a string of key-value pairs for all metrics in the sample.
func metricKeyValues(samples []metrics.Sample) string {
    names := make([]string, 0, len(samples))
    for _, sample := range samples {
        names = append(names, fmt.Sprintf("%s=%v", sample.Metric.Name, sample.Value))
    }
    return strings.Join(names, ", ")
}
```

Register the module to use these from k6 test scripts.

```go
import "go.k6.io/k6/output"

// init is called by the Go runtime at application startup.
func init() {
	output.RegisterExtension("logger", New)
}
```

> The registered name must be used with the `-o`, or `--out` argument when running k6! 

The final extension code will look like so:

<CodeGroup labels={["log.go"]} lineNumbers={[true]}>

```go
package log

import (
    "fmt"
    "io"
    "strings"
    "time"
	
    "go.k6.io/k6/metrics"
    "go.k6.io/k6/output"
)

// init is called by the Go runtime at application startup.
func init() {
    output.RegisterExtension("logger", New)
}

// Logger writes k6 metric samples to stdout.
type Logger struct {
    out io.Writer
}

// New returns a new instance of Logger.
func New(params output.Params) (output.Output, error) {
    return &Logger{params.StdOut}, nil
}

// Description returns a short human-readable description of the output.
func (*Logger) Description() string {
    return "logger"
}

// Start initializes any state needed for the output, establishes network
// connections, etc.
func (o *Logger) Start() error {
    return nil
}

// AddMetricSamples receives metric samples from the k6 Engine as they're emitted.
func (l *Logger) AddMetricSamples(samples []metrics.SampleContainer) {
    for _, sample := range samples {
        all := sample.GetSamples()
        fmt.Fprintf(l.out, "%s [%s]\n", all[0].GetTime().Format(time.RFC3339Nano), metricKeyValues(all))
    }
}

// metricKeyValues returns a string of key-value pairs for all metrics in the sample.
func metricKeyValues(samples []metrics.Sample) string {
    names := make([]string, 0, len(samples))
    for _, sample := range samples {
        names = append(names, fmt.Sprintf("%s=%v", sample.Metric.Name, sample.Value))
    }
    return strings.Join(names, ", ")
}

// Stop finalizes any tasks in progress, closes network connections, etc.
func (*Logger) Stop() error {
    return nil
}
```

</CodeGroup>

Notice a couple of things:

- The module initializer `New()` receives an instance of
  [`output.Params`](https://pkg.go.dev/go.k6.io/k6/output#Params).
  With this object, the extension can access the output-specific configuration,
  interfaces to the filesystem, synchronized stdout and stderr, and more.
  
- `AddMetricSamples` in this example writes to stdout. This output might have 
  to be buffered and flushed periodically in a real-world scenario to avoid memory 
  leaks. Below we'll discuss some helpers you can use for that.

## Compiling your extended k6

We can then build a k6 binary including this extension by running:

```bash
$ xk6 build --with xk6-output-logger=.
```
> When building from source code, `xk6-output-logger` is the Go module name passed to `go mod init`.
> Usually, this would be a URL similar to `github.com/grafana/xk6-output-logger`.

## Using your extension

Now we can use the extension with a test script!

<CodeGroup labels={["test.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test-api.k6.io');
  sleep(0.5);
}
```

</CodeGroup>

Now, let's run the test.

```bash
$ ./k6 run test.js -o logger --quiet --no-summary --iterations 2
```

> Take note of the `-o logger` argument. This is what tells k6 to use your custom output. Also, we're using 
> `--quiet --no-summary` in order to only show our custom output.

Your output should be similar to the following:

```shell
2022-07-01T08:55:09.59272-05:00 [http_reqs=1, http_req_duration=117.003, http_req_blocked=558.983, http_req_connecting=54.135, http_req_tls_handshaking=477.198, http_req_sending=0.102, http_req_waiting=116.544, http_req_receiving=0.357, http_req_failed=0]
2022-07-01T08:55:09.917036-05:00 [vus=1, vus_max=1]
2022-07-01T08:55:10.094196-05:00 [data_sent=446, data_received=21364, iteration_duration=1177.505083, iterations=1]
2022-07-01T08:55:10.213926-05:00 [http_reqs=1, http_req_duration=119.122, http_req_blocked=0.015, http_req_connecting=0, http_req_tls_handshaking=0, http_req_sending=0.103, http_req_waiting=118.726, http_req_receiving=0.293, http_req_failed=0]
2022-07-01T08:55:10.715323-05:00 [data_sent=102, data_received=15904, iteration_duration=620.862459, iterations=1]
```

## Things to keep in mind

- Output structs can optionally implement additional interfaces that allow them to
  receive [thresholds](https://pkg.go.dev/go.k6.io/k6/output#WithThresholds) or 
  [run-status updates](https://pkg.go.dev/go.k6.io/k6/output#WithRunStatusUpdates)
  and even [interrupt a test](https://pkg.go.dev/go.k6.io/k6/output#WithTestRunStop).
- Consider using [`output.SampleBuffer`](https://pkg.go.dev/go.k6.io/k6/output#SampleBuffer)
  and [`output.PeriodicFlusher`](https://pkg.go.dev/go.k6.io/k6/output#PeriodicFlusher) 
  to improve performance given the large amounts of data produced by k6. Refer to
  [`statsd` output](https://github.com/grafana/k6/blob/master/output/statsd/output.go) for an example.
- Use the [project template](https://github.com/grafana/xk6-output-template) as a starting point 
  for your output extension.

> Questions? Feel free to join the discussion on extensions in the [k6 Community Forum](https://community.k6.io/c/extensions/).
