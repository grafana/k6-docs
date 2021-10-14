---
title: 'Params'
description: 'Used for setting various WebSocket request-specific parameters such as headers, tags, etc.'
excerpt: 'Used for setting various WebSocket request-specific parameters such as headers, tags, etc.'
---

_Params_ is an object used by the WebSocket methods that generate WebSocket requests. _Params_ contains request-specific options like headers that should be inserted into the request.

| Name                  | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `Params.headers`      | object | Object with key-value pairs representing custom headers the user would like to add to the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Params.tags`         | object | Key-value pairs where the keys are names of tags and the values are tag values. Response time metrics generated as a result of the request will have these tags added to them, allowing the user to filter out those results specifically, when looking at results data.                                                                                                                                                                                                                                                                                                                          |

### Example of custom metadata headers and tags

_A k6 script that will make a WebSocket request with a custom header and tag results data with a specific tag_

<CodeGroup labels={[]}>

```javascript
import ws from 'k6/ws';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = {
    headers: { 'X-MyHeader': 'k6test' },
    tags: { k6test: 'yes' },
  };
  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function () {
      console.log('WebSocket connection established!');
      socket.close();
    });
  });
}
```

</CodeGroup>

