---
title: 'Single request'
description: 'Example of one HTTP GET request'
draft: 'false'
weight: 01
---

# Single request

{{< code >}}

```javascript
import http from 'k6/http';

export const options = {
  iterations: 1,
};

export default function () {
  const response = http.get('https://test-api.k6.io/public/crocodiles/');
}
```

{{< /code >}}
