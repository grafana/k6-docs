---
title: 'Params'
description: 'Used for setting various WebSocket request-specific parameters such as headers, tags, etc.'
description: 'Used for setting various WebSocket request-specific parameters such as headers, tags, etc.'
weight: 20
---

# Params

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

_Params_ is an object used by the WebSocket methods that generate WebSocket requests. _Params_ contains request-specific options like headers that should be inserted into the request.

| Name                 | Type                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Params.compression` | string                                                                                      | Compression algorithm to be used by the WebSocket connection. The only supported algorithm currently is `deflate`. If the option is left unset or empty, it defaults to no compression.                                                                                                                                                                                                                                                                                                                                                         |
| `Params.jar`         | [http.CookieJar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) | The cookie jar that will be used when making the initial HTTP request to establish the WebSocket connection. If empty, the [default VU cookie jar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) will be used.                                                                                                                                                                                                                                                                                                     |
| `Params.headers`     | object                                                                                      | Custom HTTP headers in key-value pairs that will be added to the initial HTTP request to establish the WebSocket connection. Keys are header names and values are header values.                                                                                                                                                                                                                                                                                                                                                                |
| `Params.tags`        | object                                                                                      | [Custom metric tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#user-defined-tags) in key-value pairs where the keys are names of tags and the values are tag values. The WebSocket connection will [generate metrics samples](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket#websocket-built-in-metrics) with these tags attached, allowing users to filter the results data or set [thresholds on sub-metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds#thresholds-on-tags). |

### Example of custom metadata headers and tags

_A k6 script that will make a WebSocket request with a custom header and tag results data with a specific tag_

{{< code >}}

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

{{< /code >}}
