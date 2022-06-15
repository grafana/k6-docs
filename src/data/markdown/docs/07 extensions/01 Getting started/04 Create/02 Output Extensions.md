---
title: 'Output Extensions'
excerpt: 'Performance testing without limits. This tutorial shows how to write your first k6 extension.'
---

## Writing a new Output extension

Output extensions are written similarly to JavaScript extensions, but have a
different API and performance considerations.

You can use [this template repository](https://github.com/grafana/xk6-output-template) for output extensions with very basic implementation as a starting point.

The core of an Output extension is a struct that implements the [`output.Output`
interface](https://pkg.go.dev/go.k6.io/k6/output#Output). For example:

<CodeGroup labels={["log.go"]} lineNumbers={[false]}>

```go
package log

import (
	"fmt"
	"io"

	"go.k6.io/k6/output"
	"go.k6.io/k6/stats"
)

// Register the extension on module initialization.
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

// AddMetricSamples receives metric samples from the k6 Engine as they're
// emitted and prints them to stdout.
func (l *Logger) AddMetricSamples(samples []metrics.SampleContainer) {
	for i := range samples {
		all := samples[i].GetSamples()
		for j := range all {
			fmt.Fprintf(l.out, "%d %s: %f\n", all[j].Time.UnixNano(), all[j].Metric.Name, all[j].Value)
		}
	}
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
  With this object the extension can access the output-specific configuration,
  interfaces to the filesystem, synchronized stdout and stderr, and more.
- `AddMetricSamples` in this example simply writes to stdout. In a real-world
  scenario this output might have to be buffered and flushed periodically to avoid
  memory leaks. Below we'll discuss some helpers you can use for that.


### Additional features

- Output structs can optionally implement additional interfaces that allows them to
  [receive thresholds](https://pkg.go.dev/go.k6.io/k6/output#WithThresholds),
  [test run status updates](https://pkg.go.dev/go.k6.io/k6/output#WithRunStatusUpdates)
  or [interrupt a test run](https://pkg.go.dev/go.k6.io/k6/output#WithTestRunStop).
- Because output implementations typically need to process large amounts of data that
  k6 produces and dispatch it to another system, we've provided a couple of helper
  structs you can use in your extensions:
  [`output.SampleBuffer`](https://pkg.go.dev/go.k6.io/k6/output#SampleBuffer)
  is a thread-safe buffer for metric samples to help with memory management and
  [`output.PeriodicFlusher`](https://pkg.go.dev/go.k6.io/k6/output#PeriodicFlusher)
  will periodically run a function which is useful for flushing or dispatching the
  buffered samples.
  For usage examples see the [`statsd` output](https://pkg.go.dev/go.k6.io/k6/output/statsd).
