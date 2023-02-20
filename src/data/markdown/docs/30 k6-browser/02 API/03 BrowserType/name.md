---
title: 'name()'
excerpt: 'Browser module: BrowserType.name method'
---

Returns the name of the `BrowserType`; currently it will return `chromium`.


### Returns

| Type   | Description                  |
|--------|------------------------------|
| string | Currently returns `chromium` |


## Example

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const name = chromium.name();
  console.log(name);
}
```