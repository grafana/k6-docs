---
title: 'findBetween(content, left, right)'
description: 'findBetween function'
excerpt: 'findBetween function'
---

Function that returns a string from between two other strings.

| Parameter     | Type   | Description |
| ------------- | ------ |  --- |
| content  | string  | The string to search through (e.g. [Response.body](https://k6.io/docs/javascript-api/v0-32/k6-http/response/)) |
| left | string | The string immediately before the value to be extracted |
| right | string | The string immediately after the value to be extracted |

### Returns

| Type   | Description     |
| -----  | --------------- |
| string | The extracted string, or an empty string if no match was found |


### Example

<CodeGroup labels={[]}>

```javascript
import { findBetween } from "https://jslib.k6.io/k6-utils/1.1.0/index.js";

export default function() {
  const response = '<div class="message">Login successful!</div>';

  const message = findBetween(response, '<div class="message">', '</div>');

  console.log(message); // Login successful!
}
```

</CodeGroup>
