---
title: 'Params'
description: 'Used for setting various WebSocket request-specific parameters such as headers, tags, etc.'
description: 'Used for setting various WebSocket request-specific parameters such as headers, tags, etc.'
weight: 20
---

# Params

`Params` is an object used by the WebSocket constructor. The `Params` object contains request-specific options, such as headers that should be inserted into the connection initialization request.

| Name                 | Type                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Params.compression` | string                                                                                      | Compression algorithm to be used by the WebSocket connection. The only supported algorithm currently is `deflate`.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `Params.jar`         | [http.CookieJar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) | The cookie jar that will be used when making the initial HTTP request to establish the WebSocket connection. If empty, the [default VU cookie jar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) will be used.                                                                                                                                                                                                                                                                                                     |
| `Params.headers`     | object                                                                                      | Custom HTTP headers in key-value pairs that will be added to the initial HTTP request to establish the WebSocket connection. Keys are header names and values are header values.                                                                                                                                                                                                                                                                                                                                                                |
| `Params.tags`        | object                                                                                      | [Custom metric tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#user-defined-tags) in key-value pairs where the keys are names of tags and the values are tag values. The WebSocket connection will [generate metrics samples](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket#websocket-built-in-metrics) with these tags attached, allowing users to filter the results data or set [thresholds on sub-metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds#thresholds-on-tags). |

### Example of custom metadata headers and tags

_A k6 script that makes a WebSocket request with a custom header and tags results data with a specific tag_

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const params = {
    headers: { 'X-MyHeader': 'k6test' },
    tags: { k6test: 'yes' },
  };

  const ws = new WebSocket(url, null, params);

  ws.onopen = () => {
    console.log('WebSocket connection established!');
    ws.close();
  };
}
```

{{< /code >}}

The preceding example uses a WebSocket echo server, which you can run with the following command:

{{< code >}}

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```

{{< /code >}}
