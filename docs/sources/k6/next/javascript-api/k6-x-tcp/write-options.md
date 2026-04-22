---
title: 'WriteOptions'
description: 'Write options for TCP socket operations'
weight: 40
---

# WriteOptions

`WriteOptions` configures how `write()` and `writeAsync()` encode and tag an individual write operation.

## Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `encoding` | string | Encoding used when the payload is a string |
| `tags` | object | Optional key-value pairs attached to metrics for this write operation |

## Encodings

| Value | Description |
| ----- | ----------- |
| `utf8` | UTF-8 text encoding |
| `utf-8` | Alias for UTF-8 text encoding |
| `ascii` | Alias for `utf8` in this extension |
| `base64` | Decodes a base64 string to bytes before writing |
| `hex` | Decodes a hexadecimal string to bytes before writing |

## Notes

- Invalid encoding values are rejected.
- Malformed `base64` and `hex` strings are rejected.
- When the payload is an `ArrayBuffer`, the `encoding` option is ignored.
- Tag precedence is: socket-level tags -> connect-level tags -> write-level tags.
