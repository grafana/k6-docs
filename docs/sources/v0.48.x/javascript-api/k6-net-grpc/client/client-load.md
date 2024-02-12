---
title: 'Client.load(importPaths, ...protoFiles)'
description: 'Loads and parses the protocol buffer descriptors so they are available to the client to marshal/unmarshal the correct request and response data structures for the RPC schema.'
weight: 10
---

# Client.load(importPaths, ...protoFiles)

Loads and parses the protocol buffer descriptors so they are available to the client to marshal/unmarshal the correct request and response data structures for the RPC schema.

Must be called within the [`init` phase](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

| Parameter   | Type                          | Description                                                                                                                                                                                                   |
| ----------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| importPaths | Array&lt;string&gt; \| `null` | The paths used to search for dependencies that are referenced in import statements in proto source files. If no import paths are provided then "." (current directory) is assumed to be the only import path. |
| protoFiles  | Array&lt;string&gt;           | [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) for the list of proto files to load/parse.                                                     |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();
client.load([], 'language_service.proto');
```

</div>

<div class="code-group" data-props='{"labels": ["More complex"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();

client.load(
  ['../googleapis/google'],
  'spanner/admin/instance/v1/spanner_instance_admin.proto',
  'spanner/admin/instance/v1/spanner_instance_admin.proto',
  'spanner/v1/spanner.proto'
);
```

</div>
