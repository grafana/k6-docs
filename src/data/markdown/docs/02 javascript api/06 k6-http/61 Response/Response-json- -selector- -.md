---
title: 'Response.json( [selector] )'
excerpt: ''
---

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

<CodeGroup labels={[]}>

```js
import http from 'k6/http';

export default function () {
  let res = http.get('https://test-api.loadimpact.com/public/crocodiles/');

  console.log(res.json());
}
```

</CodeGroup>
