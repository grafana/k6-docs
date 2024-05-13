---
title: 'Response.json( [selector] )'
description: 'Parses the response body data as JSON and returns a JS object or array.'
---

# Response.json( [selector] )

Parses the response body data as JSON and returns a JS object or array. This call caches the deserialized JSON data, additional calls will return the cached data. An optional selector can be specified to extract a specific part of the data, see [here for selector syntax](https://github.com/tidwall/gjson#path-syntax).

This method takes an object argument where the following properties can be set:

| Param    | Type   | Description                                                                                                                                                 |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector | string | An optional selector can be specified to extract a specific part of the data, see [here for selector syntax](https://github.com/tidwall/gjson#path-syntax). |

### Returns

| Type            | Description                               |
| --------------- | ----------------------------------------- |
| Object or array | Returns the response body as JSON object. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');

  console.log(res.json());
}
```

{{< /code >}}
