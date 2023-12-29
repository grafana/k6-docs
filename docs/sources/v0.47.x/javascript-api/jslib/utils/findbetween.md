---
title: 'findBetween(content, left, right, [repeat])'
description: 'findBetween function'
weight: 45
---

# findBetween(content, left, right, [repeat])

Function that returns a string from between two other strings.

| Parameter         | Type    | Description                                                                                                                   |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| content           | string  | The string to search through (e.g. [Response.body](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response)) |
| left              | string  | The string immediately before the value to be extracted                                                                       |
| right             | string  | The string immediately after the value to be extracted                                                                        |
| repeat (optional) | boolean | If `true`, the result will be a string array containing all occurrences                                                       |

### Returns

| Type   | Description                                                                                                                          |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| string | The extracted string, or an empty string if no match was found. If `repeat=true`, this will be an array of strings or an empty array |

### Example

{{< code >}}

```javascript
import { findBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  const response = '<div class="message">Message 1</div><div class="message">Message 2</div>';

  const message = findBetween(response, '<div class="message">', '</div>');

  console.log(message); // Message 1

  const allMessages = findBetween(response, '<div class="message">', '</div>', true);
  console.log(allMessages.length); // 2
}
```

{{< /code >}}
