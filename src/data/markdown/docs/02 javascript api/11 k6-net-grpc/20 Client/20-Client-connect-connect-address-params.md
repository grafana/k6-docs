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
| `ConnectParams.maxReceiveSize` | number | Sets the maximum message size in bytes the client can receive. Defaults to 0. |
| `ConnectParams.maxSendSize` | number | Sets the maximum message size in bytes the client can send. Defaults to 0. |
| `ConnectParams.tls` (optional) | object | [TLS](#tls) | TLS settings of the connection. Defaults not defined. |

## TLS

TLS settings of the connection, if not defined, the main TLS config from options will be used.

| Name | Type | Description |
|------|------|-------------|
| `tls.cert` | string | PEM formatted client certificate. |
| `tls.key` | string | PEM formatted client private key. |
| `tls.password` | string | Password for decrypting the client's private key. |
| `tls.cacerts` | string / array | PEM formatted strings of the certificate authorities. |

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

<div class="code-group" data-props='{"labels": ["Different TLS settings"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';
import { check } from 'k6';

// note: there are no such services
const params = {
  'foo1.grpcbin.test.k6.io:9001': {
    plaintext: false,
    tls: {
      cacerts: [open('cacerts0.pem')],
      cert: open('cert0.pem'),
      key: open('key0.pem'),
    },
  },
  'foo2.grpcbin.test.k6.io:9002': {
    plaintext: false,
    tls: {
      cacerts: open('cacerts1.pem'),
      cert: open('cert1.pem'),
      key: open('key1.pem'),
      password: 'cert1-passphrase',
    },
  },
};
const clients = {
  'foo1.grpcbin.test.k6.io:9001': new grpc.Client(),
  'foo2.grpcbin.test.k6.io:9002': new grpc.Client(),
};

export default () => {
  if (__ITER === 0) {
    clients['foo1.grpcbin.test.k6.io:9001'].connect(
      'foo1.grpcbin.test.k6.io:9001',
      params['foo1.grpcbin.test.k6.io:9001']
    );
    clients['foo2.grpcbin.test.k6.io:9002'].connect(
      'foo2.grpcbin.test.k6.io:9002',
      params['foo2.grpcbin.test.k6.io:9002']
    );
  }

  const response1 = clients['foo1.grpcbin.test.k6.io:9001'].invoke('hello.HelloService/SayHello', {
    greeting: 'Bert',
  });

  check(response1, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response1.message));

  const response2 = clients['foo2.grpcbin.test.k6.io:9002'].invoke('hello.HelloService/SayHello', {
    greeting: 'Ernie',
  });

  check(response2, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response2.message));
};
```
</div>