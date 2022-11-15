---
title: 'executablePath()'
excerpt: 'xk6-browser: BrowserType.executablePath method'
---

Returns the path where the extension expects to find the browser executable.


### Returns

| Type   | Description                          |
|--------|--------------------------------------|
| string | The expected browser executable path |


## Example

[//]: # (eslint-skip)

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const execPath = chromium.executablePath();
  console.log(execPath);
  ...
}
```
