---
title: "Client.load(importPaths, ...protoFiles)"
---

Loads and parses the protocol buffer descriptors so they are available to the client to marshal/unmarshal the correct
request and repsonse data structures for the RPC schema. 

Must be called within the `init` cycle.

| Parameter | Type | Description |
|-----------|------|-------------|
| importPaths | Array&lt;string&gt; \| `null` | The paths used to search for dependencies that are referenced in import statements in proto source files. If no import paths are provided then "." (current directory) is assumed to be the only import path. |
| protoFiles | Array&lt;string&gt; | [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) for the list of proto files to load/parse. |

### Returns

| Type | Description |
|------|-------------|
| Array<[MethodInfo](#methodinfo)> | List of service RPC methods that where successfully parsed. |

## MethodInfo

*MethodInfo* is the information on the available RPC method.

| Name | Type | Description |
|------|------|-------------|
| `MethodInfo.fullMethod` | string | The full RPC method string, i.e., `package.service/method`. |
| `MethodInfo.isClientStream` | bool | Indicates whether the RPC is a client streaming RPC. |
| `MethodInfo.isServerStream` | bool | Indicates whether the RPC is a server streaming RPC. |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```js
import ws from "k6/grpc";

const client = grpc.newClient();
client.load([], "language_service.proto")
```

</div>

<div class="code-group" data-props='{"labels": ["More complex"], "lineNumbers": [true]}'>

```js
import ws from "k6/grpc";

const client = grpc.newClient();
client.load(
    ["../googleapis/google"],
    "../googleapis/google/spanner/admin/instance/v1/spanner_instance_admin.proto",
    "../googleapis/google/spanner/admin/database/v1/spanner_database_admin.proto",
    "../googleapis/google/spanner/v1/spanner.proto",
);
```

</div>

<div class="code-group" data-props='{"labels": ["MethodInfo"], "lineNumbers": [true]}'>

```js
import ws from "k6/grpc";
import { check } from "k6";

const client = grpc.newClient();
const methodInfoList = client.load([], "language_service.proto");

export default () => {
    if (__ITER == 0) {
        client.connect("localhost:8080", { plaintext: true });
    }

    methodInfo.forEach(m => {
        if (!m.isClientStream && !m.isServerStream) {
            const resp = client.invokeRPC(m.fullMethod, {});
            check(resp, { "status is InvalidArgument": (r) => r && r.status === grpc.StatusInvalidArgument });
        }
    });
}
```

</div>
