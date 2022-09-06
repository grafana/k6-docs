---
title: 'name()'
excerpt: 'xk6-browser: BrowserType.name method'
---

Returns the name of the `BrowserType`; currently it will return `chromium`.


### Returns

| Type   | Description                  |
|--------|------------------------------|
| string | Currently returns `chromium` |


## Example

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const name = chromium.name();
  console.log(name);
  ...
}
```