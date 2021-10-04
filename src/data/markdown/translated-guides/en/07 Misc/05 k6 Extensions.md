---
title: 'k6 Extensions'
---

Traditionally, extending k6 with custom functionality that isn't available in the
open source tool has been possible in one of two ways:

- By importing a JavaScript library. This is a simple way to extend the functionality
  of a test script, though it has some drawbacks. Since JavaScript in k6 runs in a
  virtual machine [that is unlike the one used in web browsers and
  NodeJS](/#what-k6-does-not), it's not possible to use libraries that write to
  disk, use JS APIs other than the ones built into k6, or need some new binary
  protocol support. Furthermore, while k6 performs well in most use cases, all
  execution is interpreted by the [Go JavaScript runtime](https://github.com/dop251/goja),
  which can impact the performance of certain resource intensive operations
  (cryptography, compression, etc.).

- By forking the [k6 repository](https://github.com/k6io/k6), doing the changes in Go
  and submitting a pull request for review by the core team (preferably following
  the [contribution guidelines](https://github.com/k6io/k6/blob/master/CONTRIBUTING.md)).
  This is a great way to contribute new core features, but it can be a lengthy
  process, and submissions might be rejected if they don't align with the long-term
  vision of the project.

To address these issues and allow the community to more easily adapt k6 to fit their
needs, [k6 v0.29.0](https://github.com/k6io/k6/releases/tag/v0.29.0) introduced
the [xk6 framework](https://github.com/k6io/xk6) and the concept of k6 extensions.


## What are k6 extensions?

k6 extensions are standalone Go projects that call k6 APIs but are otherwise
unrestricted in their functionality. This provides the freedom for extension authors
to experiment with novel integrations with k6 that could eventually easily become
part of core. In this sense extensions can be thought of as a "testing ground" for
eventual promotion upstream, once their features and API is stable, and given that
the extension is generally useful for all k6 users.


## What is xk6?

[xk6](https://github.com/k6io/xk6) is a command-line tool and framework inspired by
[xcaddy](https://github.com/caddyserver/xcaddy), designed for building custom k6
binaries that bundle one or more extensions written in Go.

Its main features are:

- Ease of use: with a few commands even less technical users should be able to build
  their own k6 binaries, given that they have the Go toolchain installed and any
  dependencies required by a specific extension.
- Simple API for Go programmers that handles the Go<->JS translation, with the
  ability to call any public k6 Go API. Extensions are first-class components along
  with other built-in modules.
- Cross-platform like Go and runs great on macOS, Windows and Linux.


### Extension types

The initial version of xk6 released in v0.29.0 supported only JavaScript extensions,
but since then we've added support for Output extensions, and are considering
expanding this to other areas of k6 as well.

The currently supported extension types are:

#### JavaScript extension

These extensions enhance the k6 JavaScript API to add support for new network
protocols, achieve better performance than equivalent JS libraries, or implement
features that are unlikely to be made part of the k6 core.

Some examples include: [xk6-sql](https://github.com/imiric/xk6-sql),
[xk6-crypto](https://github.com/szkiba/xk6-crypto) and [xk6-file](https://github.com/avitalique/xk6-file).


#### Output extension

While k6 has built-in support for many popular
[output backends](/docs/getting-started/results-output/), this list will undoubtedly
not be exhaustive. Output extensions receive metric samples from k6, and are able to
do any processing or further dispatching.

Some examples include: [xk6-prometheus](https://github.com/szkiba/xk6-prometheus)
and [xk6-influxdbv2](https://github.com/li-zhixin/xk6-influxdbv2).


## How to get started

There are two ways that xk6 can be used:

- By k6 users that wish to enhance their tests with existing extensions. A
  familiarity with the command line and Go is preferred, but not required.

- By Go developers interested in creating their own k6 extension. They'll need to be
  familiar with both Go and JavaScript, understand how the k6 Go<->JS bridge works,
  and maintain a public repository for the extension that keeps up to date with any
  breaking API changes while xk6 is being stabilized.


### Using xk6 to build a k6 binary

You might have found a neat k6 extension on the [Ecosystem page](/ecosystem) or on
[GitHub](https://github.com/topics/xk6) and wish to use it in your tests. Great! The
process is relatively simple and we're working on simplifying it further for end
users.

You'll first need to setup [Go](https://golang.org/doc/install) and
[Git](https://git-scm.com/). Make sure that your `$PATH` environment variable is
updated and that `go version` returns the correct version.

Then install xk6 with:

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ go install github.com/k6io/xk6/cmd/xk6@latest
```

</CodeGroup>

And confirm that `which xk6` on Linux/macOS or `where xk6.exe` on Windows returns a
valid path. Otherwise ensure that `$GOPATH` is correctly defined and that
`$GOPATH/bin` is added to your `$PATH` environment variable. See the
[Go documentation](https://golang.org/cmd/go/#hdr-GOPATH_environment_variable) for details.

Once xk6 is installed, building a k6 binary with one or more extensions can be done
with the following command:

<CodeGroup labels={[]} lineNumbers={[false]}>

```bash
$ xk6 build v0.33.0 \
  --with github.com/imiric/xk6-sql \
  --with github.com/szkiba/xk6-prometheus
```

</CodeGroup>

This will build a `k6` binary in the current directory based on k6 v0.33.0, bundling
a JavaScript and an Output extension. Now you can run a script with this binary that
uses the [`xk6-sql` JS API](https://github.com/imiric/xk6-sql) and the
[Prometheus output](https://github.com/szkiba/xk6-prometheus).

Note that you'll need to specify the binary in the current directory (i.e. `./k6` or
`.\k6` on Windows) to avoid using any other `k6` binary in your `PATH`.


### Writing a new extension

A good starting point for using xk6 and writing your own extension is the [xk6
introductory article](https://k6.io/blog/extending-k6-with-xk6).
<!-- TODO: How much of this article do we want to reproduce here? -->

You'll first need to decide the type of extension you wish to create. Choose a
JavaScript extension if you want to extend the JS functionality of your script, or an
Output extension if you want to process the metrics emitted by k6 in some way.

A few things to keep in mind when writing a new extension:
<!-- TODO: Better structure this list? -->

- JS extensions are registered using
  [`modules.Register()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/js/modules#Register)
  and Output extensions using
  [`output.RegisterExtension()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/output#RegisterExtension),
  which should be called in the `init()` function of the module.
  In either case you'll have to specify a unique name that preferably doesn't clash
  with any existing extension. JS extensions also must begin with `k6/x/` so as to
  differentiate them from built-in JS modules.

- JS extensions expose Go methods which can optionally receive a
  [`context.Context`](https://golang.org/pkg/context/#Context) instance as the first argument.
  This context is used throughout the k6 codebase and contains embedded objects
  which can be extracted to access the
  [`goja.Runtime`](https://pkg.go.dev/github.com/dop251/goja#Runtime) for a
  particular VU, and to get more information about the test in progress.
  Take a look at
  [`common.GetRuntime()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/js/common#GetRuntime),
  [`lib.GetState()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/lib#GetState) and
  [`lib.GetExecutionState()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/lib#GetExecutionState).

- Output extensions must implement the
  [`output.Output`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/output#Output) interface.
  They should be particularly weary of performance, since they can receive a large
  amount of metrics to process, which can easily degrade the performance of the test
  if the extension is inefficient.
  As such you should ensure that `AddMetricSamples()` doesn't block for a long time,
  and that metrics are flushed periodically to avoid memory leaks.

  Since this is common functionality that most outputs should have, we've provided
  a couple of helper structs: [`output.SampleBuffer`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/output#SampleBuffer)
  and [`output.PeriodicFlusher`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/output#PeriodicFlusher)
  that output implementations can use which handles bufferring and periodic
  flushing in a thread-safe way.
  For usage examples see the [`statsd` output](https://github.com/k6io/k6/blob/v0.33.0/output/statsd/output.go#L55).

- Custom metric emission can be done by creating new metrics using [`stats.New()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/stats#New)
  and emitting them using [`stats.PushIfNotDone()`](https://pkg.go.dev/go.k6.io/k6@v0.33.0/stats#PushIfNotDone).
  For an example of this see the [`xk6-remote-write` extension](https://github.com/dgzlopes/xk6-remote-write).
