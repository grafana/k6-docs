---
title: 'randomUUID'
excerpt: 'randomUUID produces a 36-characters long string containing a cryptographically random UUID v4.'
---

The `randomUUID` method produces a 36-characters long string that contains a cryptographically random UUID v4.

## Usage

```
randomUUID()
```

## Return Value

A string containing a 36-character cryptographically random UUID v4.

## Example

<CodeGroup labels={["example-webcrypto-randomuuid.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { crypto } from "k6/experimental/webcrypto";

export default function () {
  const myUUID = crypto.randomUUID();

  console.log(myUUID);
}
```

</CodeGroup>