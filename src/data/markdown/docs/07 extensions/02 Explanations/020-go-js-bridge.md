---
title: About the Go-to-JS bridge
excerpt: Technical details about how JavaScript works in the goja engine.
slug: /extensions/explanations/go-js-bridge
---

All k6 and xk6 binaries have an embedded JavaScript engine, [goja](https://github.com/dop251/goja),
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
your object to a [`goja.Object`](https://pkg.go.dev/github.com/dop251/goja#Object) or [`goja.Value`](https://pkg.go.dev/github.com/dop251/goja#Value).

```go
func (*Compare) XComparator(call goja.ConstructorCall, rt *goja.Runtime) *goja.Object {
	return rt.ToValue(&Compare{}).ToObject(rt)
}
```

The preceding snippet also demonstrates the _native constructors_ feature from goja, where methods can become JS constructors.
Methods with this signature can create `Comparator` instances in JS with `new compare.Comparator()`.
While this is more idiomatic to JS, it still has the benefit of receiving the `goja.Runtime`.

