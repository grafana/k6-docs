---
title: 'Create an extension'
excerpt: 'Performance testing without limits. This tutorial shows how to write your first k6 extension.'
---


If you want to create your own k6 extension, you will need to be familiar with both Go and JavaScript, understand how the k6 Go<->JS bridge works, and maintain a public repository for the extension that keeps up to date with any breaking API changes while xk6 is being stabilized.

The first thing you should do before starting work on a new extension is to confirm
that a similar extension doesn't already exist for your use case. Take a look at
the [Extensions page](/extensions) and the [`xk6` topic on GitHub](https://github.com/topics/xk6).
For example, if a system you need support for can be tested with a generic protocol
like MQTT, prefer using [xk6-mqtt](https://github.com/pmalhaire/xk6-mqtt)
instead of creating an extension that uses some custom protocol.
Also, prefer to write a pure JavaScript library that can be used in k6 if you can
avoid writing an extension in Go, since a JS library will be better supported and
likely easier to write and reuse than an extension.

Next, you should decide the type of extension you need. A JavaScript extension is a
good fit if you want to extend the JS functionality of your script, or add support
for a new network protocol to test with. An Output extension would be more suitable
if you need to process the metrics emitted by k6 in some way, submit them to a
specific storage backend that was previously unsupported, etc. The k6 APIs you'll
need to use and things to consider while developing will be different in each case.


## Writing a new JavaScript extension

A simple JavaScript extension consists of a main module struct that exposes
methods that can be called from a k6 test script. For example:

<!-- TODO: A better trivial example? -->

<CodeGroup labels={[]} lineNumbers={[false]}>

```go
package compare

type Compare struct{}

func (*Compare) IsGreater(a, b int) bool {
	return a > b
}
```

</CodeGroup>

In order to use this from k6 test scripts we need to register the module
by adding the following:

<CodeGroup labels={[]} lineNumbers={[false]}>

```go
import "go.k6.io/k6/js/modules"

func init() {
	modules.Register("k6/x/compare", new(Compare))
}
```

</CodeGroup>

Note that all k6 extensions should have the `k6/x/` prefix and the short name
must be unique among all extensions built in the same k6 binary.

The final extension code will look like so:

<CodeGroup labels={["compare.go"]} lineNumbers={[true]}>

```go
package compare

import "go.k6.io/k6/js/modules"

func init() {
	modules.Register("k6/x/compare", new(Compare))
}

type Compare struct{}

func (*Compare) IsGreater(a, b int) bool {
	return a > b
}
```

</CodeGroup>

We can then build a k6 binary with this extension by running
`xk6 build --with xk6-compare=.`. In this case `xk6-compare` is the
Go module name passed to `go mod init`, but in a real-world scenario
this would be a URL.

Finally we can use the extension in a test script:

<CodeGroup labels={["test.js"]} lineNumbers={[true]}>

```javascript
import compare from 'k6/x/compare';

export default function () {
  console.log(compare.isGreater(2, 1));
}
```

</CodeGroup>

And run the test with `./k6 run test.js`, which should output `INFO[0000] true`.


### Notable features

The k6 Go-JS bridge has a few features we should highlight:

- Go method names will be converted from Pascal case to Camel case when
  accessed in JS, as in the example above: `IsGreater` becomes `isGreater`.

- Similarly, Go field names will be converted from Pascal case to Snake case.
  For example, the struct field `SomeField string` will be accessible in JS as
  the `some_field` object property. This behavior is configurable with the `js`
  struct tag, so this can be changed
  with <CodeInline>SomeField string &grave;js:"someField"&grave;</CodeInline>
  or the field can be hidden with <CodeInline>&grave;js:"-"&grave;</CodeInline>.

- Methods with a name prefixed with `X` will be transformed to JS
  constructors, and will support the `new` operator.
  For example, defining the following method on the above struct:

<CodeGroup labels={[]} lineNumbers={[false]}>

```go
type Comparator struct{}

func (*Compare) XComparator() *Comparator {
	return &Comparator{}
}
```

</CodeGroup>

  Would allow creating a `Comparator` instance in JS with `new compare.Comparator()`,
  which is a bit more idiomatic to JS.


### Advanced JavaScript extension

> ℹ️ **Note**
>
> The internal JavaScript module API is currently (October 2021) in a state of
> flux. The traditional approach of initializing JS modules involves calling
> [`common.Bind()`](https://pkg.go.dev/go.k6.io/k6/js/common#Bind)
> on any objects that need to be exposed to JS. This method has a few technical
> issues we want to improve, and also isn't flexible enough to implement
> new features like giving extensions access to internal k6 objects.
> Starting from v0.32.0 we've introduced a new approach for writing
> JS modules and is the method we'll be describing below. While this new API
> is recommended for new modules and extensions, note that it's still in
> development and might change while it's being stabilized.

If your extension requires access to internal k6 objects to, for example,
inspect the state of the test during execution, we will need to make some
slightly more complicated changes to the above example.

Our main `Compare` struct should implement the
[`modules.Instance` interface](https://pkg.go.dev/go.k6.io/k6/js/modules#Instance)
and get access to
[`modules.VU`](https://pkg.go.dev/go.k6.io/k6/js/modules#VU)
in order to access internal k6 objects such as:
- [`lib.State`](https://pkg.go.dev/go.k6.io/k6/lib#State): the VU state with
  values like the VU ID and iteration number.
- [`goja.Runtime`](https://pkg.go.dev/github.com/dop251/goja#Runtime): the
  JavaScript runtime used by the VU.
- a global `context.Context` which contains other interesting objects like
  [`lib.ExecutionState`](https://pkg.go.dev/go.k6.io/k6/lib#ExecutionState).

Additionally there should be a root module implementation of the
[`modules.Module` interface](https://pkg.go.dev/go.k6.io/k6/js/modules#Module)
that will serve as a factory of `Compare` instances for each VU. Note that this
can have memory implications depending on the size of your module.

Here's how that would look like:

<CodeGroup labels={["compare-advanced.go"]} lineNumbers={[true]}>

```go
package compare

import "go.k6.io/k6/js/modules"

func init() {
	modules.Register("k6/x/compare", New())
}

type (
	// RootModule is the global module instance that will create Compare
	// instances for each VU.
	RootModule struct{}

	// Compare represents an instance of the JS module.
	Compare struct {
		// modules.VU provides some useful methods for accessing internal k6
		// objects like the global context, VU state and goja runtime.
		vu modules.VU
		// Comparator is the exported module instance.
		*Comparator
	}
)

// Ensure the interfaces are implemented correctly.
var (
	_ modules.Instance = &Compare{}
	_ modules.Module   = &RootModule{}
)

// New returns a pointer to a new RootModule instance.
func New() *RootModule {
	return &RootModule{}
}

// NewModuleInstance implements the modules.Module interface and returns
// a new instance for each VU.
func (*RootModule) NewModuleInstance(vu modules.VU) modules.Instance {
	return &Compare{vu: vu, Comparator: &Comparator{vu: vu}}
}

// Comparator is the exported module instance.
type Comparator struct{
    vu modules.VU
}

// IsGreater returns true if a is greater than b, or false otherwise.
func (*Comparator) IsGreater(a, b int) bool {
	return a > b
}

// Exports implements the modules.Instance interface and returns the exports
// of the JS module.
func (c *Compare) Exports() modules.Exports {
	return modules.Exports{Default: c.Comparator}
}
```

</CodeGroup>

Currently this module isn't taking advantage of the methods provided by
[`modules.VU`](https://pkg.go.dev/go.k6.io/k6/js/modules#VU)
because our simple example extension doesn't require it, but here is
a contrived example of how that could be done:

<CodeGroup labels={[]} lineNumbers={[false]}>

```go
type InternalState struct {
	ActiveVUs       int64 `js:"activeVUs"`
	Iteration       int64
	VUID            uint64     `js:"vuID"`
	VUIDFromRuntime goja.Value `js:"vuIDFromRuntime"`
}

func (c *Comparator) GetInternalState() *InternalState {
	state := c.vu.State()
	ctx := c.vu.Context()
	es := lib.GetExecutionState(ctx)
	rt := c.vu.Runtime()

	return &InternalState{
		VUID:            state.VUID,
		VUIDFromRuntime: rt.Get("__VU"),
		Iteration:       state.Iteration,
		ActiveVUs:       es.GetCurrentlyActiveVUsCount(),
	}
}
```

</CodeGroup>

Running a script like:

<CodeGroup labels={["test.js"]} lineNumbers={[true]}>

```javascript
import compare from 'k6/x/compare';

export default function () {
  const state = compare.getInternalState();
  console.log(`Active VUs: ${state.activeVUs}
Iteration: ${state.iteration}
VU ID: ${state.vuID}
VU ID from runtime: ${state.vuIDFromRuntime}`);
}
```

</CodeGroup>

Should output:

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
INFO[0000] Active VUs: 1
Iteration: 0
VU ID: 1
VU ID from runtime: 1  source=console
```

</CodeGroup>

> ℹ️ **Note**
>
> For a more extensive usage example of this API, take a look at the
> [`k6/execution`](https://github.com/grafana/k6/blob/v0.35.0/js/modules/k6/execution/execution.go)
> module.

Notice that the JavaScript runtime will transparently convert Go types like
`int64` to their JS equivalent. For complex types where this is not
possible your script might fail with a `TypeError` and you will need to convert
your object to a [`goja.Object`](https://pkg.go.dev/github.com/dop251/goja#Object) or [`goja.Value`](https://pkg.go.dev/github.com/dop251/goja#Value).

For example:

<CodeGroup labels={[]} lineNumbers={[false]}>

```go
type Comparator struct{}

func (*Compare) XComparator(call goja.ConstructorCall, rt *goja.Runtime) *goja.Object {
	return rt.ToValue(&Comparator{}).ToObject(rt)
}
```

</CodeGroup>

This also demonstrates the native constructors feature from goja, where methods
with this signature will be transformed to JS constructors, and also have
the benefit of receiving the `goja.Runtime`, which is an alternative way
to access it in addition to the `Runtime()` method shown above.


### Things to keep in mind

- The code in the `default` function (or another function specified by
  [`exec`](/using-k6/scenarios/#common-options)) will be executed many
  times during a test run and possibly in parallel by thousands of VUs.
  As such any operation of your extension meant to run in that context
  needs to be performant and [thread-safe](https://en.wikipedia.org/wiki/Thread_safety).
- Any heavy initialization should be done in the [init
  context](/javascript-api/init-context/) if possible, and not as part of the
  `default` function execution.
- Custom metric emission can be done by creating new metrics using a registry's [`NewMetric`](https://pkg.go.dev/go.k6.io/k6/metrics#Registry.NewMetric) method
  and emitting them using [`metrics.PushIfNotDone()`](https://pkg.go.dev/go.k6.io/k6/metrics#PushIfNotDone).


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
