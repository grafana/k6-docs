---
title: 'executablePath()'
excerpt: 'Browser module: BrowserType.executablePath method'
---

Returns the path where the extension expects to find the browser executable.


### Returns

| Type   | Description                          |
|--------|--------------------------------------|
| string | The expected browser executable path |


## Example

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const execPath = chromium.executablePath();
  console.log(execPath);
}
```