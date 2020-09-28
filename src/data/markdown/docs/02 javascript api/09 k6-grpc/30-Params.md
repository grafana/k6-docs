---
title: "Params"
---

*Params* is an object used by the gRPC methods that generate RPC requests. *Params* contains request-specific options like e.g. headers that should be inserted into the request.

| Name | Type | Description |
|------|------|-------------|
| `Params.headers` | object | Object with key-value pairs representing custom headers the user would like to add to the request. |
| `Params.tags` | object | Key-value pairs where the keys are names of tags and the values are tag values. Response time metrics generated as a result of the request will have these tags added to them, allowing the user to filter out those results specifically, when looking at results data. |
| `Params.timeout` | number | Request timeout to use in milliseconds. Default timeout is 60000ms (60 seconds). |


### Example of custom metadata headers and tags

<div class="code-group" data-props='{"labels": []}'>

```js
import http from "k6/http";

const client = grpc.newClient();
client.load([], "route_guide.proto")

export default function () {
  const req = {
    latitude: 410248224,
    longitude: -747127767,
  };
  const params = {
    headers: { "x-my-header": "k6test" },
    tags: { k6test: "yes" },
  };
  const response = client.invokeRPC("main.RouteGuide/GetFeature", req, params)
}
```

</div>
