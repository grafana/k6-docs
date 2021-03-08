---
title: "functional"
excerpt: "Functional testing with k6"
---

The `functional` module is an external JavaScript library that provides APIs to simplify functional testing in k6. 
This library is inspired by ava, jest and jasmine. 

<Blockquote mod='warning'>

#### This library is rapidly evolving.

This library is stable enough to be useful, but pay attention to the new versions released in jslib.k6.io. 

This documentation is for the last version only. If you discover that some of the code below does not work, it most likely means that you are using an older version.

</Blockquote>


See [getting started with functional.js](/javascript-api/jslib/functional/getting-started-with-functional-js) for usage examples.

More advanced examples can be found in the [examples section](/examples/functional-testing)


| Function | Description |
| -------- | ----------- |
| [test(name, function)](/javascript-api/jslib/functional/test-name-function)  | Entry point for creating tests.  |
| [expect(value)](/javascript-api/jslib/functional/expect-value)  | expect(value) sets the value to be used in comparison by the next function in the chain |
| [and(value)](/javascript-api/jslib/functional/and-value)  | and(value) is similar to expect(value), but can be used in a chain. |
| [as(alias)](/javascript-api/jslib/functional/as-string)  | as(alias) sets a textual representation of the value passed to `expect` or `and`. |
| [toEqual(value)](/javascript-api/jslib/functional/toequal-expectedvalue)  | The `.toEqual(expectedValue)` is similar to `===`    |
| [toBeGreaterThan(expectedValue)](/javascript-api/jslib/functional/tobegreaterthan-expectedvalue)  | Use to verify that `received` > `expected` |
| [toBeGreaterThanOrEqual(expectedValue)](/javascript-api/jslib/functional/tobegreaterthanorequal-expectedvalue)  | Use to verify that `received` >= `expected` |
| [toBeLessThan(expectedValue)](/javascript-api/jslib/functional/tobelessthan-expectedvalue)  | Use to verify that `received` < `expected` |
| [toBeLessThanOrEqual(expectedValue)](/javascript-api/jslib/functional/tobelessthanorequal-expectedvalue)  | Use to verify that `received` <= `expected` |
| [toBeBetween(from, to)](/javascript-api/jslib/functional/tobebetween-from-to)  | Use to verify that expected value is within range. |
| [toBeTruthy()](/javascript-api/jslib/functional/tobetruthy)  | Use `.toBeTruthy` when you don't care what a value is and you want to ensure a value is true in a boolean context.  | 
| [toHaveValidJson()](/javascript-api/jslib/functional/tohavevalidjson)  | Use to verify that the http response has a valid JSON body. |
