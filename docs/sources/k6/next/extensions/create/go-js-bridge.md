---
title: About the Go-to-JS bridge
description: Technical details about how JavaScript works in the sobek engine.
weight: 700
---

# About the Go-to-JS bridge

All k6 and xk6 binaries have an embedded JavaScript engine, [sobek](https://github.com/grafana/sobek),
which your test scripts run on.

You will deepen your conceptual knowledge of how your k6 extension works if you understand the _bridge_ between Go internals and the JavaScript runtime.

## Go-to-JavaScript bridge features

The bridge has a few features we should highlight:

- Go method names are converted from _Pascal_ to _Camel_ case when
  accessed in JS. For example, `IsGreater` becomes `isGreater`.

- Go field names convert from _Pascal_ to _Snake_ case. For example, the struct field `ComparisonResult string`
  becomes `comparison_result` in JS.

- Field names may be explicit using `js` struct tags. For example, declaring the field as <CodeInline>ComparisonResult string &grave;js:"result"&grave;</CodeInline>
  or hiding from JS using <CodeInline>&grave;js:"-"&grave;</CodeInline>.

## Type conversion and native constructors

### Conversion changes in k6 v2.4.0

If your extension passes Go values to `sobek.Runtime.ToValue()`, review nil slices and pointers when upgrading to k6 v2.4.0. A nil Go slice passed directly to `ToValue()` becomes JavaScript `null`, rather than an empty array. A Go function that returns no value exposes JavaScript `undefined`. Check the actual conversion path before testing for either value. Return a non-nil empty slice when your API promises an empty array:

```go
package main

import "github.com/grafana/sobek"

func emptyStrings(rt *sobek.Runtime) sobek.Value {
	return rt.ToValue([]string{})
}
```

`ToValue()` now dereferences one pointer level. A pointer to a pointer becomes a generic JavaScript object rather than exposing the inner value's fields and methods. Dereference it yourself when the API should expose the inner value, and handle nil at each level. Audit extension methods that pass nested pointers to `ToValue()` and tests that distinguish `null`, `undefined`, and `[]`. k6 adjusts its affected built-in APIs to keep their documented empty-array results.

The JavaScript runtime transparently converts Go types like `int64` to their JS equivalent.
For complex types where this is impossible, your script might fail with a `TypeError`, requiring you to explicitly convert
your object to a [`sobek.Object`](https://pkg.go.dev/github.com/grafana/sobek#Object) or [`sobek.Value`](https://pkg.go.dev/github.com/grafana/sobek#Value).

```go
func (*Compare) XComparator(call sobek.ConstructorCall, rt *sobek.Runtime) *sobek.Object {
	return rt.ToValue(&Compare{}).ToObject(rt)
}
```

The preceding snippet also demonstrates the _native constructors_ feature from sobek, where methods can become JS constructors.
Methods with this signature can create `Comparator` instances in JS with `new compare.Comparator()`.
While this is more idiomatic to JS, it still has the benefit of receiving the `sobek.Runtime`.
