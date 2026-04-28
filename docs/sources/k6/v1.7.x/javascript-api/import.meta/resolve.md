---
title: 'resolve( path )'
description: 'Resolves a path to a URL string in the same way an import statement does.'
---

# resolve( path )

Resolves a path to a URL string in the same way an import statement does.

Use this function to provide a path relative to the current module to functions like `open` that accept URLs. This is helpful because some k6 functions don't resolve paths relative to the same origin, which can cause similar-looking paths to load different files from the filesystem.

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| path      | string | The file path to resolve. |

## Returns

| Type   | Description              |
| ------ | ------------------------ |
| string | The resolved URL string. |

## Example

<!-- md-k6:skip -->

```javascript
import { open } from 'k6/experimental/fs';

const pdfFile = open(import.meta.resolve('./path/to/file.pdf'), 'b');

export default function () {
  // Use the resolved file path
}
```
