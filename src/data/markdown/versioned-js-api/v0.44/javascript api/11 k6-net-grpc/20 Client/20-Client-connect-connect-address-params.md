---
title: "Client.connect(address [,params])"
excerpt: 'Opens a connection to a gRPC server; will block until a connection is made or a connection error is thrown.'
---

Opens a connection to a gRPC server; will block until a connection is made or a connection error is thrown. Cannot be called during the [`init` phase](/using-k6/test-lifecycle).

See [Client.close()](/javascript-api/k6-net-grpc/client/client-close) to close the connection.

| Parameter | Type | Description |
|-----------|------|-------------|
| address | string | The address of the gRPC server. Should be in the form: `host:port` with no protocol prefix e.g. `grpc.k6.io:443`. The host must be a literal IP address, or a host name that can be resolved to IP addresses.  The port must be a literal port number or a service name e.g. `:443` or `:https`. If the host is a literal IPv6 address it must be enclosed in square brackets, as in `[2001:db8::1]:80` or `[fe80::1%zone]:80`. |
| params (optional) | object | [ConnectParams](#connectparams) object containing additional connect parameters. |


## ConnectParams

| Name | Type | Description |
|------|------|-------------|
| `ConnectParams.plaintext` | bool | If `true` will connect to the gRPC server using plaintext i.e. insecure. Defaults to `false` i.e. secure via TLS. |
| `ConnectParams.reflect` | boolean | Whether to use the [gRPC server reflection protocol](https://github.com/grpc/grpc/blob/master/doc/server-reflection.md) when connecting. |
| `ConnectParams.timeout` | string / number | Connection timeout to use. Default timeout is `"60s"`. <br/> The type can also be a number, in which case k6 interprets it as milliseconds, e.g., `60000` is equivalent to `"60s"`. |
| `ConnectParams.maxReceiveSize` | number | Sets the maximum message size in bytes the client can receive.Defaults to 0. |
| `ConnectParams.maxSendSize` | number | Sets the maximum message size in bytes the client can send.Defaults to 0. |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();

export default () => {
  client.connect('localhost:8080');
};
```
</div>

<div class="code-group" data-props='{"labels": ["Insecure connection"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();

export default () => {
  client.connect('localhost:8080', { plaintext: true });
};
```
</div>
