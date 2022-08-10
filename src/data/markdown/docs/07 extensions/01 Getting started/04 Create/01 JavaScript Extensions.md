---
title: 'JavaScript Extensions'
excerpt: 'Follow these steps to build a JS extension for k6.'
---

Take advantage of Go's speed, power, and efficiency while providing the flexibility of using JavaScript APIs
within your test scripts.

By implementing k6 interfaces, you can close various gaps in your testing setup:

* New network protocols
* Improved performance
* Features not supported by k6 core

## Before you start

To run this tutorial, you'll need the following applications installed:
- Go
- Git

You also need to install xk6:

```bash
$ go install go.k6.io/xk6/cmd/xk6@latest
```

## Write a simple extension

1. First, set up a directory to work in:

  ```bash
  $ mkdir xk6-compare; cd xk6-compare; go mod init xk6-compare
  ```

1. In the directory, make a Go file for your JavaScript extension.
  
  A simple JavaScript extension requires a struct that exposes methods called by the test script.

  <!-- TODO: A better trivial example? A coin flip perhaps? -->

  ```go
  package compare

  import "fmt"

  // Compare is the type for our custom API.
  type Compare struct{
      ComparisonResult string // textual description of the most recent comparison
  }

  // IsGreater returns true if a is greater than b, or false otherwise, setting textual result message.
  func (c *Compare) IsGreater(a, b int) bool {
      if a > b {
          c.ComparisonResult = fmt.Sprintf("%d is greater than %d", a, b)
          return true
      } else {
          c.ComparisonResult = fmt.Sprintf("%d is NOT greater than %d", a, b)
          return false
      }
  }
  ```

1. Register the module to use these from k6 test scripts.

  <Blockquote mod="note" title="">

  k6 extensions must have the `k6/x/` prefix,
  and the short name must be unique among all extensions built in the same k6 binary.

  </Blockquote>

  ```go
  import "go.k6.io/k6/js/modules"

  // init is called by the Go runtime at application startup.
  func init() {
      modules.Register("k6/x/compare", new(Compare))
  }
  ```

1. Save the file as something like `compare.go`. The final code looks like this:

  <CodeGroup labels={["compare.go"]} lineNumbers={[true]}>

  ```go
  package compare

  import (
      "fmt"
      "go.k6.io/k6/js/modules"
  )

  // init is called by the Go runtime at application startup.
  func init() {
      modules.Register("k6/x/compare", new(Compare))
  }

  // Compare is the type for our custom API.
  type Compare struct{
      ComparisonResult string // textual description of the most recent comparison
  }

  // IsGreater returns true if a is greater than b, or false otherwise, setting textual result message.
  func (c *Compare) IsGreater(a, b int) bool {
      if a > b {
          c.ComparisonResult = fmt.Sprintf("%d is greater than %d", a, b)
          return true
      } else {
          c.ComparisonResult = fmt.Sprintf("%d is NOT greater than %d", a, b)
          return false
      }
  }
  ```

  </CodeGroup>

## Compile your extended k6

To build a k6 binary with this extension, run this command:

```bash
$ xk6 build --with xk6-compare=.
```

<Blockquote mod="note" title="">

When building from source code, `xk6-compare` is the Go module name passed to `go mod init`.
Usually, this would be a URL similar to `github.com/grafana/xk6-compare`.

</Blockquote>


## Use your extension

Now, use the extension in a test script!

1. Make a file with a name like `test.js` then add this code:

  <CodeGroup labels={["test.js"]} lineNumbers={[true]}>

  ```javascript
  import compare from 'k6/x/compare';

  export default function () {
    console.log(`${compare.isGreater(2, 1)}, ${compare.comparison_result}`);
    console.log(`${compare.isGreater(1, 3)}, ${compare.comparison_result}`);
  }
  ```

  </CodeGroup>

1. Run the test with `./k6 run test.js`.

  It should output the following:

  ```shell
  INFO[0000] true, 2 is greater than 1                     source=console
  INFO[0000] false, 1 is NOT greater than 3                source=console
  ```

## Use the advanced module API

Suppose your extension needs access to internal k6 objects to, for example, inspect the state of the test during execution.
We will need to make slightly more complicated changes to the above example.

Our main `Compare` struct should implement the [`modules.Instance`](https://pkg.go.dev/go.k6.io/k6/js/modules#Instance) interface
to access the [`modules.VU`](https://pkg.go.dev/go.k6.io/k6/js/modules#VU) to inspect internal k6 objects such as:

* [`lib.State`](https://pkg.go.dev/go.k6.io/k6/lib#State), the VU state with values like the VU ID and iteration number
* [`goja.Runtime`](https://pkg.go.dev/github.com/dop251/goja#Runtime), the JavaScript runtime used by the VU
* a global `context.Context` containing objects like the [`lib.ExecutionState`](https://pkg.go.dev/go.k6.io/k6/lib#ExecutionState)

Additionally, there should be a root module implementation of the [`modules.Module`](https://pkg.go.dev/go.k6.io/k6/js/modules#Module)
interface to serve as a factory of `Compare` instances for each VU.

<Blockquote mod="attention" title="The compare factory can have memory implications">

The significance depends on the size of your module.

</Blockquote>


Here's what that would look like:

<CodeGroup labels={["compare.go"]} lineNumbers={[true]}>

```go
package compare

import (
    "fmt"
    "go.k6.io/k6/js/modules"
)

// init is called by the Go runtime at application startup.
func init() {
    modules.Register("k6/x/compare", New())
}

type (
    // RootModule is the global module instance that will create module
    // instances for each VU.
    RootModule struct{}

    // ModuleInstance represents an instance of the JS module.
    ModuleInstance struct {
        // vu provides methods for accessing internal k6 objects for a VU
        vu modules.VU
        // comparator is the exported type
        comparator *Compare
    }
)

// Ensure the interfaces are implemented correctly.
var (
    _ modules.Instance = &ModuleInstance{}
    _ modules.Module   = &RootModule{}
)

// New returns a pointer to a new RootModule instance.
func New() *RootModule {
    return &RootModule{}
}

// NewModuleInstance implements the modules.Module interface returning a new instance for each VU.
func (*RootModule) NewModuleInstance(vu modules.VU) modules.Instance {
    return &ModuleInstance{
        vu: vu,
        comparator: &Compare{vu: vu}
    }
}

// Compare is the type for our custom API.
type Compare struct{
    vu modules.VU           // provides methods for accessing internal k6 objects
    ComparisonResult string // textual description of the most recent comparison
}

// IsGreater returns true if a is greater than b, or false otherwise, setting textual result message.
func (c *Compare) IsGreater(a, b int) bool {
    if a > b {
        c.ComparisonResult = fmt.Sprintf("%d is greater than %d", a, b)
        return true
    } else {
        c.ComparisonResult = fmt.Sprintf("%d is NOT greater than %d", a, b)
    return false
    }
}

// Exports implements the modules.Instance interface and returns the exported types for the JS module.
func (mi *ModuleInstance) Exports() modules.Exports {
    return modules.Exports{
        Default: c.comparator
    }
}
```

</CodeGroup>

<Blockquote mod="note" title="">

Notice that we implemented the Module API and now `modules.Register` the _root module_ rather than our _Compare_ object!

</Blockquote>


## Accessing runtime state

At this time, we've provided access to the [`modules.VU`](https://pkg.go.dev/go.k6.io/k6/js/modules#VU) from the `Compare`
type; however, we aren't taking advantage of the methods provided. Here is a contrived example of how we can utilize the
runtime state:

<CodeGroup labels={[]} lineNumbers={[false]}>

```go
// InternalState holds basic metadata from the runtime state.
type InternalState struct {
	ActiveVUs       int64      `js:"activeVUs"`
	Iteration       int64
	VUID            uint64     `js:"vuID"`
	VUIDFromRuntime goja.Value `js:"vuIDFromRuntime"`
}

// GetInternalState interrogates the current virtual user for state information.
func (c *Compare) GetInternalState() *InternalState {
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

Create a test script to utilize the new `getInternalState()` function as in the following:

<CodeGroup labels={["test-state.js"]} lineNumbers={[true]}>

```javascript
import compare from 'k6/x/compare';

export default function () {
  const state = compare.getInternalState();
  console.log(
    `Active VUs: ${state.activeVUs}, Iteration: ${state.iteration}, VU ID: ${state.vuID}, VU ID from runtime: ${state.vuIDFromRuntime}`
  );
}
```

</CodeGroup>

Executing the script as `./k6 run test-state.js --vus 2 --iterations 5` will produce output similar to the following:
```shell
INFO[0000] Active VUs: 2, Iteration: 0, VU ID: 2, VU ID from runtime: 2  source=console
INFO[0000] Active VUs: 2, Iteration: 0, VU ID: 1, VU ID from runtime: 1  source=console
INFO[0000] Active VUs: 2, Iteration: 1, VU ID: 2, VU ID from runtime: 2  source=console
INFO[0000] Active VUs: 2, Iteration: 1, VU ID: 1, VU ID from runtime: 1  source=console
INFO[0000] Active VUs: 2, Iteration: 2, VU ID: 2, VU ID from runtime: 2  source=console
```

> For a more extensive usage example of this API, look at the
> [`k6/execution`](https://github.com/grafana/k6/blob/master/js/modules/k6/execution/execution.go) module.

## Things to keep in mind

- The code in the `default` function (or another function specified by
  [`exec`](/using-k6/scenarios/#common-options)) will be executed many
  times during a test run and possibly in parallel by thousands of VUs.
  Any operation of your extension should therefore be performant
  and [thread-safe](https://en.wikipedia.org/wiki/Thread_safety).
- Any _heavy_ initialization should be done in the [init context](/javascript-api/init-context/),
  if possible, and not as part of the `default` function execution.
- Use the registry's [`NewMetric`](https://pkg.go.dev/go.k6.io/k6/metrics#Registry.NewMetric) method to create
  custom metrics; to emit them, use [`metrics.PushIfNotDone()`](https://pkg.go.dev/go.k6.io/k6/metrics#PushIfNotDone).

> Questions? Feel free to join the discussion on extensions in the [k6 Community Forum](https://community.k6.io/c/extensions/).

Next, create an [Output extension](/extensions/getting-started/create/output-extensions/) to publish test metrics
to a destination not already supported by k6.

