---
title: 'randomUUID'
description: 'randomUUID produces a 36-characters long string containing a cryptographically random UUID v4.'
weight: 02
---

# randomUUID

The `randomUUID` method produces a 36-characters long string that contains a cryptographically random UUID v4.

## Usage

```
randomUUID()
```

## Return Value

A string containing a 36-character cryptographically random UUID v4.

## Example

{{< code >}}

```javascript
import { crypto } from 'k6/experimental/webcrypto';

export default function () {
  const myUUID = crypto.randomUUID();

  console.log(myUUID);
}
```

{{< /code >}}
