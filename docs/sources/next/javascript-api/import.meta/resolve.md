---
title: 'resolve( path )'
description: 'Resolve a path to a URL strign the same way an import would.'
---

# resolve(path)

Resolve a path to a URL string the same way an import would.

This is useful if you want to provide a path relative to the current module to a function that will use `open` or some other function taking URLs.

This is particularly useful as some functions within k6 are not relative to the same origin, which might lead to seemingly similar paths having very different file being loaded from the filesystem.

For ongoing discussions please see this [issue](https://github.com/grafana/k6/issues/3857).

| Parameter | Type   | Description                |
| --------- | ------ | -------------------------- |
| path      | string | a path to a potential file |

### Example

{{< code >}}

```javascript
const pdfFile = open(import.meta.resolve('./path/to/file.pdf'), 'b');

export default function () {
  // this is here to not have an exception if ran in k6
}
```

{{< /code >}}
