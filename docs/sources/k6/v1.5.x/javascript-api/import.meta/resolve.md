---
title: 'resolve( path )'
description: 'Resolve the path to a URL string in the same way an import statement does.'
---

# resolve( path )

Resolve a path to a URL string in the same way an import statement does.'

This is useful if you want to provide a path relative to the current module to a function that uses `open` or another function that takes URLs.

This is particularly useful as some functions within k6 are not relative to the same origin, which might lead to seemingly similar paths having different files being loaded from the filesystem.

For more details, refer to this [issue](https://github.com/grafana/k6/issues/3857).

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| path      | string | A file path. |

### Example

{{< code >}}

```javascript
const pdfFile = open(import.meta.resolve('./path/to/file.pdf'), 'b');

export default function () {
  // this is here to avoid an exception if run using k6
}
```

{{< /code >}}
