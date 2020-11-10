---
title: "Client.connect(address [,params])"
---

Opens a connection to a gRPC server; will block until a connection is made or a connection error is thrown. Cannot be
called during `init` cycle.

See [Client.close()]() to close the connection.

| Parameter | Type | Description |
|-----------|------|-------------|
| address | string | The address of the gRPC server. Should be in the form: `host:port` with no protocol prefix eg. `grpc.k6.io:443`. The host must be a literal IP address, or a host name that can be resolved to IP addresses.  The port must be a literal port number or a service name eg. `:443` or `:https`. If the host is a literal IPv6 address it must be enclosed in square brackets, as in `[2001:db8::1]:80` or `[fe80::1%zone]:80`. |
| params (optional) | object | [ConnectParams](#connectparams) object containing additional connect parameters. |

### Returns

| Type | Description |
|------|-------------|
| bool | If a connection was successful return `true`, otherwise `false`.


## ConnectParams

| Name | Type | Description |
|------|------|-------------|
| `ConnectParams.plaintext` | bool | If `true` will connect to the gRPC server using plaintext ie. insecure. Defaults to `false` ie. secure via TLS. |
| `ConnectParams.timeout` | number | Connection timeout to use in milliseconds. Default timeout is 60000ms (60 seconds). |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```js
import ws from "k6/grpc";

const client = grpc.newClient();

export default () => {
    client.connect("localhost:8080");
}
```
</div>

<div class="code-group" data-props='{"labels": ["Insecure connection"], "lineNumbers": [true]}'>

```js
import ws from "k6/grpc";

const client = grpc.newClient();

export default () => {
    client.connect("localhost:8080", { plaintext: true });
}
```
</div>
