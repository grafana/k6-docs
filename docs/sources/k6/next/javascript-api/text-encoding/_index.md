---
title: 'TextEncoder and TextDecoder'
description: 'Encode strings as UTF-8 bytes and decode UTF-8 or UTF-16 bytes.'
weight: 13
---

# TextEncoder and TextDecoder

Use the [`TextEncoder`](https://encoding.spec.whatwg.org/#interface-textencoder) and [`TextDecoder`](https://encoding.spec.whatwg.org/#interface-textdecoder) APIs to convert between JavaScript strings and encoded bytes.

Both constructors are global. You can use them in the init and VU contexts without an import statement.

## TextEncoder

Create a UTF-8 encoder with the `TextEncoder` constructor:

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
const encoder = new TextEncoder();
```

A `TextEncoder` instance has the following property and method:

| Property or method | Description                                                                                               |
| :----------------- | :-------------------------------------------------------------------------------------------------------- |
| `encoding`         | The encoding name. This value is always `utf-8`.                                                          |
| `encode(input)`    | Encodes `input` as UTF-8 and returns a `Uint8Array`. If you omit `input`, it defaults to an empty string. |

`TextEncoder` encodes only UTF-8. To work with UTF-16 encoded data, use `TextDecoder` to decode existing UTF-16 bytes.
The `encodeInto()` method isn't supported.

## TextDecoder

Create a decoder with the `TextDecoder` constructor:

<!-- md-k6:skip -->
<!-- eslint-skip -->

```javascript
const decoder = new TextDecoder(label, options);
```

The `label` argument selects the character encoding. It defaults to `utf-8`. k6 supports the following encodings and their standard aliases:

| Label                  | Description                 |
| :--------------------- | :-------------------------- |
| `utf-8`                | UTF-8. This is the default. |
| `utf-16le` or `utf-16` | UTF-16, little-endian.      |
| `utf-16be`             | UTF-16, big-endian.         |

The constructor throws a `RangeError` if the label isn't supported.

The `options` object can have the following properties:

| Property    | Type      | Default | Description                                                                                                                                                 |
| :---------- | :-------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fatal`     | `boolean` | `false` | If `true`, `decode()` throws a `TypeError` for invalid encoded data. Otherwise, it replaces invalid data with the Unicode replacement character (`U+FFFD`). |
| `ignoreBOM` | `boolean` | `false` | If `true`, the decoder treats a leading byte order mark (BOM) as part of the text instead of using and removing it.                                         |

A `TextDecoder` instance has the following properties and method:

| Property or method       | Description                                                                                                            |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `encoding`               | The canonical name of the selected encoding.                                                                           |
| `fatal`                  | Whether the decoder throws an error for invalid encoded data.                                                          |
| `ignoreBOM`              | Whether the decoder ignores BOM handling.                                                                              |
| `decode(input, options)` | Decodes an `ArrayBuffer`, `TypedArray`, or `DataView` and returns a string. Omit `input` to flush a streaming decoder. |

The `decode()` options object accepts a `stream` boolean. Set `stream` to `true` when more chunks will follow. For the final chunk, omit the option or set it to `false`.

## Encode and decode UTF-8 data

The following example encodes a string as UTF-8 bytes and decodes the bytes back to a string:

```javascript
import { check } from 'k6';

const text = 'Hello, 世界 👋';
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export default function () {
  const encoded = encoder.encode(text);
  const decoded = decoder.decode(encoded);

  check(decoded, {
    'encoded value is a Uint8Array': () => encoded instanceof Uint8Array,
    'decoded value matches the input': (value) => value === text,
  });
}
```

## Decode UTF-16 data

The following example decodes UTF-16 little-endian bytes. The leading `0xFF 0xFE` bytes are the UTF-16LE BOM:

```javascript
import { check } from 'k6';

const utf16le = new Uint8Array([
  0xff, 0xfe, 0x48, 0x00, 0x65, 0x00, 0x6c, 0x00, 0x6c, 0x00, 0x6f, 0x00,
]);

export default function () {
  const text = new TextDecoder('utf-16le').decode(utf16le);

  check(text, {
    'decoded value is correct': (value) => value === 'Hello',
  });
}
```

## Decode data in chunks

When a character spans multiple chunks, reuse one decoder and set `stream: true` until the final chunk:

```javascript
import { check } from 'k6';

export default function () {
  const decoder = new TextDecoder();
  const firstPart = decoder.decode(new Uint8Array([0xf0, 0x9f]), { stream: true });
  const secondPart = decoder.decode(new Uint8Array([0x91, 0x8b]));

  check(firstPart + secondPart, {
    'split character is decoded': (value) => value === '👋',
  });
}
```
