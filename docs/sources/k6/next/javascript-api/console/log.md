---
title: 'console.log(args)'
description: 'console module: console.log(args) method'
---

# console.log(args)

Logs a message to the console. When multiple arguments are provided, they are joined with a space.

| Parameter | Type | Default | Description                 |
| --------- | ---- | ------- | --------------------------- |
| args      | any  | `null`  | The value(s) to log.        |

### Returns

| Type | Description                          |
| ---- | ------------------------------------ |
| void | This method does not return a value. |

## Output formatting

The `console.log()` method formats values based on their type:

| Type        | Output format                                                 | Example                                                      |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------------ |
| String      | Quoted                                                        | `"hello"`                                                    |
| Number      | As-is                                                         | `42`                                                         |
| Boolean     | As-is                                                         | `true`                                                       |
| Object      | `{ key: value }`                                              | `{ name: "test" }`                                           |
| Array       | `[ elem, elem ]`                                              | `[ 1, 2, 3 ]`                                                |
| TypedArray  | `TypeName(length) [ elements ]`                               | `Uint8Array(3) [ 1, 2, 3 ]`                                  |
| ArrayBuffer | `ArrayBuffer { [Uint8Contents]: <hex bytes>, byteLength: N }` | `ArrayBuffer { [Uint8Contents]: <01 02 03>, byteLength: 3 }` |
| Function    | `[object Function]`                                           | `[object Function]`                                          |
| null        | `null`                                                        | `null`                                                       |
| Date        | ISO string in quotes                                          | `"2024-01-15T10:30:00.000Z"`                                 |

### Supported TypedArray types

- `Int8Array`, `Uint8Array`
- `Int16Array`, `Uint16Array`
- `Int32Array`, `Uint32Array`
- `Float32Array`, `Float64Array`
- `BigInt64Array`, `BigUint64Array`

### Examples

{{< code >}}

```javascript
export default function () {
  // Basic values
  console.log('Hello, k6!');
  console.log(42, true, null);
  console.log({ name: 'test', value: 100 });
  console.log([1, 2, 3]);

  // TypedArray - displays type, length, and elements
  const uint8 = new Uint8Array([72, 101, 108, 108, 111]);
  console.log(uint8);
  // Output: Uint8Array(5) [ 72, 101, 108, 108, 111 ]

  const int32 = new Int32Array([1, 2, 3]);
  console.log(int32);
  // Output: Int32Array(3) [ 1, 2, 3 ]

  // ArrayBuffer - displays hex contents and byte length
  const buffer = new ArrayBuffer(4);
  const view = new Uint8Array(buffer);
  view.set([0xde, 0xad, 0xbe, 0xef]);
  console.log(buffer);
  // Output: ArrayBuffer { [Uint8Contents]: <de ad be ef>, byteLength: 4 }

  // Nested binary data in objects
  console.log({ data: new Uint8Array([1, 2, 3]) });
  // Output: { data: Uint8Array(3) [ 1, 2, 3 ] }
}
```

{{< /code >}}
