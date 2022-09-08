---
title: "Params"
head_title: 'gRPC.params'
excerpt: 'Params is an object used by the gRPC methods that generate RPC requests.'
---

*Params* is an object used by the gRPC methods that generate RPC requests. *Params* contains request-specific options like headers that should be inserted into the request.

| Name | Type | Description |
|------|------|-------------|
| `Params.headers` <sup>(< v0.37.0)</sup> | object | Deprecated, use metadata instead. |
| `Params.metadata` | object | Object with key-value pairs representing custom metadata the user would like to add to the request. |
| `Params.tags` | object | Key-value pairs where the keys are names of tags and the values are tag values. Response time metrics generated as a result of the request will have these tags added to them, allowing the user to filter out those results specifically, when looking at results data. |
| `Params.timeout` | string / number | Request timeout to use. Default timeout is 60 seconds (`"60s"`). <br/> The type can also be a number, in which case k6 interprets it as milliseconds, e.g., `60000` is equivalent to `"60s"`. |


### Example of custom metadata headers and tags

<div class="code-group" data-props='{"labels": []}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();
client.load([], 'route_guide.proto');

export default function () {
  const req = {
    latitude: 410248224,
    longitude: -747127767,
  };
  const params = {
    metadata: { 'x-my-header': 'k6test' },
    tags: { k6test: 'yes' },
  };
  const response = client.invoke('main.RouteGuide/GetFeature', req, params);
}
```

</div>
