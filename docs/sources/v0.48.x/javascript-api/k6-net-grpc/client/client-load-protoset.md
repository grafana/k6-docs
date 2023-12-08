---
title: 'Client.loadProtoset(protosetPath)'
excerpt: 'Loads and parses the protoset file (serialized FileDescriptor set) so they are available to the client to marshal/unmarshal the correct request and response data structures for the RPC schema.'
weight: 11
---

# Client.loadProtoset(protosetPath)

Loads and parses the protoset file (serialized FileDescriptor set) so they are available to the client to marshal/unmarshal the correct request and response data structures for the RPC schema.

Must be called within the [`init` phase](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

| Parameter    | Type   | Description                                                                                                                        |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| protosetPath | string | The path of the protoset file. If no import paths are provided then "." (current directory) is assumed to be the only import path. |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();
client.loadProtoset('./dummy.protoset');
```

</div>
