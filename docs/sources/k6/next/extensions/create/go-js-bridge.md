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

The JavaScript runtime transparently converts Go types like `int64` to their JS equivalent.
For complex types where this is impossible, your script might fail with a `TypeError`, requiring you to explicitly convert
your object to a [`sobek.Object`](https://pkg.go.dev/github.com/grafana/sobek#Object) or [`sobek.Value`](https://pkg.go.dev/github.com/grafana/sobek#Value).

When you pass a nil Go slice to `sobek.Runtime.ToValue()`, JavaScript receives `null`. A Go function with no return value exposes `undefined`. `ToValue()` dereferences one pointer level; a pointer to a pointer becomes a generic JavaScript object rather than exposing the inner value's fields and methods.

```go
func (*Compare) XComparator(call sobek.ConstructorCall, rt *sobek.Runtime) *sobek.Object {
	return rt.ToValue(&Compare{}).ToObject(rt)
}
```

The preceding snippet also demonstrates the _native constructors_ feature from sobek, where methods can become JS constructors.
Methods with this signature can create `Comparator` instances in JS with `new compare.Comparator()`.
While this is more idiomatic to JS, it still has the benefit of receiving the `sobek.Runtime`.

### Upgrade extensions to k6 v2.4.0

Sobek changed how `ToValue()` converts nil slices and nested pointers in k6 v2.4.0. If your extension relied on a nil slice becoming an empty JavaScript array, return a non-nil empty slice instead:

```go
package main

import "github.com/grafana/sobek"

func emptyStrings(rt *sobek.Runtime) sobek.Value {
	return rt.ToValue([]string{})
}
```

If your extension passes a pointer to a pointer to `ToValue()`, dereference it before conversion when JavaScript should access the inner value's fields or methods. Handle nil at each level, and test the values your API returns for `null`, `undefined`, and `[]`. k6 preserves empty-array results in its affected built-in APIs.
